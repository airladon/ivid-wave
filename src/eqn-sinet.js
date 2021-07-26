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
    mods: {
      scenarios: {
        default: { position: [6, 6], scale: 1 },
        summary: { position: [15, 6], scale: 1 },
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
      y_3: { color: colorDisturbanceText },
      x_1: { color: colorPositionText },
      x_2: { color: colorPositionText },
      x_3: { color: colorPositionText },
      x_4: { color: colorPositionText },
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
      equals3: '  =  ',
      // w1: '\u03c9',
      min1: '  \u2212  ',
      min2: '  \u2212  ',
      // min2: '  \u2212  ',
      // min3: '  \u2212  ',
      comma1: ' , ',  
      comma3: ' , ',
      comma4: ' , ',
      // comma3: ' , ',
      // lambda: '\u03bb',
      // lambda1: '\u03bb',
      arrow1: { symbol: 'line', width: 0.04, arrow: { start: { head: 'triangle' } } },
      // arrow2: { symbol: 'line', width: 0.04, arrow: { start: { head: 'triangle' } } },
      vin1: { symbol: 'vinculum', lineWidth: 0.05 },
      tBox1: { symbol: 'tBox', touchBorder: [0.5, 0.5, 0.2, 0.5], isTouchable: true },
      tBox2: { symbol: 'tBox', touchBorder: [0.25, 0.5, 0.3, 0.5], isTouchable: true },
      tBox3: { symbol: 'tBox', touchBorder: [0.4, 0.5, 0.4, 0.5], isTouchable: true },
      tBox4: { symbol: 'tBox', touchBorder: [0, 0.5, -0.2, 0.5], isTouchable: true },
      tBox5: { symbol: 'tBox', touchBorder: [0.2, 0.5, 0.4, 0.5], isTouchable: true },
      tBox6: { symbol: 'tBox', touchBorder: [0.2, 0.5, 0.2, 0.5], isTouchable: true },
      tBox7: { symbol: 'tBox', touchBorder: [0.5, 0.5, 0.2, 0.5], isTouchable: true },
      tBox8: { symbol: 'tBox', touchBorder: [0.25, 0.5, 0.3, 0.5], isTouchable: true },
      tBox9: { symbol: 'tBox', touchBorder: [0.4, 0.5, 0.4, 0.5], isTouchable: true },
      tBox10: { symbol: 'tBox', touchBorder: [0.2, 0.5, -0.15, 0.5], isTouchable: true },
      tBox11: { symbol: 'tBox', touchBorder: [0.3, 0.5, 0.3, 0.5], isTouchable: true },
      tBox12: { symbol: 'tBox', touchBorder: [0.3, 0.5, 0.3, 0.5], isTouchable: true },
    },
    phrases: {
      x0: { sub: ['x_1', 'zeroX'] },
      x01: { sub: ['x_3', 'zeroX1'] },
      x1: { sub: ['x_2', 'oneX'] },
      x12: { sub: ['x_4', 'oneX1'] },
      f1: { sub: ['f_1', 't_f1'] },
      f2: { sub: ['f_2', 't_f2'] },
      yx0tequalsF: [t('y_1', 7), fn(t('x0', 8), cont(t('t_1', 9), 0.25), 1), ' ', t('equals1', 10), ' ', t('f1', 11), ' ', brac(t('t_2', 12), 2)],
      yx1t: ['y_2', fn('x1', cont('t_3', 0.25), 3)],
      yxt: [t('y_2', 1), fn(t('x_2', 2), cont(t('t_3', 3), 0.25), 3)],
      t1: { sub: ['t_4', 'oneT'] },
      t12: { sub: ['t_7', 'oneT1'] },
      x1OnV: frac('x12', 1, 'v', 0.8),
      xOnV: frac('x_4', 1, 'v', 0.8),
    },
    // formDefaults: {
    //   elementMods: getElementMods(['2', 'pi', 'f', 'lb7', 'rb7', 't_6', 'min2', 't_2', '_1_2', '2_1', 'pi1', 'f_1', 't_3', 'min1', '2_2', 'pi2', 'f_2', 't_1', '_1_1', 'f_2', 'vin1', 'v', 'vin2', 'lambda', 'x_1', 't_5', 'x_1', 'x_2'], colorLight),
    // },
    forms: {
      yx0t_0: [t('y_1', 7),],
      yx0t_1: [t('y_1', 7),, fn(t('x0', 8), cont(' ', 0.25), 1)],
      yx0t_2: [t('y_1', 7),, fn(t('x0', 8), cont(t('t_1', 9), 0.25), 1)],
      yx0t_3: [t('y_1', 7),, fn(t('x0', 8), cont(t('t_1', 9), 0.25), 1), ' ', t('equals1', 10), ' ', t('f1', 11)],
      yx0t_4: ['yx0tequalsF'],
      yx1t_0: lines(['yx0tequalsF', ['yx1t']]),
      yx1t_1: lines([
        'yx0tequalsF',
        ['yx1t', 'equals2', 'y_3', fn('x01', cont('', 0.4), 4)],
      ]), 
      yx1t_2: lines([
        'yx0tequalsF',
        ['yx1t', 'equals2', 'y_3', fn('x01', ['t_5', 'min1', 't1'], 4)],
      ]), 
      yx1t_3: lines([
        'yx0tequalsF',
        ['yx1t', 'equals2', 'y_3', fn('x01', ['t_5', 'min1', 't1'], 4), 'equals3', 'f2', ' ', brac(['t_6', 'min2', 't12'], 5)],
      ]),
      yx1t_4: lines([
        'yx0tequalsF',
        ['yx1t', 'equals2', 'f2', ' ', brac(['t_6', 'min2', 't12'], 5)],
      ]), 
      yx1t_5: lines([
        ['yx1t', 'equals2', 'f2', ' ', brac(['t_6', 'min2', 't12'], 5)],
      ]), 
      yx1t_6: lines([
        ['yx1t', 'equals2', 'f2', ' ', brac(['t_6', 'min2', top('t12', 'x1OnV', 'arrow1')], 5)],
      ]), 
      yx1t_7: lines([
        ['yx1t', 'equals2', 'f2', ' ', brac(['t_6', 'min2', 'x1OnV'], 5)],
      ]),
      yx1t_8: lines([
        ['yxt', t('equals2', 4), t('f2', 5), ' ', brac(t(['t_6', 'min2', 'xOnV'], 6), 5)],
      ]),
    },
  });
  const description = figure.add({
    name: 'sineTExplanation',
    make: 'equation',
    color: colorLight,
    textFont: { style: 'normal' },
    scale: 5,
    position: [2, 3],
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
      before: { color: colorTimeText },
      'time dependent disturbance at': { color: colorFText },
      'any position': { color: colorPositionText },
      equals: { text: '=', color: colorFText },
      vin1: { symbol: 'vinculum', color: colorTimeText, lineWidth: 0.05 },
      v: { style: 'italic', color: colorTimeText },
      tBox1: { symbol: 'tBox', touchBorder: [0.5, 0.2, 0.5, 0.2], isTouchable: true },
      tBox2: { symbol: 'tBox', touchBorder: [0.5, 0, 0.5, 0.2], isTouchable: true },
      tBox3: { symbol: 'tBox', touchBorder: [0.5, 0.2, 0.5, 0.2], isTouchable: true },
      tBox4: { symbol: 'tBox', touchBorder: [0.5, 0.2, 0.05, 0.2], isTouchable: true },
      tBox5: { symbol: 'tBox', touchBorder: [0.2, 0.1, 0.5, 0.2], isTouchable: true },
      tBox6: { symbol: 'tBox', touchBorder: [0.5, 0.2, 0.5, 0], isTouchable: true },
      tBox7: { symbol: 'tBox', touchBorder: [0.5, 0.2, 0.5, 0.2], isTouchable: true },
      tBox8: { symbol: 'tBox', touchBorder: [0.5, 0, 0.5, 0.2], isTouchable: true },
      tBox9: { symbol: 'tBox', touchBorder: [0.5, 0.2, 0.5, 0.2], isTouchable: true },
      tBox10: { symbol: 'tBox', touchBorder: [0.5, 0.2, 0.5, 0.2], isTouchable: true },
      tBox11: { symbol: 'tBox', touchBorder: [0.5, 0.2, 0.5, 0.2], isTouchable: true },
      tBox12: { symbol: 'tBox', touchBorder: [0.5, 0.2, 0.5, 0.2], isTouchable: true },
    },
    phrases: {
      x0: { sub: ['x', '_0'] },
      x1: { sub: ['x_1', '_1'] },
      ft: { sub: ['f', 't'] },
      t1: { sub: ['t_1', '_1_1'] },
      xe0: ['x_f', ' ', 'equals', ' ', '_0_f' ],
      xOnV: frac('x_t', 1, 'v', 0.7, 0.02, 0.02),
    },
    forms: {
      // yx0_0: ['The', '  ', 'disturbance'], 
      // yx0_1: ['The', '  ', 'disturbance', '  ', 'at', '  ', 'position', '  ', 'x0'],
      // yx0_2: lines([
      //   ['The', '  ', 'disturbance', '  ', 'at', '  ', 'position', '  ', 'x0', '  ', 'is a'],
      //   ['functionOfTime'],
      // ], 1.2),
      yx0t_0: lines([
        ['The', '  ', t('disturbance', 7)],
      ], 1.2),
      yx0t_1: lines([
        ['The', '  ', t('disturbance', 7), '  ', 'at', '  ', t(['position', '  ', 'x0'], 8)],
      ], 1.2),
      yx0t_2: lines([
        ['The', '  ', t('disturbance', 7), '  ', 'at', '  ', t(['position', '  ', 'x0'], 8), '  ', 'is a ', t('functionOfTime', 9),],
      ], 1.2),
      yx0t_3: lines([
        ['The', '  ', t('disturbance', 7), '  ', 'at', '  ', t(['position', '  ', 'x0'], 8), '  ', 'is a ', t('functionOfTime', 9),],
        [t('equal', 10), '_ to ', t('ft', 11)],
      ], 1.2),
      yx0t_4: lines([
        ['The', '  ', t('disturbance', 7), '  ', 'at', '  ', t(['position', '  ', 'x0'], 8), '  ', 'is a ', t('functionOfTime', 9),],
        [t('equal', 10), '_ to ', t('ft', 11), '  ', 'which is also a ', t('functionOfTime_1', 12), '_.'],
      ], 1.2),
      yx1_0: ['The', '  ', 'disturbance', '  ', 'at', '  ', 'position', '  ', 'x1'],
      yx1_1: lines([
        ['The', '  ', 'disturbance', '  ', 'at', '  ', 'somePosition', '  ', 'x1', '  ', 'is equal to'],
        ['as the ', 'disturbance_1', '_ at', '  ', 'x0', ' ', '_, ', 'someTime', '  ', 't1', '  ', 'ago' ],
      ], 1.2),
      summary_1: lines([
        ['The', '  ', t('disturbance', 1), '_ at ', t(['any position', '  ', 'x_1'], 2), '  ', 'and', '  ', t(['time', '  ', 't_1'], 3)],
        [t('is the', 4), '  ', t(['time dependent disturbance at', '  ', 'xe0'], 5)],
        ['at ', t(['time_1', '  ', 'xOnV', '  ', 'before', '  ',  't_2'], 6), '_.'],
      ], 1.2),
    },
  });
  // const [d1, d2, d3, d4, d5, d6] = description.get(['tBox1', 'tBox2', 'tBox3', 'tBox4', 'tBox5', 'tBox6']);
  // const [d7, d8, d9, d10, d11, d12] = description.get(['tBox7', 'tBox8', 'tBox9', 'tBox10', 'tBox11', 'tBox12']);
  // const [e7, e8, e9, d10, d11, d12] = description.get(['tBox7', 'tBox8', 'tBox9', 'tBox10', 'tBox11', 'tBox12']);
  const highlight = (index, e1, e2, s1, s2, p1, p2) => {
    const d = description.get(`tBox${index}`);
    const e = eqn.get(`tBox${index}`);
    const onclick = () => {
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
  highlight(3, 't_3', ['time', 't_1'], [0.1, 0.1, 0.1, 0.1], 0.1, 1.3, 1.1);
  highlight(4, 'equals2', 'is the', [-0.2, 0.2, -0.2, 0.2], 0.1, 1.3, 1.1);
  highlight(5, ['f_2', 't_f2'], ['time dependent disturbance at', '_0_f'], [0.3, 0.1, 0.2, 0.1], 0.1, 1.3, 1.05);
  highlight(6, ['t_6', 'vin1', 'v', 'x_4'], ['time_1', 't_2', 'x_t', 'v'], [0.1, 0.1, 0.1, 0.1], 0.1, 1.3, 1.1);

  highlight(7, 'y_1', 'disturbance', [0.2, 0.1, 0.1, 0.1], 0.1, 1.3, 1.1);
  highlight(8, ['x_1', 'zeroX'], ['position', '_0'], [0.1, 0.1, 0.1, 0.1], 0.1, 1.3, 1.1);
  highlight(9, 't_1', 'functionOfTime', [0.1, 0.1, 0.1, 0.1], 0.1, 1.3, 1.1);
  highlight(10, 'equals1', 'equal', [-0.2, 0.1, -0.2, 0.1], 0.1, 1.3, 1.1);
  highlight(11, ['f_1', 't_f1'], ['f', 't'], [0.3, 0.1, 0.2, 0.1], [0.3, 0.1, 0.2, 0.1], 1.3, 1.1);
  highlight(12, ['t_2'], 'functionOfTime_1', [0.1, 0.1, 0.1, 0.1], 0.1, 1.3, 1.1);
}

