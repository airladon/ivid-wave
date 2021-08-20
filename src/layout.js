/* eslint-disable camelcase, object-curly-newline, max-len */
/* globals figure, button, label, addDefsEquation, addMedium, recorder, colorLight, addTimePlot, addPressureMedium, toggle, addOceanMedium, addVLFEquation, addDiffEquation, addTravellingWaveEquation, addTitle, addExamples, addWaveInterference, labelButton, colorPosition */


// eslint-disable-next-line no-unused-vars
function addFigureElements() {
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
    toggle('freezeTimeButton', [20.5, 1.1], 0.5, false),
    toggle('slowTimeButton', [18, 1.1], 0.5, false),
    toggle('velocityButton', [15.5, 1.1], 0.5, false),
  ]);
  figure.add([
    label('freezeTimeLabel', [20.5, 0.4], colorLight, 'Freeze'),
    label('slowTimeLabel', [18, 0.4], colorLight, ['Slow Motion']),
    label('velocity', [15.5, 0.4], colorLight, '2x Velocity'),
  ]);
  addDefsEquation('defs');
  const m1 = addMedium('m1', 13, 10, 2.5, [5.5, 6], false, 0.12, 0.125, recorder);
  m1.setPosition(0.1, 0);
  addTimePlot(
    'timePlot1', 6.5, 10.5, m1.custom.recording, 2.5 * 13 / 10, [1, 6],
  );
  addPressureMedium('p1', 18, 2, 0.1, 0.4, recorder);
  addOceanMedium('ocean', 24, 4, 0.07, 0.4);
  addVLFEquation('eqnVLF');
  addDiffEquation('eqnDiff');
  addTravellingWaveEquation('eqnWave');
  addTitle(8, 4, 0.05, recorder);
  addExamples();
  addWaveInterference('waveInterference', 20);
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
    labelButton('timeWaveSelector', [4, 1], [{ text: 'Initial Disturbance', font: { size: 0.35 } }, 'General Time']),
    labelButton('sinSpaceSelector', [12, 1], [{ text: 'Initial Disturbance', font: { size: 0.35 } }, 'Periodic Time']),
    labelButton('sinTimeSelector', [20, 1], [{ text: 'Initial Disturbance', font: { size: 0.35 } }, 'Periodic Space']),
  ]);

  const end = figure.add({
    name: 'figureOneEqn',
    make: 'equation',
    scale: 1,
    position: [12, 6],
    color: colorLight,
    dimColor: colorLight,
    font: { family: 'TeXGyreTermes', size: 0.2 },
    textFont: { family: 'TeXGyreTermes', style: 'italic', size: 0.2 },
    elements: {
      lb1: { symbol: 'squareBracket', side: 'left' },
      rb1: { symbol: 'squareBracket', side: 'right' },
      s: { symbol: 'sum' },
      v: { symbol: 'vinculum' },
      v1: { symbol: 'vinculum' },
      ra: { symbol: 'radical' },
      int: { symbol: 'int' },
    },
    formDefaults: {
      alignment: { xAlign: 'center', yAlign: 'middle' },
      lazyLayout: true,
    },
    phrases: {
      figure: ['F', 'i', 'g', 'u', 'r', 'e'],
      one: ['O', 'n', 'e_'],
    },
    forms: {
      0: ['figure', ' ', 'one'],
      1: { frac: ['figure', 'v', 'one'] },
      2: { scale: [{ sumOf: ['s', { scale: ['one', 0.8] }, ['F', 'i', 'g'], ['u', 'r', 'e']] }, 1.3] },
      3: [
        { scale: [{ frac: ['u', 'v', 'F'] }, 0.7] }, { int: ['int', 'e', 'i', 'r'] }, '_  =  ', { root: { content: { sub: ['e_', 'g'] }, symbol: 'ra', root: { scale: [{ sup: ['O', 'n'] }, 0.7] } } },
      ],
      4: { matrix: [[3, 3], 'lb1', ['F', 'u', 'O', 'i', 'r', 'n', 'g', 'e', 'e_'], 'rb1'] },
    },
  });
  end.setScale(8);

  const link = figure.add({
    name: 'link',
    make: 'text',
    text: 'github.com/airladon/FigureOne',
    font: { family: 'Open Sans', size: 0.7 },
    xAlign: 'center',
    position: [12, 1],
    color: colorPosition,
    mods: {
      isTouchable: true,
    },
  });
  link.onClick = () => {
    window.open('https://github.com/airladon/FigureOne/', '_blank');
  };
}
