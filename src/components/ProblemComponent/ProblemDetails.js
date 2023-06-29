import { useState } from "react";
import Submit from "./Submit";
const ProblemDetails = (prob) => {
  const problem = prob.problem;
  const [haveSubmitClicked, SetSubmitAsClicked] = useState(false);

  const submitHandler = (action) => {
    SetSubmitAsClicked(!haveSubmitClicked);
    console.log(SetSubmitAsClicked);
  };

  return (
    <div>
      {haveSubmitClicked && (
        <Submit clicked={submitHandler} problem={problem} />
      )}
      {!haveSubmitClicked && (
        <div>
          <div>
            <h2>{problem.title}</h2>
          </div>
          <div>
            <strong>Description:</strong>
            {problem &&
              problem.description.map((statement) => (
                <p key={statement}>{statement}</p>
              ))}
            <strong>TestCase:</strong>
            <p>Sample Input:</p>
            {problem.test_cases.input}
            <p>Sample Output:</p>
            {problem.test_cases.output}
          </div>
          <button onClick={submitHandler}>Ready to Submit</button>
        </div>
      )}
    </div>
  );
};

export default ProblemDetails;
