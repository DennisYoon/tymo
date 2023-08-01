function r(from, to) {
  return Math.floor(Math.random() * (to - from + 1)) + from;
}

for (let i = 0; i < 10; i++) {
  console.log(r(0, 4));
}