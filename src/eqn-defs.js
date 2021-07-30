function addDefsEquation(name) {
  const description = figure.add({
    name,
    make: 'equation',
    color: colorLight,
    font: { family: 'TeXGyreTermes' },
    textFont: { family: 'TeXGyreTermes', style: 'normal' },
    scale: 4.7,
    position: [12, 1],
    formDefaults: { alignment: { xAlign: 'center' } },
    // mods: {
    //   scenarios: {
    //     default: { position: [2, 2] },
    //     mathx: { position: [1, 2] },
    //   },
    // },
    elements: {
      Transverse: { color: colorWave },
      Wave: { color: colorWave },
      propDisturb: 'propogating disturbance',
      across: 'extend or direct across',
      colon: ': ',
      adjective: { text: '(adjective)', style: 'italic' },
      long: { text: 'Longitudinal', color: colorWave },
      along: 'lengthwise or along',
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
    }
  });
}