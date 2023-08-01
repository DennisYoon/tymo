const fetch = require("node-fetch");

function r(from, to) {
  return Math.floor(Math.random() * (to - from + 1)) + from;
}

async function giveme(exams, years) {
  for (let str of ["june", "sept"]) {
    const index = exams.indexOf(str);
    if (index !== -1) {
        exams[index] = "mock/" + str;
    }
  }
  
  const exam = exams[r(0, exams.length - 1)];
  const year = years[r(0, years.length - 1)];

  const fileContent = await fetch(`https://dennisyun.github.io/tymo/texts/${exam}/${year}.json`);
  const jsonContent = await fileContent.json();
  const oneq = jsonContent[r(0, jsonContent.length - 1)];

  const num = oneq.num;
  const content = oneq.content;

  return { exam, year, num, content };
}

module.exports = giveme;