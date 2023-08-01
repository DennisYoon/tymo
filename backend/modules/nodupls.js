function nodupls(array) {
  let unique = [...new Set(array)];
  return unique;
}

export default nodupls;