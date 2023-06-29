import {useEffect, useState} from "react"
import ProblemDetails from "../components/homeComponent/ProblemDetails"
import ProblemForm from "../components/homeComponent/ProblemForm"

const Home = () => {

  const[problems, setProblems] = useState(null)

  useEffect(() => {
    const fetchProblems = async() => {
      const response = await fetch("/api/problems/getProblems")
      const json  = await response.json()

      if(response.ok)
      {
        setProblems(json)
      }
    }
    fetchProblems()
  }, [])
    return (
      <div className="homee">
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