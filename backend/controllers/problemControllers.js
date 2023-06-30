const Problem = require("../models/ProblemModels");
const mongoose = require("mongoose");
const { generateFile } = require("../generateFile");
const { executeCpp } = require("../executeCpp");

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
  const { language = "cpp", code , userInput} = req.body;
  if (code === undefined) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }
  const filepath = await generateFile(language, code);
  try {
    const output = await executeCpp(filepath, userInput);
    return res.json({ output });
  } catch (e) {
    console.log(e);
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
module.exports = {
  getProblems,
  getSingleProblemById,
  createProblemById,
  createNewProblemById,
};
