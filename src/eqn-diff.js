function addDiffEquation(name) {
  const brac = (content, index) => ({
    brac: [`lb${index}`, content, `rb${index}`],
  });

  const d2 = (dIndex) => ({
    sup: [`d${dIndex}`, `_2_${dIndex}`],
  });
  const sq = (content, _2Index) => ({
    sup: [content, `_2_${_2Index}`],
  })
  const frac = (numerator, vIndex, denominator, numeratorSpace = 0.05, overhang = 0.05) => ({
    frac: {
      numerator, symbol: `v${vIndex}`, denominator, numeratorSpace, overhang,
    },
  });
  const overlay = (content) => ({
    container: { content, inSize: false },
  });

  figure.add({
    name,
    make: 'equation',
    scale: 4,
    position: [4, 8],
    color: colorLight,
    elements: {
      lb1: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
      rb1: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
      pi: 'π',
      d1: '\u2202',
      d2: '\u2202',
      d3: '\u2202',
      d4: '\u2202',
      d5: '\u2202',
      d6: '\u2202',
      d7: '\u2202',
      y_99: { text: 'y', color: [0, 0, 0, 0] },
      _2_98: { text: '2', color: [0, 0, 0, 0] },
      _2_99: { text: '2', color: [0, 0, 0, 0] },
      // x_r: { color: colorZero },
      // zero_r: { text: '0', color: colorZero },
      comma1: ' , ',
      equals: '  =  ',
      v1: { symbol: 'vinculum', lineWidth: 0.05 },
      v2: { symbol: 'vinculum', lineWidth: 0.05 },
      v3: { symbol: 'vinculum', lineWidth: 0.05 },
      v4: { symbol: 'vinculum', lineWidth: 0.05 },
    },
    phrases: {
      d2ydx2: frac([d2(1), 'y_1'], 1, ['d3', sq('x', 3)], 0.02, 0.01),
      d2ydt2: frac([d2(2), 'y_2'], 2, ['d4', sq('t', 4)], 0.02, 0.01),
      dydx: frac(['d1', 'y_1'], 1, ['d3', 'x'], 0.02, 0.01),
      dydt: frac(['d2', 'y_2'], 2, ['d4', 't'], 0.02, 0.01),
      vSq: sq('v', 5),
      ddx: frac('d5', 4, ['d6', 'x_1'], 0.05, 0.01),
      ddxInv: frac([sq('d5', 99), 'y_99'], 4, ['d6', sq('x_1')], 0.02, 0.01),
    },
    forms: {
      order1: ['dydt', 'equals', 'v', ' ', 'dydx'],
      d1: ['d2ydt2', 'equals', 'vSq', ' ', 'd2ydx2'],
      d1Inv: ['d2ydt2', 'equals', 'vSq', ' ', overlay('ddxInv'), 'd2ydx2'],
      d1Expand: ['d2ydt2', 'equals', 'vSq', ' ', 'ddx', ' ', 'dydx'],
    },
    mods: {
      scenarios: {
        default: { position: [12, 6], scale: 1 },
        summary: { position: [16.5, 6], scale: 1 },
      },
    },
  });
}

