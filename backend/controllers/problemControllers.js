const Problem = require("../models/ProblemModels");
const Solution = require("../models/submissionModel"); // Changed "solution" to "Solution" for consistency
const mongoose = require("mongoose");
const { generateFile } = require("../generateFile");
const { executeCpp } = require("../executeCpp");
const { executeC } = require("../executeC");
const { executePy } = require("../executePy");

// Get all problems
const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find({}).sort({ createdAt: -1 });
    res.status(200).json(problems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single problem by ID
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

// Create a new problem with code submission
const createProblemById = async (req, res) => {
  const { language, code, userInput } = req.body;

  if (code === undefined) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }

  const filepath = await generateFile(language, code);

  try {
    let output;

    if (language === "c") {
      output = await executeC(filepath, userInput);
    } else if (language === "cpp") {
      output = await executeCpp(filepath, userInput);
    } else if (language === "py") {
      output = await executePy(filepath, userInput);
    }

    return res.json({ output });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message });
  }
};

// Create a new problem without code submission (title, description, etc.)
const createNewProblemById = async (req, res) => {
  const { title, description, languages, difficulty, test_cases } = req.body;

  try {
    const problem = await Problem.create({
      title,
      description,
      languages,
      difficulty,
      test_cases,
    });
    res.status(200).json(problem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add a test case to a problem
const addTestCase = async (req, res) => {
  const { problemId, input, output } = req.body;

  if (!problemId) {
    return res
      .status(400)
      .json({ success: false, error: "No problem found to add a test case" });
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

  try {
    const doc = await Solution.updateOne(filter, {
      $addToSet: { test_cases: { input: input, output: output } },
    }, options);

    return res.status(200).json({
      status: doc,
      message: "Test Case inserted successfully",
    });
  } catch (err) {
    if (err && err.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Input already exists. Please enter a unique Input",
      });
    } else {
      return res.status(500).json({ message: err.message });
    }
  }
};

// Submit a solution for a problem
const submitProblem = async (req, res) => {
  const { language, code, problemId } = req.body;

  if (code === undefined) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }

  const filepath = await generateFile(language, code);

  try {
    const problem = await Solution.findOne({ problemId: problemId });

    if (!problem) {
      return res.status(404).json({ error: 'No such problem' });
    }

    const testCases = problem.test_cases;
    const totalTestCases = testCases.length;
    let testCasesPassed = 0;

    for (const testCase of testCases) {
      const testCaseInput = testCase.input;
      let codeOutput;

      if (language === "c") {
        codeOutput = await executeC(filepath, testCaseInput);
      } else if (language === "cpp") {
        codeOutput = await executeCpp(filepath, testCaseInput);
      } else if (language === "py") {
        codeOutput = await executePy(filepath, testCaseInput);
      }

      codeOutput = codeOutput.replace(/\n$/, '');

      if (codeOutput.trim() === testCase.output) {
        testCasesPassed += 1;
      }
    }

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
    return res.status(500).json({ error: e.message });
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