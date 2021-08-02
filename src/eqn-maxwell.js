function addMaxwellEquation(name) {
  const brac = (content, index) => ({
    brac: [`lb${index}`, content, `rb${index}`],
  });

  // const d2 = (dIndex) => ({
  //   sup: [`d${dIndex}`, `_2_${dIndex}`],
  // });
  // const sq = (content, _2Index) => ({
  //   sup: [content, `_2_${_2Index}`],
  // })
  const frac = (numerator, vIndex, denominator, numeratorSpace = 0.05, denominatorSpace = 0.05, overhang = 0.05) => ({
    frac: {
      numerator, symbol: `v${vIndex}`, denominator, numeratorSpace, denominatorSpace, overhang,
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
  const lines = (content, baselineSpace = 2) => ({
    lines: { content, justify: 'left', baselineSpace, justify: 'element' },
  });
  const line = (content, equalsIndex) => ({
    content,
    justify: `equals${equalsIndex}`,
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
    dimColor: colorLight,
    elements: {
      lb1: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.2 },
      rb1: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.2 },
      del1: '\u2207',
      del2: '\u2207',
      del3: '\u2207',
      del4: '\u2207',
      epsilon1: '\u03b5',
      epsilon2: '\u03b5',
      mu1: { text: '\u00b5', style: 'italic' },
      mu2: '\u00b5',
      E_1: { weight: 'bold', style: 'normal' },
      E_2: { weight: 'bold', style: 'normal' },
      E_3: { weight: 'bold', style: 'normal' },
      E_4: { weight: 'bold', style: 'normal' },
      B_1: { weight: 'bold', style: 'normal' },
      B_2: { weight: 'bold', style: 'normal' },      
      J_1: { weight: 'bold', style: 'normal' },
      rho1: '\u03c1',
      rho2: '\u03c1',
      rho3: '\u03c1',
      d1: '\u2202',
      d2: '\u2202',
      d3: '\u2202',
      d4: '\u2202',
      d5: '\u2202',
      d6: '\u2202',
      d7: '\u2202',
      dot1: ' \u00b7 ',
      dot2: ' \u00b7 ',
      cross1: { text: ' \u2715 ', weight: 'normal' },
      cross2: ' \u2715 ',
      // y_99: { text: 'y', color: [0, 0, 0, 0] },
      // _2_98: { text: '2', color: [0, 0, 0, 0] },
      // _2_99: { text: '2', color: [0, 0, 0, 0] },
      // x_r: { color: colorZero },
      // zero_r: { text: '0', color: colorZero },
      comma1: ' , ',
      equals1: '  =  ',
      equals2: '  =  ',
      equals3: '  =  ',
      equals4: '  =  ',
      min1: '\u2212 ',
      min2: ' \u2212 ',
      v1: { symbol: 'vinculum', lineWidth: 0.05 },
      v2: { symbol: 'vinculum', lineWidth: 0.05 },
      v3: { symbol: 'vinculum', lineWidth: 0.05 },
      v4: { symbol: 'vinculum', lineWidth: 0.05 },
      // vBox: { symbol: 'tBox', touchBorder: [0.5, 1, 0, 1], isTouchable: true },
      // dxBox: { symbol: 'tBox', touchBorder: [0, 0.5, 0.5, 1], isTouchable: true },
      // dtBox: { symbol: 'tBox', touchBorder: 0.5, isTouchable: true },
      // braceB: { symbol: 'brace', side: 'bottom', lineWidth: 0.05, width: 0.2 },
      // braceB1: { symbol: 'brace', side: 'bottom', lineWidth: 0.05, width: 0.2 },
      // braceT: { symbol: 'brace', side: 'top', lineWidth: 0.05, width: 0.15 },
      // gradient: 'disturbance gradient',
      // gradChange: 'change in gradient over x',
      // arrow1: { symbol: 'line', width: 0.04, arrow: { start: { head: 'triangle' } } },
      // acceleration: 'disturbance acceleration'
    },
    phrases: {
      // d2Edx2: t(frac([d2(1), 'E_1'], 1, ['d3', sq('x', 3)], 0.02, 0.01), 'dxBox'),
      // d2Edt2: t(frac([d2(2), 'E_2'], 2, ['d4', sq('t', 4)], 0.02, 0.01), 'dtBox'),
      // dEdx: frac(['d1', 'E_1'], 1, ['d2', 'x_1'], 0.02, 0.01),
      e0_1: { sub: ['epsilon1', '_0_1'] },
      e0_2: { sub: ['epsilon2', '_0_2'] },
      u0_1: { sub: ['mu1', '_0_3'] },
      guass: ['del1', 'dot1', 'E_1', 'equals1', frac('rho1', 1, 'e0_1', 0.05, 0.0, 0.02)],
      guassMag: ['del2', 'dot2', 'E_2', 'equals2', '_0_4'],
      dBdt: frac(['d1', 'B_1'], 2, ['d2', 't_1'], 0.02, 0.01),
      maxwellFaraday: ['del3', 'cross1', 'E_3', 'equals3', 'min1', 'dBdt'],
      dEdt: frac(['d3', 'E_4'], 3, ['d4', 't_2'], 0.02, 0.01),
      ampere: ['del4', 'cross2', 'B_2','equals4', 'u0_1', brac(['J_1', '_ + ', 'e0_2', 'dEdt'], 1)]
      // vSq: t(sq('v', 5), 'vBox'),
      // ddx: frac('d5', 4, ['d6', 'x_1'], 0.05, 0.01),
      // ddxInv: frac([sq('d5', 99), 'y_99'], 4, ['d6', sq('x_1')], 0.02, 0.01),
    },
    forms: {
      eqns: lines([
        line(['guass'], 1), line(['guassMag'], 2), line(['maxwellFaraday'], 3), line(['ampere'], 4)]),
      // guassMag: 'guassMag',
    },
    mods: {
      scenarios: {
        default: { position: [8, 10], scale: 0.7 },
        // summary: { position: [17, 3], scale: 0.7 },
      },
    },
  });
  // figure.add([
  //   {
  //     name: 'diffExplanation1',
  //     make: 'textLines',
  //     text: [
  //       '|Disturbance acceleration| is |proportional| to how',
  //       'rapidly the |disturbance gradient changes| in space.',
  //     ],
  //     modifiers: {
  //       'Disturbance acceleration': { font: { color: colorOn } },
  //       'disturbance gradient changes': { font: { color: color3 } },
  //       proportional: { font: { color: color1, style: 'italic' } },
  //     },
  //     font: { size: 0.8 },
  //     color: colorLight,
  //     position: [2, 3],
  //   },
  //   {
  //     name: 'diffExplanation2',
  //     make: 'textLines',
  //     text: [
  //       'If the |disturbance| |changes quickly in time| then it will',
  //       'also |change quickly over space|.',
  //     ],
  //     modifiers: {
  //       'disturbance': { font: { color: colorOn } },
  //       'changes quickly in time': { font: { color: color3 } },
  //       'change quickly over space': { font: { color: color1 } },
  //     },
  //     font: { size: 0.8 },
  //     color: colorLight,
  //     position: [2, 3],
  //   },
  // ]);
  // const setColors = (phrases) => {
  //   eqn.setColor(colorLight);
  //   const elements = eqn.getPhraseElements(phrases);
  //   console.log(elements)
  //   eqn.exec(['setColor', colorYellow], elements)
  //   eqn._vBox.setColor([0, 0, 0, 0]);
  //   eqn._dtBox.setColor([0, 0, 0, 0]);
  //   eqn._dxBox.setColor([0, 0, 0, 0]);
  // }
  // eqn._vBox.onClick = () => {
  //   eqn.stop('freeze');
  //   setColors(['vSq']);
  //   eqn.animations.new()
  //     .goToForm({ target: 'dVel', animate: 'move', duration: 1.5 })
  //     .start();
  // };
  // eqn._dtBox.onClick = () => {
  //   eqn.stop('freeze');
  //   setColors(['d2ydt2']);
  //   eqn.animations.new()
  //     .goToForm({ target: 'dAcc', animate: 'move', duration: 1.5 })
  //     .start();
  // };
  // eqn._dxBox.onClick = () => {
  //   // eqn.showForm('d1Inv1');
  //   eqn.stop('freeze');
  //   setColors(['ddx', 'dydx', 'd2ydx2', 'ddxInv']);
  //   eqn.animations.new()
  //     .goToForm({ target: 'd1Inv1', animate: 'move', duration: 1.5 })
  //     .goToForm({ target: 'd1Inv2', animate: 'move', duration: 0 })
  //     .goToForm({ target: 'dyExpand', animate: 'move', duration: 1.5 })
  //     .start();
  // };
}

