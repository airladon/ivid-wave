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
    color: colorLight,
    dimColor: colorLight,
    font: { family: 'TeXGyreTermes' },
    textFont: { family: 'TeXGyreTermes' },
    elements: {
      equals: { text: ' = ', color: colorLight },
      lambda: { text: '\u03bb', color: colorPositionText },
      arrow1: { symbol: 'line', width: 0.04, arrow: { start: { head: 'triangle' } } },
      vin: { symbol: 'vinculum', lineWidth: 0.05 },
      v: { color: colorVelocityText },
      T: { color: colorTimeText },
      w: { color: colorPositionText },
      wavelength: { color: colorPositionText},
      f: { color: colorTimeText },
    },
    phrases: {
      onF: { frac: {
        numerator: '_1', denominator: 'f', symbol: 'vin', scale: 0.5,
      } },
    },
    formDefaults: {
      translation: {
          lambda: ['linear'],
          v: ['linear'],
        },
    },
    forms: {
      vlf: {
        content: ['v', 'equals', 'lambda', ' ', 'f'],
        translation: {
          lambda: ['curved', 'down', 0.8],
          v: ['curved', 'up', 0.5],
        },
      },
      wAlone: { content: 'w' },
      we: { content: ['w', 'equals'] },
      wvt: { content: ['w', 'equals', 'v', ' ', 'T'] },
      wvt1: ['w', 'equals', 'v', ' ', 'T'],
      wavelengthwvt: [bot('w', [bot('lambda', { scale: ['wavelength', 0.6] }, '', 0.03)], 'arrow1'), 'equals', 'v', ' ', 'T'],
      lwvt: [bot('w', 'lambda', 'arrow1'), 'equals', 'v', ' ', 'T'],
      lvt: ['lambda', 'equals', 'v', ' ', 'T'],
      lvtf: ['lambda', 'equals', 'v', ' ', bot('T', 'onF', 'arrow1', 0.15)],
      lvf: ['lambda', 'equals', { frac: { numerator: 'v', symbol: 'vin', denominator: 'f', scale: 0.8, numeratorSpace: 0.02, denominatorSpace: 0.02 } }],
      l: { content: 'lambda', alignment: { xAlign: -0.6 } },
      we6: ['w', 'equals', '_6'],
      we12: ['w', 'equals', '_12'],
    },
    formDefaults: {
      alignment: { fixTo: 'equals' },
    },
    mods: {
      scenarios: {
        default: { position: [12, 6], scale: 1 },
        summary: { position: [18, 8], scale: 1 },
        right: { position: [13, 4.1], scale: 1 },
        wavelength: { position: [10.5, 4], scale: 1 },
        center: { position: [10, 6], scale: 1.5 },
        topRight: { position: [15, 10.4], scale: 1 },
      },
    },
  });
}

