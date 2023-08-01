class Checkers {
  #dupls(array) {
    const findDupls = array.filter((item, index) => {
      return array.indexOf((item) !== index)
    });

    if (findDupls.length === 0) {
      return false;
    }
    return true;
  }

  exams(list) {
    const noException = list.every(value => {
      if (value in ["csat", "june", "sept"]) {
        return true;
      }
      return false;
    });

    return noException && !this.#dupls(list);
  }

  years(list) {
    const noException = list.every(value => {
      const intValue = parseInt(value);
      if (2014 <= intValue && intValue <= 2024) {
        return true;
      }
      return false;
    });

    return noException && !this.#dupls(list);
  }
}

export default Checkers;