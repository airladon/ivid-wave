function addSineTEquation(name) {
  // const brac = (content, index) => ({
  //   brac: [`lb${index}`, content, `rb${index}`],
  // });
  const fn = (c1, c2, index) => ({
    brac: [`lb${index}`, [c1, `comma${index}`, c2], `rb${index}`],
  })
  // const cont = (content, width, inSize = true) => ({
  //   container: { content, width, inSize },
  // });
  


  const t = (content, boxIndex) => ({
    tBox: [content, `tBox${boxIndex}`],
  });

  const top = (content, comment, symbol, commentSpace = 0.2, scale = 1, commentLineSpace = 0.2, contentLineSpace = 0.2) => ({
    topComment: {
      content,
      comment,
      symbol,
      commentSpace,
      commentLineSpace,
      contentLineSpace,
      inSize: false,
      scale,
    },
  });
  const bot = (content, comment, symbol, commentSpace = 0.2, scale = 1, commentLineSpace = 0.2, contentLineSpace = 0.2) => ({
    bottomComment: {
      content,
      comment,
      symbol,
      commentSpace,
      commentLineSpace,
      contentLineSpace,
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
        summary: { position: [16, 5.7], scale: 1 },
        mathx: { position: [8, 4], scale: 1 },
        center: { position: [8, 8], scale: 1.2 },
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
      lb6: { symbol: 'squareBracket', side: 'left', lineWidth: 0.07, width: 0.16 },
      rb6: { symbol: 'squareBracket', side: 'right', lineWidth: 0.07, width: 0.16 },
      y_1: { color: colorDisturbanceText },
      y_2: { color: colorDisturbanceText },
      // y_3: { color: colorDisturbanceText },
      x_1: { color: colorPositionText },
      x_2: { color: colorPositionText },
      x_3: { color: colorPositionText },
      x_4: { color: colorPositionText },
      x_5: { color: colorPositionText },
      x_g: { color: colorGText },
      x_t: { color: colorTimeText },
      t_1: { color: colorTimeText },
      t_2: { color: colorTimeText },
      t_3: { color: colorTimeText },
      t_4: { color: colorTimeText },
      t_5: { color: colorTimeText },
      t_6: { color: colorTimeText },
      t_7: { color: colorTimeText },
      t_x: { color: colorPositionText },
      t_f1: { color: colorFText },
      t_f2: { color: colorFText },
      f_1: { color: colorFText },
      f_2: { color: colorFText },
      g_1: { color: colorGText },
      g_2: { color: colorGText },
      g_3: { color: colorGText },
      sin: { style: 'normal' },
      lambda: '\u03bb',
      twopi: '2\u03c0',
      zeroT: { text: '0', color: colorTimeText },
      oneT: { text: '1', color: colorTimeText },
      oneT1: { text: '1', color: colorTimeText },
      oneT1_x: { text: '1', color: colorPositionText },
      zeroX: { text: '0', color: colorPositionText },
      zeroX1: { text: '0', color: colorPositionText },
      oneX: { text: '1', color: colorPositionText },
      oneX1: { text: '1', color: colorPositionText },
      oneX1_t: { text: '1', color: colorTimeText },
      v_t: { color: colorTimeText },
      v_x: { color: colorPositionText },
      equals1: ' = ',
      equals2: ' = ',
      min1: '  \u2212  ',
      min2: '  \u2212  ',
      min3: '  \u2212  ',
      min_t: { text: '  \u2212  ', color: colorTimeText },
      min_x: { text: '  \u2212  ', color: colorPositionText },
      comma1: ' , ',  
      comma3: ' , ',
      arrow1: { symbol: 'line', width: 0.04, arrow: { start: { head: 'triangle' } } },
      arrow2: { symbol: 'line', width: 0.04, arrow: { start: { head: 'triangle' } } },
      vin1: { symbol: 'vinculum', color: colorTimeText, lineWidth: 0.05 },
      vin2: { symbol: 'vinculum', color: colorLight, lineWidth: 0.05 },
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
      tBox12: { symbol: 'tBox', touchBorder: [0.5, 0.4, 0.2, 0.5], isTouchable: true },
      tBox13: { symbol: 'tBox', touchBorder: [0.25, 0.5, 0.3, 0.5], isTouchable: true },
      tBox14: { symbol: 'tBox', touchBorder: [0.4, 0.5, 0.5, 0.5], isTouchable: true },
      tBox15: { symbol: 'tBox', touchBorder: [0.1, 0.5, -0.1, 0.5], isTouchable: true },
      tBox16: { symbol: 'tBox', touchBorder: [0.4, 0.25, 0.2, 0.7], isTouchable: true },
      tBox17: { symbol: 'tBox', touchBorder: [0.2, 0.5, 0.5, 0.5], isTouchable: true },
    },
    phrases: {
      x0: { sub: ['x_1', 'zeroX'] },
      t0: { sub: ['t_1', 'zeroT'] },
      x01: { sub: ['x_3', 'zeroX1'] },
      x1: { sub: ['x_2', 'oneX'] },
      x12: { sub: ['x_4', 'oneX1'] },
      x1_t: { sub: ['x_t', 'oneX1_t'] },
      x13: { sub: ['x_4', 'oneX1'] },
      t1: { sub: ['t_3', 'oneT'] },
      t12: { sub: ['t_4', 'oneT1'] },
      t1_x: { sub: ['t_x', 'oneT1_x'] },
      // f1: { sub: ['f_1', 't_f1'] },
      f1: 'f_1',
      // f2: { sub: ['f_2', 't_f2'] },
      f2: 'f_2',
      yx0tequalsF: [t('y_1', 7), fn(t('x0', 8), cont(t('t_1', 9), 0.25), 1), '  ', t('equals1', 10), '  ', t(['f1', ' ', brac('t_2', 2)], 11)],
      yxt0equalsG: [t('y_1', 7), fn(t('x_1', 8), t('t0', 9), 1), '  ', t('equals1', 10), '  ', t(['g_1', ' ', brac('x_3', 2)], 11)],
      yx1t: ['y_2', fn('x1', cont('t_3', 0.25), 3)],
      yxt1: ['y_2', fn('x_2', 't1', 3)],
      yxt: [t('y_2', 1), fn(t('x_2', 2), cont(t('t_3', 3), 0.25), 3)],
      yxt_1: [t('y_2', 12), fn(t('x_2', 13), cont(t('t_3', 14), 0.25), 3)],
      // yxt_2: [t('y_2', 1), fn(t('x_4', 2), cont(t('t_3', 3), 0.25), 3)],
      // t1: { sub: ['t_4', 'oneT'] },
      // t12: { sub: ['t_7', 'oneT1'] },
      x1OnV: frac('x1_t', 1, 'v_t', 0.8),
      xOnV: frac('x_t', 1, 'v_t', 0.8),
      t1V: ['v_x', ' ', 't1_x'],
      tV: ['v_x', ' ', 't_x'],
      yxt2: ['yxt_1', '  ', t('equals2', 15), '  ', t('g_2', 16), brac(t(['x_5', 'min_x', 'tV'], 17), 5)],
    },
    forms: {
      yx0t: 'yx0tequalsF',
      yx1t_0: lines(['yx0tequalsF', ['yx1t']]),
      yx1t_1: lines([
        'yx0tequalsF',
        ['yx1t', '  ', 'equals2', '  ', 'f2'],
      ]),
      yx1t_2: lines([
        'yx0tequalsF',
        ['yx1t', '  ', 'equals2', '  ', 'f2', ' ', brac(['t_6', 'min_t', 't12'], 5)],
      ]),
      yx1t_3: lines([[],
        ['yx1t', '  ', 'equals2', '  ', 'f2', ' ', brac(['t_6', 'min_t', top('t12', 'x1OnV', 'arrow1')], 5)],
      ]),
      yx1t_4: lines([[],
        ['yx1t', '  ', 'equals2', '  ', 'f2', ' ', brac(['t_6', 'min_t', 'x1OnV'], 5)],
      ]),
      yx1t_5: lines([
        ['yxt', '  ', t('equals2', 4), '  ', t('f2', 5), ' ', brac(t(['t_6', 'min_t', 'xOnV'], 6), 5)],
      ]),
      // MathX
      yxt0: 'yxt0equalsG',
      yxt1_0: lines([
        ['yxt0equalsG'],
        ['yxt1', '  ', 'equals2', '  ', 'g_2', brac(['x_5', 'min_x', 'x13'], 5)],
      ]),
      yxt1_1: lines([
        [],
        ['yxt1', '  ', 'equals2', '  ', 'g_2', brac(['x_5', 'min_x', top('x13', 't1V', 'arrow1')], 5)],
      ]),
      yxt1_2: lines([
        [],
        ['yxt1', '  ', 'equals2', '  ', 'g_2', brac(['x_5', 'min_x', 't1V'], 5)],
      ]),
      yxt1_3: lines([
        'yxt2',
      ]),
      summary1: lines([
        ['yxt_1', '  ', 'equals2', '  ', { sub: ['g_2', 'x_g'] }, brac(['x_5', 'min_x', 'tV'], 5)],
      ]),
      summary: lines([
        ['yxt_1', '  ', 'equals2', '  ', { sub: ['g_2', 'x_g'] }, brac(['x_5', 'min_x', 'tV'], 5)],
        ['y_1', fn('x_1', cont('t_1', 0.25), 1), '  ', 'equals1', '  ', { sub: ['f_1', 't_f1'] }, ' ', brac(['t_2', 'min_t', 'xOnV'], 2)],
      ], 3),
      summaryClean1: lines([
        ['y_2', '  ', 'equals2', '  ', { sub: ['g_2', 'x_g'] }, brac(['x_5', 'min_x', 'tV'], 5)],
      ]),
      summaryClean: lines([
        ['y_2', '  ', 'equals2', '  ', { sub: ['g_2', 'x_g'] }, brac(['x_5', 'min_x', 'tV'], 5)],
        ['y_1', '  ', 'equals1', '  ', { sub: ['f_1', 't_f1'] }, ' ', brac(['t_2', 'min_t', 'xOnV'], 2)],
      ], 3),
      summaryPage: ['y_2', '  ', 'equals2', '  ', 'g_2', brac(['x_5', 'min_x', 'tV'], 5)],
      yxt1_3gP: lines([
        ['yxt2'],
        ['g_1', brac(['x_1'], 2), 'equals1', 'sin', brac([frac('twopi', 2, 'lambda', 0.7), '  ', 'x_3'], 4)],
      ], 3),
      yxt1_3gPSub: lines([
        ['yxt2'],
        ['g_1', brac(bot('x_1', ['x_4', 'min2', 'v_2', 't_2'], 'arrow1', 0.2, 0.7), 2), 'equals1', 'sin', brac([frac('twopi', 2, 'lambda', 0.7), '  ', bot('x_3', ['x_6', 'min3', 'v_3', 't_4'], 'arrow2', 0.2, 0.7)], 4)],
      ], 3),
      yxt1_3gPSubDone: lines([
        ['yxt2'],
        ['g_1', brac(['x_4', 'min2', 'v_2', 't_2'], 2), 'equals1', 'sin', brac([frac('twopi', 2, 'lambda', 0.7), '  ', brac(['x_6', 'min3', 'v_3', 't_4'], 6)], 4)],
      ], 3),
      ysin_01: lines([[],
        ['yxt_1', '  ', 'equals2', '  ', 'sin', brac([frac('twopi', 2, 'lambda', 0.7), '  ', brac(['x_6', 'min3', 'v_3', 't_4'], 6)], 4)],
      ]),
      periodic: lines([
        ['y_2', '  ', 'equals2', '  ', { sub: ['g_2', 'x_g'] }, brac(['x_5', 'min_x', 'tV'], 5)],
        ['y_1', '  ', 'equals1', '  ', { sub: ['f_1', 't_f1'] }, ' ', brac(['t_2', 'min_t', 'xOnV'], 2)],
      ], 3),
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
    mods: {
      scenarios: {
        default: { position: [2, 2] },
        mathx: { position: [1, 2] },
      },
    },
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
      _0_g1: { color: colorGText, style: 'italic' },
      _0_g2: { color: colorPositionText, style: 'italic' },
      _1: { color: colorPositionText, style: 'italic' },
      _1_1: { color: colorTimeText, style: 'italic' },
      time: { color: colorTimeText },
      time_1: { color: colorTimeText },
      'disturbance at time ': { color: colorGText },
      functionOfTime: { text: 'function of time', color: colorTimeText },
      functionOfTime_1: { text: 'function of time', color: colorTimeText },
      f: { color: colorFText, style: 'italic' },
      t: { color: colorFText, style: 'italic' },
      t_1: { color: colorTimeText, style: 'italic' },
      t_g1: { color: colorGText, style: 'italic' },
      t_g2: { color: colorPositionText, style: 'italic' },
      // before: { color: colorTimeText },
      ago: { color: colorTimeText },
      'disturbance that happened at': { color: colorFText },
      'any position': { color: colorPositionText },
      'any time': { color: colorTimeText },
      'shifted': { text: 'shifted by the distance the wave has propogated since ', color: colorPositionText },
      equals: { text: '=', color: colorFText },
      equals_t: { text: '=', color: colorGText },
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
      tBox12: { symbol: 'tBox', touchBorder: [0.5, 0.3, 0.5, 0.2], isTouchable: true },
      tBox13: { symbol: 'tBox', touchBorder: [0.5, 0.15, 0.5, 0.2], isTouchable: true },
      tBox14: { symbol: 'tBox', touchBorder: [0.5, 0.3, 0.2, 0.2], isTouchable: true },
      tBox15: { symbol: 'tBox', touchBorder: [0, 0.3, 0, 0.2], isTouchable: true },
      tBox16: { symbol: 'tBox', touchBorder: [0.2, 0.1, 0.5, 0.2], isTouchable: true },
      tBox17: { symbol: 'tBox', touchBorder: [0.5, 0.2, 0.5, 0.2], isTouchable: true },
      // tBox12: { symbol: 'tBox', touchBorder: [0.5, 0.2, 0.5, 0.2], isTouchable: true },
    },
    phrases: {
      x0: { sub: ['x', '_0'] },
      x1: { sub: ['x_1', '_1'] },
      // ft: { sub: ['f', 't'] },
      ft: 'f',
      t1: { sub: ['t_1', '_1_1'] },
      xe0: ['x_f', ' ', 'equals', ' ', '_0_f' ],
      t0_1: { sub: ['t_g1', '_0_g1'] },
      t0_2: { sub: ['t_g2', '_0_g2'] },
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
        ['The ', t('disturbance', 12), '_ at ', t(['position', '  ', 'x_1'], 13), '_ and ', t(['time', '  ', 't_1'], 14), '_ ', t('is the', 15), '  ', t(['disturbance at time ', 't0_1'], 16)],
        [t(['shifted', 't0_2'], 17), '_.'],
      ], 1.2),
    },
  });
  for (let i = 1; i <= 16; i += 1) {
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
  highlight(5, ['f_2'], ['disturbance that happened at', '_0_f'], [0.3, 0.3, 0.3, 0.1], 0.1, 1.3, 1.05);
  highlight(6, ['t_6', 'vin1', 'v_t', 'x_t'], ['time_1', 'ago', 'x_t', 'v'], [0.1, 0.1, 0.1, 0.1], 0.1, 1.3, 1.1);

  highlight(7, 'y_1', 'disturbance', [0.2, 0.1, 0.1, 0.1], 0.1, 1.3, 1.1);
  highlight(8, ['x_1', 'zeroX'], ['position', '_0'], [0.1, 0.1, 0.1, 0.1], 0.1, 1.3, 1.1);
  highlight(9, 't_1', 'functionOfTime', [0.1, 0.1, 0.1, 0.1], 0.1, 1.3, 1.1);
  highlight(10, 'equals1', 'equal', [-0.2, 0.1, -0.2, 0.1], 0.1, 1.3, 1.1);
  highlight(11, ['f_1', 't_2'], ['f'], [0.3, 0.35, 0.5, 0.35], [0.25, 0.3, 0.3, 0.1], 1.3, 1.1);
  highlight(12, ['y_2'], ['disturbance'], [0.2, 0.1, 0.1, 0.2], [0.1, 0.1, 0.1, 0.1], 1.3, 1.1);
  highlight(13, ['x_2'], ['position', 'x_1'], [0.15, 0.2, 0.2, 0.2], [0.1, 0.1, 0.1, 0.1], 1.3, 1.1);
  highlight(14, ['t_3'], ['time', 't_1'], [0.2, 0.2, 0.15, 0.1], [0.1, 0.1, 0.1, 0.1], 1.3, 1.1);
  highlight(15, ['equals2'], ['is the1'], [0.2, 0.1, 0.1, 0.2], [0.1, 0.1, 0.1, 0.1], 1.3, 1.1);
  highlight(16, ['g_2'], ['disturbance at time ', 't_g1', '_0_g1'], [0.2, 0.1, 0.1, 0.2], [0.1, 0.1, 0.1, 0.1], 1.3, 1.1);
  highlight(17, ['x_5', 'v_x', 't_x'], ['shifted', 't_g2', '_0_g2'], [0.1, 0.2, 0.1, 0.1], [0.1, 0.1, 0.1, 0.1], 1.3, 1.1);
  // highlight(12, ['t_2'], 'functionOfTime_1', [0.1, 0.1, 0.1, 0.1], 0.1, 1.3, 1.1);
}

