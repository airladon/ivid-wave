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
const colorRed = [1, 0, 0, 1];
const colorRedText = [1, 0.2, 0.2, 1];
const colorBlue = [0, 0.5, 0.8, 1];
const colorBlueText = [0.2, 0.7, 1, 1];
const colorGreen = [0, 1, 0, 1];
const colorGreenText = [0.3, 1, 0.3, 1];
const colorYellow = [1, 1, 0, 1];
const colorYellowText = [1, 1, 0.3, 1];
const colorPurple = [1, 0, 1, 1];
const colorPurpleText = [1, 0.3, 1, 1];
const colorCyan = [0, 1, 1, 1];
const colorCyanText = [0.3, 1, 1, 1];
const colorText = [1, 1, 0.3, 1];
const color0 = [1, 0, 0, 1];
const colorZero = [1, 0.3, 0.3, 1];
const color1 = [0, 0.5, 0.8, 1];
const colorOne = [0, 0.8, 1, 1];
const colorLight = [0.8, 0.8, 0.8, 1];
const colorMid = [0.6, 0.6, 0.6, 1];
const colorDark = [0.3, 0.3, 0.3, 1];
const color3 = [1, 0, 1, 1];
const color4 = [0.7, 0.7, 0.7, 1];
const colorOn = [0, 0.8, 0, 1];
const colorOff = [0.4, 0.4, 0.4, 1];
const colorBackground = [0, 0, 0, 1];
const colorDisturbanceText = colorRedText;
const colorPositionText = colorBlueText;
const colorTimeText = colorYellowText;
const colorDisturb = colorRed;
const colorPosition = colorBlue;
const colorTime = colorYellow;
const colorF = colorPurple;
const colorFText = colorPurpleText;
const colorG = colorGreen;
const colorGText = colorGreenText;
const colorVelocity = colorCyan;
const colorVelocityText = colorCyanText;


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
const ocean = figure.get('ocean');
const examples = figure.get('examples');
const intro = figure.get('intro');
const timePlot1 = figure.get('timePlot1');
const eqnSine = figure.get('eqnSine');
const eqnSineT = figure.get('eqnSineT');
const sineTExplanation = figure.get('sineTExplanation');
const eqnSineX0 = figure.get('eqnSineX0');
const eqnVLF = figure.get('eqnVLF');
const eqnDiff = figure.get('eqnDiff');
const title = figure.get('title');
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
figure.fnMap.global.add('pause', () => pause());
figure.fnMap.global.add('unpause', () => unpause());


const stop = () => {
  m1.custom.stop();
  // medium2.custom.stop();
  figure.stop();
};
const reset = () => {
  stop();
  // setInAnimation(false);
  maxTimeReached = false;
  m1.custom.trackingTime = 0;
  m1.custom.reset();
  p1.custom.reset();
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
  if (ocean.isShown) { ocean.custom.update(deltaTime); }
  if (title.isShown) { title.custom.update(deltaTime); }
  if (intro.isShown) { intro.custom.update(deltaTime); }
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
  if (m1.isShown) {
    pulse(m1, 1);
  }
  if (p1.isShown) {
    pulse(p1, 1);
  }
};

sineButton.onClick = () => {
  reset();
  if (m1.isShown) {
    m1.custom.f = 0.2;
    sineWave(m1, 0);
  }
  if (p1.isShown) {
    p1.custom.f = 0.4;
    sineWave(p1, 0);
  }
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
figure.fnMap.global.add('startSineWave', () => {
  reset();
  m1.custom.f = 0.3;
  m1.custom.setVelocity(1.5);
  sineWave(m1, 0);
});

figure.fnMap.global.add('showVLF', () => {
  eqnVLF.showForm('vlf');
  eqnVLF.animations.new().dissolveIn(0.5).start();
});
figure.fnMap.global.add('hideVLF', () => {
  eqnVLF.animations.new().dissolveOut(0.5).start();
});


figure.fnMap.global.add('showSine', () => {
  eqnSine.showForm('yxewK');
  eqnSine.animations.new().dissolveIn(0.5).start();
});
figure.fnMap.global.add('hideSine', () => {
  eqnSine.animations.new().dissolveOut(0.5).start();
});
figure.fnMap.global.add('showWaveEqn', () => {
  eqnDiff.showForm('d1');
  eqnDiff.animations.new().dissolveIn(0.5).start();
});

figure.addCursor();

const nav = figure.addSlideNavigator({
  nextButton: null, prevButton: null, text: null, equation: [eqnSineT],
});
// figure.addFrameRate(10, { font: { color: [1, 0, 0, 1 ]} });
time.setTimeSpeed(1);
nav.loadSlides([
  // {
  //   scenarioCommon: 'default',
  //   form: 'yx0t_4',
  //   steadyState: () => {
  //     // figure.get('sineTExplanation').show();
  //     figure.get('sineTExplanation').showForm('yx0_2');
  //   }
  // },
  {
    scenarioCommon: 'default',
    form: 'yx1t_7',
    steadyState: () => {
      // figure.get('sineTExplanation').show();
      figure.get('sineTExplanation').showForm('summary_1');
    }
  },
  { form: 'yx0t_0' },
  { form: 'yx0t_1' },
  { form: 'yx0t_2' },
  { form: 'yx0t_3' },
  { form: 'yx0t_4' },
  { form: 'yx1t_0' },
  { form: 'yx1t_1' },
  { form: 'yx1t_2', steadyState: () => eqnSineT.dim(eqnSineT.getPhraseElements(['yx0tequalsF'])) },
  { form: 'yx1t_3' },
  { form: 'yx1t_4' },
  { form: 'yx1t_5' },
  { form: 'yx1t_6' },
  { form: 'yx1t_7' },
  {
    show: ['diffExplanation2'],
    steadyState: () => {
      eqnDiff.showForm('d1');
    },
  },
  {
    scenarioCommon: 'default',
    show: ['title'],
    exec: [
      ['0:30', 'showExamples'],
      ['0:50', 'outTitle'],
      ['0:50', 'outExamples'],
    ],
    // exec: [
    //   ['0:05', 'pause'],
    //   ['0:05', 'showEnvelope'],
    //   ['0:07', 'unpause'],
    // ],
  },
  
  {
    scenario: 'summary',
    show: ['m1'],
    hide: ['m1.ballTracker', 'm1.envelope', 'm1.grid', 'm1.velocity'],
    // time: '0:50.5',
    // steadyState: () => {
    //   eqnVLF.showForm('vlf');
    // },
    time: '0:50.5',
    transition: [
      { in: ['m1.grid', 'm1.balls', 'm1.grid', 'm1.yAxis', 'm1.xAxis']}
    ],
    execDelta: [
      [1, 'startSineWave'],
      [7, 'pause'],
      [7, 'showVelocity'],
      [8, 'showWavelength'],
      [9, 'showVLF'],
      [10, 'hideWavelength'],
      [10, 'hideVelocity'],
      [10, 'hideVLF'],
      [11, 'unpause'],
      [14, 'showSine'],
      [15, 'hideSine'],
      [16, 'showWaveEqn'],
    ],
  },
  // { form: 'yx1eyx0' },
  // { form: 'yx1eyx0es' },
  // { form: 'yx1estmt1' },
  // { form: 'yx1estmt1expandUnder' },
  // { form: 'yx1estmt1expand' },
  // { form: 'yx1estmt1up' },
  // { form: 'yx1estmt1xv' },
  // { form: 'yx1estmt1fOnV' },
  // { form: 'yx1estmt1fOnVLUp' },
  // { form: 'yx1estmt1fOnVL' },
  // { form: 'yx1estmt1fL1' },
  // { form: 'yx1estmt1fLS1' },
  // { form: 'yx1estmt1fL' },
  // { form: 'yx1estmt1fLToX' },
  // { form: 'yxestmt1fL' },
  // { form: 'yxestmt1fLConstT' },
  // { form: 'yxestmt1fLConstX' },
  // { form: 'yxestmt1fL' },
  // { form: 'yxeswUpL' },
  // { form: 'yxewL' },
  // { form: 'yxewLUpK' },
  // { form: 'yxewK' },
  {
    showCommon: ['m1'],
    hide: ['m1.xAxis', 'm1.yAxis', 'm1.ballTracker', 'm1.envelope', 'm1.velocity'],
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
    transition: [
      { out: ['m1.balls', 'm1.grid', 'm1.movePad', 'm1.firstBall',] },
      { in: 'p1' },
      { in: ['pulseButton', 'sineButton'] },
    ],
  },
  {
    hide: ['m1'],
    transition: [
      { out: ['pulseButton', 'sineButton', 'p1'] },
      { in: ['ocean'] },
    ],
  },
  {
    transition: [
      { out: 'ocean' },
      { in: ['m1.balls', 'm1.grid', 'm1.movePad', 'm1.firstBall'] },
    ],
  },
  {
    transition: [
      { in: ['slowTimeLabel', 'slowTimeButton'] },
      { in: ['freezeTimeButton', 'freezeTimeLabel'] },
      { in: 'resetButton' },
    ],
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
    show: ['velocityButton', 'velocity', 'pulseButton'],
    transition: { in: ['sineButton', 'sine2fButton'] },
  },
  // {
  //   enterState: () => {
  //     m1.setPosition([5, 6]);
  //     m1._balls.dim();
  //     m1._balls.undim(['ball0'])
  //     m1._balls.setScenarios('default');
  //     m1._balls.get(m1.custom.highlights).map(e => e.setScenario('highlight'));
  //   },
  //   showCommon: [
  //     'm1',
  //     'resetButton',
  //     'freezeTimeLabel', 'freezeTimeButton', 'slowTimeLabel', 'slowTimeButton',
  //     'velocity', 'velocityButton',
  //     'pulseButton', 'sineButton', 'sine2fButton',
  //   ],
  //   // hide: ['m1.xAxis', 'm1.yAxis', 'm1.grid', 'm1.minorGrid'],
  // },
  // {
  //   enterState: () => {
  //     m1.setPosition([5, 6]);
  //     // m1._balls.setScenarios('highlight');
  //     m1._balls.setScenarios('default');
  //     m1._balls.get(m1.custom.highlights).map(e => e.setScenario('highlight'));
  //   },
  //   hide: ['m1.xAxis', 'm1.yAxis'],
  //   transition: [
  //     { pulse: { 'm1.balls': m1.custom.highlights }, scale: 3 },
  //   ],
  // },
  // {
  //   scenario: 'default',
  //   transition: [
  //     { scenario: 'm1', target: 'default', duration: 0.1 },
  //     { in: ['m1.xAxis', 'm1.yAxis'] },
  //     [
  //       // { trigger: 'softReset' },
  //       { in: 'timePlot1' },
  //     ],
  //   ],
  // },
]);


figure.recorder.loadAudioTrack(new Audio('http://localhost:8080/src/audio-track.mp3'));
// // figure.recorder.loadVideoTrack('http://localhost:8081/src/video-track.json');
