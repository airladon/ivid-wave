const { tester } = require('./ividTester/tester');

tester({
  title: 'Wave',
  width: 600,
  height: 305,
  htmlFile: `http://localhost:8080/test/index.html`,
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
