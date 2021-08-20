const { tester } = require('./test/ividTester/tester');

tester({
  title: 'Wave',
  width: 1200,
  height: 610,
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
