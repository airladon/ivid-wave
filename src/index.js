/* globals Fig */

const figure = new Fig.Figure({
  limits: [0, 0, 24, 12],
  color: [0.3, 0.3, 0.3, 1],
  font: { size: 0.1, family: 'Open Sans', style: 'normal' },
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
const colorDisturbance = colorGreen;
const colorDisturbanceText = colorGreenText;
const colorPositionText = colorBlueText;
const colorTimeText = colorYellowText;
const colorPosition = colorBlue;
const colorTime = colorYellow;
const colorDelay = colorPurpleText;
const colorOmega = colorCyan;
const colorK = colorCyan;
const colorF = colorRed;
const colorFText = colorRedText;
const colorX = colorPurple;
const colorXText = colorPurpleText;
const colorG = colorPurple;
const colorGText = colorPurpleText;
const colorVelocity = colorCyan;
const colorVelocityText = colorCyanText;
const colorWave = colorPurpleText;


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
const defs = figure.get('defs');
const eqnSineT = figure.get('eqnSineT');
const sineTExplanation = figure.get('sineTExplanation');
// const eqnSineX0 = figure.get('eqnSineX0');
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
  figure.elements.customState.pause = true;
  // freezeButton.setLabel('On');
  freezeButton.custom.on();
  if (m1._envelope2.isShown) {
    figure.fnMap.global.exec('copyEnvelope');
    m1._envelope2.setOpacity(1);
  }
};
const unpause = () => {
  // freezeButton.setLabel('Off');
  figure.elements.customState.pause = false;
  freezeButton.custom.off();
  time.unpause();
  if (m1._envelope2.isShown) {
    m1._envelope2.setOpacity(0);
  }
};
figure.fnMap.global.add('pause', () => pause());
figure.fnMap.global.add('unpause', () => unpause());

figure.elements.backupStateSet = figure.elements.stateSet;
figure.elements.stateSet = () => {
  figure.elements.backupStateSet();
  if (figure.elements.customState.pause) {
    pause();
  } else {
    unpause();
  }
}

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
  if (m1._envelope2.isShown) {
    m1._envelope2.setOpacity(0);
  }
};
figure.fnMap.global.add('reset', () => reset());
figure.fnMap.global.add('softReset', () => {
  m1.custom.trackingTime = 0;
  m1.custom.reset();
  p1.custom.reset();
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

figure.fnMap.global.add('update', () => update());

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
});
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

figure.addCursor({ width: 0.1, color: [0.5, 1, 1, 1], radius: 0.4 });

const nav = figure.addSlideNavigator({
  nextButton: null, prevButton: null, text: null, equation: [eqnSineT, eqnVLF, defs]// equation: {
  //   eqnSineT, sineTExplanation,
  // },
});

// const eqnTransition = (eqns, dim = []) => {
//   // const eqns = Object.keys(eqnOptions);
//   // const forms = Object.values(eqnOptions);
//   return {
//     enterState: () => {
//       eqns.forEach(( e => {
//         [eqn, fromForm] = e;
//         eqn.showForm(fromForm);
//       }));
//     },
//     transition: (done) => {
//       eqns.forEach(((e, i) => {
//         [eqn, , toForm] = e;
//         eqn.animations.new()
//           .delay(i)
//           .goToForm({ target: toForm, animate: 'move', duration: 1.5})
//           .whenFinished(i == eqns.length - 1 ? done : null)
//           .start();
//       }));
//     },
//     steadyState: () => {
//       eqns.forEach(((e) => {
//         [eqn, , toForm] = e;
//         eqn.showForm(toForm);
//         eqn.undim();
//       if (dim.length > 0) {
//         dim.forEach(((e) => {
//           if (e.name.startsWith('tBox')) {
//             return;
//           }
//           e.dim();
//         }));
//       }
//     }
//   }
// }

const twoEqn = (eqn1, eqn2, form1, form2, dim = []) => ({
  enterState: () => {
    eqn1.showForm(form1);
    eqn2.showForm(form1);
    dim.forEach(e => e.dim());
  },
  transition: [
    { goToForm: eqn1, target: form2 },
    { goToForm: eqn2, target: form2 },
  ],
  steadyState: () => {
    eqn1.showForm(form2);
    eqn2.showForm(form2);
  },
  leaveState: () => {
    eqn1.undim();
    eqn2.undim();
  },
});

figure.shortcuts = {
  1: 'grow3',
};
// figure.addFrameRate(10, { font: { color: [1, 0, 0, 1 ]} });
time.setTimeSpeed(1);
nav.loadSlides([
  // {
  //   scenario: 'default',
  //   show: 'eqnTimeWave',
  // },
  {
    scenario: 'default',
    show: 'eqnSinT',
  },
  /*
  .########.####.########.##.......########
  ....##.....##.....##....##.......##......
  ....##.....##.....##....##.......##......
  ....##.....##.....##....##.......######..
  ....##.....##.....##....##.......##......
  ....##.....##.....##....##.......##......
  ....##....####....##....########.########
  */
  {
    scenarioCommon: 'default',
    show: ['title'],
  },
  {
    // time: '0:40.5',
    show: ['title', 'examples'],
    transition: [
      { trigger: 'showExamples' },
    ],
  },
  
  /*
  ..######..##.....##.##.....##.##.....##....###....########..##....##
  .##....##.##.....##.###...###.###...###...##.##...##.....##..##..##.
  .##.......##.....##.####.####.####.####..##...##..##.....##...####..
  ..######..##.....##.##.###.##.##.###.##.##.....##.########.....##...
  .......##.##.....##.##.....##.##.....##.#########.##...##......##...
  .##....##.##.....##.##.....##.##.....##.##.....##.##....##.....##...
  ..######...#######..##.....##.##.....##.##.....##.##.....##....##...
  */
  {
    scenario: 'summary',
    // time: '1:00',
    enterState: () => {
      // p1._particles.drawingObject.uniforms.u_highlight.value = [0];
      eqnSineT.showForm('summaryPage')
      eqnSineT.dim();
      eqnVLF.dim();
      eqnVLF.showForm('vlf');
      eqnDiff.showForm('d1Mono');
      // eqnDiff.dim();
    },
    transition: [
      { in: ['m1.balls', 'm1.firstBall', 'm1.movePad'] },
      { trigger: () => sineWave(m1, 0) },
      { in: ['p1.particles', 'p1.diaphram', 'p1.movePad'], delay: 3 },
      { trigger: () => sineWave(p1, 0) },
      { in: eqnVLF, delay: 3 },
      { in: eqnSineT, delay: 0 },
      { in: eqnDiff, delay: 0 },
    ],
    leaveState: () => {
      // p1._particles.drawingObject.uniforms.u_highlight.value = [1];
      eqnSineT.undim();
      eqnVLF.undim();
      // eqnDiff.undim();
    },
  },

  /*
  .########..########.########
  .##.....##.##.......##......
  .##.....##.##.......##......
  .##.....##.######...######..
  .##.....##.##.......##......
  .##.....##.##.......##......
  .########..########.##......
  */
  {
    enterState: () => {
      // p1._particles.drawingObject.uniforms.u_highlight.value = [0];
      eqnSineT.showForm('summaryPage')
      eqnSineT.dim();
      eqnVLF.dim();
      eqnVLF.showForm('vlf');
      eqnDiff.showForm('d1Mono');
    },
    time: '1:10',
    scenario: 'summary',
    transition: (done) => {
      p1._particles.showAll();
      p1._diaphram.showAll();
      p1._movePad.showAll();
      m1._balls.showAll();
      m1._firstBall.showAll();
      m1._movePad.showAll();
      figure.animations.new()
        .dissolveOut({
          elements: ['p1.particles', 'p1.diaphram', 'p1.movePad', eqnSineT, eqnVLF, eqnDiff, 'm1.balls', 'm1.firstBall', 'm1.movePad'
          ],
          duration: 0.5
        })
        .scenarios({ target: 'default', duration: 0.01 })
        .trigger({ callback: 'softReset' })
        .dissolveIn({ elements: ['m1.grid', 'm1.firstBall', 'm1.movePad', 'm1.balls', 'slowTimeLabel', 'slowTimeButton', 'resetButton', 'freezeTimeButton', 'freezeTimeLabel'], duration: 0.5 })
        .whenFinished(done)
        .start();
    },
    steadyState: () => {
      m1.setScenario('default');
      m1.show(['grid', 'balls', 'firstBall', 'movePad']);
      p1.hide();
      eqnSineT.hide();
      eqnVLF.hide();
      eqnDiff.hide();
    },
    form: [null, null, null],
    leaveState: () => {
      eqnSineT.undim();
      eqnVLF.undim();
    },
  },
  {
    // time: '1:27',
    showCommon: ['m1.grid', 'm1.balls', 'm1.firstBall', 'm1.movePad', 'slowTimeLabel', 'slowTimeButton', 'resetButton', 'freezeTimeButton', 'freezeTimeLabel'],
    enterState: () => {
      pause();
    },
    transition: { trigger: 'showEnvelope', duration: 2 },
    steadyState: () => {
      unpause();
      m1._envelope.pointsToDraw = Math.floor(m1._envelope.drawingObject.numVertices / 6) * 6;
      m1._envelope.show();
    },
  },
  {
    // time: '1:35.5',
    show: 'm1.envelope',
    form: [null, null, 'waveDef'],
  },

  /*
  .########..########.########..####..#######..########..####..######.
  .##.....##.##.......##.....##..##..##.....##.##.....##..##..##....##
  .##.....##.##.......##.....##..##..##.....##.##.....##..##..##......
  .########..######...########...##..##.....##.##.....##..##..##......
  .##........##.......##...##....##..##.....##.##.....##..##..##......
  .##........##.......##....##...##..##.....##.##.....##..##..##....##
  .##........########.##.....##.####..#######..########..####..######.
  */
  {
    // time: '3:00',
    showCommon: ['m1.grid', 'm1.balls', 'm1.firstBall', 'm1.movePad', 'slowTimeLabel', 'slowTimeButton', 'resetButton', 'freezeTimeButton', 'freezeTimeLabel', 'pulseButton', 'sineButton'],
    form: [null, null, null],
    transition: [
      { out: ['m1.envelope', defs] },
      { in: ['pulseButton', 'sineButton'] },
    ],
  },
  {
    // time: '3:00',
    form: [null, null, null],
    transition: [
      { out: ['m1.firstBall', 'm1.movePad', 'slowTimeLabel', 'slowTimeButton', 'resetButton', 'freezeTimeButton', 'freezeTimeLabel', 'pulseButton', 'sineButton'] },
      { in: 'm1.periodicEnvelope' },
    ],
  },
  {
    // time: '3:00',
    form: [null, null, null],
    transition: [
      { out: 'm1.periodicEnvelope' },
      { in: ['m1.firstBall', 'm1.movePad', 'slowTimeLabel', 'slowTimeButton', 'resetButton', 'freezeTimeButton', 'freezeTimeLabel', 'pulseButton', 'sineButton'] },
    ],
  },


  /*
  .##.....##.########.##........#######...######..####.########.##....##
  .##.....##.##.......##.......##.....##.##....##..##.....##.....##..##.
  .##.....##.##.......##.......##.....##.##........##.....##......####..
  .##.....##.######...##.......##.....##.##........##.....##.......##...
  ..##...##..##.......##.......##.....##.##........##.....##.......##...
  ...##.##...##.......##.......##.....##.##....##..##.....##.......##...
  ....###....########.########..#######...######..####....##.......##...
  */
  {
    // time: '4:23.5',
    show: ['pulseButton', 'sineButton', 'resetButton', 'freezeTimeButton', 'freezeTimeLabel', 'slowTimeLabel', 'slowTimeButton'],
    transition: { in: ['velocityButton', 'velocity'] },
  },
  {
    // time: '4:25.5',
    showCommon: [
      'm1.balls', 'm1.grid', 'm1.movePad', 'm1.firstBall', 'resetButton', 'freezeTimeLabel', 'freezeTimeButton',
      'slowTimeLabel', 'slowTimeButton', 'timePlot1.xAxis', 'timePlot1.yAxis', 'timePlot1.trace', 'timePlot1.grid', 'pulseButton', 'sineButton', 'm1.xAxis', 'm1.yAxis',
      'velocityButton', 'velocity', 'm1.ballTracker',
    ],
    transition: [
      { scenario: 'm1', target: 'right', duration: 2 },
      [
        { trigger: 'softReset' },
        { in: ['m1.xAxis', 'm1.yAxis'] },
        { in: { timePlot1: ['xAxis', 'yAxis', 'grid', 'trace'] } },
      ],
      { pulse: 'timePlot1.yAxis.title', delay: 0.2, yAlign: 'bottom' },
      { pulse: 'timePlot1.xAxis.title', delay: 0.5, xAlign: 'left', yAlign: 'top', scale: 2 },
      { in: 'm1.ballTracker' },
      { pulse: 'm1.ballTracker', delay: 1.5 },
    ],
  },

  // Show v width
  {
    scenarioCommon: ['default', 'right'],
    transition: [
      { out: ['m1.movePad', 'm1.firstBall', 'velocityButton', 'velocity', 'freezeTimeLabel', 'freezeTimeButton',
      'slowTimeLabel', 'slowTimeButton', 'pulseButton', 'resetButton', 'sineButton'] },
      { trigger: 'growArrow', payload: ['timePlot1._secondsArrow', 1], duration: 1.5 },
      { trigger: 'growArrow', payload: ['m1._vArrow', 1], duration: 1.5, delay: 1 },
    ],
    steadyState: () => {
      figure.fnMap.exec('setArrow', 'm1.vArrow');
      figure.fnMap.exec('setArrow', 'timePlot1.secondsArrow');
    },
  },
  {
    enterState: () => {
      figure.fnMap.exec('setArrow', 'm1.vArrow');
      figure.fnMap.exec('setArrow', 'timePlot1.secondsArrow');
      pause();
    },
    transition: [
      { out: ['m1.vArrow', 'timePlot1.secondsArrow'] },
      { in: ['m1.movePad', 'm1.firstBall', 'velocityButton', 'velocity', 'freezeTimeLabel', 'freezeTimeButton',
      'slowTimeLabel', 'slowTimeButton', 'pulseButton', 'resetButton', 'sineButton'] },
    ],
  },
  // Show 2v width
  {
    transition: [
      { out: ['m1.movePad', 'm1.firstBall', 'velocityButton', 'velocity', 'freezeTimeLabel', 'freezeTimeButton',
      'slowTimeLabel', 'slowTimeButton', 'pulseButton', 'resetButton', 'sineButton'] },
      { trigger: 'growArrow', payload: ['timePlot1._secondsArrow', 1], duration: 1.5 },
      { trigger: 'growArrow', payload: ['m1._v2Arrow', 1], duration: 1.5, delay: 1 },
    ],
    steadyState: () => {
      figure.fnMap.exec('setArrow', 'm1.v2Arrow');
      figure.fnMap.exec('setArrow', 'timePlot1.secondsArrow');
    },
  },
  
  // Show width
  {
    hide: ['m1.movePad', 'm1.firstBall', 'velocityButton', 'velocity', 'freezeTimeLabel', 'freezeTimeButton',
      'slowTimeLabel', 'slowTimeButton', 'pulseButton', 'resetButton', 'sineButton'],
    enterState: () => {
      figure.fnMap.exec('setArrow', 'm1.v2Arrow');
      figure.fnMap.exec('setArrow', 'timePlot1.TArrow');
      figure.fnMap.exec('setArrow', 'timePlot1.secondsArrow');
      pause();
    },
    fromForm: [null, 'wAlone'],
    form: [null, 'wvt'],
    transition: [
      { out: ['timePlot1.secondsArrow'] },
      [
        { in: ['timePlot1.TArrow.label' ] },
        { pulse: 'timePlot1.TArrow.label' },
      ],
      { trigger: 'growV', duration: 1, delay: 1},
      { out: ['m1.v2Arrow.label'] },
      { in: eqnVLF },
      { goToForm: eqnVLF, target: 'we', delay: 1 },
      { goToForm: eqnVLF, target: 'wvt', delay: 1 },
    ],
    steadyState: () => {
      m1._velocity.showAll();
      figure.fnMap.exec('setArrow', 'm1.v2Arrow');
      timePlot1._secondsArrow.hide();
      m1._v2Arrow._label.hide();
      figure.fnMap.exec('setArrow', 'timePlot1.TArrow');
    },
  },



  // {
  //   scenarioCommon: ['default', 'right'],
  //   showCommon: [
  //     'm1.balls', 'm1.grid', 'timePlot1.xAxis', 'timePlot1.yAxis', 'timePlot1.trace', 'm1.xAxis', 'm1.yAxis', 'timePlot1.grid',
  //   ],
  //   enterState: () => {
  //     m1.custom.setWidthArrow(0, 6, -1);
  //   },
  //   fromForm: [null, 'wAlone'],
  //   form: [null, 'wvt'],
  //   show: { timePlot1: ['xAxis', 'yAxis', 'grid', 'trace'] },
  //   transition: [
  //     { out: ['m1.movePad', 'm1.firstBall', 'velocityButton', 'velocity', 'freezeTimeLabel', 'freezeTimeButton',
  //     'slowTimeLabel', 'slowTimeButton', 'pulseButton', 'resetButton', 'sineButton'] },
  //     { trigger: 'growT', duration: 1, delay: 1 },
  //     { trigger: 'growV', duration: 1, delay: 1 },
  //     { trigger: 'growWA', duration: 1, delay: 1 },
  //     { in: eqnVLF },
  //     { goToForm: eqnVLF, target: 'we' },
  //     { goToForm: eqnVLF, target: 'wvt' },
  //   ],
  //   steadyState: () => {
  //     m1._widthArrow.showAll();
  //     timePlot1._widthArrow.showAll();
  //     m1._velocity.showAll();
  //     m1._widthArrow.setLength(7.8);
  //     m1.custom.setWidthArrow(0, 6, -1);
  //     timePlot1._widthArrow.setLength(2);
  //   },
  // },
  
  /*
  .##.....##.............##.......########
  .##.....##.............##.......##......
  .##.....##....#####....##.......##......
  .##.....##.............##.......######..
  ..##...##.....#####....##.......##......
  ...##.##...............##.......##......
  ....###................########.##......
  */
  {
    enterState: () => {
      m1._velocity.showAll();
      figure.fnMap.exec('setArrow', 'm1.v2Arrow');
      m1._v2Arrow._label.hide();
      figure.fnMap.exec('setArrow', 'timePlot1.TArrow');
    },
    showCommon: [
      'm1.balls', 'm1.grid', 'timePlot1.xAxis', 'timePlot1.yAxis', 'timePlot1.grid', 'timePlot1.trace', 'm1.xAxis', 'm1.yAxis', 'timePlot.grid',
    ],
    transition: [
      { out: ['m1.v2Arrow.line', 'm1.v2Arrow.arrow1', 'm1.v2Arrow.arrow2', 'timePlot1.TArrow', eqnVLF, 'm1.velocity'] },
      { in: ['m1.movePad', 'm1.firstBall', 'velocityButton', 'velocity', 'freezeTimeLabel', 'freezeTimeButton',
      'slowTimeLabel', 'slowTimeButton', 'pulseButton', 'resetButton', 'sineButton'] },
    ],
  },
  {
    scenarioCommon: ['default', 'right', 'wavelength'],
    fromForm: [null, 'l'],
    form: [null, 'l'],
    show: { timePlot1: ['xAxis', 'yAxis', 'grid', 'trace'] },
    enterStateCommon: () => {
      m1.custom.setWidthArrow(0, 3, -1);
      m1._widthArrow.showAll();
    },
    enterState: () => {
      m1._widthArrow.hide();
    },
    transition: [
      { out: ['m1.movePad', 'm1.firstBall', 'velocityButton', 'velocity', 'freezeTimeLabel', 'freezeTimeButton',
      'slowTimeLabel', 'slowTimeButton', 'pulseButton', 'resetButton', 'sineButton'] },
      { trigger: 'growWASmall', duration: 1, delay: 1 },
      { in: eqnVLF },
    ],
    steadyState: () => {
      m1._widthArrow.showAll();
      m1.custom.setWidthArrow(0, 3, -1);
      m1._widthArrow.setLength(3.9);
    },
  },
  // { form: [null, 'wavelengthwvt'] },
  { form: [null, 'lvt'] },
  { form: [null, 'lvtf'] },
  { form: [null, 'lvf'] },
  {
    transition: [
      { out: ['m1.balls', 'm1.grid', 'timePlot1.xAxis', 'timePlot1.yAxis', 'timePlot1.grid', 'timePlot1.trace', 'm1.xAxis', 'm1.yAxis', 'timePlot.grid', 'm1.widthArrow'] },
      { scenario: eqnVLF, target: 'center' },
    ],
  },
  {
    enterStateCommon: null,
    scenario: 'center',
    hide: ['m1.balls', 'm1.grid', 'timePlot1.xAxis', 'timePlot1.yAxis', 'timePlot1.grid', 'timePlot1.trace', 'm1.xAxis', 'm1.yAxis', 'timePlot.grid', 'm1.widthArrow'],
    form: [null, 'vlf']
  },
  {
    enterState: 'softReset',
    transition: [
      { scenario: eqnVLF, start: 'center', target: 'topRight' },
      { in: ['m1.balls', 'm1.grid', 'timePlot1.xAxis', 'timePlot1.yAxis', 'timePlot1.grid', 'timePlot1.trace', 'm1.xAxis', 'm1.yAxis', 'timePlot.grid', 'm1.movePad', 'm1.firstBall', 'velocityButton', 'velocity', 'freezeTimeLabel', 'freezeTimeButton',
      'slowTimeLabel', 'slowTimeButton', 'pulseButton', 'resetButton', 'sineButton', 'sine2fButton'] },
    ],
  },
  

  /*
  .##.....##....###....########.##.....##....########
  .###...###...##.##......##....##.....##.......##...
  .####.####..##...##.....##....##.....##.......##...
  .##.###.##.##.....##....##....#########.......##...
  .##.....##.#########....##....##.....##.......##...
  .##.....##.##.....##....##....##.....##.......##...
  .##.....##.##.....##....##....##.....##.......##...
  */
  // {
  //   showCommon: [
  //     'm1.balls', 'm1.grid', 'm1.movePad', 'm1.firstBall', 'resetButton', 'freezeTimeLabel', 'freezeTimeButton',
  //     'timePlot1.xAxis', 'timePlot1.yAxis', 'timePlot1.trace', 'timePlot1.grid', 'm1.xAxis', 'm1.yAxis',
  //     'timePlot1.eqn',
  //   ],
  //   scenario: 'topRight',
  //   form: [null, null],
  //   hideCommon: [],
  //   hide: 'timePlot1.eqn',
  //   transition: [
  //     { out: ['pulseButton', 'sineButton', 'slowTimeButton', 'slowTimeLabel', 'velocityButton', 'velocity', eqnVLF] },
  //   ],
  // },
  // {
  //   transition: { in: 'timePlot1.eqn' },
  // },
  // {
  //   show: ['sineTExplanation'],
  //   enterState: () => {
  //     sineTExplanation.showForm('yx0t');
  //   },
  //   transition: [
  //     { scenario: ['m1', 'timePlot1'],  target: 'top' },
  //     { in: sineTExplanation },
  //   ],
  // },
  // {
  //   scenarioCommon: ['default', 'top'],
  //   show: ['eqnSineT', 'sineTExplanation'],
  //   form: 'yx0t',
  //   enterState: () => {
  //     sineTExplanation.showForm('yx0t');
  //   },
  // },
  // {
  //   enterState: () => {
  //     sineTExplanation.showForm('yx0t');
  //   },
  //   transition: [
  //     { out: sineTExplanation },
  //     // { dim: eqnSineT.getPhraseElements('yx0tequalsF') },
  //     { in: 'm1.x0' },
  //   ],
  // },
  // {
  //   form: 'yx1t_0',
  //   show: 'm1.x0',
  //   // enterStateCommon: () => {
  //   //   eqnSineT.getPhraseElements('yx0tequalsF').forEach(e => e.dim());
  //   // }
  // },
  // { form: 'yx1t_1', show: 'm1.x0' },
  // { form: 'yx1t_2', show: 'm1.x0' },
  // { form: 'yx1t_3', show: 'm1.x0' },
  // { form: 'yx1t_4', show: 'm1.x0' },
  // { form: 'yx1t_5', show: 'm1.x0' },
  // { transition: { out: 'm1.x0' } },
  // {
  //   enterState: () => {
  //     sineTExplanation.showForm('summary_1');
  //   },
  //   transition: [
  //     { in: sineTExplanation },
  //   ],
  //   steadyState: () => {
  //     sineTExplanation.showForm('summary_1');
  //   },
  // },

  /*
  .##.....##....###....########.##.....##....##.....##
  .###...###...##.##......##....##.....##.....##...##.
  .####.####..##...##.....##....##.....##......##.##..
  .##.###.##.##.....##....##....#########.......###...
  .##.....##.#########....##....##.....##......##.##..
  .##.....##.##.....##....##....##.....##.....##...##.
  .##.....##.##.....##....##....##.....##....##.....##
  */
  // {
  //   enterStateCommon: () => {},
  //   enterState: () => {
  //     eqnSineT.showForm('yx1t_5');
  //     sineTExplanation.showForm('summary_1');
  //   },
  //   form: null,
  //   transition: [
  //     [
  //       { out: [sineTExplanation, eqnSineT, 'timePlot1.xAxis', 'timePlot1.yAxis', 'timePlot1.trace', 'timePlot1.grid', 'timePlot1.eqn'] },
  //       { scenario: 'm1', target: 'default' },
  //     ],
  //   ],
  // },
  {
    enterStateCommon: () => {},
    enterState: () => {
      eqnVLF.showForm('vlf');
    },
    showCommon: ['m1.xAxis', 'm1.yAxis', 'm1.grid', 'm1.balls', 'm1.movePad', 'm1.firstBall', 'freezeTimeLabel', 'freezeTimeButton', 'resetButton', 'sineButton', 'pulseButton', 'slowTimeButton', 'slowTimeLabel'],
    form: [null, null, null],
    scenario: 'topRight',
    transition: [
      [
        { out: ['timePlot1.xAxis', 'timePlot1.yAxis', 'timePlot1.trace', 'timePlot1.grid', eqnVLF] },
        { scenario: 'm1', target: 'default' },
        { in: ['m1.firstBall', 'm1.movePad', 'freezeTimeLabel', 'freezeTimeButton', 'resetButton', 'sineButton', 'pulseButton', 'slowTimeButton', 'slowTimeLabel'] },
      ],
    ],
  },
  {
    scenario: 'default',
    showCommon: ['m1.xAxis', 'm1.yAxis', 'm1.grid', 'm1.balls', 'm1.movePad', 'm1.firstBall', 'm1.eqn', 'freezeTimeLabel', 'freezeTimeButton', 'resetButton', 'm1.movePadEnv'],
    transition: [
      { trigger: 'showEnvelope', duration: 2 },
      { out: 'm1.balls' },
      { in: 'm1.eqn' },
      { trigger: 'copyEnvelope' },
      { in: 'm1.envelope2', duration: 0 },
    ],
  },
  {
    scenario: 'default',
    showCommon: ['m1.xAxis', 'm1.yAxis', 'm1.grid', 'm1.movePad', 'm1.firstBall', 'm1.eqn', 'm1.eqn1', 'm1.envelope', 'm1.envelope2', 'm1.movePadEnv', 'freezeTimeLabel', 'freezeTimeButton', 'resetButton', eqnSineT],
    transition: [
      { out: ['m1.movePad', 'm1.firstBall', 'freezeTimeLabel', 'freezeTimeButton', 'resetButton'] },
      { in: 'm1.xDashLine' },
      { in: 'm1.xDashLineG' },
      { in: 'm1.eqn1' },
    ],
  },
  {
    scenario: 'default',
    showCommon: ['m1.xAxis', 'm1.yAxis', 'm1.grid', 'm1.eqn', 'm1.eqn1', 'm1.envelope', 'm1.envelope2', 'm1.movePadEnv', eqnSineT],
    transition: [
      [
        { out: 'm1.xDashLine' },
        { out: 'm1.xDashLineG' },
        { out: 'm1.eqn1' },
      ],
      // { in: ['m1.movePad', 'm1.firstBall', 'freezeTimeLabel', 'freezeTimeButton', 'resetButton'] },
      { position: 'movePadEnv', delta: 0.001, duration: 0 },
      // { trigger: 'update' },
      [
        { in: 'm1.eqn1' },
      ],
    ],
  },
  {
    scenarioCommon: ['default', 'mathx'],
    enterState: () => {
      eqnSineT.showForm('yxt0');
    },
    form: 'yxt0',
    transition: [
      { scenario: 'm1', start: 'default', target: 'mathx' },
      { in: eqnSineT },
    ],
  },
  { form: 'yxt1_0' },
  { form: 'yxt1_1' },
  { form: 'yxt1_2' },
  { form: 'yxt1_3' },
  {
    enterState: () => {
      sineTExplanation.showForm('summary_2');
    },
    transition: { in: sineTExplanation },
    steadyState: () => {
      sineTExplanation.showForm('summary_2');
    },
  },

  // /*
  // .##.....##....###....########.##.....##....########.
  // .###...###...##.##......##....##.....##....##.....##
  // .####.####..##...##.....##....##.....##....##.....##
  // .##.###.##.##.....##....##....#########....########.
  // .##.....##.#########....##....##.....##....##.......
  // .##.....##.##.....##....##....##.....##....##.......
  // .##.....##.##.....##....##....##.....##....##.......
  // */
  // {
  //   showCommon: [],
  //   scenarioCommon: 'center',
  //   transition: [
  //     { out: ['m1.xAxis', 'm1.yAxis', 'm1.envelope', 'm1.envelope2', 'm1.eqn1', 'm1.eqn', 'm1.grid'] },
  //     { scenario: eqnSineT, target: 'center' },
  //   ],
  // },
  // { form: 'yxt1_3gP' },
  // { form: 'yxt1_3gPSub' },
  // { form: 'yxt1_3gPSubDone' },
  // { form: 'ysin_01' },



  /*
  .########.##....##.########..########..######.
  ....##.....##..##..##.....##.##.......##....##
  ....##......####...##.....##.##.......##......
  ....##.......##....########..######....######.
  ....##.......##....##........##.............##
  ....##.......##....##........##.......##....##
  ....##.......##....##........########..######.
  */
  {
    time: '1:38',
    form: [null, null, null],
    transition: { out: ['m1.envelope', defs] },
  },
  {
    time: '1:40.5',
    fromForm: [null, null, 'transverseWave'],
    form: [null, null, 'transverseDef'],
    enterState: () => {
      m1._balls.get(m1.custom.highlights).map(e => e.setScenario('highlight'));
    },
    show: '_cursor_',
    transition: [
      { pulse: { 'm1.balls': m1.custom.highlights }, scale: 3 },
      { in: 'm1.disturbanceLines' },
      { in: defs, delay: 6 },
      { goToForm: defs, target: 'transverseDef', delay: 1 }
    ],
    leaveState: () => {
      m1._balls.undim();
    },
  },
  {
    time: '2:00',
    form: [null, null, null],
    transition: [
      { out: ['m1.balls', 'm1.grid', 'm1.movePad', 'm1.firstBall', defs] },
      { trigger: 'softReset' },
      { in: 'p1' },
      { in: ['pulseButton', 'sineButton', 'resetButton'] },
    ],
  },
  {
    time: '2:27',
    form: [null, null, 'longWave'],
    hide: ['m1.balls', 'm1.grid', 'm1.movePad', 'm1.firstBall'],
    show: ['pulseButton', 'sineButton', 'resetButton', 'p1'],
  },
  {
    time: '2:30.5',
    form: [null, null, 'longDef'],
    hide: ['m1.balls', 'm1.grid', 'm1.movePad', 'm1.firstBall'],
    show: ['pulseButton', 'sineButton', 'resetButton', 'p1'],
  },
  {
    time: '2:42.5',
    hide: 'm1',
    form: [null, null, null],
    transition: [
      { out: ['pulseButton', 'sineButton', 'resetButton', 'p1', defs] },
      { in: { ocean: ['h1', 'h2', 'h3', 'h4', 'particles', 'grid'] } },
    ],
    leaveState: 'softReset',
  },
  {
    time: '2:48',
    hide: 'm1',
    show: 'ocean',
    transition: [
      // { in: { ocean: ['h1', 'h2', 'h3', 'h4'] } },
      { in: { ocean: ['c1', 'c2', 'c3', 'c4'] } },
    ],
  },

  /*
  .########..#######..##....##..######.
  .##.......##.....##.###...##.##....##
  .##.......##.....##.####..##.##......
  .######...##.....##.##.##.##..######.
  .##.......##..##.##.##..####.......##
  .##.......##....##..##...###.##....##
  .########..#####.##.##....##..######.
  */
  {
    form: 'summaryClean',
    transition: [
        { out: [{ m1: ['xAxis', 'yAxis', 'envelope', 'envelope2', 'eqn', 'eqn1', 'firstBall', 'grid'] }, 'freezeTimeLabel', 'freezeTimeButton', 'resetButton'] },
        [
          { scenario: eqnSineT, target: 'center' },
          { goToForm: eqnSineT, target: 'summary1' },
        ],
        { goToForm: eqnSineT, target: 'summary' },
        { goToForm: eqnSineT, target: 'summaryClean', delay: 1 },
    ],
  },





  {
    show: ['diffExplanation2'],
    steadyState: () => {
      eqnDiff.showForm('d1');
    },
  },
  // {
  //   scenarioCommon: 'default',
  //   show: ['title'],
  //   exec: [
  //     ['0:30', 'showExamples'],
  //     ['0:50', 'outTitle'],
  //     ['0:50', 'outExamples'],
  //   ],
  //   // exec: [
  //   //   ['0:05', 'pause'],
  //   //   ['0:05', 'showEnvelope'],
  //   //   ['0:07', 'unpause'],
  //   // ],
  // },
  
  // {
  //   scenario: 'summary',
  //   show: ['m1'],
  //   hide: ['m1.ballTracker', 'm1.envelope', 'm1.grid', 'm1.velocity'],
  //   // time: '0:50.5',
  //   // steadyState: () => {
  //   //   eqnVLF.showForm('vlf');
  //   // },
  //   // time: '0:50.5',
  //   transition: [
  //     { in: ['m1.grid', 'm1.balls', 'm1.grid', 'm1.yAxis', 'm1.xAxis']}
  //   ],
  //   execDelta: [
  //     [1, 'startSineWave'],
  //     [7, 'pause'],
  //     [7, 'showVelocity'],
  //     [8, 'showWavelength'],
  //     [9, 'showVLF'],
  //     [10, 'hideWavelength'],
  //     [10, 'hideVelocity'],
  //     [10, 'hideVLF'],
  //     [11, 'unpause'],
  //     [14, 'showSine'],
  //     [15, 'hideSine'],
  //     [16, 'showWaveEqn'],
  //   ],
  // },
  
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
// figure.recorder.loadVideoTrack('http://localhost:8080/src/video-track.json');
figure.recorder.notifications.add('stateSet', () => pause());
figure.recorder.notifications.add('seek', () => pause())
figure.recorder.notifications.add('playbackStopped', () => pause());

// TODO - add more onClick notifications here for all touchable elements
title._movePad.notifications.add('onClick', () => unpause());
m1._movePad.notifications.add('onClick', () => unpause());
p1._movePad.notifications.add('onClick', () => unpause());


(function (document) {
    var width;
    var body = document.body;
  
    var container = document.createElement('span');
    container.innerHTML = Array(100).join('wi');
    container.style.cssText = [
      'position:absolute',
      'width:auto',
      'font-size:128px',
      'left:-99999px'
    ].join(' !important;');
  
    var getWidth = function (fontFamily) {
      container.style.fontFamily = fontFamily;
  
      body.appendChild(container);
      width = container.clientWidth;
      body.removeChild(container);
  
      return width;
    };
  
    // Pre compute the widths of monospace, serif & sans-serif
    // to improve performance.
    var monoWidth  = getWidth('monospace');
    var serifWidth = getWidth('serif');
    var sansWidth  = getWidth('sans-serif');
  
    window.isFontAvailable = function (font) {
      return monoWidth !== getWidth(font + ',monospace') ||
        sansWidth !== getWidth(font + ',sans-serif') ||
        serifWidth !== getWidth(font + ',serif');
    };
  })(document);

  console.log(isFontAvailable('Times New Roman'))

  r = title.custom.recording