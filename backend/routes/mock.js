import fs from "fs";

function splitStringInto4Chars(str) {
  const result = [];
  const len = str.length;
  let i = 0;
  while (i < len) {
    result.push(str.substr(i, 4));
    i += 4;
  }
  return result;
}

function mock(req, res) {
  const yearsParam = req.params.years;
  const years = splitStringInto4Chars(yearsParam === "all" ? "20142015201620172018201920202021202220232024": yearsParam);
  const year = years[Math.floor(Math.random() * years.length)];

  fs.readFile(`./../texts/mock/june/${year}.json`, "utf8", (_, data) => {
    
    const arrayData = JSON.parse(data);
    const qNumber = Math.floor(Math.random() * arrayData.length);
    res.json({
      "type": "mock/june",
      "year": year.replace(".json", ""),
      "num": arrayData[qNumber].num,
      "content": arrayData[qNumber].content
    });

  });
}

export { mock };