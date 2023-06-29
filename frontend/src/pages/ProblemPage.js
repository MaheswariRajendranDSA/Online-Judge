import {useEffect, useState} from "react"
import ProblemDetails from "../components/ProblemComponent/ProblemDetails"
import { useParams } from 'react-router-dom'
const ProblemPage = () => {
    const { number } = useParams();
  const[problems, setProblems] = useState(null)


  useEffect(() => {
    const fetchProblems = async() => {
        //const response = await fetch('/api/problems/getProblems');
      const response = await fetch(`/api/problems/getSingleProblemById/${number}`);
      const json  = await response.json()
      console.log(json)
      if(response.ok)
      {
        setProblems(json)
      }
      else{
        console.log(json)
      }
    };
    fetchProblems()
    // eslint-disable-next-line
  }, []);
  return (
    <div className="problem">

        {problems && <ProblemDetails problem={problems}/>}
    </div>
  );
};
  export default ProblemPage