import {useEffect, useState} from "react"
import  ProblemDetails  from "../components/ProblemComponent/ProblemDetails"
import { useParams } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext";
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
const ProblemPage = () => {
    const { number } = useParams();
    const { user } = useAuthContext();
  const[problems, setProblems] = useState('')

  useEffect(() => {
    const fetchProblems = async() => {
      if(!user){
        return
      }
        //const response = await fetch('/api/problems/getProblems');
      const response = await fetch(`http://65.0.89.247:8000/api/problems/getSingleProblemById/${number}`,{
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      });
      const json  = await response.json()
      console.log(json)
      if(response.ok)
      {
        setProblems(json)
      }
      else{
        console.log(json)
      }
    }
    fetchProblems();
    // eslint-disable-next-line
  }, [user]);
  return (
    <div className="problem">
        {problems && <ProblemDetails problem={problems}/>}
    </div>
  );
};
  export default ProblemPage