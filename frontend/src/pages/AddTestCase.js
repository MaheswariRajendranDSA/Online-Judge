import AddTestCaseForm  from "../components/homeComponent/AddTestCaseForm";
import { useLocation } from "react-router-dom";

const AddTestCase = () => {
  const { state } = useLocation();

  const problem = state;

  return (
    <div className="form-container">
      <AddTestCaseForm problem={problem} />
    </div>
  );
};

export default AddTestCase;