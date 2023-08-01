import Server from "./modules/builder.js";
import Checkers from "./modules/checkers.js";

const server = new Server();
const checkers = new Checkers;

server.get("/:exams/:years", ctx => {
  const { exams, years } = ctx.params;

  const examsSplit = exams.split("@");
  const yearsSplit = years.split("@");

  let body;
  if (checkers.exams(examsSplit) && checkers.years(yearsSplit)) {
    body = {
      exam   : "None",
      year   : "None",
      num    : "None",
      content: "None"
    };
  } else {
    body = {
      exam   : "None",
      year   : "None",
      num    : "None",
      content: "None"
    };
  }

  ctx.body = body;
})

server.run(8080);