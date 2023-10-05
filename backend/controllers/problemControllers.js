const Problem = require("../models/ProblemModels");
const solution = require("../models/submissionModel")
const mongoose = require("mongoose");
const { generateFile } = require("../generateFile");
const { executeCpp } = require("../executeCpp");
const { executeC } = require("../executeC")
const { executePy } = require("../executePy")

// get all workouts
const getProblems = async (req, res) => {
  try {
    const workouts = await Problem.find({}).sort({ createdAt: -1 });

    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a single workout
const getSingleProblemById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such problem" });
    }

    const problem = await Problem.findById(id);
    if (!problem) {
      return res.status(404).json({ error: "No such problem" });
    }

    return res.status(200).json(problem);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const createProblemById = async (req, res) => {
  const { language, code, userInput } = req.body;
  if (code === undefined) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }
  const filepath = await generateFile(language, code);
  try {

    let output;
      if(language === "c"){
        output = await executeC(filepath, userInput);
      }
      else if(language === "cpp"){
        output = await executeCpp(filepath, userInput);
      }
      else if(language === "py"){
        output = await executePy(filepath, userInput);
      }
    return res.json({ output });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message }); 
  }
};

const createNewProblemById = async (req, res) => {
  const { title, description,languages, difficulty, test_cases } = req.body;

  try {
    const problem = await Problem.create({  title, description,languages, difficulty, test_cases });
    res.status(200).json(problem);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

 const addTestCase = async (req, res) => {
  const { problemId, input, output } = req.body;

  if (!problemId) {
    return res
      .status(400)
      .json({ success: false, error: "No problem found to add test case" });
  }
  if (!input) {
    return res
      .status(400)
      .json({ success: false, error: "Input cannot be empty" });
  }
  if (!output) {
    return res
      .status(400)
      .json({ success: false, error: "Output cannot be empty" });
  }

  if (!mongoose.Types.ObjectId.isValid(problemId)) {
    return res.status(400).json({
      success: false,
      error: "Invalid Problem Id or Problem not found",
    });
  }

  const filter = {
    problemId: problemId,
    "test_cases.input": { $ne: input },
  };
  const options = { upsert: true };
  await solution.updateOne(
    filter,
    {
      $addToSet: { test_cases: { input: input, output: output } },
    },
    options
  )
    .then((doc) => {
      return res.status(200).json({
        status: doc,
        message: "Test Case inserted successfully",
      });
    })
    .catch((err) => {
      if (err && err.code === 11000) {
        return res.status(400).json({
          success: false,
          error: "Input already exists. Please enter unique Input",
        });
      } else {
        return res.status(500).json({ message: err.message });
      }
    });
};


const submitProblem = async (req, res) => {
  const { language, code, problemId } = req.body;
  console.log(language);
  if (code === undefined) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }
  const filepath = await generateFile(language, code);

  try {
    const problem = await solution.findOne({ problemId: problemId });
    if (!problem) {
      return res.status(404).json({ error: 'No such problem' });
    }
    const testCases = problem.test_cases;
    const totalTestCases = testCases.length;
    console.log(totalTestCases);
    let testCasesPassed = 0;

    for (const testCase of testCases) {
      const testCaseInput = testCase.input;
      let codeOutput ;
      if(language === "c"){
      codeOutput = await executeC(filepath, testCaseInput);
      }
      else if(language === "cpp"){
        codeOutput = await executeCpp(filepath, testCaseInput);
      }
      else if(language === "py"){
        codeOutput = await executePy(filepath, testCaseInput);
        codeOutput = codeOutput.replace(/\n$/, '');
        //console.log(codeOutput);
      }
      //console.log(testCase.output)
      codeOutput = codeOutput.replace(/\n$/, '');
      //codeOutput = codeOutput.replace(/[\r]/g, "");
      if (codeOutput.trim() === testCase.output) {
        testCasesPassed += 1;
      }
    }
    //testCasesPassed = 4;
   //console.log(testCasesPassed)
    if (testCasesPassed === totalTestCases) {
      return res.status(200).json({
        status: "200",
        message: 'Code execution successful',
      });
    } else {
      return res.status(400).json({
        status: "400",
        message: 'Code execution failed',
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message }); // Added error response
  }
};
module.exports = {
  getProblems,
  getSingleProblemById,
  createProblemById,
  createNewProblemById,
  addTestCase,
  submitProblem,
};