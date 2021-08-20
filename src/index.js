/* globals Fig, dd, addFigureElements, TimeKeeper, Recorder */

const figure = new Fig.Figure({
  limits: [0, 0, 24, 12],
  color: [0.3, 0.3, 0.3, 1],
  font: {
    size: 0.1, family: 'Open Sans', style: 'normal', width: 1.12, midAscent: 1.1, maxAscent: 1.5,
  },
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
/* eslint-disable no-unused-vars */
// Global colors
const colorRed = [1, 0, 0, 1];
const colorRedText = [1, 0.2, 0.2, 1];
const colorBlue = [0.2, 0.7, 1, 1];
const colorGreen = [0.3, 1, 0.3, 1];
const colorYellow = [1, 1, 0.3, 1];
const colorPurple = [1, 0.3, 1, 1];
const colorCyan = [0.3, 1, 1, 1];
const colorText = [1, 1, 0.3, 1];
const colorLight = [0.8, 0.8, 0.8, 1];
const colorDark = [0.3, 0.3, 0.3, 1];
const colorOn = [0, 0.8, 0, 1];
const colorOff = [0.4, 0.4, 0.4, 1];
const colorHighlight = colorCyan;
const colorDisturbance = colorRed;
const colorTime = colorRedText;
const colorPosition = colorBlue;
const colorFText = colorGreen;
const colorGText = colorRedText;
const colorVelocityText = colorYellow;
const colorWave = colorYellow;


const { Transform, Point } = Fig;
const { range, rand, randSign } = Fig.tools.math;
const minVelocity = 0.05;
const time = new TimeKeeper();
const recorder = new Recorder(10, time);

let loadNum = 0;
const getLoader = () => {
  loadNum += 1;
  document.getElementById('loader').classList.remove('hide-loader');
  return () => {
    loadNum -= 1;
    if (loadNum === 0) {
      document.getElementById('loader').classList.add('hide-loader');
    }
  };
};
/* eslint-enable no-unused-vars */

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
const timePlot1 = figure.get('timePlot1');
const defs = figure.get('defs');
const arrow1 = figure.get('arrow1');
const eqnWave = figure.get('eqnWave');
const figureOneEqn = figure.get('figureOneEqn');
const eqnVLF = figure.get('eqnVLF');
const eqnDiff = figure.get('eqnDiff');
const title = figure.get('title');
const resetButton = figure.get('resetButton');
const pulseButton = figure.get('pulseButton');
const pulseButton2 = figure.get('pulseButton2');
const sineButton = figure.get('sineButton');
const freezeButton = figure.get('freezeTimeButton');
const slowTimeButton = figure.get('slowTimeButton');
const velocityButton = figure.get('velocityButton');
const highlighter = figure.get('highlighter');
const highlighter2 = figure.get('highlighter2');
const diffExplanation = figure.get('diffExplanation');


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
  freezeButton.custom.on();
  if (m1._envelope2.isShown) {
    figure.fnMap.global.exec('copyEnvelope');
  }
  // eslint-disable-next-line no-use-before-define
  update(true);
};
const unpause = () => {
  figure.elements.customState.pause = false;
  freezeButton.custom.off();
  time.unpause();
  if (m1._envelope2.isShown) {
    m1._envelope2.setOpacity(0);
  }
};
figure.recorder.notifications.add('playbackStopped', () => {
  pause();
});
figure.recorder.notifications.add('seek', () => {
  pause();
});
// Update function for everytime we want to update the particles
function update(override = false) {
  if (
    (
      (time.isPaused() || m1.custom.recording.isStationary())
      && override === false
      && m1.custom.updateFlag === false
    )
  ) {
    return;
  }

  m1.custom.updateFlag = false;
  const deltaTime = time.step();
  if (ocean.isShown) {
    ocean.custom.update(deltaTime);
    figure.animateNextFrame();
    return;
  }
  if (title._title.isShown) { title.custom.update(deltaTime); return; }
  if (p1.isShown) { p1.custom.update(deltaTime); return; }
  if (m1.isShown) { m1.custom.update(deltaTime); }
  if (timePlot1.isShown) { timePlot1.custom.update(); }
}
figure.fnMap.global.add('forceUpdate', () => update(true));

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
};

const stop = () => {
  m1.custom.stop();
  figure.stop();
};
const reset = () => {
  stop();
  m1.customState.trackingTime = 0;
  m1.custom.reset();
  p1.custom.reset();
  time.reset();
  pause();
  if (m1._envelope2.isShown) {
    m1._envelope2.setOpacity(0);
  }
  update(true);
};
const softReset = () => {
  m1.customState.trackingTime = 0;
  m1.custom.reset();
  p1.custom.reset();
  time.reset();
  pause();
  update(true);
};

figure.fnMap.global.add('reset', () => reset());
figure.fnMap.global.add('softReset', () => softReset());


// Before each draw, update the points
figure.notifications.add('beforeDraw', () => {
  update();
});

figure.fnMap.global.add('update', () => update());

// After each draw, call a next animation frame so udpates happen on each frame
figure.notifications.add('afterDraw', () => {
  if (!m1.custom.recording.isStationary()) {
    figure.animateNextFrame();
  }
});

figure.notifications.add('setState', (deltaTime) => {
  m1.custom.recording.setDeltaTime(deltaTime);
  time.setDeltaTime(deltaTime);
  m1.customState.trackingTime += deltaTime;
});


const pointTo = (index, element, minus, startOrLength, vertical = true) => {
  const p = element.getPosition('figure');
  let s = p._dup();
  if (typeof startOrLength === 'number') {
    if (vertical) { s.y -= startOrLength; } else { s.x -= startOrLength; }
  } else {
    s = Fig.getPoint(startOrLength);
  }
  const a = figure.get(`pointer${index}`);
  const l = new Fig.Line(s, p);
  a.setEndPoints(s, l.pointAtPercent(1 - minus / l.length));
};
figure.fnMap.global.add('pointToEqn1Sign', () => {
  pointTo(1, m1._eqn1._sign, 0.5, [14, 6]);
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
  figure.animateNextFrame();
});

slowTimeButton.notifications.add('onClick', () => {
  if (slowTimeButton.customState.state) {
    time.setTimeSpeed(0.3);
  } else {
    time.setTimeSpeed(1);
  }
  figure.animateNextFrame();
});

velocityButton.notifications.add('onClick', () => {
  reset();
  if (velocityButton.customState.state) {
    m1.custom.setVelocity(2);
  } else {
    m1.custom.setVelocity(1);
  }
  update(true);
  figure.animateNextFrame();
});

const setVelocityToggle = (on) => {
  if (on) {
    velocityButton.custom.on();
    m1.custom.setVelocity(2);
  } else {
    velocityButton.custom.off();
    m1.custom.setVelocity(1);
  }
};

const setSlowTimeToggle = (on) => {
  if (on) {
    slowTimeButton.custom.on();
    time.setTimeSpeed(0.3);
  } else {
    slowTimeButton.custom.off();
    time.setTimeSpeed(1);
  }
};

pulseButton.onClick = () => {
  if (m1.custom.recording.getState().mode !== 'pulse') {
    reset();
  }
  unpause();
  m1.custom.recording.pulse();
  update(true);
};

pulseButton2.onClick = () => {
  if (m1.custom.recording.getState().mode !== 'pulse2') {
    reset();
  }
  unpause();
  m1.custom.recording.pulse2();
  update(true);
};

sineButton.onClick = () => {
  reset();
  unpause();
  m1.custom.recording.sine();
  update(true);
};

figure.fnMap.global.add('pulseTitle', () => {
  softReset();
  unpause();
  m1.custom.recording.pulse();
  update(true);
});

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
  softReset();
  unpause();
  m1.custom.recording.sine();
  update(true);
});

figure.fnMap.global.add('fixedSine', () => {
  softReset();
  m1.custom.recording.setState({
    mode: 'sine',
    startTime: [-20],
    lastManualValue: 0,
    lastManualTime: null,
    index: m1.custom.recording.getNum(),
  });
  update(true);
});

figure.fnMap.global.add('setVelocity1', () => {
  m1.custom.setVelocity(1);
});

figure.fnMap.global.add('hideHighlighters', () => {
  highlighter.animations.new().dissolveOut(0.5).start();
  highlighter2.animations.new().dissolveOut(0.5).start();
});

figure.addCursor({ width: 0.1, color: [0.5, 1, 1, 1], radius: 0.4 });

/*
.##....##....###....##.....##
.###...##...##.##...##.....##
.####..##..##...##..##.....##
.##.##.##.##.....##.##.....##
.##..####.#########..##...##.
.##...###.##.....##...##.##..
.##....##.##.....##....###...
*/
const nav = figure.addSlideNavigator({
  nextButton: null, prevButton: null, text: null, equation: [eqnWave, eqnVLF, eqnDiff, defs],
});
time.setTimeSpeed(1);

nav.loadSlides([
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
    show: ['title', 'textTester'],
    enterState: () => {
      recorder.setManual();
    },
  },
  {
    time: '0:33',
    show: ['title'],
    transition: [
      { out: ['title.movePad', 'title.movePadHighlight', 'title.envelope'] },
      { trigger: 'pulseTitle', duration: 6.5 },
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
    time: '0:57',
    fromForm: ['final', 'vlfSummary', 'diffMono'],
    form: ['final', 'vlfSummary', 'diffMono'],
    enterState: 'softReset',
    transition: [
      { out: ['examples', 'title.title'] },
      { in: ['m1.balls', 'm1.firstBall', 'm1.movePad'] },
      { trigger: 'startSineWave' },
      { delay: 5 },
      [
        { in: 'eqnVLF.lambda_1', delay: dd(true), duration: 0.3 },
        { in: 'eqnVLF.equals', delay: dd(), duration: 0.3 },
        { in: 'eqnVLF.v_1', delay: dd(), duration: 0.3 },
        { in: 'eqnVLF.T_1', delay: dd(), duration: 0.3 },
      ],
      { delay: 0.5 },
      [
        { in: 'eqnWave.y', delay: dd(true), duration: 0.3 },
        { in: 'eqnWave.lb1', delay: dd(), duration: 0.3 },
        { in: 'eqnWave.x', delay: dd(), duration: 0.3 },
        { in: 'eqnWave.comma', delay: dd(), duration: 0.3 },
        { in: 'eqnWave.t', delay: dd(), duration: 0.3 },
        { in: 'eqnWave.rb1', delay: dd(), duration: 0.3 },
        { in: 'eqnWave.equals1', delay: dd(), duration: 0.3 },
        { in: 'eqnWave.g', delay: dd(), duration: 0.3 },
        { in: 'eqnWave.lb2', delay: dd(), duration: 0.3 },
        { in: 'eqnWave.x_1', delay: dd(), duration: 0.3 },
        { in: 'eqnWave.min', delay: dd(), duration: 0.3 },
        { in: 'eqnWave.v', delay: dd(), duration: 0.3 },
        { in: 'eqnWave.t_1', delay: dd(), duration: 0.3 },
        { in: 'eqnWave.rb2', delay: dd(), duration: 0.3 },
      ],
      // { delay: 1 },
      [
        { in: 'eqnDiff.d2', delay: dd(true), duration: 0.3 },
        { in: 'eqnDiff._2_2', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff.y_2', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff.vin2', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff.d4', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff.t', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff._2_4', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff.equals', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff.v', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff._2_9', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff.d1', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff._2_1', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff.y_1', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff.vin1', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff.d3', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff.x', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff._2_3', delay: dd(), duration: 0.3 },
      ],
    ],
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
    addReference: true,
    time: '1:08.5',
    scenario: 'summary',
    form: [null, null, null],
    transition: [
      { out: [eqnWave, eqnVLF, eqnDiff, 'm1.balls', 'm1.firstBall', 'm1.movePad'] },
      { scenario: 'm1', target: 'default', duration: 0 },
      { trigger: 'softReset' },
      { in: ['m1.grid', 'm1.firstBall', 'm1.movePad', 'm1.balls', 'resetButton', 'freezeTimeButton', 'freezeTimeLabel', 'slowTimeButton', 'slowTimeLabel', 'pulseButton', 'sineButton'] },
      { pulse: 'm1.firstBall', delay: 6.5, scale: 3 },
    ],
  },
  {
    time: '1:30',
    scenario: 'default',
    showCommon: ['m1.grid', 'm1.firstBall', 'm1.movePad', 'm1.balls', 'resetButton', 'freezeTimeButton', 'freezeTimeLabel', 'slowTimeButton', 'slowTimeLabel', 'pulseButton', 'sineButton'],
    transition: [
      { trigger: 'growPropagation' },
      { out: 'm1.propogation', delay: 3 },
    ],
  },
  {
    scenario: ['default', 'top'],
    time: '1:38.5',
    fromForm: [null, null, null, null],
    form: [null, null, null, 'waveDef'],
  },
  {
    scenario: ['default', 'top'],
    time: '1:43.5',
    fromForm: [null, null, null, null],
    form: [null, null, null, null],
  },

  /*
  .########..####..######......####.##....##
  .##.....##..##..##....##......##..###...##
  .##.....##..##..##............##..####..##
  .##.....##..##..##...####.....##..##.##.##
  .##.....##..##..##....##......##..##..####
  .##.....##..##..##....##......##..##...###
  .########..####..######......####.##....##
  */
  {
    time: '2:05.5',
    enterStateCommon: () => {
      setVelocityToggle(false);
      setSlowTimeToggle(false);
    },
    scenario: ['default', 'top'],
    showCommon: [
      'm1.balls', 'm1.grid', 'm1.movePad', 'm1.firstBall', 'resetButton', 'freezeTimeLabel', 'freezeTimeButton',
      'slowTimeLabel', 'slowTimeButton', 'timePlot1.xAxis', 'timePlot1.yAxis', 'timePlot1.trace', 'timePlot1.grid', 'pulseButton', 'sineButton', 'm1.xAxis', 'm1.yAxis', 'pulseButton2',
    ],
    form: [null, null, null, null],
    transition: [
      // { out: defs },
      { scenario: 'm1', target: 'right', duration: 2 },
      [
        { trigger: 'softReset' },
        { in: ['m1.xAxis', 'm1.yAxis', 'pulseButton2'] },
        { in: { timePlot1: ['xAxis', 'yAxis', 'grid', 'trace'] } },
      ],
      { delay: 1 },
      [
        { pulse: 'timePlot1.yAxis.title', yAlign: 'bottom', scale: 2 },
        { pulse: 'm1.firstBall', scale: 3 },
      ],
      {
        pulse: 'timePlot1.xAxis.title', delay: 0.5, xAlign: 'left', yAlign: 'top', scale: 2,
      },
    ],
  },
  {
    time: '2:28.6',
    scenarioCommon: ['default', 'right'],
    show: '_cursor_.up',
    enterStateCommon: () => {
      // m1._envelope.showAll();
      softReset();
      m1.custom.recording.setState({
        mode: 'pulse2',
        startTime: [-6.16],
        lastManualValue: 0,
        lastManualTime: null,
        index: m1.custom.recording.getNum(),
      });
      m1.customState.trackingTime = -6.16;
      update(true);
      setVelocityToggle(false);
      setSlowTimeToggle(false);
    },
    transition: [
      [
        { in: ['m1.marker', 'timePlot1.marker'] },
        { position: 'm1.marker', target: [5, 0], duration: 0 },
      ],
      { out: ['m1.marker', 'timePlot1.marker'], delay: 12 },
    ],
  },
  {
    time: '2:43.5',
    transition: [
      {
        out: [
          'm1.movePad', 'm1.firstBall', 'resetButton', 'freezeTimeLabel', 'freezeTimeButton', 'slowTimeLabel', 'slowTimeButton', 'pulseButton', 'sineButton', 'pulseButton2',
        ],
      },
      { trigger: 'growTimeTrace', duration: 2 },
      { trigger: 'showEnvelope', duration: 2, delay: 1 },
    ],
    steadyState: () => {
      m1._envelope.pointsToDraw = Math.floor(m1._envelope.drawingObject.numVertices / 6) * 6;
      m1._envelope.show();
    },
    leaveState: () => {
      m1._envelope.pointsToDraw = Math.floor(m1._envelope.drawingObject.numVertices / 6) * 6;
      timePlot1._trace.pointsToDraw = -1;
    },
  },
  {
    time: '2:52.5',
    show: 'm1.envelope',
    hide: ['m1.movePad', 'm1.firstBall', 'resetButton', 'freezeTimeLabel', 'freezeTimeButton', 'slowTimeLabel', 'slowTimeButton', 'pulseButton', 'sineButton', 'pulseButton2',
    ],
    transition: [
      {
        pulse: 'timePlot1.trace', translation: 0.15, min: -0.15, angle: Math.PI / 2, frequency: 2,
      },
      { delay: 3.8 },
      {
        pulse: ['m1.balls', 'm1.envelope'], translation: 0.15, min: -0.15, angle: Math.PI / 2, frequency: 2,
      },
    ],
  },
  {
    time: '3:03',
    transition: [
      {
        out: 'm1.envelope',
      },
      {
        in: [
          'm1.movePad', 'm1.firstBall', 'resetButton', 'freezeTimeLabel', 'freezeTimeButton', 'slowTimeLabel', 'slowTimeButton', 'pulseButton', 'sineButton', 'pulseButton2',
        ],
      },
    ],
  },
  {
    time: '3:09',
    enterStateCommon: null,
    transition: [
      { in: 'm1.velocity' },
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
    addReference: true,
    time: '3:39',
    show: ['velocityButton', 'velocity', 'm1.ballTracker'],
    enterState: () => {
      m1._ballTracker.setPosition(100, 0);
      setVelocityToggle(false);
      setSlowTimeToggle(false);
    },
    transition: [
      [
        { in: ['velocityButton', 'velocity'] },
        { pulse: ['velocityButton', 'velocity'], centerOn: [16, 0.5], scale: 1.3 },
      ],
      {
        pulse: 'm1.ballTracker', scale: 2, delay: 5.3, yAlign: 'top', duration: 1.5,
      },
    ],
  },
  {
    time: '3:49',
    scenarioCommon: ['default', 'right'],
    show: ['velocityButton', 'velocity', 'm1.ballTracker'],
    transition: [
      { out: ['m1.movePad', 'm1.firstBall', 'velocityButton', 'velocity', 'freezeTimeLabel', 'freezeTimeButton', 'slowTimeLabel', 'slowTimeButton', 'pulseButton', 'resetButton', 'sineButton', 'pulseButton2'] },
      { trigger: 'growArrow', payload: ['timePlot1._secondsArrow', 1], duration: 1.5 },
      {
        trigger: 'growArrow', payload: ['m1._vArrow', 1], duration: 1.5, delay: 1.5,
      },
    ],
    steadyState: () => {
      figure.fnMap.exec('setArrow', 'm1.vArrow');
      figure.fnMap.exec('setArrow', 'timePlot1.secondsArrow');
    },
  },

  {
    time: '3:56',
    show: ['velocityButton', 'velocity', 'm1.ballTracker'],
    enterState: () => {
      figure.fnMap.exec('setArrow', 'm1.vArrow');
      figure.fnMap.exec('setArrow', 'timePlot1.secondsArrow');
      pause();
    },
    transition: [
      { out: ['m1.vArrow', 'timePlot1.secondsArrow'] },
      { in: ['m1.movePad', 'm1.firstBall', 'velocityButton', 'velocity', 'freezeTimeLabel', 'freezeTimeButton', 'slowTimeLabel', 'slowTimeButton', 'pulseButton', 'resetButton', 'sineButton', 'pulseButton2'] },
    ],
  },
  // Show 2v width
  {
    time: '4:04',
    show: ['velocityButton', 'velocity', 'm1.ballTracker'],
    // show: '_cursor_',
    enterState: () => {
      setVelocityToggle(true);
      figure.fnMap.exec('setArrow', 'timePlot1.secondsArrow');
    },
    transition: [
      { out: ['m1.movePad', 'm1.firstBall', 'velocityButton', 'velocity', 'freezeTimeLabel', 'freezeTimeButton', 'slowTimeLabel', 'slowTimeButton', 'pulseButton', 'resetButton', 'sineButton', 'pulseButton2'] },
      { in: timePlot1._secondsArrow },
      {
        trigger: 'growArrow', payload: ['m1._v2Arrow', 1], duration: 1.5, delay: 3,
      },
    ],
    steadyState: () => {
      figure.fnMap.exec('setArrow', 'm1.v2Arrow');
      figure.fnMap.exec('setArrow', 'timePlot1.secondsArrow');
    },
  },

  {
    time: '4:14',
    show: 'm1.ballTracker',
    scenario: 'velocity',
    hideCommon: ['m1.movePad', 'm1.firstBall', 'velocityButton', 'velocity', 'freezeTimeLabel', 'freezeTimeButton',
      'slowTimeLabel', 'slowTimeButton', 'pulseButton', 'resetButton', 'sineButton', 'pulseButton2'],
    enterStateCommon: () => {
      setVelocityToggle(true);
      figure.fnMap.exec('setArrow', 'm1.v2Arrow');
      figure.fnMap.exec('setArrow', 'timePlot1.TArrow');
      figure.fnMap.exec('setArrow', 'timePlot1.secondsArrow');
      timePlot1._TArrow._label.hide();
      pause();
    },
    form: [null, null, 'vdt'],
  },
  {
    form: [null, null, 'dvt'],
    time: '4:16',
    show: 'm1.ballTracker',
    scenario: 'velocity',
    transition: { goToForm: eqnDiff, target: 'dvt', duration: 2 },
  },

  // Show w = vT
  {
    time: '4:21',
    show: 'm1.ballTracker',
    scenario: 'velocity',
    // enterState: () => {
    //   setVelocityToggle(true);
    //   figure.fnMap.exec('setArrow', 'm1.v2Arrow');
    //   figure.fnMap.exec('setArrow', 'timePlot1.TArrow');
    //   figure.fnMap.exec('setArrow', 'timePlot1.secondsArrow');
    //   pause();
    // },
    fromForm: [null, 'wAlone', 'dvt'],
    form: [null, 'wvt', 'dvt'],
    transition: [
      { out: ['m1.v2Arrow.label'] },
      [
        { in: eqnVLF },
        { pulse: eqnVLF, delay: 0.2, yAlign: 'top' },
      ],
      // { goToForm: eqnVLF, target: 'wAlone', delay: 1 },
      // { trigger: 'growV2', duration: 1.5, delay: 2},
      { delay: 2 },
      [
        { in: 'm1.velocity' },
        { pulse: 'm1.velocity.label', delay: 0.2, yAlign: 'bottom' },
      ],
      // { delay: 1 },
      { out: ['timePlot1.secondsArrow'] },
      [
        { in: ['timePlot1.TArrow.label'] },
        { pulse: 'timePlot1.TArrow.label', yAlign: 'top' },
        { goToForm: eqnVLF, target: 'wvt', delay: 0.5 },
      ],
    ],
    steadyState: () => {
      m1._velocity.showAll();
      figure.fnMap.exec('setArrow', 'm1.v2Arrow');
      timePlot1._secondsArrow.hide();
      m1._v2Arrow._label.hide();
      figure.fnMap.exec('setArrow', 'timePlot1.TArrow');
    },
  },

  {
    time: '4:31',
    form: [null, 'lvt', null],
    hide: ['m1.movePad', 'm1.firstBall', 'velocityButton', 'velocity', 'freezeTimeLabel', 'freezeTimeButton',
      'slowTimeLabel', 'slowTimeButton', 'pulseButton', 'resetButton', 'sineButton', 'm1.v2Arrow.label', 'pulseButton2'],
    scenario: 'velocity',
    enterStateCommon: null,
    enterState: () => {
      setVelocityToggle(true);
      figure.fnMap.exec('setArrow', 'm1.v2Arrow');
      figure.fnMap.exec('setArrow', 'timePlot1.TArrow');
      pause();
      m1._velocity.showAll();
      // timePlot1._secondsArrow.hide();
      m1._v2Arrow._label.hide();
      // m1.custom.setVelocity(1);
      velocityButton.custom.off();
      // figure.fnMap.exec('setArrow', 'timePlot1.secondsArrow');
    },
    transition: [
      { out: ['m1.balls', 'm1.ballTracker', 'timePlot1.TArrow', 'timePlot1.trace', 'm1.v2Arrow.line', 'm1.v2Arrow.arrow1', 'm1.v2Arrow.arrow2', eqnVLF, eqnDiff] },
      { trigger: 'setVelocity1' },
      { scenario: eqnVLF, target: 'wavelength', duration: 0 },
      { goToForm: eqnVLF, target: 'wavelength', duration: 0 },
      { out: eqnVLF, duration: 0 },
      [
        { in: ['m1.balls', 'timePlot1.trace'] },
        {
          delay: 0.05,
          trigger: 'fixedSine',
        },
      ],
      { in: ['m1.lambdaArrow'], delay: 4 },
      { in: eqnVLF, delay: 1.3 },
      {
        pulse: 'm1.velocity', delay: 3, yAlign: 'bottom', scale: 1.5,
      },
      { in: ['timePlot1.periodArrow'], delay: 1 },
      { goToForm: eqnVLF, target: 'lvt', delay: 0 },
    ],
    steadyState: () => {
      m1._balls.showAll();
      timePlot1._trace.showAll();
      softReset();
      m1.custom.recording.setState({
        mode: 'sine',
        startTime: [-20],
        lastManualValue: 0,
        lastManualTime: null,
        index: m1.custom.recording.getNum(),
      });
      update(true);
      eqnVLF.showForm('wavelengthvt');
    },
  },
  /*
  ..######..##.....##.####.########.########
  .##....##.##.....##..##..##..........##...
  .##.......##.....##..##..##..........##...
  ..######..#########..##..######......##...
  .......##.##.....##..##..##..........##...
  .##....##.##.....##..##..##..........##...
  ..######..##.....##.####.##..........##...
  */
  {
    time: '4:57',
    addReference: true,
    scenario: ['default', 'right', 'wavelength'],
    form: [null, null, null],
    show: ['timePlot1.periodArrow', 'm1.lambdaArrow'],
    transition: [
      { out: ['timePlot1.xAxis', 'timePlot1.yAxis', 'timePlot1.grid', 'timePlot1.trace', 'm1.balls', eqnVLF, 'timePlot1.periodArrow', 'm1.velocity', 'm1.lambdaArrow'] },
      { scenario: m1, target: 'default' },
      { trigger: 'softReset' },
      { in: ['m1.movePad', 'm1.firstBall', 'velocityButton', 'velocity', 'freezeTimeLabel', 'freezeTimeButton', 'slowTimeLabel', 'slowTimeButton', 'pulseButton', 'resetButton', 'sineButton', 'm1.balls', 'pulseButton2'] },

    ],
  },
  {
    time: '5:11',
    scenarioCommon: 'default',
    showCommon: ['m1.xAxis', 'm1.yAxis', 'm1.grid', 'm1.balls', 'm1.envelope', 'm1.envelope2', 'm1.movePadEnv'],
    enterStateCommon: () => {
      m1._envelope.showAll();
      m1.custom.update();
      figure.fnMap.global.exec('copyEnvelopeReset');
      reset();
      m1.custom.recording.setState({
        mode: 'pulse2',
        startTime: [-4.7],
        lastManualValue: 0,
        lastManualTime: null,
        index: m1.custom.recording.getNum(),
      });
      m1._envelope.showAll();
      m1.custom.update();
      figure.fnMap.global.exec('copyEnvelope');
      m1._envelope2.showAll();
      // m1._movePadEnv.setPosition(0, 0);
      update(true);
      m1.custom.updateEqn1();
      setVelocityToggle(false);
      setSlowTimeToggle(false);
    },
    enterState: () => {
      // m1._movePadEnv.customState.x = 2.58;
      m1._movePadEnv.customState.x = 0;
      m1._envelope.showAll();
      m1.custom.update();
      figure.fnMap.global.exec('copyEnvelope');
      m1._envelope2.showAll();
      // m1._movePadEnv.setPosition(0, 0);
      update(true);
      m1.custom.updateEqn1();
    },
    transition: [
      [
        { out: ['m1.balls', 'm1.firstBall', 'm1.movePad'] },
        { in: ['m1.envelope', 'm1.envelope2', 'm1.eqn'] },
      ],
    ],
  },

  {
    time: '5:37',
    showCommon: ['m1.xAxis', 'm1.yAxis', 'm1.grid', 'm1.envelope', 'm1.envelope2', 'm1.movePadEnv', 'm1.eqn'],
    enterState: () => {
      m1._movePadEnv.customState.x = 2.58;
      update(true);
      m1.custom.updateEqn1();
    },
    transition: (done) => {
      m1.animations.new()
        .dissolveOut({ element: 'movePadEnv' })
        .dissolveIn({ element: 'xDashLine' })
        .dissolveIn({ element: 'xDashLineG', delay: 2.5 })
        .dissolveOut({ elements: ['xDashLineG', 'xDashLine'], delay: 5 })
        .dissolveIn({ elements: ['eqn1', 'movePadEnv'] })
        .whenFinished(done)
        .start();
    },
    steadyState: () => {
      m1.hide(['xDashLine', 'xDashLineG']);
      m1.show(['movePadEnv', 'eqn1']);
    },
  },

  {
    time: '6:08',
    fromForm: ['shiftedG_0'],
    form: ['shiftedG_0'],
    enterState: () => {
      m1._movePadEnv.customState.x = -1.28;
      update(true);
      m1.custom.updateEqn1();
    },
    showCommon: [],
    transition: [
      { out: ['m1.xAxis', 'm1.yAxis', 'm1.grid', 'm1.envelope', 'm1.eqn', 'm1.envelope2', 'm1.eqn1'] },
      { in: eqnWave, delay: 0.5 },
    ],
  },
  {
    form: 'shiftedG_1',
    time: '6:12',
    enterStateCommon: () => {
      setVelocityToggle(false);
      setSlowTimeToggle(false);
    },
  },
  { form: 'shiftedG_2', time: '6:15' },
  { form: 'shiftedG_3', time: '6:21' },
  { form: 'shiftedG_4', time: '6:22.5' },
  { form: 'shiftedG_5', time: '6:24' },
  { form: 'shiftedG_6', time: '6:34' },
  { form: 'shiftedG_7', time: '6:37' },
  { form: 'final', time: '6:40' },
  {
    time: '6:46',
    transition: { scenario: eqnWave, target: 'high' },
  },
  {
    form: 'highlight',
    time: '6:48',
    scenarioCommon: ['default', 'high'],
    transition: [
      [
        { goToForm: eqnWave, target: 'highlight' },
        { in: 'eqnWaveDescription' },
      ],
    ],
  },
  {
    form: 'final',
    time: '7:07',
    transition: [
      [
        { out: 'eqnWaveDescription' },
        { goToForm: eqnWave, target: 'final' },
      ],
    ],
  },

  /*
  ..#######..##....##.########
  .##.....##.###...##.##......
  .##.....##.####..##.##......
  .##.....##.##.##.##.######..
  .##.....##.##..####.##......
  .##.....##.##...###.##......
  ..#######..##....##.########
  */
  {
    addReference: true,
    time: '7:08',
    show: ['m1.xAxis', 'm1.yAxis', 'm1.envelope', 'm1.envelope2', 'm1.movePadEnv', 'm1.eqn', 'm1.eqn1'],
    scenario: 'one',
    enterState: () => {
      m1._envelope.showAll();
      m1.custom.update();
      figure.fnMap.global.exec('copyEnvelopeReset');
      reset();
      m1.custom.recording.setState({
        mode: 'pulse2',
        startTime: [-4.7],
        lastManualValue: 0,
        lastManualTime: null,
        index: m1.custom.recording.getNum(),
      });
      m1._movePadEnv.customState.x = 1.28;
      m1._envelope.showAll();
      m1.custom.update();
      figure.fnMap.global.exec('copyEnvelope');
      m1._envelope2.showAll();
      update(true);
      m1.custom.updateEqn1();
      setVelocityToggle(false);
      setSlowTimeToggle(false);
      arrow1.setPosition(eqnWave._min.getPositionInBounds('figure', 'center', 'bottom').sub(0, 0.6));
      arrow1.setRotation(Math.PI / 2);
      m1._envelope.dim();
      m1._eqn.dim();
    },
    transition: [
      [
        { in: ['m1.xAxis', 'm1.yAxis', 'm1.envelope', 'm1.envelope2', 'm1.movePadEnv', 'm1.eqn', 'm1.eqn1'] },
      ],
      { in: ['arrow1', 'arrow2'], delay: 6 },
      { out: ['m1.xAxis', 'm1.yAxis', 'm1.envelope', 'm1.envelope2', 'm1.movePadEnv', 'm1.eqn', 'm1.eqn1', 'arrow1', 'arrow2'], delay: 5 },
    ],
    leaveState: () => {
      m1._envelope.undim();
      m1._eqn.undim();
    },
  },

  /*
  ..######..####.##....##
  .##....##..##..###...##
  .##........##..####..##
  ..######...##..##.##.##
  .......##..##..##..####
  .##....##..##..##...###
  ..######..####.##....##
  */
  { form: 'sinInput_g', time: '7:24.5' },
  { form: 'sinInput', time: '7:27', show: 'sinMoreButton' },
  { form: 'sinInput_1', time: '7:29', show: 'sinMoreButton' },
  { form: 'sinInput_2', time: '7:31.5', show: 'sinMoreButton' },
  { form: 'sinInput_3', time: '7:33', show: 'sinMoreButton' },
  // { form: 'sinInput_4', time: '7:35.5' },
  { form: 'sinInput_5', time: '7:35', show: 'sinMoreButton' },

  /*
  .##.....##.##.....##.##.......########.####.########..##.......########
  .###...###.##.....##.##..........##.....##..##.....##.##.......##......
  .####.####.##.....##.##..........##.....##..##.....##.##.......##......
  .##.###.##.##.....##.##..........##.....##..########..##.......######..
  .##.....##.##.....##.##..........##.....##..##........##.......##......
  .##.....##.##.....##.##..........##.....##..##........##.......##......
  .##.....##..#######..########....##....####.##........########.########
  */
  {
    form: null,
    time: '7:39',
    enterState: () => {
      figure.get('waveInterference').customState.offset = 7;
      figure.get('waveInterference').customState.v = 1.1;
    },
    transition: [
      { goToForm: eqnWave, target: 'final' },
      { trigger: 'calcWave', payload: 0 },
      [
        { in: 'waveInterference.line', delay: 1 },
        { trigger: 'animateSingleWave', duration: 8 },
      ],
      { delay: 0.5 },
      [
        { out: 'waveInterference.line' },
        { out: eqnWave },
      ],
    ],
  },
  {
    form: null,
    scenario: ['high', 'center'],
    time: '7:48.5',
    enterState: () => {
      figure.get('waveInterference').customState.offset = 7.5;
      figure.get('waveInterference').customState.v = 1.1;
    },
    transition: [
      { trigger: 'calcInterference', payload: 0 },
      [
        { in: 'waveInterference.line' },
        { trigger: 'animateInterference', duration: 7 },
      ],
      { out: 'waveInterference.line' },
    ],
  },

  /*
  .########..####.########.########
  .##.....##..##..##.......##......
  .##.....##..##..##.......##......
  .##.....##..##..######...######..
  .##.....##..##..##.......##......
  .##.....##..##..##.......##......
  .########..####.##.......##......
  */
  {
    scenarioCommon: 'default',
    scenario: ['default', 'high'],
    time: '7:57',
    fromForm: [null, null, 'diffMono', null],
    form: [null, null, 'diffMono', null],
    enterState: () => {
      eqnDiff.setScenario('default');
    },
    transition: [
      { delay: 0.5 },
      [
        { in: 'eqnDiff.d2', delay: dd(true), duration: 0.3 },
        { in: 'eqnDiff._2_2', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff.y_2', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff.vin2', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff.d4', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff.t', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff._2_4', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff.equals', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff.v', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff._2_9', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff.d1', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff._2_1', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff.y_1', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff.vin1', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff.d3', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff.x', delay: dd(), duration: 0.3 },
        { in: 'eqnDiff._2_3', delay: dd(), duration: 0.3 },
      ],
    ],
  },
  { form: [null, null, 'diffMono', 'waveEqn'], scenarioCommon: ['default', 'wave'], time: '8:05' },
  { form: [null, null, 'diffMono', 'waveEqn1'], time: '8:07' },
  {
    form: [null, null, 'diffSolnMono', null],
    time: '8:14',
    transition: [
      { out: 'defs' },
      [
        { scenario: eqnDiff, target: 'diffHigh' },
        { goToForm: eqnDiff, target: 'diffSolnMono', delay: 0.5 },
      ],
    ],
  },
  {
    time: '8:18',
    scenario: 'diffHigh',
    form: [null, null, 'diffSolnMono1', null],
    enterState: () => {
      eqnDiff.showForm('diffSolnMono1');
    },
    transition: [
      { in: 'eqnDiff.y_5_' },
      { delay: 1.5 },
      [
        { in: 'eqnDiff.equals2' },
        { in: 'eqnDiff.plus1_' },
      ],
      { in: { eqnDiff: ['g_', 'lb4', 'x_2_', 'min1_', 'v_2_', 't_2_', 'rb4'] }, delay: 1.8 },
      { in: { eqnDiff: ['h_', 'lb5', 'x_3_', 'plus2_', 'v_3_', 't_3_', 'rb5'] }, delay: 8 },
    ],
  },
  {
    time: '8:34.5',
    scenario: ['diffHigh', 'waveLow'],
    form: [null, null, 'diffSolnMono2', null],
    enterState: () => {
      figure.get('waveInterference').customState.offset = 10;
      figure.get('waveInterference').customState.v = 0.5;
    },
    transition: [
      { trigger: 'calcInterference', payload: 0 },
      { goToForm: eqnDiff, target: 'diffSolnMono2' },
      [
        { in: 'waveInterference.line' },
        { trigger: 'animateInterference', duration: 8.5 },
        { in: 'waveInterference.g', delay: 2 },
        {
          pulse: 'waveInterference.g', delay: 2.1, xAlign: 'left', yAlign: 'top',
        },
        { pulse: 'eqnDiff.g_', delay: 2.1, xAlign: 0.8 },
        { in: 'waveInterference.h', delay: 4 },
        {
          pulse: 'waveInterference.h', delay: 4.1, xAlign: 'right', yAlign: 'top',
        },
        { pulse: 'eqnDiff.h_', delay: 4.1, xAlign: 0.8 },
      ],
      { out: 'waveInterference' },
    ],
  },
  {
    time: '8:45',
    scenario: 'diffHigh',
    form: [null, null, 'diffMono', null],
    enterState: () => {
      eqnDiff.showForm('diffSolnMono2');
      // eqnDiff.hide();
    },
    transition: [
      { out: { eqnDiff: ['y_5_', 'equals2', 'plus1_', 'g_', 'lb4', 'x_2_', 'min1_', 'v_2_', 't_2_', 'rb4', 'h_', 'lb5', 'x_3_', 'plus2_', 'v_3_', 't_3_', 'rb5'] } },
      [
        { goToForm: eqnDiff, target: 'diffMono' },
        { scenario: eqnDiff, target: 'default' },
      ],
    ],
  },
  { scenarioCommon: ['default', 'wave'], form: [null, null, 'diffSeparate', null], time: '8:56.5' },
  { form: [null, null, 'diffSeparate', 'derivative1'], time: '8:58.5' },
  { form: [null, null, 'diffSeparate', 'derivative2'], time: '9:01' },

  /*
  ..######..##.....##....###....########..########
  .##....##.##.....##...##.##...##.....##.##......
  .##.......##.....##..##...##..##.....##.##......
  ..######..#########.##.....##.########..######..
  .......##.##.....##.#########.##........##......
  .##....##.##.....##.##.....##.##........##......
  ..######..##.....##.##.....##.##........########
  */
  {
    time: '9:03.5',
    form: [null, null, 'diff', null],
    enterState: () => {
      diffExplanation.showForm('diffExplanation');
    },
    transition: [
      { out: defs },
      { goToForm: eqnDiff, start: 'diffSeparate', target: 'diff' },
      { in: diffExplanation },
    ],
    exec: ['9:14.5', 'hideHighlighters'],
  },
  {
    time: '9:25',
    scenario: 'right',
    enterState: 'reset',
    form: [null, null, null, null],
    transition: [
      { out: ['diffExplanation', 'eqnDiff'] },
      { in: ['m1.xAxis', 'm1.yAxis', 'm1.balls', 'm1.movePad', 'm1.firstBall', 'timePlot1.xAxis', 'timePlot1.yAxis', 'timePlot1.trace', 'resetButton', 'slowTimeButton', 'slowTimeLabel', 'freezeTimeButton', 'freezeTimeLabel', 'pulseButton', 'sineButton', 'pulseButton2', 'm1.grid', 'timePlot1.grid'] },
    ],
  },

  {
    time: '9:34',
    scenario: 'right',
    show: ['m1.xAxis', 'm1.yAxis', 'm1.balls', 'm1.movePad', 'm1.firstBall', 'timePlot1.xAxis', 'timePlot1.yAxis', 'timePlot1.trace', 'resetButton', 'slowTimeButton', 'slowTimeLabel', 'freezeTimeButton', 'freezeTimeLabel', 'pulseButton', 'sineButton', 'pulseButton2', 'm1.grid', 'timePlot1.grid'],
    transition: [
      { out: ['pulseButton', 'sineButton', 'pulseButton2', 'freezeTimeButton', 'freezeTimeLabel', 'slowTimeButton', 'slowTimeLabel', 'm1.movePad', 'm1.firstBall'] },
      [
        { position: 'timePlot1.trace', target: [14.2, 0], duration: 4 },
        { scale: 'timePlot1.trace', target: [-2, 1], duration: 4 },
      ],
      { delay: 1.5 },
      [
        { position: 'timePlot1.trace', target: [0, 0] },
        { scale: 'timePlot1.trace', target: [1, 1] },
      ],
      { in: ['pulseButton', 'sineButton', 'pulseButton2', 'freezeTimeButton', 'freezeTimeLabel', 'slowTimeButton', 'slowTimeLabel', 'resetButton', 'm1.movePad', 'm1.firstBall'] },
    ],
  },

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
    time: '9:47',
    clear: true,
    // enterState: 'reset',
    show: ['m1.xAxis', 'm1.yAxis', 'm1.balls', 'm1.movePad', 'm1.firstBall', 'timePlot1.xAxis', 'timePlot1.yAxis', 'timePlot1.trace', 'resetButton', 'slowTimeButton', 'slowTimeLabel', 'freezeTimeButton', 'freezeTimeLabel', 'pulseButton', 'sineButton', 'pulseButton2', 'm1.grid', 'timePlot1.grid'],
    scenarioCommon: ['default', 'definition'],
    scenario: 'right',
    transition: [
      { out: ['timePlot1.xAxis', 'timePlot1.yAxis', 'timePlot1.trace', 'timePlot1.grid', 'resetButton', 'slowTimeButton', 'slowTimeLabel', 'freezeTimeButton', 'freezeTimeLabel', 'pulseButton', 'sineButton', 'pulseButton2', 'm1.movePad', 'm1.firstBall'] },
      { scenario: 'm1', start: 'right', target: 'default' },
      { in: ['resetButton', 'slowTimeButton', 'slowTimeLabel', 'freezeTimeButton', 'freezeTimeLabel', 'pulseButton', 'sineButton', 'pulseButton2', 'm1.movePad', 'm1.firstBall'] },
      // { in: 'm1.disturbanceLines', delay: 12 },
    ],
  },
  {
    time: '9:56.5',
    enterState: () => {
      setSlowTimeToggle(true);
    },
    show: ['m1.xAxis', 'm1.yAxis', 'm1.balls', 'm1.movePad', 'm1.firstBall', 'resetButton', 'slowTimeButton', 'slowTimeLabel', 'freezeTimeButton', 'freezeTimeLabel', 'pulseButton', 'sineButton', 'pulseButton2', 'm1.grid'],
    transition: [
      { in: 'm1.ballh' },
      {
        trigger: 'growArrow', payload: ['m1.disturbanceDirection', 1.5], duration: 2, delay: 0.5,
      },
      {
        trigger: 'growArrow', payload: ['m1.waveDirection', 1.5], duration: 2, delay: 0.5,
      },
    ],
    steadyState: () => {
      figure.fnMap.exec('setArrow', 'm1.disturbanceDirection');
      figure.fnMap.exec('setArrow', 'm1.waveDirection');
    },
  },
  {
    time: '10:09',
    enterState: () => {
      setSlowTimeToggle(true);
    },
    show: ['m1.xAxis', 'm1.yAxis', 'm1.balls', 'm1.movePad', 'm1.firstBall', 'resetButton', 'slowTimeButton', 'slowTimeLabel', 'freezeTimeButton', 'freezeTimeLabel', 'pulseButton', 'sineButton', 'pulseButton2', 'm1.grid', 'm1.disturbanceDirection', 'm1.waveDirection', 'm1.ballh'],
    fromForm: [null, null, null, 'transverseWave'],
    form: [null, null, null, 'transverseDef'],
    transition: [
      { in: defs },
      { goToForm: defs, target: 'transverseDef', delay: 2 },
    ],
    steadyState: () => {
      figure.fnMap.exec('setArrow', 'm1.disturbanceDirection');
      figure.fnMap.exec('setArrow', 'm1.waveDirection');
    },
  },

  /*
  ..######...#######..##.....##.##....##.########.
  .##....##.##.....##.##.....##.###...##.##.....##
  .##.......##.....##.##.....##.####..##.##.....##
  ..######..##.....##.##.....##.##.##.##.##.....##
  .......##.##.....##.##.....##.##..####.##.....##
  .##....##.##.....##.##.....##.##...###.##.....##
  ..######...#######...#######..##....##.########.
  */
  {
    time: '10:15',
    showCommon: ['resetButton', 'slowTimeButton', 'slowTimeLabel', 'freezeTimeButton', 'freezeTimeLabel', 'pulseButton', 'sineButton'],
    form: [null, null, null, null],
    hide: 'm1',
    enterState: () => {
      setVelocityToggle(false);
      setSlowTimeToggle(false);
    },
    transition: [
      { out: ['m1.balls', 'm1.grid', 'm1.movePad', 'm1.firstBall', defs, 'm1.disturbanceDirection', 'm1.waveDirection', 'm1.xAxis', 'm1.yAxis', 'pulseButton2', 'm1.ballh'] },
      // { out: 'm1', duration: 0 },
      { trigger: 'softReset' },
      { in: ['p1.grid', 'p1.particles', 'p1.movePad', 'p1.diaphragm'] },
      // { in: ['pulseButton', 'sineButton', 'resetButton'] },
    ],
  },
  {
    time: '10:25',
    show: ['pulseButton', 'sineButton', 'resetButton', 'p1'],
    hide: ['p1.waveDirection', 'p1.disturbanceDirection'],
    transition: [
      { in: ['p1.c1', 'p1.c6'] },
      { delay: 1 },
      [
        { trigger: 'growArrow', payload: ['p1.waveDirection', 1.5], duration: 2 },
        { trigger: 'growArrow', payload: ['p1.disturbanceDirection', 1.5], duration: 2 },
      ],
    ],
    steadyState: () => {
      figure.fnMap.exec('setArrow', 'p1.disturbanceDirection');
      figure.fnMap.exec('setArrow', 'p1.waveDirection');
    },
  },
  {
    time: '10:35',
    form: [null, null, null, 'longWave'],
    show: ['pulseButton', 'sineButton', 'resetButton', 'p1'],
  },
  {
    time: '10:39',
    form: [null, null, null, 'longDef'],
    show: ['pulseButton', 'sineButton', 'resetButton', 'p1'],
  },

  /*
  ..#######...######..########....###....##....##
  .##.....##.##....##.##.........##.##...###...##
  .##.....##.##.......##........##...##..####..##
  .##.....##.##.......######...##.....##.##.##.##
  .##.....##.##.......##.......#########.##..####
  .##.....##.##....##.##.......##.....##.##...###
  ..#######...######..########.##.....##.##....##
  */
  {
    time: '10:45',
    hide: 'm1',
    showCommon: [],
    form: [null, null, null, null],
    enterState: 'unpause',
    transition: [
      { out: ['pulseButton', 'sineButton', 'resetButton', 'p1', defs] },
      { in: [{ ocean: ['particles', 'grid'] }, 'freezeTimeButton', 'freezeTimeLabel'] },
    ],
    // leaveState: 'softReset',
  },
  {
    time: '10:52',
    hide: 'm1',
    show: ['ocean', 'freezeTimeButton', 'freezeTimeLabel'],
    fromForm: [null, null, null, 'ocean'],
    form: [null, null, null, 'ocean'],
    enterState: 'unpause',
    transition: [
      { in: { ocean: ['h1', 'h2', 'h3', 'h4'] } },
      { in: { ocean: ['c1', 'c2', 'c3', 'c4'] }, delay: 0.5 },
      { in: defs, delay: 4.5 },
    ],
  },

  /*
  .########.##....##.########.
  .##.......###...##.##.....##
  .##.......####..##.##.....##
  .######...##.##.##.##.....##
  .##.......##..####.##.....##
  .##.......##...###.##.....##
  .########.##....##.########.
  */
  {
    time: '11:11.3',
    clear: true,
    show: 'link',
    enterState: () => {
      figureOneEqn.showForm('0');
    },
    transition: [
      { out: [defs, 'ocean'] },
      { in: figureOneEqn },
      { in: 'link', delay: 1.8 },
      { goToForm: figureOneEqn, target: '1', delay: 0.8 },
      { goToForm: figureOneEqn, target: '2', delay: 0.8 },
      { goToForm: figureOneEqn, target: '3', delay: 0.8 },
      { goToForm: figureOneEqn, target: '4', delay: 0.8 },
      { goToForm: figureOneEqn, target: '0', delay: 0.8 },
    ],
  },
]);


// Load audio, states and events data
figure.recorder.loadAudioTrack(new Audio(window.location.href.replace(/\/index.html|\/src.index.html|\/src|\/docs|\/test.index.html|\/tests\/$|\/$/, '/src/audio-track.mp3')));

figure.recorder.loadVideoTrack(window.location.href.replace(/\/index.html|\/src.index.html|\/src|\/docs|\/test.index.html|\/tests\/$|\/$/, '/src/video-track.json'), getLoader('video'));


figure.recorder.notifications.add('stateSet', () => pause());
figure.recorder.notifications.add('seek', () => pause());
figure.recorder.notifications.add('playbackStopped', () => pause());

// TODO - add more onClick notifications here for all touchable elements
title._movePad.notifications.add('onClick', () => unpause());
m1._movePad.notifications.add('onClick', () => unpause());
p1._movePad.notifications.add('onClick', () => unpause());

update(true);

figure.recorder.notifications.add('seek', () => {
  update(true);
});

document.getElementById('initial-loader').classList.add('hide-loader');
document.getElementById('loader').classList.remove('hide-loader');
