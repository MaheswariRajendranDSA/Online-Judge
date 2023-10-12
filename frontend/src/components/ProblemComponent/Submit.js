import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
const Submit = (props) => {
  const { user } = useAuthContext();
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage ] = useState("c");
  const { number } = useParams();

  function clearOutput() {
    setOutput("");
  }

  const compileHandler = async (e) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    const payload = {
      language,
      code,
      userInput,
    };
    try {
      const { data } = await axios.post(
        "http://65.0.89.247:8000/api/problems/createProblemById/run",
        payload,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setOutput(data.output);
      setLoading(false);
      }
      catch(error) {
        if(error) {
            console.log(error.message);
            setOutput(error.message);
        } else {
            setOutput("Error: Server Down. Recheck the Server and try again!")
        }
    }
    };
  

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    const payload = {
      language,
      code,
      problemId: number,
    };
    try {
      const response = await fetch(`http://65.0.89.247:8000/api/problems/submitproblem/${number}`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const out = await response.json();

      console.log(out);
      if(out.status==="200")
      {
      setOutput('');
      setOutput(out.message);
      setLoading(false);
      }
      else
      setOutput('Code execution failed and check the code');
    }
    catch (error) 
    {
      if(error){
      setOutput("Error: Server Down. Recheck the Server and try again!")
    }
    }
};

const cancelHandler = async (e) => {
e.preventDefault();
props.clickHandler(e);

}
  return (
    <div>
      <div>
        <label>Language:</label>
      <select value={language} onChange={(e)=> {
        let shouldSwitch = window.confirm(
    "Are you sure you want to change language? WARNING: Your current code will be lost.");
          if (shouldSwitch) {
            setLanguage(e.target.value);
            setCode('');
            }
      console.log(e.target.value)}}>
        <option value="c">C</option>
        <option value="cpp">C++</option>
        <option value="py">Python</option>
      </select>
      </div>
      <br />
      <textarea
        rows="30"
        cols="100"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      ></textarea>
      <br />
      <button onClick={compileHandler}>Compile</button>
      <button onClick={submitHandler}>Submit</button>
      <button onClick={cancelHandler}>Cancel</button>
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
          <div className="spinner-box"></div>
        ) : (
          <div className="output-box">
            
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

export default Submit