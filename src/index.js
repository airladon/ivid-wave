/* globals Fig */

const figure = new Fig.Figure({
  limits: [-3, -1.5, 6, 3],
  color: [0.3, 0.3, 0.3, 1],
  font: { size: 0.1 },
  backgroundColor: [0, 0, 0, 1],
});

// Global colors used in equations.js and slides.js
const colorText = [1, 1, 0.3, 1];
const color0 = [1, 0, 0, 1];
const color1 = [0, 0.5, 1, 1];
const color2 = [0.8, 0.8, 0.8, 1];
const color3 = [1, 0, 1, 1];
const color4 = [0.7, 0.7, 0.7, 1];


const { Transform, Point } = Fig;
const { range, rand, randSign } = Fig.tools.math;
const minVelocity = 0.05;
const time = new TimeKeeper();
let maxTime = 0;
let maxTimeReached = false;

figure.add([
  button('pulseButton1', [-2.7, -1.3], 'Pulse'),
  // button('pulseButton2', [2.1, 0.15], 'Pulse 2'),
  // button('sineButton', [1.3, 0.15], 'Sine'),
  button('resetButton', [2.7, -1.3], 'Reset'),
  button('freezeTimeButton', [2.15, -1.3], 'Off'),
  button('slowTimeButton', [1.35, -1.3], 'Off'),
  button('velocityButton', [2.4, 1], 'Fast'),
  // button('velocityButton2', [2, 1.04], 'Fast'),
  // button('freqButton1', [-0.7, 1.9], 'Fast'),
  // button('freqButton2', [-0.7, 1.04], 'Fast'),
]);
figure.add([
  label('freezeTimeLabel', [1.8, -1.3], color4, 'Freeze:'),
  label('slowTimeLabel', [0.9, -1.3], color4, ['Slow Motion:']),
  // label('disturbance', [0.45, 0.15], colorText, ['Disturbance:']),
  label('velocity', [2, 1], color4, 'Velocity:'),
  // label('frequency', [-0.7, 2.1], colorText, 'Sine Frequency'),
  // axisLabel('x0', [-2.1, 0.77], color0, [
  //   'x',
  //   { text: '0', font: { size: 0.1 }, offset: [0, -0.04] },
  // ]),
  // axisLabel('x1', [-0.38, 0.77], color1, [
  //   'x',
  //   { text: '1', font: { size: 0.1 }, offset: [0, -0.04] },
  // ]),
  // axisLabel('vFast', [2.1, 1.77], color1, [
  //   'fast',
  // ]),
  // axisLabel('vSlow', [2.1, 0.9], color1, [
  //   'slow',
  // ]),
]);

const resetButton = figure.getElement('resetButton');
const pulseButton1 = figure.getElement('pulseButton1');
// const pulseButton2 = figure.getElement('pulseButton2');
// const sineButton = figure.getElement('sineButton');
const freezeButton = figure.getElement('freezeTimeButton');
const slowTimeButton = figure.getElement('slowTimeButton');
const velocityButton = figure.getElement('velocityButton');
// const velocityButton2 = figure.getElement('velocityButton2');
// const freqButton1 = figure.getElement('freqButton1');
// const freqButton2 = figure.getElement('freqButton2');

const pause = () => {
  time.pause();
  freezeButton.setLabel('On');
};
const unpause = () => {
  freezeButton.setLabel('Off');
  time.unpause();
};

const m1 = addMedium('m1', 3.7, 2, 1, [-0.9, 0], 'y', 0.03, 0.04);
// m1.setPosition(0.1, 0);
const timePlot1 = addTimePlot(
  'timePlot1', 1.65, 10, m1.custom.recording, 1, [-2.7, 0],
);


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
  // medium1.custom.reset();
  // medium2.custom.reset();
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
  slowTimeButton.setLabel(buttonLabel);
};

resetButton.onClick = () => reset();
freezeButton.onClick = () => {
  if (time.isPaused()) unpause(); else pause();
};
slowTimeButton.onClick = () => {
  if (time.getTimeSpeed() === 1) {
    setTimeSpeed(0.3, 'On');
  } else {
    setTimeSpeed(1, 'Off');
  }
};


figure.setScenarios('default');

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

time.setTimeSpeed(1);


velocityButton.onClick = () => {
  reset();
  if (m1.custom.c === 0.2) {
    m1.custom.setVelocity(0.4);
    velocityButton.setLabel('2v');
  } else {
    m1.custom.setVelocity(0.2);
    velocityButton.setLabel('1v');
  }
};

/*
.########..####..######..########.##.....##.########..########.
.##.....##..##..##....##....##....##.....##.##.....##.##.....##
.##.....##..##..##..........##....##.....##.##.....##.##.....##
.##.....##..##...######.....##....##.....##.########..########.
.##.....##..##........##....##....##.....##.##...##...##.....##
.##.....##..##..##....##....##....##.....##.##....##..##.....##
.########..####..######.....##.....#######..##.....##.########.
*/
// Pulse disturbance - disturb the first particle with a pulse
// Instead of using the normal animation time step (which is real time)
// a custom animation step is used where time is taken from the TimeKeeper.
// This means if the TimeKeeper pauses, or is sped up or slowed down, then the
// animation will be too.
const pulse = (med, amplitude = randSign() * rand(0.3, 0.6)) => {
  unpause();
  const startTime = time.now();
  const { movePad, A } = med.custom;
  movePad.animations.new('_noStop_disturb_')
    .custom({
      callback: () => {
        if (!time.isPaused()) {
          const t = time.now() - startTime;
          movePad.setPosition(0, A * amplitude * Math.exp(-(((t / 2 - 0.6) * 4 - t / 2) ** 2)));
        }
      },
      duration: 10000,
    })
    .start();
};

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


nav.loadSlides([
  {
    enterState: () => {
      m1.setPosition([-1.85, 0]);
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
      m1.setPosition([-1.85, 0]);
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
    transition: [
      { scenario: 'm1', target: 'default', duration: 4 },
      { in: ['m1.xAxis', 'm1.yAxis'] },
      [
        { trigger: 'softReset' },
        { in: 'timePlot1' },
      ],
    ],
  },
]);


// figure.recorder.loadAudioTrack(new Audio('http://localhost:8081/src/audio-track.mp3'));
// figure.recorder.loadVideoTrack('http://localhost:8081/src/video-track.json');
