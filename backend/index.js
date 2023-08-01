import Server from "./modules/builder.js";
import Checkers from "./modules/checkers.js";
import giveme from "./modules/provider.js";
import nodupls from "./modules/nodupls.js";

const server = new Server();
const checkers = new Checkers;

server.get("/:exams/:years", (req, res) => {
  const { exams, years } = req.params;

  const examsSplit = nodupls(exams.split("@"));
  const yearsSplit = nodupls(years.split("@"));

  const e = checkers.exams(examsSplit);
  const y = checkers.years(yearsSplit);

  if (e && y) {
    const {exam, year, num, content} = giveme(examsSplit, yearsSplit);
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

// export default server.app;
server.run(8080);