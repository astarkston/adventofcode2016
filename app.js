var fs = require('fs');

function getInput(filePath) {
  return fs.readFileSync(filePath + 'input.txt', 'utf8');
}

function loadUp(dayNumber, part) {
  var folder = './day' + dayNumber + '/';
  var input = getInput(folder);
  var dayFile = require(folder + dayNumber + part);
  console.log(dayFile(input));
}

loadUp('02', 'a');

process.exit();