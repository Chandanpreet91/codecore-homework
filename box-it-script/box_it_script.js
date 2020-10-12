const names = process.argv.slice(2);
const TOP_LINE = 'top_line';
const MIDDLE_LINE = 'middle_line';
const BOTTOM_LINE = 'bottom_line';
let isFirstLineDraw = false;
function getLongestName(names) {
  let longestNameLength = 0;
  for (let name of names) {
    if (name.length > longestNameLength) longestNameLength = name.length;
  }
  return longestNameLength;
}
function insertPadding(spaces) {
  let resultpad = '';
  for (let i = 0; i < spaces; i++) {
    resultpad += ' ';
  }
  return resultpad;
}
function drawLine(lineType, length) {
  let hrLine = '';
  for (let i = 0; i < length + 2; i++) {
    hrLine = hrLine + '━';
  }
  if (lineType === TOP_LINE) {
    console.log(`┏${hrLine}┓`);
  } else if (lineType === MIDDLE_LINE) {
    console.log(`┣${hrLine}┫`);
  } else if (lineType === BOTTOM_LINE) {
    console.log(`┗${hrLine}┛`);
  } else {
    console.log('ERROR: Invalid Line Type: ', lineType);
  }
}
function drawName(name, maxLength) {
  const padding = insertPadding(maxLength - name.length + 1);
  const result = `┃ ${name}${padding}┃`;
  console.log(result);
}
function drawTable(names) {
  if (names.length === 0) return;
  let lineLength = getLongestName(names);
  // console.log(lineLength);
  for (let name of names) {
    const lineTypeToDraw = isFirstLineDraw ? MIDDLE_LINE : TOP_LINE;
    drawLine(lineTypeToDraw, lineLength);
    drawName(name, lineLength);
    isFirstLineDraw = true;
  }
  drawLine(BOTTOM_LINE, lineLength);
}
drawTable(names);