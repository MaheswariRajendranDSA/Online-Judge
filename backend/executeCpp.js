const { exec, execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filePath, inputTestCase) => {
  const jobId = path.basename(filePath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.out`);

  try {
    const output = execSync(
      `g++ ${filePath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out`,
      { input: inputTestCase }
    );
    return output.toString();
  } catch (err) {
    console.log(err);
    return "Code compilation (or) execution failed. Please check the code and try again";
  }
};

module.exports = {
  executeCpp,
};