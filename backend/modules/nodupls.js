function nodupls(array) {
  let unique = [...new Set(array)];
  return unique;
}

module.exports = nodupls;