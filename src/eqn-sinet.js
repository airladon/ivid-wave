function addSineTEquation(name) {
  const brac = (content, index) => ({
    brac: [`lb${index}`, content, `rb${index}`],
  });
  const fn = (c1, c2, index) => ({
    brac: [`lb${index}`, [c1, `comma${index}`, c2], `rb${index}`],
  })
  const cont = (content, width, inSize = true) => ({
    container: { content, width, inSize },
  });
  const lines = (content, baselineSpace = 2) => ({
    lines: { content, justify: 'left', baselineSpace },
  })
  const frac = (numerator, vIndex, denominator, scale = 1, numeratorSpace = 0.05, denominatorSpace = 0.05) => ({
    frac: {
      numerator, symbol: `vin${vIndex}`, denominator, scale, numeratorSpace, denominatorSpace
    },
  });

  const t = (content, boxIndex) => ({
    tBox: [content, `tBox${boxIndex}`],
  });

  const top = (content, comment, symbol, commentSpace = 0.2, scale = 1) => ({
    topComment: {
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

  
  
  const box = (content, symbol, inSize = false, space = 0.02) => ({
    box: {
      content, symbol, inSize, space,
    },
  });
  const topBox = (content, comment, commentSpace) => top(box(content, 'box'), comment, 'arrow1', commentSpace);

  const getElementMods = (elements, color) => {
    const elementMods = {};
    elements.forEach(e => {
      elementMods[e] = { color: color.slice() };
    });
    return elementMods;
  }
  const form = (content, elements, color = colorYellow) => ({
      content, elementMods: getElementMods(elements, color),
  });

  const eqn = figure.add({
    name,
    make: 'equation',
    scale: 5,
    position: [4, 8],
    color: colorLight,
    dimColor: colorLight,
    // font: { family: 'MathJax_Math-Italic' },
    // textFont: { family: 'Roboto' },
    // font: { family: '"Times New Roman", "Times", "Crimson Text", serif', style: 'italic' },
    font: { family: 'TeXGyreTermes' },
    textFont: { family: 'TeXGyreTermes' },
    // textFont: { style: 'normal', family: 'Times New Roman, Times, Crimson Text, serif' },
    mods: {
      scenarios: {
        default: { position: [9, 4], scale: 1 },
        // default: { position: [7, 8], scale: 1 },
        summary: { position: [15, 6], scale: 1 },
        // bottom: { position: [7, 1.5], scale: 1 },
      }
    },
    elements: {
      sin: { style: 'normal' },
      lb1: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
      rb1: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
      lb2: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
      rb2: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
      lb3: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
      rb3: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
      lb4: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
      rb4: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
      lb5: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
      rb5: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
      y_1: { color: colorDisturbanceText },
      y_2: { color: colorDisturbanceText },
      // y_3: { color: colorDisturbanceText },
      x_1: { color: colorPositionText },
      x_2: { color: colorPositionText },
      x_3: { color: colorPositionText },
      x_4: { color: colorPositionText },
      x_5: { color: colorPositionText },
      t_1: { color: colorTimeText },
      t_2: { color: colorTimeText },
      t_3: { color: colorTimeText },
      t_4: { color: colorTimeText },
      t_5: { color: colorTimeText },
      t_6: { color: colorTimeText },
      t_7: { color: colorTimeText },
      t_f1: { color: colorFText },
      t_f2: { color: colorFText },
      f_1: { color: colorFText },
      f_2: { color: colorFText },
      g_1: { color: colorGText },
      g_2: { color: colorGText },
      zeroT: { text: '0', color: colorTimeText },
      oneT: { text: '1', color: colorTimeText },
      oneT1: { text: '1', color: colorTimeText },
      zeroX: { text: '0', color: colorPositionText },
      zeroX1: { text: '0', color: colorPositionText },
      oneX: { text: '1', color: colorPositionText },
      oneX1: { text: '1', color: colorPositionText },
      v: { color: colorVelocity },
      equals1: ' = ',
      equals2: '  =  ',
      min1: '  \u2212  ',
      min2: '  \u2212  ',
      comma1: ' , ',  
      comma3: ' , ',
      arrow1: { symbol: 'line', width: 0.04, arrow: { start: { head: 'triangle' } } },
      vin1: { symbol: 'vinculum', lineWidth: 0.05 },
      tBox1: { symbol: 'tBox', touchBorder: [0.5, 0.5, 0.2, 0.5], isTouchable: true },
      tBox2: { symbol: 'tBox', touchBorder: [0.25, 0.5, 0.3, 0.5], isTouchable: true },
      tBox3: { symbol: 'tBox', touchBorder: [0.4, 0.5, 0.4, 0.5], isTouchable: true },
      tBox4: { symbol: 'tBox', touchBorder: [0, 0.5, -0.2, 0.5], isTouchable: true },
      tBox5: { symbol: 'tBox', touchBorder: [0.2, 0.5, 0.4, 0.5], isTouchable: true },
      tBox6: { symbol: 'tBox', touchBorder: [0.2, 0.5, 0.2, 0.5], isTouchable: true },
      tBox7: { symbol: 'tBox', touchBorder: [0.5, 0.5, 0.2, 0.6], isTouchable: true },
      tBox8: { symbol: 'tBox', touchBorder: [0.25, 0.5, 0.3, 0.6], isTouchable: true },
      tBox9: { symbol: 'tBox', touchBorder: [0.4, 0.6, 0.4, 0.5], isTouchable: true },
      tBox10: { symbol: 'tBox', touchBorder: [0.2, 0.5, -0.15, 0.5], isTouchable: true },
      tBox11: { symbol: 'tBox', touchBorder: [0.05, 0.3, 0.1, 0.3], isTouchable: true },
    },
    phrases: {
      x0: { sub: ['x_1', 'zeroX'] },
      t0: { sub: ['t_1', 'zeroT'] },
      x01: { sub: ['x_3', 'zeroX1'] },
      x1: { sub: ['x_2', 'oneX'] },
      x12: { sub: ['x_4', 'oneX1'] },
      t1: { sub: ['t_3', 'oneT'] },
      t12: { sub: ['t_4', 'oneT1'] },
      // f1: { sub: ['f_1', 't_f1'] },
      f1: 'f_1',
      // f2: { sub: ['f_2', 't_f2'] },
      f2: 'f_2',
      yx0tequalsF: [t('y_1', 7), fn(t('x0', 8), cont(t('t_1', 9), 0.25), 1), ' ', t('equals1', 10), ' ', t(['f1', ' ', brac('t_2', 2)], 11)],
      yxt0equalsG: [t('y_1', 7), fn(t('x_1', 8), t('t0', 9), 1), ' ', t('equals1', 10), ' ', t(['g_1', ' ', brac('x_3', 2)], 11)],
      yx1t: ['y_2', fn('x1', cont('t_3', 0.25), 3)],
      yxt1: ['y_2', fn('x_4', 't1', 3)],
      yxt: [t('y_2', 1), fn(t('x_4', 2), cont(t('t_3', 3), 0.25), 3)],
      // t1: { sub: ['t_4', 'oneT'] },
      // t12: { sub: ['t_7', 'oneT1'] },
      x1OnV: frac('x12', 1, 'v', 0.8),
      xOnV: frac('x_4', 1, 'v', 0.8),
      t1V: ['v', ' ', 't12'],
      tV: ['v', ' ', 't_4'],
    },
    forms: {
      yx0t: 'yx0tequalsF',
      yx1t_0: lines(['yx0tequalsF', ['yx1t']]),
      yx1t_1: lines([
        'yx0tequalsF',
        ['yx1t', 'equals2', 'f2'],
      ]),
      yx1t_2: lines([
        'yx0tequalsF',
        ['yx1t', 'equals2', 'f2', ' ', brac(['t_6', 'min2', 't12'], 5)],
      ]),
      yx1t_3: lines([[],
        ['yx1t', 'equals2', 'f2', ' ', brac(['t_6', 'min2', top('t12', 'x1OnV', 'arrow1')], 5)],
      ]),
      yx1t_4: lines([[],
        ['yx1t', 'equals2', 'f2', ' ', brac(['t_6', 'min2', 'x1OnV'], 5)],
      ]),
      yx1t_5: lines([
        ['yxt', t('equals2', 4), t('f2', 5), ' ', brac(t(['t_6', 'min2', 'xOnV'], 6), 5)],
      ]),
      yxt0: 'yxt0equalsG',
      yxt1_0: lines([
        ['yxt0equalsG'],
        ['yxt1', 'equals2', 'g_2', brac(['x_5', 'min2', 'x1'], 5)],
      ]),
      yxt1_1: lines([
        [],
        ['yxt1', 'equals2', 'g_2', brac(['x_5', 'min2', top('x1', 't1V', 'arrow1')], 5)],
      ]),
      yxt1_2: lines([
        [],
        ['yxt1', 'equals2', 'g_2', brac(['x_5', 'min2', 't1V'], 5)],
      ]),
      yxt1_3: lines([
        ['yxt', 'equals2', 'g_2', brac(['x_5', 'min2', 'tV'], 5)],
      ]),
    },
  });
  const description = figure.add({
    name: 'sineTExplanation',
    make: 'equation',
    color: colorLight,
    // textFont: { style: 'normal' },
    font: { family: 'TeXGyreTermes' },
    textFont: { family: 'TeXGyreTermes', style: 'normal' },
    scale: 4,
    position: [2, 2],
    elements: {
      disturbance: { color: colorDisturbanceText },
      disturbance_1: { color: colorDisturbanceText },
      position: { color: colorPositionText },
      somePosition: { text: 'some position', color: colorPositionText },
      someTime: { text: 'some time', color: colorTimeText },
      // atATime: { text: 'at a time', color: colorTimeText },
      ago: { color: colorTimeText },
      x: { color: colorPositionText, style: 'italic' },
      x_f: { color: colorFText, style: 'italic' },
      x_t: { color: colorTimeText, style: 'italic' },
      x_1: { color: colorPositionText, style: 'italic' },
      _0: { color: colorPositionText, style: 'italic' },
      _0_f: { color: colorFText, style: 'italic' },
      _1: { color: colorPositionText, style: 'italic' },
      _1_1: { color: colorTimeText, style: 'italic' },
      time: { color: colorTimeText },
      time_1: { color: colorTimeText },
      functionOfTime: { text: 'function of time', color: colorTimeText },
      functionOfTime_1: { text: 'function of time', color: colorTimeText },
      f: { color: colorFText, style: 'italic' },
      t: { color: colorFText, style: 'italic' },
      t_1: { color: colorTimeText, style: 'italic' },
      t_2: { color: colorTimeText, style: 'italic' },
      // before: { color: colorTimeText },
      ago: { color: colorTimeText },
      'disturbance that happened at': { color: colorFText },
      'any position': { color: colorPositionText },
      'any time': { color: colorTimeText },
      'shifted': { text: 'shifted by the distance the wave has propogated in the time since', color: colorPositionText },
      equals: { text: '=', color: colorFText },
      vin1: { symbol: 'vinculum', color: colorTimeText, lineWidth: 0.05 },
      v: { style: 'italic', color: colorTimeText },
      tBox1: { symbol: 'tBox', touchBorder: [0.5, 0.2, 0.5, 0.2], isTouchable: true },
      tBox2: { symbol: 'tBox', touchBorder: [0.5, 0, 0.5, 0.2], isTouchable: true },
      tBox3: { symbol: 'tBox', touchBorder: [0.5, 0.2, 0.2, 0.2], isTouchable: true },
      tBox4: { symbol: 'tBox', touchBorder: [0.05, 0.2, 0.05, 0.2], isTouchable: true },
      tBox5: { symbol: 'tBox', touchBorder: [0.2, 0.1, 0.5, 0.2], isTouchable: true },
      tBox6: { symbol: 'tBox', touchBorder: [0.5, 0.2, 0.5, 0], isTouchable: true },
      tBox7: { symbol: 'tBox', touchBorder: [0.5, 0.2, 0.5, 0.2], isTouchable: true },
      tBox8: { symbol: 'tBox', touchBorder: [0.5, 0, 0.5, 0.2], isTouchable: true },
      tBox9: { symbol: 'tBox', touchBorder: [0.5, 0.2, 0.5, 0.2], isTouchable: true },
      tBox10: { symbol: 'tBox', touchBorder: [0.5, 0.2, 0.5, 0.2], isTouchable: true },
      tBox11: { symbol: 'tBox', touchBorder: [0.5, 0.2, 0.5, 0.2], isTouchable: true },
      // tBox12: { symbol: 'tBox', touchBorder: [0.5, 0.2, 0.5, 0.2], isTouchable: true },
    },
    phrases: {
      x0: { sub: ['x', '_0'] },
      x1: { sub: ['x_1', '_1'] },
      // ft: { sub: ['f', 't'] },
      ft: 'f',
      t1: { sub: ['t_1', '_1_1'] },
      xe0: ['x_f', ' ', 'equals', ' ', '_0_f' ],
      xOnV: frac('x_t', 1, 'v', 0.7, 0.02, 0.02),
    },
    forms: {
      yx0t: lines([
        ['The', '  ', t('disturbance', 7), '  ', 'at', '  ', t(['position', '  ', 'x0'], 8), '  ', 'is a ', t('functionOfTime', 9), '  ', t('equal', 10), '_ to ', t('ft', 11), '_.'],
      ], 1.2),
      summary_1: lines([
        ['The', '  ', t('disturbance', 1), '_ at ', t(['any position', '  ', 'x_1'], 2), '  ', 'and', '  ', t(['any time', '  ', 't_1'], 3), '  ', t('is the', 4)],
        [t(['disturbance that happened at', '  ', 'xe0'], 5), '  ', 'at ', t(['time_1', '  ', 'xOnV', '  ', 'ago'], 6), '_.'],
      ], 1.2),
      // summary_2: 'the disturbance at some position and time is the disturbance at t = 0 shifted by the distance the wave has propogated in the time since',
      summary_2: lines([
        ['The ', 'disturbance', '_ at ', 'position ', 'x_1', '_ and time ', 't_1', '_ is the ', 'disturbance at ', 't_2', '_ = 0'],
        ['shifted', '_.'],
      ], 1.2),
    },
  });
  for (let i = 1; i <= 11; i += 1) {
    const d = description.get(`tBox${i}`);
    const e = eqn.get(`tBox${i}`);
    d.dimColor = [0, 0, 0, 0];
    e.dimColor = [0, 0, 0, 0];
  }
  // const [d1, d2, d3, d4, d5, d6] = description.get(['tBox1', 'tBox2', 'tBox3', 'tBox4', 'tBox5', 'tBox6']);
  // const [d7, d8, d9, d10, d11, d12] = description.get(['tBox7', 'tBox8', 'tBox9', 'tBox10', 'tBox11', 'tBox12']);
  // const [e7, e8, e9, d10, d11, d12] = description.get(['tBox7', 'tBox8', 'tBox9', 'tBox10', 'tBox11', 'tBox12']);
  const highlight = (index, e1, e2, s1, s2, p1, p2) => {
    const d = description.get(`tBox${index}`);
    const e = eqn.get(`tBox${index}`);
    const onclick = () => {
      if (eqn.isShown === false || description.isShown === false) {
        return;
      }
      const h1 = figure.get('highlighter');
      const h2 = figure.get('highlighter2');
      h1.showAll();
      h2.showAll();
      h1.surround(eqn.get(e1), s1);
      h2.surround(description.get(e2), s2);
      h1.pulse({ scale: p1 });
      h2.pulse({ scale: p2 });
    };
    d.onClick = onclick;
    e.onClick = onclick;
  }
  highlight(1, 'y_2', 'disturbance', [0.2, 0.2, 0.1, 0.2], 0.1, 1.3, 1.1);
  highlight(2, 'x_2', ['any position', 'x_1'], [0.1, 0.2, 0.1, 0.2], 0.1, 1.3, 1.1);
  highlight(3, 't_3', ['any time', 't_1'], [0.1, 0.2, 0.15, 0.05], 0.1, 1.3, 1.1);
  highlight(4, 'equals2', 'is the', [-0.2, 0.2, -0.2, 0.2], 0.1, 1.3, 1.1);
  highlight(5, ['f_2'], ['disturbance that happened at', '_0_f'], [0.3, 0.1, 0.3, 0.1], 0.1, 1.3, 1.05);
  highlight(6, ['t_6', 'vin1', 'v', 'x_4'], ['time_1', 'ago', 'x_t', 'v'], [0.1, 0.1, 0.1, 0.1], 0.1, 1.3, 1.1);

  highlight(7, 'y_1', 'disturbance', [0.2, 0.1, 0.1, 0.1], 0.1, 1.3, 1.1);
  highlight(8, ['x_1', 'zeroX'], ['position', '_0'], [0.1, 0.1, 0.1, 0.1], 0.1, 1.3, 1.1);
  highlight(9, 't_1', 'functionOfTime', [0.1, 0.1, 0.1, 0.1], 0.1, 1.3, 1.1);
  highlight(10, 'equals1', 'equal', [-0.2, 0.1, -0.2, 0.1], 0.1, 1.3, 1.1);
  highlight(11, ['f_1', 't_2'], ['f'], [0.3, 0.15, 0.5, 0.35], [0.25, 0.1, 0.3, 0.1], 1.3, 1.1);
  // highlight(12, ['t_2'], 'functionOfTime_1', [0.1, 0.1, 0.1, 0.1], 0.1, 1.3, 1.1);
}

