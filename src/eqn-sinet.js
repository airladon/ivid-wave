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

  figure.add({
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
      // lb4: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
      // rb4: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
      // lb7: { symbol: 'squareBracket', side: 'left', lineWidth: 0.05, width: 0.16 },
      // rb7: { symbol: 'squareBracket', side: 'right', lineWidth: 0.05, width: 0.16 },
      // pi: 'π',
      // pi1: 'π',
      // pi2: 'π',
      // x_r: { color: colorZero },
      // zero_r: { text: '0', color: colorZero },
      // x_b: { color: colorOne },
      // one_b: { text: '1', color: colorOne },
      // x_b1: { color: colorOne },
      // one_b1: { text: '1', color: colorOne },
      equals1: '  =  ',
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
      // vin2: { symbol: 'vinculum', lineWidth: 0.05 },
      // brace: { symbol: 'brace', side: 'top', lineWidth: 0.05 },
      // box: { symbol: 'box', lineWidth: 0.04 },
      // strike1: { symbol: 'strike', lineWidth: 0.05 },
    },
    phrases: {
      x0: { sub: ['x_1', 'zeroX'] },
      x01: { sub: ['x_3', 'zeroX1'] },
      x1: { sub: ['x_2', 'oneX'] },
      x12: { sub: ['x_4', 'oneX1'] },
      f1: { sub: ['f_1', 't_f1'] },
      f2: { sub: ['f_2', 't_f2'] },
      yx0tequalsF: ['y_1', fn('x0', cont('t_1', 0.25), 1), 'equals1', 'f1', ' ', brac('t_2', 2)],
      yx1t: ['y_2', fn('x1', cont('t_3', 0.25), 3)],
      yxt: ['y_2', fn('x_2', cont('t_3', 0.25), 3)],
      t1: { sub: ['t_4', 'oneT'] },
      t12: { sub: ['t_7', 'oneT1'] },
      x1OnV: frac('x12', 1, 'v', 0.8),
      xOnV: frac('x_4', 1, 'v', 0.8),
      // x0r: { sub: ['x_r', 'zero_r'] },
      // x1b: { sub: ['x_b', 'one_b'] },
      // x1bToX: top({ sub: ['x_b', 'one_b'] }, 'x_1', 'arrow1', 0.3),
      // t1_11: { sub: ['t_1', '_1_1']},
      // t1_12: { sub: ['t_2', '_1_2']},
      // x1_11: { sub: ['x_b1', 'one_b1']},
      // x1_11ToX: top({ sub: ['x_b1', 'one_b1']}, 'x_2', 'arrow2', 0.3),
      // yx0t: ['y', brac(['x0r', 'comma1', 't_3'], 1)],
      // yx0tmt1: ['y', brac(['x0r', 'comma1', 't_4', 'min1', 't1_11'], 1)],
      // yx1t: ['y_1', brac(['x1b', 'comma2', ' ', 't_5'], 2)],
      // yx1ToXt: ['y_1', brac(['x1bToX', 'comma2', ' ', 't_5'], 2)],
      // yxt: ['y_1', brac(['x_1', 'comma2', ' ', 't_5'], 2)],
      // yxtConstT: ['y_1', brac(['x_1', 'comma2', ' ', top('t_5', 'constant_1', 'arrow1', 0.4, 0.6)], 2)],
      // yxtConstX: ['y_1', brac([top('x_1', 'constant_1', 'arrow1', 0.4, 0.6), 'comma2', ' ', 't_5'], 2)],
    },
    // formDefaults: {
    //   elementMods: getElementMods(['2', 'pi', 'f', 'lb7', 'rb7', 't_6', 'min2', 't_2', '_1_2', '2_1', 'pi1', 'f_1', 't_3', 'min1', '2_2', 'pi2', 'f_2', 't_1', '_1_1', 'f_2', 'vin1', 'v', 'vin2', 'lambda', 'x_1', 't_5', 'x_1', 'x_2'], colorLight),
    // },
    forms: {
      // yx0t_0: ['y_1', fn('x0', 't_2', 1), 'equals', brac('f', 2)],
      yx0t_0: ['y_1'],
      yx0t_1: ['y_1', fn('x0', cont(' ', 0.25), 1)],
      yx0t_2: ['y_1', fn('x0', cont('t_1', 0.25), 1)],
      yx0t_3: ['y_1', fn('x0', cont('t_1', 0.25), 1), 'equals1'],
      yx0t_4: ['yx0tequalsF'],
      yx1t_0: lines(['yx0tequalsF', ['yx1t']]),
      yx1t_1: lines([
        'yx0tequalsF',
        ['yx1t', 'equals2', 'y_3', fn('x01', ['t_5', 'min1', 't1'], 4)],
      ]), 
      yx1t_2: lines([
        'yx0tequalsF',
        ['yx1t', 'equals2', 'y_3', fn('x01', ['t_5', 'min1', 't1'], 4), 'equals3', 'f2', ' ', brac(['t_6', 'min2', 't12'], 5)],
      ]),
      yx1t_3: lines([
        'yx0tequalsF',
        ['yx1t', 'equals2', 'f2', ' ', brac(['t_6', 'min2', 't12'], 5)],
      ]), 
      yx1t_4: lines([
        ['yx1t', 'equals2', 'f2', ' ', brac(['t_6', 'min2', 't12'], 5)],
      ]), 
      yx1t_5: lines([
        ['yx1t', 'equals2', 'f2', ' ', brac(['t_6', 'min2', top('t12', 'x1OnV', 'arrow1')], 5)],
      ]), 
      yx1t_6: lines([
        ['yx1t', 'equals2', 'f2', ' ', brac(['t_6', 'min2', 'x1OnV'], 5)],
      ]),
      yx1t_7: lines([
        ['yxt', 'equals2', 'f2', ' ', brac(['t_6', 'min2', 'xOnV'], 5)],
      ]),
    },
  });
  figure.add([
    {
      name: 'sineTExplanation',
      make: 'equation',
      color: colorLight,
      textFont: { style: 'normal' },
      scale: 5,
      position: [4, 3],
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
        f: { color: colorFText, style: 'italic' },
        t: { color: colorFText, style: 'italic' },
        t_1: { color: colorTimeText, style: 'italic' },
        'time dependent disturbance at': { color: colorFText },
        equals: { text: '=', color: colorFText },
        vin1: { symbol: 'vinculum', color: colorTimeText, lineWidth: 0.05 },
        v: { style: 'italic', color: colorTimeText },
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
        yx0_0: ['The', '  ', 'disturbance'], 
        yx0_1: ['The', '  ', 'disturbance', '  ', 'at', '  ', 'position', '  ', 'x0'],
        yx0_2: lines([
          ['The', '  ', 'disturbance', '  ', 'at', '  ', 'position', '  ', 'x0', '  ', 'is a'],
          ['functionOfTime'],
        ], 1.2),
        yx0_2: lines([
          ['The', '  ', 'disturbance', '  ', 'at', '  ', 'position', '  ', 'x0', '  ', 'is a'],
          ['functionOfTime', '  ',  'equal to', '  ', 'ft'],
        ], 1.2),
        yx1_0: ['The', '  ', 'disturbance', '  ', 'at', '  ', 'position', '  ', 'x1'],
        yx1_1: lines([
          ['The', '  ', 'disturbance', '  ', 'at', '  ', 'somePosition', '  ', 'x1', '  ', 'is equal to'],
          ['as the ', 'disturbance_1', '_ at', '  ', 'x0', ' ', '_, ', 'someTime', '  ', 't1', '  ', 'ago' ],
        ], 1.2),
        summary_1: lines([
          ['The', '  ', 'disturbance', '  ', 'at any ', 'position', '  ', 'x_1', '  ', 'and', '  ', 'time', '  ', 't_1'],
          ['is the ', 'time dependent disturbance at', '  ', 'xe0'],
          ['at a ', 'time_1', '  ', 'xOnV', '  ', 'ago', '_.'],
        ], 1.2),
      },
    },
  ]);
}

