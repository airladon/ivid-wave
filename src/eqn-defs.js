/* eslint-disable camelcase, object-curly-newline, max-len */
/* globals colorLight, figure, lines, bc, colorYellow, scale, cont */

// eslint-disable-next-line no-unused-vars
function addDefsEquation(name) {
  figure.add({
    name,
    make: 'equation',
    color: colorLight,
    font: { family: 'Open Sans', width: 1.12, midAscent: 1.1, maxAscent: 1.5 },
    textFont: { family: 'Open Sans', style: 'normal', width: 1.12, midAscent: 1.1, maxAscent: 1.5 },
    scale: 4.7,
    position: [12, 1],
    formDefaults: { alignment: { xAlign: 'center' }, lazyLayout: true },
    mods: {
      scenarios: {
        default: { position: [12, 1] },
        top: { position: [12, 10.5] },
        highSmall: { position: [12.5, 5.5], scale: 1.4 },
        wave: { position: [12, 2.5], scale: 1.4 },
        definition: { position: [12, 10.5], scale: 1 },
      },
    },
    elements: {
      Transverse: { color: colorYellow },
      Transverse_1: { color: colorYellow },
      Wave: { color: colorYellow },
      propDisturb: 'propogating disturbance',
      across: 'extend or direct across',
      colon: ': ',
      adjective: { text: 'adjective', style: 'italic' },
      long: { text: 'Longitudinal', color: colorYellow },
      long1: { text: 'Longitudinal', color: colorYellow, width: 1.1 },
      along: 'lengthwise or along',
      Single: { color: colorYellow },
      Multiple: { color: colorYellow },
      'Wave Equation': { color: colorYellow },
      'Second Derivative: ': { color: colorYellow },
    },
    forms: {
      waveDef: ['Wave', 'colon', 'propDisturb'],
      transverseWave: ['Transverse', '  ', 'Wave'],
      transverseDef: lines([
        ['Transverse', '  ', 'Wave'],
        scale(['Transverse_1', '_: ', '(adjective) extended or directed across'], 0.5),
      ], 0.8, 'center'),
      longWave: ['long', '  ', 'Wave'],
      longDef: lines([
        ['long', '  ', 'Wave'],
        scale(['long1', '_: ', '(adjective) placed or running lengthwise'], 0.5),
      ], 0.8, 'center'),
      ocean: ['Transverse', '_ and ', 'long', '_ '],
      single1: ['Single', '  ', cont('', 4), '  ', cont('', 2.2)],
      single2: ['Single', '  ', cont('travelling', 3.9), '  ', cont('', 2.1)],
      single3: ['Single', '  ', cont('travelling', 3.9), '  ', cont('wave', 2.1)],
      multi: ['Multiple', ' ', cont('wave', 2), 's'],
      waveEqn: 'Wave Equation',
      waveEqn1: bc('Wave Equation', '(For one dimension)', '', 0.04, 0.04, 0.5),
      derivative1: scale(['Second Derivative: ', cont('', 5.9)], 0.7),
      derivative2: scale(['Second Derivative: ', cont('Shape or Curvature', 5.9)], 0.7),
    },
  });
}
