import fs from "fs";

function r(from, to) {
  return Math.floor(Math.random() * (to - from + 1)) + from;
}

function giveme(exams, years) {
  for (let str of ["june", "sept"]) {
    const index = exams.indexOf(str);
    if (index !== -1) {
        exams[index] = "mock/" + str;
    }
  }
  
  const exam = exams[r(0, exams.length - 1)];
  const year = years[r(0, years.length - 1)];

  const fileContent = fs.readFileSync(`../texts/${exam}/${year}.json`).toString();
  const jsonContent = JSON.parse(fileContent);
  const oneq = jsonContent[r(0, jsonContent.length - 1)];

  const num = oneq.num;
  const content = oneq.content;

  return { exam, year, num, content };
}

export default giveme;