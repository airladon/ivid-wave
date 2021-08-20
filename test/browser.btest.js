const { tester } = require('./tester');

tester({
  title: 'Wave',
  width: 1200,
  height: 750,
  htmlFile: `http://localhost:8080/index.html`,
  fromTimes: [
    0,
    14,
    30,
    47,
    69,
    84,
    106,
    120,
  ],
});
