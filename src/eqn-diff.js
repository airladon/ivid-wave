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
    scale: 6,
    position: [4, 8],
    color: colorLight,
    dimColor: colorLight,
    elements: {
      lb1: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
      rb1: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
      lb2: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
      rb2: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
      lb3: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
      rb3: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
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
      equals2: '  =  ',
      min1: { text: '  \u2212  ' },
      // min2: { text: '  \u2212  ' },
      vin1: { symbol: 'vinculum', lineWidth: 0.05 },
      vin2: { symbol: 'vinculum', lineWidth: 0.05 },
      vin3: { symbol: 'vinculum', lineWidth: 0.05 },
      vin4: { symbol: 'vinculum', lineWidth: 0.05 },
      vBox: { symbol: 'tBox', touchBorder: [0.5, 1, 0, 1], isTouchable: true },
      dxBox: { symbol: 'tBox', touchBorder: [0, 0.5, 0.5, 1], isTouchable: true },
      dtBox: { symbol: 'tBox', touchBorder: 0.5, isTouchable: true },
      braceB: { symbol: 'brace', side: 'bottom', lineWidth: 0.05, width: 0.2 },
      braceB1: { symbol: 'brace', side: 'bottom', lineWidth: 0.05, width: 0.2 },
      braceT: { symbol: 'brace', side: 'top', lineWidth: 0.05, width: 0.15 },
      gradient: 'disturbance gradient',
      gradChange: 'change in gradient over x',
      arrow1: { symbol: 'line', width: 0.04, arrow: { start: { head: 'triangle' } } },
      acceleration: 'disturbance acceleration',
      plus1: '  +  ',
      plus2: '  +  ',
    },
    phrases: {
      d2ydx2: t(frac([d2(1), 'y_1'], 1, ['d3', sq('x', 3)], 1, 0.02, 0.05, 0.01), 'dxBox'),
      d2ydt2: t(frac([d2(2), 'y_2'], 2, ['d4', sq('t', 4)], 1, 0.02, 0.05, 0.01), 'dtBox'),
      d2ydx2nt: frac([d2(1), 'y_1'], 1, ['d3', sq('x', 3)], 1, 0.02, 0.05, 0.01),
      d2ydt2nt: frac([d2(2), 'y_2'], 2, ['d4', sq('t', 4)], 1, 0.02, 0.05, 0.01),
      dydx: frac(['d1', 'y_1'], 1, ['d3', 'x'], 0.02, 0.05, 0.01),
      dydt: frac(['d2', 'y_2'], 2, ['d4', 't'], 0.02, 0.05, 0.01),
      vSq: t(sq('v', 5), 'vBox'),
      vSqnt: sq('v', 5),
      ddx: frac('d5', 4, ['d6', 'x_1'], 0.05, 0.05, 0.01),
      ddxInv: frac([sq('d5', 99), 'y_99'], 4, ['d6', sq('x_1')], 0.02, 0.05, 0.01),
    },
    forms: {
      order1: ['dydt', 'equals', 'v', ' ', 'dydx'],
      // d1: ['d2ydt2', 'equals', 'vSq', ' ', 'd2ydx2'],
      // d1Touch: ['d2ydt2', 'equals', 'vSq', ' ', 'd2ydx2'],
      d1Inv1: ['d2ydt2', 'equals', 'vSq', ' ', cont('d2ydx2', 3, 'right')],
      d1Inv2: ['d2ydt2', 'equals', 'vSq', ' ', cont([overlay('ddxInv'), 'd2ydx2'], 3, 'right')],
      dyExpand: ['d2ydt2', 'equals', 'vSq', ' ', cont(bot(['ddx', '  ', top('dydx', 'gradient', 'braceT', 0.05, 0.08)], 'gradChange', 'braceB', 0.05, 0.08), 3, 'right')],
      dVel: ['d2ydt2', 'equals', '  ', bot('vSq', 'velocity', 'arrow1', 0.1, 0.1), '     ', 'd2ydx2'],
      dAcc: [bot('d2ydt2', 'acceleration', 'braceB1', 0.05, 0.08), 'equals', 'vSq', ' ', 'd2ydx2'],
      dAcc: [bot('d2ydt2', 'acceleration', 'braceB1', 0.05, 0.08), 'equals', 'vSq', ' ', 'd2ydx2'],
      d1: {
        content: ['d2ydt2', 'equals', 'vSq', ' ', 'd2ydx2'],
        elementMods: {
          d2: { color: color3 },
          _2_2: { color: color3 },
          _2_4: { color: color3 },
          v2: { color: color3 },
          t: { color: color3 },
          d4: { color: color3 },
          y_2: { color: colorOn },
          y_1: { color: colorOn },
          d1: { color: color1 },
          d3: { color: color1 },
          _2_1: { color: color1 },
          _2_3: { color: color1 },
          v1: { color: color1 },
          x: { color: color1 },
        }
      },
      d1Mono: {
        content: ['d2ydt2', 'equals', 'vSq', ' ', 'd2ydx2'],
        elementMods: {
          d2: { color: colorLight },
          _2_2: { color: colorLight },
          _2_4: { color: colorLight },
          v2: { color: colorLight },
          t: { color: colorLight },
          d4: { color: colorLight },
          y_2: { color: colorLight },
          y_1: { color: colorLight },
          d1: { color: colorLight },
          d3: { color: colorLight },
          _2_1: { color: colorLight },
          _2_3: { color: colorLight },
          v1: { color: colorLight },
          x: { color: colorLight },
        }
      },
      d1MonoSoln: {
        content: {
          lines: {
            content: [
              ['d2ydt2', 'equals', 'vSq', ' ', 'd2ydx2'],
              ['y', 'equals2', 'a', brac(['x_1', 'min1', 'v_1', 't_1'], 1), 'plus1', 'b', brac(['x_2', 'plus2', 'v_2', 't_2'], 2)],
            ],
            baselineSpace: 3.7,
            justify: 'center',
            // yAlign: 'middle',
          },
        },
        alignment: { xAlign: 'center' },
        elementMods: {
          d2: { color: colorLight },
          _2_2: { color: colorLight },
          _2_4: { color: colorLight },
          v2: { color: colorLight },
          t: { color: colorLight },
          d4: { color: colorLight },
          y_2: { color: colorLight },
          y_1: { color: colorLight },
          d1: { color: colorLight },
          d3: { color: colorLight },
          _2_1: { color: colorLight },
          _2_3: { color: colorLight },
          v1: { color: colorLight },
          x: { color: colorLight },
        }
      },
      d1Monont: {
        content: ['d2ydt2nt', 'equals', 'vSqnt', ' ', 'd2ydx2nt'],
        alignment: { xAlign: 'center' },
        elementMods: {
          d2: { color: colorLight },
          _2_2: { color: colorLight },
          _2_4: { color: colorLight },
          v2: { color: colorLight },
          t: { color: colorLight },
          d4: { color: colorLight },
          y_2: { color: colorLight },
          y_1: { color: colorLight },
          d1: { color: colorLight },
          d3: { color: colorLight },
          _2_1: { color: colorLight },
          _2_3: { color: colorLight },
          v1: { color: colorLight },
          x: { color: colorLight },
        }
      },
      properties: [
        { 
          container: {
            content: scale({
              lines: {
                content: ['mass', 'acceleration_1', 'force', 'length', 'spring constant', 'time', 'displacement disturbance'],
                yAlign: 'middle',
                baselineSpace: 0.8,
              },
            }, 0.5),
            // content: 'a',
            yAlign: 'middle',
          },
        },
        '            ',
        {
          container: {
            content: {
              lines: {
                content: [
                  ['F', '_  =  ', 'm', 'a'],
                  ['F_1', '_  =  _1', 'k', ' ', 'x_10'],
                ],
                yAlign: 'middle',
                baselineSpace: 1.5,
              },
            },
            // content: 'b',
            yAlign: 'middle',
          }
        },
        '            ',
        {
          container: {
            content: ['d2ydt2', 'equals', 'vSq', ' ', 'd2ydx2'],
            yAlign: 'middle',
          },
        },
      ],
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
  figure.add([
    {
      name: 'diffExplanation1',
      make: 'textLines',
      text: [
        '|Disturbance acceleration| is |proportional| to how',
        'rapidly the |disturbance gradient changes| in space.',
      ],
      modifiers: {
        'Disturbance acceleration': { font: { color: colorOn } },
        'disturbance gradient changes': { font: { color: color3 } },
        proportional: { font: { color: color1, style: 'italic' } },
      },
      font: { size: 0.8 },
      color: colorLight,
      position: [2, 3],
    },
    {
      name: 'diffExplanation2',
      make: 'textLines',
      text: [
        'If the |disturbance| |changes quickly in time| then it will',
        'also |change quickly over space|.',
      ],
      modifiers: {
        'disturbance': { font: { color: colorOn } },
        'changes quickly in time': { font: { color: color3 } },
        'change quickly over space': { font: { color: color1 } },
      },
      font: { size: 0.8 },
      color: colorLight,
      position: [2, 3],
    },
  ]);
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
    // eqn.animations.new()
    //   .goToForm({ target: 'dVel', animate: 'move', duration: 1.5 })
    //   .start();
  };
  eqn._dtBox.onClick = () => {
    eqn.stop('freeze');
    setColors(['d2ydt2']);
    // eqn.animations.new()
    //   .goToForm({ target: 'dAcc', animate: 'move', duration: 1.5 })
    //   .start();
  };
  eqn._dxBox.onClick = () => {
    // eqn.showForm('d1Inv1');
    eqn.stop('freeze');
    setColors(['d2ydx2']);
    // eqn.animations.new()
    //   .goToForm({ target: 'dGrad', animate: 'move', duration: 1.5 })
    //   .start();
  };
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
}

