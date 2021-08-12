
function addFigureElements() {
  let t = performance.now()
  let newT = performance.now()
  const stamp = (message) => {
    newT = performance.now();
    console.log(message, Fig.round(newT - t));
    t = newT;
  }
  figure.add({
    name: 'highlighter',
    make: 'collections.rectangle',
    line: { width: 0.03 },
    color: colorLight,
  });
  figure.add({
    name: 'highlighter2',
    make: 'collections.rectangle',
    line: { width: 0.03 },
    color: colorLight,
  });
  figure.add({
    name: 'highlighter3',
    make: 'collections.rectangle',
    line: { width: 0.03 },
    corner: { radius: 0.2, sides: 5 },
    color: colorLight,
  });
  figure.add([
    button('pulseButton', [1.2, 0.8], 'Pulse'),
    button('pulseButton2', [4.8, 0.8], 'Pulse 2'),
    button('sineButton', [3, 0.8], 'Sine'),
    button('sine2fButton', [4.8, 0.8], 'Sine 2|f|', { f: { font: { style: 'italic' } } }),
    button('resetButton', [22.8, 0.8], 'Reset'),
    // button('freezeTimeButton', [20.6, 0.8], 'Off'),
    // button('slowTimeButton', [17.4, 0.8], 'Off'),
    // button('velocityButton', [10.4, 0.8], '1v'),
    toggle('freezeTimeButton', [20.5, 1.1], 0.5, false),
    toggle('slowTimeButton', [18, 1.1], 0.5, false),
    toggle('velocityButton', [15.5, 1.1], 0.5, false),
    // button('velocityButton2', [2, 1.04], 'Fast'),
    // button('freqButton1', [-0.7, 1.9], 'Fast'),
    // button('freqButton2', [-0.7, 1.04], 'Fast'),
  ]);
  figure.add([
    label('freezeTimeLabel', [20.5, 0.4], color4, 'Freeze'),
    label('slowTimeLabel', [18, 0.4], color4, ['Slow Motion']),
    // label('disturbance', [0.45, 0.15], colorText, ['Disturbance:']),
    label('velocity', [15.5, 0.4], color4, '2x Velocity'),
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
  stamp(1)
  addDefsEquation('defs');
  stamp(2)
  // figure.add({
  //   name: 'waveDefinition',
  //   make: 'textLines',
  //   font: { size: 1, color: colorLight },
  //   xAlign: 'center',
  //   position: [11.5, 1],
  //   text: ['|Wave|: propogating disturbance'],
  //   modifiers: {
  //     Wave: { font: { color: colorGText } },
  //   },
  // });
  // figure.add({
  //   name: 'tranvserseDef',
  //   make: 'textLines',
  //   font: { size: 1, color: colorLight },
  //   xAlign: 'left',
  //   position: [12, 1],
  //   text: ['|Transverse|: acting, lying, or being across'],
  //   modifiers: {
  //     Transverse: { font: { color: colorGText } },
  //   },
  // });
  // const recorder = new Recorder(10, time);
  const m1 = addMedium('m1', 13, 10, 2.5, [5.5, 6], false, 0.12, 0.125, recorder);
  m1.setPosition(0.1, 0);
  stamp('medium')
  const timePlot1 = addTimePlot(
    'timePlot1', 6.5, 10.5, m1.custom.recording, 2.5 * 13 / 10, [1, 6],
  );
  stamp('timePlot')
  const pressurePlot = addPressureMedium('p1', 18, 2, 0.1, 0.4, recorder);
  stamp('pressure')
  addOceanMedium('ocean', 24, 4, 0.07, 0.4);
  stamp('ocean')
  // addSineTEquation('eqnSineT');
  // addSinXEquation('eqnSinX');
  // addSinTEquation('eqnSinT');
  addVLFEquation('eqnVLF');
  addDiffEquation('eqnDiff');
  addTravellingWaveEquation('eqnWave');
  // addMaxwellEquation('eqnMaxwell');
  // addTimeWave('eqnGenT');
  stamp('equations')
  // addTitle(2.88 * 4, 1.44 * 4, 0.1);
  addTitle(8, 4, 0.05, recorder);
  // addIntro(24, 4, 0.1);
  addExamples();
  stamp('titles')
  figure.showTouchBorders = () => {
    const elements = figure.elements.getAllElements();
    const colors = [
      [0.5, 0.5, 1, 1],
      [0, 1, 1, 1],
      [1, 0, 1, 1],
      [1, 0, 0, 1],
      [1, 0.5, 0, 1],
      [1, 1, 1, 1],
    ];
    let colorIndex = 0;
    for (let i = 0; i < elements.length; i += 1) {
      const element = elements[i];
      if (element.isTouchable && element.isShown) {
        const touchBorder = element.getBorder('figure', 'touchBorder');
        if (touchBorder[0].length > 0) {
          for (let j = 0; j < touchBorder.length; j += 1) {
            figure.add({
              name: `buffer${i}${j}`,
              make: 'polyline',
              options: {
                points: touchBorder[j],
                width: 0.02,
                color: colors[colorIndex % colors.length],
                dash: [0.1, 0.1],
                close: true,
              },
            });
          }
          colorIndex += 1;
        }
      }
    }
  };
  figure.add([
    labelButton('timeWaveSelector', [4, 1],  [{ text: 'Initial Disturbance', font: { size: 0.35 } }, 'General Time']),
    labelButton('sinSpaceSelector', [12, 1], [{ text: 'Initial Disturbance', font: { size: 0.35 } }, 'Periodic Time']),
    labelButton('sinTimeSelector', [20, 1],  [{ text: 'Initial Disturbance', font: { size: 0.35 } }, 'Periodic Space']),
  ]);
};