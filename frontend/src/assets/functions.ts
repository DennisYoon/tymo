function moveElement(array: number[], fromIndex: number, toIndex: number): number[] {
  const element = array.splice(fromIndex, 1)[0];

  array.splice(toIndex, 0, element);

  return array;
}

function sum(array: number[]) {
  return array.reduce((p, c) => p + c, 0);
}

export { moveElement, sum };