import { useState } from "react";
const ProblemForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [languages, setLanguage] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async(e) => {
    e.preventDefault();
    const test_cases = {input, output}
    const problem = {title, description, languages, difficulty, test_cases}

    const response = await fetch('/api/problems/createNewProblemById/run', {
      method:'POST',
      body: JSON.stringify(problem),
      headers:{
        'Content-Type':'application/json'
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
       <label>Language:</label>
      <input
        type="text"
        onChange={(e) => setLanguage(e.target.value)}
        value={languages}
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
