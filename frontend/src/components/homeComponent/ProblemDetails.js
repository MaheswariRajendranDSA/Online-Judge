import { useNavigate} from 'react-router-dom'


const ProblemDetails = ({ problem }) => {
    const navigate = useNavigate();

    const buttonHandler = () => {
        navigate(`/problem/${problem._id}`)
    }
    const testbuttonHandler = () => {
      navigate(`/addTestCase/${problem._id}`)
  }
  return (
    <div className="problem-details">
      <h3>{problem.title}</h3>
      <div>
        <strong>Difficulty: </strong>
        {problem.difficulty}
      </div>
      <div>
        <strong>Languages: </strong>
        {problem.languages &&
          problem.languages.map((lang) => <p key={lang}>{lang}</p>)}
      </div>
      <div>
      <button onClick={buttonHandler}>Practice and Win</button>
      <button onClick={testbuttonHandler}>Add a New TestCase</button>
      </div>
    </div>
  );
};

export default ProblemDetails;
