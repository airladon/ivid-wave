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
        wave: { position: [11.5, 2.5], scale: 1.4 },
      },
    },
    elements: {
      Transverse: { color: colorWave },
      Wave: { color: colorWave },
      propDisturb: 'propogating disturbance',
      across: 'extend or direct across',
      colon: ': ',
      adjective: { text: '(adjective)', style: 'italic' },
      long: { text: 'Longitudinal', color: colorWave },
      along: 'lengthwise or along',
      Single: { color: colorYellowText },
      Multiple: { color: colorYellowText },
      'Wave Equation': { color: colorYellowText },
    },
    forms: {
      waveDef: ['Wave', 'colon', 'propDisturb'],
      transverseWave: ['Transverse', '  ', 'Wave'],
      transverseDef: ['Transverse', 'colon', 'across'],
      longWave: {
        content: ['long', '  ', 'Wave'],
        alignment: { yAlign: -0.4 },
      },
      longDef: {
        content: ['long', 'colon', 'along'],
        alignment: { yAlign: -0.4 },
      },
      single1: ['Single', '  ', cont('', 4), '  ', cont('', 2.2)],
      single2: ['Single', '  ', cont('travelling', 4), '  ', cont('', 2.2)],
      single3: ['Single', '  ', cont('travelling', 4), '  ', cont('wave', 2.2)],
      multi: ['Multiple', '  ', cont('wave', 2.2), 's'],
      waveEqn: 'Wave Equation',
      waveEqn1: bc('Wave Equation', '(One dimension)', '', 0.04, 0.04, 0.5),
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