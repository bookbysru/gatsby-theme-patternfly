const fs = require('fs');
// Make sure the data directory exists
exports.onPreBootstrap = ({ reporter }) => {
  const contentPath = 'src/data';
  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`);
    fs.mkdirSync(contentPath);
  }
};