function addSineX0Equation(name) {
  const brac = (content, index) => ({
    brac: [`lb${index}`, content, `rb${index}`],
  });

  figure.add({
    name,
    make: 'equation',
    scale: 4,
    position: [4, 8],
    color: colorLight,
    elements: {
      sin: { style: 'normal' },
      lb1: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
      rb1: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
      lb2: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
      rb2: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
      pi: 'π',
      x_r: { color: colorZero },
      zero_r: { text: '0', color: colorZero },
      comma1: ' , ',
      equals: ' = ',
    },
    phrases: {
      x0r: { sub: ['x_r', 'zero_r'] },
      yx0t: ['y', brac(['x0r', 'comma1', 't_1'], 1)],
      sin2pft: ['sin', brac(['_2', 'pi', 'f', ' ', 't_2'], 2)],
    },
    forms: {
      yx0: ['yx0t', 'equals', 'sin2pft'],
    },
  });
}

