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
  const t = (content, boxName) => ({
    tBox: [content, boxName],
  });
  const overlay = (content) => ({
    container: { content, inSize: false },
  });
  const cont = (content, width, xAlign) => ({
    container: {
      content,
      width,
      xAlign,
    },
  });
  const bot = (content, comment, symbol, commentSpace = 0.05, contentSpace = 0.05, commentLineSpace = 0.05, contentLineSpace = 0.05) => ({
    bottomComment: {
      content,
      comment,
      symbol,
      inSize: false,
      commentSpace,
      contentSpace,
      commentLineSpace,
      contentLineSpace,
    }
  });
  const top = (content, comment, symbol, commentSpace = 0.05, contentSpace = 0.05) => ({
    topComment: {
      content,
      comment,
      symbol,
      inSize: false,
      commentSpace,
      contentSpace,
    }
  });

  const eqn = figure.add({
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
      vBox: { symbol: 'tBox', touchBorder: [0.5, 1, 0, 1], isTouchable: true },
      dxBox: { symbol: 'tBox', touchBorder: [0, 0.5, 0.5, 1], isTouchable: true },
      dtBox: { symbol: 'tBox', touchBorder: 0.5, isTouchable: true },
      braceB: { symbol: 'brace', side: 'bottom', lineWidth: 0.05, width: 0.15 },
      braceB1: { symbol: 'brace', side: 'bottom', lineWidth: 0.05, width: 0.15 },
      braceT: { symbol: 'brace', side: 'top', lineWidth: 0.05, width: 0.15 },
      gradient: 'disturbance gradient',
      gradChange: 'change in gradient over x',
      arrow1: { symbol: 'line', width: 0.04, arrow: { start: { head: 'triangle' } } },
      acceleration: 'disturbance acceleration'
    },
    phrases: {
      d2ydx2: t(frac([d2(1), 'y_1'], 1, ['d3', sq('x', 3)], 0.02, 0.01), 'dxBox'),
      d2ydt2: t(frac([d2(2), 'y_2'], 2, ['d4', sq('t', 4)], 0.02, 0.01), 'dtBox'),
      dydx: frac(['d1', 'y_1'], 1, ['d3', 'x'], 0.02, 0.01),
      dydt: frac(['d2', 'y_2'], 2, ['d4', 't'], 0.02, 0.01),
      vSq: t(sq('v', 5), 'vBox'),
      ddx: frac('d5', 4, ['d6', 'x_1'], 0.05, 0.01),
      ddxInv: frac([sq('d5', 99), 'y_99'], 4, ['d6', sq('x_1')], 0.02, 0.01),
    },
    forms: {
      order1: ['dydt', 'equals', 'v', ' ', 'dydx'],
      d1: ['d2ydt2', 'equals', 'vSq', ' ', 'd2ydx2'],
      // d1Touch: ['d2ydt2', 'equals', 'vSq', ' ', 'd2ydx2'],
      d1Inv1: ['d2ydt2', 'equals', 'vSq', ' ', cont('d2ydx2', 2, 'right')],
      d1Inv2: ['d2ydt2', 'equals', 'vSq', ' ', cont([overlay('ddxInv'), 'd2ydx2'], 2, 'right')],
      dyExpand: ['d2ydt2', 'equals', 'vSq', ' ', cont(bot(['ddx', '  ', top('dydx', 'gradient', 'braceT', 0.05, 0.08)], 'gradChange', 'braceB', 0.05, 0.08), 2, 'right')],
      dVel: ['d2ydt2', 'equals', '  ', bot('vSq', 'velocity', 'arrow1', 0.1, 0.1), '     ', 'd2ydx2'],
      dAcc: [bot('d2ydt2', 'acceleration', 'braceB1', 0.05, 0.08), 'equals', 'vSq', ' ', 'd2ydx2'],
    },
    mods: {
      scenarios: {
        default: { position: [12, 6], scale: 1 },
        summary: { position: [16.5, 6], scale: 1 },
      },
    },
  });
  const setColors = (phrases) => {
    eqn.setColor(colorLight);
    const elements = eqn.getPhraseElements(phrases);
    console.log(elements)
    eqn.exec(['setColor', colorYellow], elements)
    eqn._vBox.setColor([0, 0, 0, 0]);
    eqn._dtBox.setColor([0, 0, 0, 0]);
    eqn._dxBox.setColor([0, 0, 0, 0]);
  }
  eqn._vBox.onClick = () => {
    eqn.stop('freeze');
    setColors(['vSq']);
    eqn.animations.new()
      .goToForm({ target: 'dVel', animate: 'move', duration: 1.5 })
      .start();
  };
  eqn._dtBox.onClick = () => {
    eqn.stop('freeze');
    setColors(['d2ydt2']);
    eqn.animations.new()
      .goToForm({ target: 'dAcc', animate: 'move', duration: 1.5 })
      .start();
  };
  eqn._dxBox.onClick = () => {
    // eqn.showForm('d1Inv1');
    eqn.stop('freeze');
    setColors(['ddx', 'dydx', 'd2ydx2', 'ddxInv']);
    eqn.animations.new()
      .goToForm({ target: 'd1Inv1', animate: 'move', duration: 1.5 })
      .goToForm({ target: 'd1Inv2', animate: 'move', duration: 0 })
      .goToForm({ target: 'dyExpand', animate: 'move', duration: 1.5 })
      .start();
  };
}

