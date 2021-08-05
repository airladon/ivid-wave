function addDiffEquation(name) {
  // const brac = (content, index) => ({
  //   brac: [`lb${index}`, content, `rb${index}`],
  // });

  const d2 = (dIndex) => ({
    sup: [`d${dIndex}`, `_2_${dIndex}`],
  });
  const sq = (content, _2Index) => ({
    sup: [content, `_2_${_2Index}`],
  })
  // const frac = (numerator, vIndex, denominator, numeratorSpace = 0.05, overhang = 0.05) => ({
  //   frac: {
  //     numerator, symbol: `v${vIndex}`, denominator, numeratorSpace, overhang,
  //   },
  // });
  const t = (boxIndex, content) => ({
    tBox: [content, `tBox${boxIndex}`],
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
    scale: 6,
    position: [4, 8],
    color: colorLight,
    dimColor: colorYellow,
    elements: {
      lb1: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
      rb1: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
      lb2: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
      rb2: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
      // lb3: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
      // rb3: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
      // pi: 'π',
      d1: '\u2202',
      d2: '\u2202',
      d3: '\u2202',
      d4: '\u2202',
      d5: { text: '\u2202', color: colorPositionText },
      d6: { text: '\u2202', color: colorTimeText },
      d7: { text: '\u2202', color: colorPositionText },
      d8: { text: '\u2202', color: colorTimeText },
      x: 'x',
      x_1: { color: colorPositionText },
      x_2: { color: colorFText },
      x_3: { color: colorGText },
      t: 't',
      t_1: { color: colorTimeText },
      t_2: { color: colorFText },
      t_3: { color: colorGText },
      y_1: 'y',
      y_2: 'y',
      y_3: { color: colorPositionText },
      y_4: { color: colorTimeText },
      y_5: { color: colorDisturbanceText },
      v: 'v',
      v_1: { color: colorVelocityText },
      v_2: { color: colorFText },
      v_3: { color: colorGText },
      a: { color: colorFText },
      b: { color: colorGText },
      _2_1: { color: colorLight },
      _2_2: { color: colorLight },
      _2_3: { color: colorLight },
      _2_4: { color: colorLight },
      _2_5: { color: colorPositionText },
      _2_6: { color: colorTimeText },
      _2_7: { color: colorPositionText },
      _2_8: { color: colorTimeText },
      _2_9: { color: colorLight },
      _2_10: { color: colorVelocityText },
      // d5: '\u2202',
      // d6: '\u2202',
      // d7: '\u2202',
      // y_99: { text: 'y', color: [0, 0, 0, 0] },
      // _2_98: { text: '2', color: [0, 0, 0, 0] },
      // _2_99: { text: '2', color: [0, 0, 0, 0] },
      // x_r: { color: colorZero },
      // zero_r: { text: '0', color: colorZero },
      // comma1: ' , ',
      equals: '  =  ',
      equals1: '  =  ',
      equals2: '  =  ',
      min1: { text: '  \u2212  ', color: colorFText },
      // min2: { text: '  \u2212  ' },
      vin1: { symbol: 'vinculum', lineWidth: 0.05 },
      vin2: { symbol: 'vinculum', lineWidth: 0.05 },
      vin3: { symbol: 'vinculum', lineWidth: 0.05, color: colorPositionText },
      vin4: { symbol: 'vinculum', lineWidth: 0.05, color: colorTimeText },
      tBox1: tBox(),
      tBox2: tBox(),
      tBox3: tBox(),
      // vBox: { symbol: 'tBox', touchBorder: [0.5, 1, 0, 1], isTouchable: true },
      // dxBox: { symbol: 'tBox', touchBorder: [0, 0.5, 0.5, 1], isTouchable: true },
      // dtBox: { symbol: 'tBox', touchBorder: 0.5, isTouchable: true },
      // braceB: { symbol: 'brace', side: 'bottom', lineWidth: 0.05, width: 0.2 },
      // braceB1: { symbol: 'brace', side: 'bottom', lineWidth: 0.05, width: 0.2 },
      // braceT: { symbol: 'brace', side: 'top', lineWidth: 0.05, width: 0.15 },
      // gradient: 'disturbance gradient',
      // gradChange: 'change in gradient over x',
      // arrow1: { symbol: 'line', width: 0.04, arrow: { start: { head: 'triangle' } } },
      // acceleration: 'disturbance acceleration',
      plus1: '  +  ',
      plus2: { text: '  +  ', color: colorGText },
    },
    phrases: {
      d2ydx2_: frac([d2(1), 'y_1'], 1, ['d3', sq('x', 3)], 1, 0.02, 0.05, 0.01),
      d2ydt2_: frac([d2(2), 'y_2'], 2, ['d4', sq('t', 4)], 1, 0.02, 0.05, 0.01),
      d2ydx2: t(3, frac([d2(5), 'y_3'], 3, ['d7', sq('x_1', 7)], 1, 0.02, 0.05, 0.01), 'dxBox'),
      d2ydt2: t(1, frac([d2(6), 'y_4'], 4, ['d8', sq('t_1', 8)], 1, 0.02, 0.05, 0.01), 'dtBox'),
      // dydx: frac(['d1', 'y_1'], 1, ['d3', 'x'], 0.02, 0.05, 0.01),
      // dydt: frac(['d2', 'y_2'], 2, ['d4', 't'], 0.02, 0.05, 0.01),
      vSq: t(2, sq('v_1', 10), 'vBox'),
      vSq_: sq('v', 9),
      // ddx: frac('d5', 4, ['d6', 'x_1'], 0.05, 0.05, 0.01),
      // ddxInv: frac([sq('d5', 99), 'y_99'], 4, ['d6', sq('x_1')], 0.02, 0.05, 0.01),
    },
    forms: {
      // order1: ['dydt', 'equals', 'v', ' ', 'dydx'],
      // // d1: ['d2ydt2', 'equals', 'vSq', ' ', 'd2ydx2'],
      // // d1Touch: ['d2ydt2', 'equals', 'vSq', ' ', 'd2ydx2'],
      // d1Inv1: ['d2ydt2', 'equals', 'vSq', ' ', cont('d2ydx2', 3, 'right')],
      // d1Inv2: ['d2ydt2', 'equals', 'vSq', ' ', cont([overlay('ddxInv'), 'd2ydx2'], 3, 'right')],
      // dyExpand: ['d2ydt2', 'equals', 'vSq', ' ', cont(bot(['ddx', '  ', top('dydx', 'gradient', 'braceT', 0.05, 0.08)], 'gradChange', 'braceB', 0.05, 0.08), 3, 'right')],
      // dVel: ['d2ydt2', 'equals', '  ', bot('vSq', 'velocity', 'arrow1', 0.1, 0.1), '     ', 'd2ydx2'],
      // dAcc: [bot('d2ydt2', 'acceleration', 'braceB1', 0.05, 0.08), 'equals', 'vSq', ' ', 'd2ydx2'],
      // dAcc: [bot('d2ydt2', 'acceleration', 'braceB1', 0.05, 0.08), 'equals', 'vSq', ' ', 'd2ydx2'],
      // d1: {
      //   content: ['d2ydt2', 'equals', 'vSq', ' ', 'd2ydx2'],
      //   elementMods: {
      //     d2: { color: color3 },
      //     _2_2: { color: color3 },
      //     _2_4: { color: color3 },
      //     v2: { color: color3 },
      //     t: { color: color3 },
      //     d4: { color: color3 },
      //     y_2: { color: colorOn },
      //     y_1: { color: colorOn },
      //     d1: { color: color1 },
      //     d3: { color: color1 },
      //     _2_1: { color: color1 },
      //     _2_3: { color: color1 },
      //     v1: { color: color1 },
      //     x: { color: color1 },
      //   }
      // },
      // d1Mono: {
      //   content: ['d2ydt2', 'equals', 'vSq', ' ', 'd2ydx2'],
      //   // elementMods: {
      //   //   d2: { color: colorLight },
      //   //   _2_2: { color: colorLight },
      //   //   _2_4: { color: colorLight },
      //   //   v2: { color: colorLight },
      //   //   t: { color: colorLight },
      //   //   d4: { color: colorLight },
      //   //   y_2: { color: colorLight },
      //   //   y_1: { color: colorLight },
      //   //   d1: { color: colorLight },
      //   //   d3: { color: colorLight },
      //   //   _2_1: { color: colorLight },
      //   //   _2_3: { color: colorLight },
      //   //   v1: { color: colorLight },
      //   //   x: { color: colorLight },
      //   // }
      // },
      diffSoln: {
        content: {
          lines: {
            content: [
              [
                'd2ydt2_', 'equals', 'vSq_', '  ', 'd2ydx2_',
              ],
              [
                'y_5', 'equals2', 'a', brac(['x_2', 'min1', 'v_2', 't_2'], 1), 'plus1', 'b', brac(['x_3', 'plus2', 'v_3', 't_3'], 2)
              ],
            ],
            baselineSpace: 3.7,
            justify: 'center',
          },
        },
        alignment: { xAlign: 'center' },
      },
      diff: {
        content: [
          {
            container: {
              content: ['d2ydt2_', 'equals', 'vSq_', '  ', 'd2ydx2_'],
              inSize: false,
            },
          },
          'd2ydt2', 'equals1', 'vSq', '  ', 'd2ydx2'
        ],
        alignment: { xAlign: 'center' },
      },
      diffMono: {
        content: ['d2ydt2_', 'equals', 'vSq_', '  ', 'd2ydx2_'],
        alignment: { xAlign: 'center' },
      },
      // properties: [
      //   { 
      //     container: {
      //       content: scale({
      //         lines: {
      //           content: ['mass', 'acceleration_1', 'force', 'length', 'spring constant', 'time', 'displacement disturbance'],
      //           yAlign: 'middle',
      //           baselineSpace: 0.8,
      //         },
      //       }, 0.5),
      //       // content: 'a',
      //       yAlign: 'middle',
      //     },
      //   },
      //   '            ',
      //   {
      //     container: {
      //       content: {
      //         lines: {
      //           content: [
      //             ['F', '_  =  ', 'm', 'a'],
      //             ['F_1', '_  =  _1', 'k', ' ', 'x_10'],
      //           ],
      //           yAlign: 'middle',
      //           baselineSpace: 1.5,
      //         },
      //       },
      //       // content: 'b',
      //       yAlign: 'middle',
      //     }
      //   },
      //   '            ',
      //   {
      //     container: {
      //       content: ['d2ydt2', 'equals', 'vSq', ' ', 'd2ydx2'],
      //       yAlign: 'middle',
      //     },
      //   },
      // ],
    },
    mods: {
      scenarios: {
        default: { position: [12, 6], scale: 1 },
        high: { position: [12, 8], scale: 1 },
        summary: { position: [17, 3], scale: 0.7 },
        props: { position: [19.5, 6], scale: 0.7 }
      },
    },
  });
  const description = figure.add({
    name: 'diffExplanation',
    make: 'equation',
    color: colorLight,
    font: { family: 'TeXGyreTermes' },
    textFont: { family: 'TeXGyreTermes', style: 'normal' },
    scale: 4,
    position: [12, 2],
    formDefaults: { alignment: { xAlign: 'center' } },
    elements: {
      vin1: { symbol: 'vinculum', color: colorTimeText, lineWidth: 0.05 },
      v: { style: 'italic', color: colorTimeText },
      tBox1: tBox(),
      tBox2: tBox(),
      tBox3: tBox(),
      tBox4: tBox(),
      tBox5: tBox(),
      tBox6: tBox(),
      disturbance: { color: colorDisturbanceText },
      'disturbance curvature over time': { color: colorTimeText },
      'proportional': { color: colorVelocityText },
      'disturbance curvature over space': { color: colorPositionText },
    },
    phrases: {
      // x0: { sub: ['x', '_0'] },
      // x1: { sub: ['x_1', '_1'] },
      // // ft: { sub: ['f', 't'] },
      // ft: 'f',
      // t1: { sub: ['t_1', '_1_1'] },
      // xe0: ['x_f', ' ', 'equals', ' ', '_0_f' ],
      // t0_1: { sub: ['t_g1', '_0_g1'] },
      // t0_2: { sub: ['t_g2', '_0_g2'] },
      // xOnV: frac('x_t', 1, 'v', 0.7, 0.02, 0.02),
    },
    forms: {
      diff: lines([
        ['The ', t(1, 'disturbance curvature over time'), '_ is ', t(2, 'proportional'), '_ to the'],
        [t(3, 'disturbance curvature over space')]
      ], 1.2),
      // yx0t: lines([
      //   ['The', '  ', t('disturbance', 7), '  ', 'at', '  ', t(['position', '  ', 'x0'], 8), '  ', 'is a ', t('functionOfTime', 9), '  ', t('equal', 10), '_ to ', t('ft', 11), '_.'],
      // ], 1.2),
      // summary_1: lines([
      //   ['The', '  ', t('disturbance', 1), '_ at ', t(['any position', '  ', 'x_1'], 2), '  ', 'and', '  ', t(['any time', '  ', 't_1'], 3), '  ', t('is the', 4)],
      //   [t(['disturbance that happened at', '  ', 'xe0'], 5), '  ', 'at ', t(['time_1', '  ', 'xOnV', '  ', 'ago'], 6), '_.'],
      // ], 1.2),
      // // summary_2: 'the disturbance at some position and time is the disturbance at t = 0 shifted by the distance the wave has propogated in the time since',
      // summary_2: lines([
      //   ['The ', t('disturbance', 12), '_ at ', t(['position', '  ', 'x_1'], 13), '_ and ', t(['time', '  ', 't_1'], 14), '_ ', t('is the', 15), '  ', t(['disturbance at time ', 't0_1'], 16)],
      //   [t(['shifted', 't0_2'], 17), '_.'],
      // ], 1.2),
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
  const setColors = (phrases) => {
    // eqn.setColor(colorLight);
    // const elements = eqn.getPhraseElements(phrases);
    // console.log(elements)
    // eqn.exec(['setColor', colorYellow], elements)
    eqn.undim();
    const elements = eqn.getPhraseElements(phrases);
    eqn.exec(['dim'], elements);
    eqn._vBox.setColor([0, 0, 0, 0]);
    eqn._dtBox.setColor([0, 0, 0, 0]);
    eqn._dxBox.setColor([0, 0, 0, 0]);
  }
  const highlighter = figure.get('highlighter');
  // eqn._vBox.onClick = () => {
  //   eqn.stop('freeze');
  //   setColors(['vSq']);
  //   highlighter.showAll();
  //   highlighter.surround(eqn._vBox, 0.1)
  // };
  // eqn._dtBox.onClick = () => {
  //   eqn.stop('freeze');
  //   setColors(['d2ydt2']);
  //   highlighter.showAll();
  //   highlighter.surround(eqn._dtBox, 0.1)
  // };
  // eqn._dxBox.onClick = () => {
  //   eqn.stop('freeze');
  //   setColors(['d2ydx2']);
  //   highlighter.showAll();
  //   highlighter.surround(eqn._dxBox, 0.1)
  // };

  figure.add({
    name: 'eqnProps',
    make: 'equation',
    scale: 3,
    color: colorLight,
    position: [4, 6],
    formDefaults: { alignment: { xAlign: 'center'} },
    forms: {
      0: {
        lines: {
          content: ['mass', 'acceleration', 'force', 'length', 'spring constant', 'time'],
          yAlign: 'middle',
          justify: 'center',
          baselineSpace: 0.8,
        },
      },
    },
  });
  figure.add({
    name: 'eqnNewton',
    make: 'equation',
    scale: 4,
    color: colorLight,
    position: [11.5, 6],
    formDefaults: { alignment: { xAlign: 'center'} },
    elements: {
      equals: '  =  ',
      equals1: '  =  ',
    },
    forms: {
      0: {
        lines: {
          content: [
            ['F', 'equals', 'm', 'a'],
            ['F_1', 'equals1', 'k', ' ', 'x'],
          ],
          yAlign: 'middle',
          justify: 'center',
          xAlign: 'center',
          baselineSpace: 1.2,
        },
      },
    },
  });
  figure.add({
    name: 'arrow1',
    make: 'arrow',
    width: 1,
    length: 1,
    tail: 0.5,
    tailWidth: 0.5,
    head: 'triangle',
    angle: 0,
    align: 'mid',
    position: [8, 6],
    line: { width: 0.05 },
    color: colorLight,
  });
  figure.add({
    name: 'arrow2',
    make: 'arrow',
    width: 1,
    length: 1,
    tail: 0.5,
    tailWidth: 0.5,
    head: 'triangle',
    angle: 0,
    align: 'mid',
    position: [15, 6],
    line: { width: 0.05 },
    color: colorLight,
  });
  const d = description;
  const e = eqn;
  highlightN(1, d, e, [0.1, 0.2, 0.1, 0.2], 0.1, 1.3, 1.1);
  highlightN(2, d, e, [0.1, 0.2, 0.1, 0.2], 0.1, 1.3, 1.1);
  highlightN(3, d, e, [0.1, 0.2, 0.1, 0.2], 0.1, 1.3, 1.1);
}

