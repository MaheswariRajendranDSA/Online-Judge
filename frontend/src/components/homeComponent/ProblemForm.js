import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
const ProblemForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [languages, setLanguage] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [error, setError] = useState(null)
  const { user } = useAuthContext()

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(!user)
    {
      setError('you must be logged in')
      return 
    }
    const test_cases = {input, output}
    const problem = {title, description, languages, difficulty, test_cases}

    const response = await fetch('http://65.0.89.247:8000/api/problems/createNewProblemById/run', {
      method:'POST',
      body: JSON.stringify(problem),
      headers:{
        'Content-Type':'application/json',
        'Authorization': `Bearer ${user.token}`,
      }
    })

    const json = await response.json();
    if(!response.ok){
      setError(json.error);
    }
    if(response.ok)
    {
      setError(null)
      setTitle('')
      setDescription('')
      setLanguage('')
      setDifficulty('')
      setInput('')
      setOutput('')
      console.log('new problem added:', json);
    }
  }
  return (
    <form className="createForm" onSubmit={handleSubmit}>
      <h2>Add a new problem</h2>
      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
       <label>Description:</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <label>Difficulty:</label>
      <input
        type="text"
        onChange={(e) => setDifficulty(e.target.value)}
        value={difficulty}
      />
        <label>Input:</label>
      <input
        type="number"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
       <label>Output:</label>
      <input
        type="number"
        onChange={(e) => setOutput(e.target.value)}
        value={output}
      />
      <button>Add a new problem</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProblemForm;
