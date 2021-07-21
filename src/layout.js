
function addFigureElements() {
  figure.add([
    button('pulseButton1', [-2.7, -1.3], 'Pulse'),
    // button('pulseButton2', [2.1, 0.15], 'Pulse 2'),
    // button('sineButton', [1.3, 0.15], 'Sine'),
    button('resetButton', [2.7, -1.3], 'Reset'),
    button('freezeTimeButton', [2.15, -1.3], 'Off'),
    button('slowTimeButton', [1.35, -1.3], 'Off'),
    button('velocityButton', [-0.4, -1.3], '1v'),
    // button('velocityButton2', [2, 1.04], 'Fast'),
    // button('freqButton1', [-0.7, 1.9], 'Fast'),
    // button('freqButton2', [-0.7, 1.04], 'Fast'),
  ]);
  figure.add([
    label('freezeTimeLabel', [1.8, -1.3], color4, 'Freeze:'),
    label('slowTimeLabel', [0.9, -1.3], color4, ['Slow Motion:']),
    // label('disturbance', [0.45, 0.15], colorText, ['Disturbance:']),
    label('velocity', [-0.75, -1.3], color4, 'Velocity:'),
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

  const m1 = addMedium('m1', 3.7, 2, 1, [-0.9, 0], false, 0.03, 0.04);
  // m1.setPosition(0.1, 0);
  const timePlot1 = addTimePlot(
    'timePlot1', 1.65, 10, m1.custom.recording, 1, [-2.7, 0],
  );
};