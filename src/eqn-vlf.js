function addVLFEquation(name) {

  const bot = (content, comment, symbol, commentSpace = 0.2, scale = 1) => ({
    bottomComment: {
      content,
      comment,
      symbol,
      commentSpace,
      commentLineSpace: 0.2,
      contentLineSpace: 0.2,
      inSize: false,
      scale,
    },
  });

  figure.add({
    name,
    make: 'equation',
    scale: 5,
    position: [12, 4],
    color: colorYellowText,
    dimColor: colorLight,
    font: { family: 'TeXGyreTermes' },
    textFont: { family: 'TeXGyreTermes' },
    elements: {
      equals: { text: ' = ' },
      lambda: '\u03bb',
      arrow1: { symbol: 'line', width: 0.04, arrow: { start: { head: 'triangle' } } },
      vin: { symbol: 'vinculum', lineWidth: 0.05 },
    },
    phrases: {
      onF: { frac: {
        numerator: '_1', denominator: 'f', symbol: 'vin', scale: 0.5,
      } },
    },
    forms: {
      vlf: ['v', 'equals', 'lambda', ' ', 'f'],
      wvt: ['w', 'equals', 'v', ' ', 'T'],
      wavelengthwvt: [bot('w', 'wavelength', 'arrow1'), 'equals', 'v', ' ', 'T'],
      lwvt: [bot('w', 'lambda', 'arrow1'), 'equals', 'v', ' ', 'T'],
      lvt: ['lambda', 'equals', 'v', ' ', 'T'],
      lvtf: ['lambda', 'equals', 'v', ' ', bot('T', 'onF', 'arrow1')],
      lvf: ['lambda', 'equals', { frac: ['v', 'vin', 'f', 0.8] }],
    },
    formDefaults: {
      alignment: { fixTo: 'equals' },
    },
    mods: {
      scenarios: {
        default: { position: [12, 6], scale: 1 },
        summary: { position: [18, 5.7], scale: 1 },
        right: { position: [14.5, 4.4], scale: 1 },
      },
    },
  });
}

