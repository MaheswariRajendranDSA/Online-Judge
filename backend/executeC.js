const { exec, execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeC = (filePath, inputTestCase) => {
  const jobId = path.basename(filePath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.out`);

  return new Promise((resolve, reject) => {
    try {
      const output = execSync(
        `gcc ${filePath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out`,
        { input: inputTestCase }
      );
      resolve(output.toString());
    } catch (err) {
      console.log(err);
      reject(
        "Code compilation (or) execution failed. Please check the code and try again"
      );
    }
  });
};

module.exports = {
  executeC,
};