class Checkers {
  exams(list) {
    const noException = list.every(value => {
      if (["csat", "june", "sept"].some(ele => ele === value)) {
        return true;
      }
      return false;
    });

    return noException;
  }

  years(list) {
    const noException = list.every(value => {
      const intValue = parseInt(value);
      if (2014 <= intValue && intValue <= 2024) {
        return true;
      }
      return false;
    });

    return noException;
  }
}

module.exports = Checkers;