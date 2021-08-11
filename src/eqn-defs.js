function addDefsEquation(name) {
  const description = figure.add({
    name,
    make: 'equation',
    color: colorLight,
    // font: { family: 'TeXGyreTermes' },
    // textFont: { family: 'TeXGyreTermes', style: 'normal' },
    font: { family: 'Open Sans' },
    textFont: { family: 'Open Sans', style: 'normal' },
    scale: 4.7,
    position: [12, 1],
    formDefaults: { alignment: { xAlign: 'center' } },
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
      Transverse: { color: colorYellowText },
      Transverse_1: { color: colorYellowText },
      Wave: { color: colorYellowText },
      propDisturb: 'propogating disturbance',
      across: 'extend or direct across',
      colon: ': ',
      adjective: { text: 'adjective', style: 'italic' },
      long: { text: 'Longitudinal', color: colorYellowText },
      long1: { text: 'Longitudinal', color: colorYellowText },
      along: 'lengthwise or along',
      Single: { color: colorYellowText },
      Multiple: { color: colorYellowText },
      'Wave Equation': { color: colorYellowText },
      'Second Derivative: ': { color: colorYellowText },
    },
    forms: {
      waveDef: ['Wave', 'colon', 'propDisturb'],
      transverseWave: ['Transverse', '  ', 'Wave'],
      // transverseDef: ['Transverse', 'colon', 'across'],
      transverseDef: lines([
        ['Transverse', '  ', 'Wave'],
        scale(['Transverse_1', '_: (', 'adjective', '_)  extend or direct across'], 0.5),
      ], 0.8, 'center'),
      longWave: ['long', '  ', 'Wave'],
      longDef: lines([
        ['long', '  ', 'Wave'],
        scale(['long1', '_: (', 'adjective', '_)  extend or direct across'], 0.5),
      ], 0.8, 'center'),
      ocean: ['long', '_ and ', 'Transverse', '_ '],
      // longWave: {
      //   content: ['long', '  ', 'Wave'],
      //   alignment: { yAlign: -0.4 },
      // },
      // longDef: {
      //   content: ['long', 'colon', 'along'],
      //   alignment: { yAlign: -0.4 },
      // },
      single1: ['Single', '  ', cont('', 4), '  ', cont('', 2.2)],
      single2: ['Single', '  ', cont('travelling', 4), '  ', cont('', 2.2)],
      single3: ['Single', '  ', cont('travelling', 4), '  ', cont('wave', 2.2)],
      multi: ['Multiple', '  ', cont('wave', 2.2), 's'],
      waveEqn: 'Wave Equation',
      waveEqn1: bc('Wave Equation', '(One dimension)', '', 0.04, 0.04, 0.5),
      derivative: scale(['Second Derivative: ', 'Curvature or Shape'], 0.7),
      // initialSpace: ['Disturbance g(x) at an initial time'],
      // both: {
      //   lines: {
      //     content: [
      //       ['Disturbance g(x) at an initial time'],
      //       ['Disturbance h(t) at an initial position'],
      //     ],
      //     baselineSpace: 4,
      //   },
      // },
    },
  });
}