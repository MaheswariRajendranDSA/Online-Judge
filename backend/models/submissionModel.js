const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const testCasesSchema = new Schema({
  input: String,
  output: String,
});

const solutionSchema = new Schema({
  problemId: mongoose.Types.ObjectId,
  test_cases: [testCasesSchema],
});

module.exports = mongoose.model("Solution", solutionSchema, "solution");