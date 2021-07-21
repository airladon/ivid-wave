const { tester } = require('./ividTester/tester');

tester({
  title: 'ivid',
  width: 500,
  height: 400,
  htmlFile: `http://localhost:8080/${__dirname}/test.html`,
  fromTimes: [0, 5, 10],
});
