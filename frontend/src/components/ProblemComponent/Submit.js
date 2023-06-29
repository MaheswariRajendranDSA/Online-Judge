import axios from "axios";
import { useState } from "react";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Spinner() {
  return (
    <div style={{ width: "100px", margin: "auto", display: "block" }}>
      <ClipLoader color="#52bfd9" size={100} />
    </div>
  );
}
const Submit = (prob) => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  function clearOutput() {
    setOutput("");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      language: "cpp",
      code,
      userInput,
    };
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/problems/createProblemById/run",
        payload
      );
      setOutput(data.output);
      setLoading(false);
    } catch (e) {
      console.log(e.response);
    }
  };
  return (
    <div>
      <textarea
        rows="30"
        cols="100"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <div className="right-container">
        <h4>Input:</h4>
        <div className="input-box">
          <textarea
            id="code-inp"
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>
        </div>
        <h4>Output:</h4>
        {loading ? (
          <div className="spinner-box">
            <img src={Spinner} alt="Loading..." />
          </div>
        ) : (
          <div className="output-box">
            <pre>{setOutput}</pre>
            <button
              onClick={() => {
                clearOutput();
              }}
              className="clear-btn"
            >
              Clear
            </button>
          </div>
        )}
      </div>
      <p> {output}</p>
    </div>
  );
};

export default Submit;
