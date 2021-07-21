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
const timePlot1 = figure.get('timePlot1');
const resetButton = figure.get('resetButton');
const pulseButton1 = figure.get('pulseButton1');
// const pulseButton2 = figure.get('pulseButton2');
// const sineButton = figure.get('sineButton');
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
const { pulse } = getDisturbances();


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

const setTimeSpeed = (timeSpeed, buttonLabel) => {
  time.setTimeSpeed(timeSpeed);
  // slowTimeButton.setLabel(buttonLabel);
};

// Update function for everytime we want to update the particles
function update() {
  if (maxTime > 0 && time.now() > maxTime) {
    maxTimeReached = true;
    pause();
    // resetButton.pulse({ scale: 1.1, duration: 10000, frequency: 1.5 });
  }
  const deltaTime = time.step();
  if (m1.isShown) { m1.custom.update(deltaTime); }
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
  if (time.getTimeSpeed() === 1) {
    setTimeSpeed(0.3, 'On');
  } else {
    setTimeSpeed(1, 'Off');
  }
});

// velocityButton.onClick = () => {
//   reset();
//   if (m1.custom.c === 0.2) {
//     m1.custom.setVelocity(0.4);
//     // velocityButton.setLabel('2v');
//   } else {
//     m1.custom.setVelocity(0.2);
//     // velocityButton.setLabel('1v');
//   }
// };
velocityButton.notifications.add('onClick', () => {
  reset();
  if (velocityButton.custom.state) {
    m1.custom.setVelocity(2);
  } else {
    m1.custom.setVelocity(1);
  }
});

pulseButton1.onClick = () => {
  pulse(m1, 0.5);
  // reset();
  // unpause();
  // startDisturbances([medium1, medium2], 8, true, 'pulse', 0.6);
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


time.setTimeSpeed(1);


nav.loadSlides([
  {
    enterState: () => {
      m1.setPosition([5, 6]);
      m1._balls.dim();
      m1._balls.undim(['ball0'])
    },
    showCommon: 'm1',
    hide: ['m1.xAxis', 'm1.yAxis'],
  },
  {
    enterState: () => {
      m1.setPosition([5, 6]);
      m1._balls.dim();
      m1._balls.undim(['ball0'])
    },
    showCommon: [
      'm1',
      'resetButton',
      'freezeTimeLabel', 'freezeTimeButton', 'slowTimeLabel', 'slowTimeButton',
      'velocity', 'velocityButton',
      'pulseButton1',
    ],
    hide: ['m1.xAxis', 'm1.yAxis'],
  },
  {
    enterState: () => {
      m1.setPosition([5, 6]);
      m1._balls.dim();
      m1._balls.undim(['ball0', 'ball20', 'ball40', 'ball60', 'ball80']);
      m1._balls._ball20.setScale(1.5);
      m1._balls._ball40.setScale(1.5);
      m1._balls._ball60.setScale(1.5);
      m1._balls._ball80.setScale(1.5);
    },
    hide: ['m1.xAxis', 'm1.yAxis'],
    transition: [
      { pulse: { 'm1.balls': ['ball20', 'ball40', 'ball60', 'ball80'] }, scale: 3 },
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


// figure.recorder.loadAudioTrack(new Audio('http://localhost:8081/src/audio-track.mp3'));
// figure.recorder.loadVideoTrack('http://localhost:8081/src/video-track.json');
