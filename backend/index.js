const Server = require("./modules/builder.js");
const Checkers = require("./modules/checkers.js");
const giveme = require("./modules/provider.js").giveme;
const nodupls = require("./modules/nodupls.js");

const server = new Server();
const checkers = new Checkers;

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.get("/:exams/:years", async (req, res) => {
  const { exams, years } = req.params;

  const examsSplit = nodupls(exams.split("@"));
  const yearsSplit = nodupls(years.split("@"));

  const e = checkers.exams(examsSplit);
  const y = checkers.years(yearsSplit);
  
  if (e && y) {
    const {exam, year, num, content} = await giveme(examsSplit, yearsSplit);
    console.log(`${year}년 ${exam}시험 ${num}번 문제 요청 들어옴..`);
    res.json({exam, year, num, content});
  } else {  
    res.json({
      exam: "",
      year: "",
      num: "",
      content: ""
    });
  }
})

server.run(8080);
module.exports = server.app;