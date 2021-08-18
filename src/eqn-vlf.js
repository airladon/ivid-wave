/* eslint-disable camelcase, object-curly-newline, max-len */
/* globals colorDisturbanceText, colorDisturbanceText, colorLight, colorTimeText, figure, bc, colorVelocityText */
// eslint-disable-next-line no-unused-vars
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
      lambda: { text: '\u03bb', color: colorLight },
      lambda_1: '\u03bb',
      arrow1: { symbol: 'line', width: 0.04, arrow: { start: { head: 'triangle' } } },
      vin: { symbol: 'vinculum', lineWidth: 0.05 },
      v: { color: colorVelocityText },
      T: { color: colorDisturbanceText },
      w: { color: colorLight },
      wavelength: { color: colorLight },
      f: { color: colorTimeText },
    },
    phrases: {
      onF: { frac: {
        numerator: '_1', denominator: 'f', symbol: 'vin', scale: 0.5,
      } },
      lambdaWave: bc('lambda', 'wavelength', null, 0.03, 0.03, 0.5),
    },
    formDefaults: {
      translation: {
        lambda: ['linear'],
        v: ['linear'],
      },
      alignment: { fixTo: 'equals' },
    },
    forms: {
      vlf: {
        content: ['v', 'equals', 'lambda', ' ', 'f'],
        translation: {
          lambda: ['curved', 'down', 0.8],
          v: ['curved', 'up', 0.5],
        },
      },
      vlfSummary: {
        content: ['lambda_1', 'equals', 'v_1', ' ', 'T_1'],
      },
      wAlone: { content: 'w' },
      we: { content: ['w', 'equals'] },
      wvt: { content: ['w', 'equals', 'v', ' ', 'T'] },
      wvt1: ['w', 'equals', 'v', ' ', 'T'],
      // wavelengthwvt: [bot('w', [bot('lambda', { scale: ['wavelength', 0.6] }, '', 0.03)], 'arrow1'), 'equals', 'v', ' ', 'T'],
      wavelength: { content: 'lambdaWave', alignment: { xAlign: 'center' } },
      // wavelengthLambda: { content: bot('wavelength', { scale: ['lambda', 0.8] }), alignment: { xAlign: 'center' } },
      lambda: { content: 'lambda', alignment: { xAlign: 'center' } },
      // wavelengthlambdavt: [bot('wavelength', 'lambda', 'arrow1'), 'equals', 'v', ' ', 'T'],
      // wavelengthvt: [bot('lambda', { scale: ['wavelength', 0.6] }, 'arrow1'), 'equals', 'v', ' ', 'T'],
      lwvt: [bot('w', 'lambda', 'arrow1'), 'equals', 'v', ' ', 'T'],
      lvt: { content: ['lambdaWave', '  ', 'equals', ' ', 'v', ' ', 'T'], alignment: { xAlign: 'center' } },
      lvtf: ['lambda', 'equals', 'v', ' ', bot('T', 'onF', 'arrow1', 0.15)],
      lvf: ['lambda', 'equals', { frac: { numerator: 'v', symbol: 'vin', denominator: 'f', scale: 0.8, numeratorSpace: 0.02, denominatorSpace: 0.02 } }],
      l: { content: 'lambda', alignment: { xAlign: -0.6 } },
      we6: ['w', 'equals', '_6'],
      we12: ['w', 'equals', '_12'],
    },
    // formDefaults: {
    //   alignment: { fixTo: 'equals' },
    // },
    mods: {
      scenarios: {
        default: { position: [12, 6], scale: 1 },
        summary: { position: [18, 8.8], scale: 1 },
        right: { position: [13, 4.1], scale: 1 },
        wavelength: { position: [14, 2.5], scale: 1 },
        center: { position: [10, 6], scale: 1.5 },
        topRight: { position: [15, 10.4], scale: 1 },
      },
    },
  });
}

