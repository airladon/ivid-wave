function addDiffEquation(name) {

  const d2 = (dIndex) => ({
    sup: [`d${dIndex}`, `_2_${dIndex}`],
  });
  const sq = (content, _2Index) => ({
    sup: [content, `_2_${_2Index}`],
  })
  const t = (boxIndex, content) => ({
    tBox: [content, `tBox${boxIndex}`],
  });

  const eqn = figure.add({
    name,
    make: 'equation',
    scale: 6,
    position: [4, 8],
    color: colorLight,
    dimColor: colorYellow,
    elements: {
      lb4: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
      rb4: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
      lb1: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16, color: colorFText },
      rb1: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16, color: colorFText },
      lb5: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
      rb5: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
      lb2: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16, color: colorGText },
      rb2: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16, color: colorGText },
      lb3: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
      rb3: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
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
      x_2_: 'x',
      x_2: { color: colorFText },
      x_3_: 'x',
      x_3: { color: colorGText },
      t: 't',
      t_1: { color: colorTimeText },
      t_2_: 't',
      t_2: { color: colorFText },
      t_3_: 't',
      t_3: { color: colorGText },
      y_1: 'y',
      y_2: 'y',
      y_3: { color: colorPositionText },
      y_4: { color: colorTimeText },
      y_5_: 'y',
      y_5: { color: colorDisturbanceText },
      v: 'v',
      v_1: { color: colorVelocityText },
      v_2_: 'v',
      v_2: { color: colorFText },
      v_3_: 'v',
      v_3: { color: colorGText },
      h_: 'h',
      h: { color: colorGText },
      g_: 'g',
      g: { color: colorFText },
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
      equals: '  =  ',
      equals1: '  =  ',
      equals2: '  =  ',
      min1_: '  \u2212  ',
      min1: { text: '  \u2212  ', color: colorFText },
      min2: { text: '  \u2212  ' },
      vin1: { symbol: 'vinculum', lineWidth: 0.05 },
      vin2: { symbol: 'vinculum', lineWidth: 0.05 },
      vin3: { symbol: 'vinculum', lineWidth: 0.05, color: colorPositionText },
      vin4: { symbol: 'vinculum', lineWidth: 0.05, color: colorTimeText },
      vin5: { symbol: 'vinculum', lineWidth: 0.05 },
      tBox1: tBox([0.5, 0.5, 0.5, 0.5]),
      tBox2: tBox([0.5, 1.2, 0.2, 1.3]),
      tBox3: tBox([0.1, 0.6, 0.5, 0.5]),
      tBox4: tBox([0.5, 0.5, 0.5, 0.5]),
      tBox5: tBox([0, 0.5, 0, 0.5]),
      tBox6: tBox([0.5, 0.5, 0, 0.5]),
      tBox7: tBox([0, 0.5, 0.5, 0.5]),
      plus1_: '  +  ',
      plus1: { text: '  +  ', color: colorPositionText },
      plus2_: '  +  ',
      plus2: { text: '  +  ', color: colorGText },
      box1: { symbol: 'box', lineWidth: 0.04 },
      box2: { symbol: 'box', lineWidth: 0.04 },
      times: ' \u00d7 ',
    },
    phrases: {
      d2ydx2_: frac([d2(1), 'y_1'], 1, ['d3', sq('x', 3)], 1, 0.02, 0.05, 0.01),
      d2dx2_: frac([d2(1)], 1, ['d3', sq('x', 3)], 1, 0.02, 0.05, 0.01),
      d2ydt2_: frac([d2(2), 'y_2'], 2, ['d4', sq('t', 4)], 1, 0.02, 0.05, 0.01),
      d2dt2_: frac([d2(2)], 2, ['d4', sq('t', 4)], 1, 0.02, 0.05, 0.01),
      d2ydx2: t(3, frac([d2(5), 'y_3'], 3, ['d7', sq('x_1', 7)], 1, 0.02, 0.05, 0.01), 'dxBox'),
      d2ydt2: t(1, frac([d2(6), 'y_4'], 4, ['d8', sq('t_1', 8)], 1, 0.02, 0.05, 0.01), 'dtBox'),
      vSq: t(2, sq('v_1', 10), 'vBox'),
      vSq_: sq('v', 9),
    },
    forms: {
      diffSoln: {
        content: {
          lines: {
            content: [
              scale([
                'd2ydt2_', 'equals', 'vSq_', '  ', 'd2ydx2_',
              ], 0.8),
              [
                {
                  container: {
                    content: [
                      'y_5_', 'equals2', 'b_', brac(['x_2_', 'min1_', 'v_2_', 't_2_'], 4), 'plus1_', 'c_', brac(['x_3_', 'plus2_', 'v_3_', 't_3_'], 5),
                    ],
                    inSize: false,
                  },
                },
                t(4, 'y_5'), 'equals2', t(6, ['g', brac(['x_2', 'min1', 'v_2', 't_2'], 1)]), t(5, 'plus1'), t(7, ['h', brac(['x_3', 'plus2', 'v_3', 't_3'], 2)]),
              ],
            ],
            baselineSpace: 3.7,
            justify: 'center',
          },
        },
        alignment: { xAlign: 'center' },
      },
      diffSolnMono: {
        content: {
          lines: {
            content: [
              scale([
                'd2ydt2_', 'equals', 'vSq_', '  ', 'd2ydx2_',
              ], 0.8),
              ['',
                // 'y_5_', 'equals2', 'b_', brac(['x_2_', 'min1_', 'v_2_', 't_2_'], 4), 'plus1_', 'c_', brac(['x_3_', 'plus2_', 'v_3_', 't_3_'], 5),
              ],
            ],
            baselineSpace: 3.7,
            justify: 'center',
          },
        },
        alignment: { xAlign: 'center' },
      },
      diffSolnMono1: {
        content: {
          lines: {
            content: [
              scale([
                'd2ydt2_', 'equals', 'vSq_', '  ', 'd2ydx2_',
              ], 0.8),
              [
                'y_5_', 'equals2', 'g_', brac(['x_2_', 'min1_', 'v_2_', 't_2_'], 4), 'plus1_', 'h_', brac(['x_3_', 'plus2_', 'v_3_', 't_3_'], 5),
              ],
            ],
            baselineSpace: 3.7,
            justify: 'center',
          },
        },
        alignment: { xAlign: 'center' },
      },
      diffSolnMono2: {
        content: {
          lines: {
            content: [
              scale([
                'd2ydt2_', 'equals', 'vSq_', '  ', 'd2ydx2_',
              ], 0.8),
              [
                'y_5_', 'equals2', 'g_', brac(['x_2_', 'min1_', 'v_2_', 't_2_'], 4), 'plus1_', 'h_', brac(['x_3_', 'plus2_', 'v_3_', 't_3_'], 5),
              ],
            ],
            baselineSpace: 3,
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
      results: {
        content: {
          lines: {
            content: [
              ['d2ydt2_', 'equals', 'vSq_', '  ', 'd2ydx2_'],
              {
                content: [sq('v_4', 11), 'equals2', frac(['k', sq('L', 12)], 5, 'm', 1, 0.02, 0.05, 0.01)],
                baselineSpace: -4,
              },
              {
                content: ['y_6', 'equals1', 'b_1', brac(['x_4', 'min2', 'v_5', 't_4'], 3)],
                baselineSpace: 8,
              },
            ],
          },
        },
        // content: ['d2ydt2_', 'equals', 'vSq_', '  ', 'd2ydx2_'],
        alignment: { xAlign: 'center' },
      },
      diffMono: {
        content: ['d2ydt2_', 'equals', 'vSq_', '  ', 'd2ydx2_'],
        alignment: { xAlign: 'center' },
      },
      diffSeparate: {
        content: [box(scale('d2dt2_', 0.8), 'box1'), '    ', 'y_2', 'equals', 'vSq_', '    ', box(scale('d2dx2_', 0.8), 'box2'), '    ', 'y_1'],
        alignment: { xAlign: 'center' },
      },
      diffMonoSmall: {
        content: scale(['d2ydt2_', 'equals', 'vSq_', '  ', 'd2ydx2_'], 0.8),
        alignment: { xAlign: 'center' },
      },
      vdt: {
        content: ['velocity', 'equals', frac('distance', 1, 'time')],
        alignment: { xAlign: 'center' },
      },
      dvt: {
        content: ['distance', 'equals', 'velocity', 'times', 'time'],
        translation: {
          distance: { style: 'curve', direction: 'up', mag: 0.4 },
          velocity: { style: 'curve', direction: 'down', mag: 0.4 },
        },
        alignment: { xAlign: 'center' },
      },
    },
    mods: {
      scenarios: {
        default: { position: [12, 6], scale: 1 },
        diffHigh: { position: [12, 8], scale: 1 },
        summary: { position: [19, 3], scale: 0.75 },
        props: { position: [19.5, 6], scale: 0.7 },
        velocity: { position: [12, 1], scale: 0.6 },
        // right: { position: [19.5, 10], scale: 0.7 },
      },
    },
  });
  const description = figure.add({
    name: 'diffExplanation',
    make: 'equation',
    color: colorLight,
    // font: { family: 'TeXGyreTermes' },
    // textFont: { family: 'TeXGyreTermes', style: 'normal' },
    // font: { family: 'Open Sans' },
    // textFont: { family: 'Open Sans', style: 'normal' },
    font: { family: 'Open Sans' },
    textFont: { family: 'Open Sans', style: 'normal' },
    scale: 4.4,
    position: [12, 3],
    formDefaults: { alignment: { xAlign: 'center' }, lazyLayout: true },
    elements: {
      tBox1: tBox([0.1, 0.2, 0.1, 0.3]),
      tBox2: tBox([0.1, 0.1, 0.1, 0.3]),
      tBox3: tBox([0.1, 0.3, 0.1, 0.1]),
      tBox4: tBox([0.1, 0.2, 0.1, 0.1]),
      tBox5: tBox([0.1, 0.1, 0.1, 0.1]),
      tBox6: tBox([0.1, 0.1, 0.1, 0.1]),
      tBox7: tBox([0.1, 0.1, 0.1, 0.1]),
      disturbance: { color: colorDisturbanceText },
      'shape of the disturbance in time': { color: colorTimeText },
      'proportional': { color: colorVelocityText },
      'shape of the disturbance in space': { color: colorPositionText },
      'positive travelling wave': { color: colorFText },
      'negative travelling wave': { color: colorGText },
      superimposed: { color: colorPositionText },
    },
    phrases: {
      // x0: { sub: ['x', '_0'] },
    },
    forms: {
      diff: lines([
        ['The ', t(1, 'shape of the disturbance in time'), '_ is ', t(2, 'proportional'),],
        ['to the ', t(3, 'shape of the disturbance in space')],
      ], 1.2),
      soln: lines([
        ['The ', t(4, 'disturbance'), '_ is equal to a ', t(6, 'positive travelling wave'), ],
        [t(5, 'superimposed'), '_ with a ', t(7, 'negative travelling wave')],
      ], 1.2),
    },
  });

  figure.add({
    name: 'eqnProps',
    make: 'equation',
    scale: 3,
    color: colorLight,
    position: [4, 6],
    formDefaults: { alignment: { xAlign: 'center'} },
    elements: {
      mass: 'mass (m)',
      acceleration: 'acceleration (a)',
      force: 'force (F)',
      length: 'length (L)',
      'spring constant': 'spring constant (k)',
      time: 'time (t)',
      disturbance: 'disturbance (y)',
    },
    forms: {
      0: {
        lines: {
          content: ['mass', 'acceleration', 'force', 'length', 'spring constant', 'time', 'disturbance'],
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
    formDefaults: { alignment: { xAlign: 'center'}, lazyLayout: true },
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
    color: colorYellowText,
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
    color: colorYellowText,
  });
  const d = description;
  const e = eqn;
  highlightN(1, d, e, [0.1, 0.2, 0.1, 0.2], [0.1, 0.1, 0.1, 0.2], 1.1, 1.1);
  highlightN(2, d, e, [0.1, 0.2, 0.1, 0.2], [0.1, 0.1, 0.1, 0.2], 1.3, 1.1);
  highlightN(3, d, e, [0.1, 0.2, 0.1, 0.2], [0.1, 0.1, 0.1, 0.2], 1.1, 1.1);
  highlightN(4, d, e, [0.3, 0.1, 0.1, 0.2], 0.1, 1.3, 1.1);
  highlightN(5, d, e, [-0.1, 0.2, -0.1, 0.2], 0.1, 1.3, 1.1);
  highlightN(6, d, e, [0.1, 0.2, 0.1, 0.2], 0.1, 1.3, 1.1);
  highlightN(7, d, e, [0.1, 0.2, 0.1, 0.2], 0.1, 1.3, 1.1);
}

