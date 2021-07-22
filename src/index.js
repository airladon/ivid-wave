/* globals Fig */

const figure = new Fig.Figure({
  limits: [0, 0, 24, 12],
  color: [0.3, 0.3, 0.3, 1],
  font: { size: 0.1 },
  backgroundColor: [0, 0, 0, 1],
});

/*
..######...##........#######..########.....###....##........######.
.##....##..##.......##.....##.##.....##...##.##...##.......##....##
.##........##.......##.....##.##.....##..##...##..##.......##......
.##...####.##.......##.....##.########..##.....##.##........######.
.##....##..##.......##.....##.##.....##.#########.##.............##
.##....##..##.......##.....##.##.....##.##.....##.##.......##....##
..######...########..#######..########..##.....##.########..######.
*/
// Global colors used in equations.js and slides.js
const colorText = [1, 1, 0.3, 1];
const color0 = [1, 0, 0, 1];
const color1 = [0, 0.5, 1, 1];
const colorLight = [0.8, 0.8, 0.8, 1];
const colorDark = [0.3, 0.3, 0.3, 1];
const color3 = [1, 0, 1, 1];
const color4 = [0.7, 0.7, 0.7, 1];
const colorOn = [0, 0.8, 0, 1];
const colorOff = [0.4, 0.4, 0.4, 1];
const colorBackground = [0, 0, 0, 1];


const { Transform, Point } = Fig;
const { range, rand, randSign } = Fig.tools.math;
const minVelocity = 0.05;
const time = new TimeKeeper();
let maxTime = 0;
let maxTimeReached = false;


/*
.########.##.......########.##.....##.########.##....##.########..######.
.##.......##.......##.......###...###.##.......###...##....##....##....##
.##.......##.......##.......####.####.##.......####..##....##....##......
.######...##.......######...##.###.##.######...##.##.##....##.....######.
.##.......##.......##.......##.....##.##.......##..####....##..........##
.##.......##.......##.......##.....##.##.......##...###....##....##....##
.########.########.########.##.....##.########.##....##....##.....######.
*/
addFigureElements();

const m1 = figure.get('m1');
const p1 = figure.get('p1');
const timePlot1 = figure.get('timePlot1');
const resetButton = figure.get('resetButton');
const pulseButton = figure.get('pulseButton');
// const pulseButton2 = figure.get('pulseButton2');
const sineButton = figure.get('sineButton');
const sine2fButton = figure.get('sine2fButton');
const freezeButton = figure.get('freezeTimeButton');
const slowTimeButton = figure.get('slowTimeButton');
const velocityButton = figure.get('velocityButton');
// const velocityButton2 = figure.get('velocityButton2');
// const freqButton1 = figure.get('freqButton1');
// const freqButton2 = figure.get('freqButton2');

/*
.########..####..######..########.##.....##.########..########.
.##.....##..##..##....##....##....##.....##.##.....##.##.....##
.##.....##..##..##..........##....##.....##.##.....##.##.....##
.##.....##..##...######.....##....##.....##.########..########.
.##.....##..##........##....##....##.....##.##...##...##.....##
.##.....##..##..##....##....##....##.....##.##....##..##.....##
.########..####..######.....##.....#######..##.....##.########.
*/
const { pulse, sineWave } = getDisturbances();


/*
.##........#######...######...####..######.
.##.......##.....##.##....##...##..##....##
.##.......##.....##.##.........##..##......
.##.......##.....##.##...####..##..##......
.##.......##.....##.##....##...##..##......
.##.......##.....##.##....##...##..##....##
.########..#######...######...####..######.
*/
const pause = () => {
  time.pause();
  // freezeButton.setLabel('On');
  freezeButton.custom.on();
};
const unpause = () => {
  // freezeButton.setLabel('Off');
  freezeButton.custom.off();
  time.unpause();
};


const stop = () => {
  m1.custom.stop();
  // medium2.custom.stop();
  figure.stop();
};
const reset = () => {
  stop();
  // setInAnimation(false);
  maxTimeReached = false;
  m1.custom.reset();
  time.reset();
  pause();
};
figure.fnMap.global.add('reset', () => reset());
figure.fnMap.global.add('softReset', () => {
  m1.custom.reset();
  time.reset();
  pause();
});

// const setTimeSpeed = (timeSpeed, buttonLabel) => {
//   time.setTimeSpeed(timeSpeed);
//   // slowTimeButton.setLabel(buttonLabel);
// };

// Update function for everytime we want to update the particles
function update() {
  if (maxTime > 0 && time.now() > maxTime) {
    maxTimeReached = true;
    pause();
    // resetButton.pulse({ scale: 1.1, duration: 10000, frequency: 1.5 });
  }
  const deltaTime = time.step();
  if (m1.isShown) { m1.custom.update(deltaTime); }
  if (p1.isShown) { p1.custom.update(deltaTime); }
  // if (medium1.isShown) { medium1.custom.update(deltaTime); }
  // if (medium2.isShown) { medium2.custom.update(deltaTime); }
  if (timePlot1.isShown) { timePlot1.custom.update(); }
  // if (timePlot2.isShown) { timePlot2.custom.update(); }
}

// Before each draw, update the points
figure.notifications.add('beforeDraw', () => {
  update();
});

// After each draw, call a next animation frame so udpates happen on each frame
figure.notifications.add('afterDraw', () => {
  figure.animateNextFrame();
});

/*
.########..##.....##.########.########..#######..##....##..######.
.##.....##.##.....##....##.......##....##.....##.###...##.##....##
.##.....##.##.....##....##.......##....##.....##.####..##.##......
.########..##.....##....##.......##....##.....##.##.##.##..######.
.##.....##.##.....##....##.......##....##.....##.##..####.......##
.##.....##.##.....##....##.......##....##.....##.##...###.##....##
.########...#######.....##.......##.....#######..##....##..######.
*/
resetButton.onClick = () => reset();
freezeButton.notifications.add('onClick', () => {
  if (time.isPaused()) unpause(); else pause();
})
// freezeButton.onClick = () => {
//   if (time.isPaused()) unpause(); else pause();
// };

slowTimeButton.notifications.add('onClick', () => {
  if (slowTimeButton.custom.state) {
    time.setTimeSpeed(0.3);
  } else {
    time.setTimeSpeed(1);
  }
});

velocityButton.notifications.add('onClick', () => {
  reset();
  if (velocityButton.custom.state) {
    m1.custom.setVelocity(2);
  } else {
    m1.custom.setVelocity(1);
  }
});

pulseButton.onClick = () => {
  pulse(m1, 1);
};

sineButton.onClick = () => {
  reset();
  m1.custom.f = 0.2;
  sineWave(m1, 0);
};
sine2fButton.onClick = () => {
  reset();
  m1.custom.f = 0.4;
  sineWave(m1, 0);
};

/*
..######..##.......####.########..########..######.
.##....##.##........##..##.....##.##.......##....##
.##.......##........##..##.....##.##.......##......
..######..##........##..##.....##.######....######.
.......##.##........##..##.....##.##.............##
.##....##.##........##..##.....##.##.......##....##
..######..########.####.########..########..######.
*/

figure.addCursor();

const nav = figure.addSlideNavigator({
  nextButton: null, prevButton: null, text: null,
});
figure.addFrameRate(10, { font: { color: [1, 0, 0, 1 ]} });
time.setTimeSpeed(1);
nav.loadSlides([
  {
    scenarioCommon: 'default',
    show: ['p1', '_frameRate_'],
    // showCommon: 'm1',
    // hideCommon: ['m1.xAxis', 'm1.yAxis'],
  },
  {
    enterStateCommon: () => {
      m1._balls.get(m1.custom.highlights).map(e => e.setScenario('highlight'));
    },
    transition: [
      { pulse: { 'm1.balls': m1.custom.highlights }, scale: 3 },
    ],
  },
  {
    transition: { in: 'resetButton' },
  },
  {
    show: ['resetButton'],
    transition: { in: ['freezeTimeButton', 'freezeTimeLabel'] },
  },
  {
    show: ['resetButton', 'freezeTimeButton', 'freezeTimeLabel'],
    transition: { in: ['slowTimeLabel', 'slowTimeButton'] },
  },
  {    
    showCommon: [
      'm1', 'resetButton', 'freezeTimeLabel', 'freezeTimeButton',
      'slowTimeLabel', 'slowTimeButton', 'timePlot1',
    ],
    hideCommon: [],
    transition: [
      { scenario: 'm1', target: 'right', duration: 2 },
      [
        { in: ['m1.xAxis', 'm1.yAxis'] },
        { in: 'timePlot1' },
      ],
    ],
  },
  {
    scenarioCommon: 'right',
    transition: { in: ['velocityButton', 'velocity'] },
  },
  {
    show: ['velocityButton', 'velocity'],
    transition: { in: ['pulseButton'] },
  },
  {
    enterState: () => {
      m1.setPosition([5, 6]);
      m1._balls.dim();
      m1._balls.undim(['ball0'])
      m1._balls.setScenarios('default');
      m1._balls.get(m1.custom.highlights).map(e => e.setScenario('highlight'));
    },
    showCommon: [
      'm1',
      'resetButton',
      'freezeTimeLabel', 'freezeTimeButton', 'slowTimeLabel', 'slowTimeButton',
      'velocity', 'velocityButton',
      'pulseButton', 'sineButton', 'sine2fButton',
    ],
    // hide: ['m1.xAxis', 'm1.yAxis', 'm1.grid', 'm1.minorGrid'],
  },
  {
    enterState: () => {
      m1.setPosition([5, 6]);
      // m1._balls.setScenarios('highlight');
      m1._balls.setScenarios('default');
      m1._balls.get(m1.custom.highlights).map(e => e.setScenario('highlight'));
    },
    hide: ['m1.xAxis', 'm1.yAxis'],
    transition: [
      { pulse: { 'm1.balls': m1.custom.highlights }, scale: 3 },
    ],
  },
  {
    scenario: 'default',
    transition: [
      { scenario: 'm1', target: 'default', duration: 0.1 },
      { in: ['m1.xAxis', 'm1.yAxis'] },
      [
        // { trigger: 'softReset' },
        { in: 'timePlot1' },
      ],
    ],
  },
]);


// // figure.recorder.loadAudioTrack(new Audio('http://localhost:8081/src/audio-track.mp3'));
// // figure.recorder.loadVideoTrack('http://localhost:8081/src/video-track.json');
