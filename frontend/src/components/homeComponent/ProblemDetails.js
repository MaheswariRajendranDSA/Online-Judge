import {useNavigate} from 'react-router-dom'


const ProblemDetails = ({ problem }) => {
    const navigate = useNavigate();

    const buttonHandler = () => {
        navigate(`/problem/${problem._id}`)
    }
  return (
    <div className="problem-details">
      <h3>{problem.title}</h3>
      <p>
        <strong>Difficulty: </strong>
        {problem.difficulty}
      </p>
      <p>
        <strong>Languages: </strong>
        {problem.languages &&
          problem.languages.map((lang) => <p key={lang}>{lang}</p>)}
      </p>
      <button onClick={buttonHandler}>Practice and Win</button>
    </div>
  );
};

export default ProblemDetails;
