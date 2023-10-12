import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useParams } from "react-router-dom"; // Import useParams for route parameters
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
const AddTestCaseForm = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const { number } = useParams(); // Get route parameter 'number' using useParams

  useEffect(() => {
    setError(null); // Clear error when 'number' changes
  }, [number]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const problems = {
      problemId: number, // Use 'number' directly as the problemId
      input,
      output,
    };

    try {
      const response = await fetch(`http://65.0.89.247:8000/api/problems/addTestCase/${number}`, {
        method: "POST",
        body: JSON.stringify(problems),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
      } else {
        setError(null);
        setInput("");
        setOutput("");
        console.log("New testcase added:", json);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred while adding the test case.");
    }
  };

  return (
    <form className="createForm" onSubmit={handleSubmit}>
      <h2>Add a new testcase</h2>
      <label>Input:</label>
      <input
        type="text"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <label>Output:</label>
      <input
        type="text"
        onChange={(e) => setOutput(e.target.value)}
        value={output}
      />
      <button>Add a new testcase</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AddTestCaseForm;