const { execSync } = require("child_process");

const executePy = (filepath, userInput) => {

 const child = execSync (
      `python ${filepath}`,
      { input:userInput },
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
      }
 );
return child.toString();
 };
module.exports = {
  executePy,
};
