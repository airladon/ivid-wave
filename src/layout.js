
function addFigureElements() {
  figure.add([
    button('pulseButton1', [1.2, 0.8], 'Pulse'),
    // button('pulseButton2', [2.1, 0.15], 'Pulse 2'),
    // button('sineButton', [1.3, 0.15], 'Sine'),
    button('resetButton', [22.8, 0.8], 'Reset'),
    // button('freezeTimeButton', [20.6, 0.8], 'Off'),
    // button('slowTimeButton', [17.4, 0.8], 'Off'),
    // button('velocityButton', [10.4, 0.8], '1v'),
    toggle('freezeTimeButton', [20.6, 0.8], 0.5, false),
    toggle('slowTimeButton', [17.4, 0.8], 0.5, false),
    toggle('velocityButton', [10.4, 0.8], 0.5, false),
    // button('velocityButton2', [2, 1.04], 'Fast'),
    // button('freqButton1', [-0.7, 1.9], 'Fast'),
    // button('freqButton2', [-0.7, 1.04], 'Fast'),
  ]);
  figure.add([
    label('freezeTimeLabel', [19.2, 0.8], color4, 'Freeze:'),
    label('slowTimeLabel', [15.6, 0.8], color4, ['Slow Motion:']),
    // label('disturbance', [0.45, 0.15], colorText, ['Disturbance:']),
    label('velocity', [8.8, 0.8], color4, '2x Velocity:'),
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

  const m1 = addMedium('m1', 14, 10, 2, [8, 6], false, 0.12, 0.125);
  m1.setPosition(0.1, 0);
  const timePlot1 = addTimePlot(
    'timePlot1', 6, 10.5, m1.custom.recording, 2 * 14 / 10, [1, 6],
  );
};