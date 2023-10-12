import {useEffect, useState} from "react"
import ProblemDetails from "../components/homeComponent/ProblemDetails"
import ProblemForm from "../components/homeComponent/ProblemForm"
import { useAuthContext } from '../hooks/useAuthContext'
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
//import AddTestCaseForm from "../components/homeComponent/AddTestCaseForm"


const Home = () => {

  const[problems, setProblems] = useState(null)
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchProblems = async() => {
      const response = await fetch("http://65.0.89.247:8000/api/problems/getProblems", {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json  = await response.json()

      if(response.ok)
      {
        setProblems(json)
      }
    }
    fetchProblems()
  }, [user])
    return (
      <div className="home">
        <div className="problems">
        {problems && problems.map((problem) => (
  <ProblemDetails problem={problem} key={problem._id} />
    ))}
        </div>
        <ProblemForm />
      </div>

    )
  }
  export default Home