import {useEffect, useState} from "react"
import ProblemDetails from "../components/homeComponent/ProblemDetails"
import ProblemForm from "../components/homeComponent/ProblemForm"
import { useAuthContext } from '../hooks/useAuthContext'


const Home = () => {

  const[problems, setProblems] = useState(null)
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchProblems = async() => {
      const response = await fetch("/api/problems/getProblems", {
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