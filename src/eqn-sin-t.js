function addSinTEquation(name) {

  figure.add({
    name,
    make: 'collection',
    elements: [
      {
        name: 'eqn',
        make: 'equation',
        scale: 5,
        color: colorLight,
        elements: {
          lb1: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
          rb1: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
          lb2: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
          rb2: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
          lb3: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
          rb3: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
          lb4: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
          rb4: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
          lb5: { symbol: 'squareBracket', side: 'left', lineWidth: 0.07, width: 0.16 },
          rb5: { symbol: 'squareBracket', side: 'right', lineWidth: 0.07, width: 0.16 },
          sin: { style: 'normal', color: colorFText },
          min1: { text: '  \u2212  ', color: colorTimeText },
          min2: { text: '  \u2212  ', color: colorTimeText },
          min3: { text: '  \u2212  ', color: colorTimeText },
          min4: { text: '  \u2212  ' },
          h_1: { color: colorFText },
          h_2: { color: colorFText },
          y_1: { color: colorDisturbanceText },
          // y_2: { color: colorDisturbanceText },
          // v: { color: colorVelocityText },
          v_t: { color: colorTimeText },
          v_t2: { color: colorTimeText },
          v_t3: { color: colorTimeText },
          equals1: '  =  ',
          equals2: '  =  ',
          comma1: ' , ',  
          // comma2: ' , ',
          arrow1: { symbol: 'line', width: 0.04, arrow: { start: { head: 'triangle' } } },
          arrow2: { symbol: 'line', width: 0.04, arrow: { start: { head: 'triangle' } } },
          vin1: { symbol: 'vinculum', lineWidth: 0.05, color: colorTimeText },
          vin2: { symbol: 'vinculum', lineWidth: 0.05, color: colorTimeText },
          vin3: { symbol: 'vinculum', lineWidth: 0.05, color: colorTimeText },
          vin4: { symbol: 'vinculum', lineWidth: 0.05 },
          x_1: { color: colorPositionText },
          // x_2: { color: colorPositionText },
          // x_3: { color: colorPositionText },
          // x_4: { color: colorPositionText },
          // x_5: { color: colorPositionText },
          x_t: { color: colorTimeText },
          x_t2: { color: colorTimeText },
          x_t3: { color: colorTimeText },
          // _0_1: { color: colorPositionText },
          // _1_1: { color: colorPositionText },
          // _1_2: { color: colorPositionText },
          t_1: { color: colorTimeText },
          t_2: { color: colorTimeText },
          t_3: { color: colorTimeText },
          t_4: { color: colorTimeText },
          t_5: { color: colorTimeText },
          t_6: { color: colorTimeText },
          // _1_3: { color: colorTimeText },
          twoPi_1: '2\u03c0',
          twoPi_2: '2\u03c0',
          twoPi_3: '2\u03c0',
          box1: { symbol: 'box', lineWidth: 0.04 },
          box2: { symbol: 'box', lineWidth: 0.04 },
          brace: { symbol: 'brace', side: 'bottom', lineWidth: 0.04, width: 0.5 },
          brace2: { symbol: 'brace', side: 'bottom', lineWidth: 0.04, width: 0.3 },
          w: { text: '\u03c9' },
          lambda: { text: '\u03bb' },
        },
        phrases: {
          x0_1: sub('x_1', '_0_1'),
          x1_1: sub('x_2', '_1_1'),
          x1_2: sub('x_3', '_1_2'),
          t1_1: sub('t_5', '_1_3'),
          yxt: ['y_1', brac(['x_1', 'comma1', 't_1'], 1), 'equals1', ' ', 'h_1', ' ', brac(['t_2', 'min1', frac('x_t', 1, 'v_t', 0.7)], 2)],
          yxtBox: [{ box: [['y_1', brac(['x_1', 'comma1', 't_1'], 1)], 'box1', false, 0.05] }, 'equals1', ' ', 'h_1', ' ', brac(['t_2', 'min1', frac('x_t', 1, 'v_t', 0.7)], 2)],
          txv_1: frac('x_t2', 2, 'v_t2', 0.7),
          txv_2: frac('x_t3', 3, 'v_t3', 0.7),
        },
        // formDefaults: { alignment: { fixTo: 'equals1' } },
        formDefaults: { alignment: { fixTo: 'equals2' } },
        forms: {
          0: form(lines([
            line(['yxt'], 1),
          ], 2.5, 'element'), 'equals1'),
          1: lines([
            line(['yxt'], 1),
            line([
              'h_2', brac(['t_3'], 3), 'equals2', 'sin', brac(['twoPi_1', 'f_1', ' ', 't_4'], 4)
            ], 2),
          ], 2.5, 'element'),
          2: lines([
            line(['yxt'], 1),
            line([
              'h_2', brac(bc('t_3', ['t_5', 'min2', 'txv_1'], 'arrow1', 0.15, 0.05, 0.7, 0.1), 3), 'equals2', 'sin', brac(['twoPi_1', 'f_1', ' ', bc('t_4', ['t_6', 'min3', 'txv_2'], 'arrow2', 0.15, 0.05, 0.7, 0.1)], 4)
            ], 2),
          ], 2.5, 'element'),
          3: lines([
            line(['yxt'], 1),
            line([
              'h_2', brac(['t_5', 'min2', 'txv_1'], 3), 'equals2', 'sin', brac(['twoPi_1', 'f_1', ' ', brac(['t_6', 'min3', 'txv_2'], 5)], 4),
            ], 2),
          ], 2.5, 'element'),
          4: lines([
            line(['yxtBox'], 1),
            line([
              'h_2', brac(['t_5', 'min2', 'txv_1'], 3), 'equals2', { box: [['sin', brac(['twoPi_1', 'f_1', ' ', brac(['t_6', 'min3', 'txv_2'], 5)], 4)], 'box2', false, 0.05] },
            ], 2),
          ], 2.5, 'element'),
          5: form(lines([
            line([
              'y_1', brac(['x_1', 'comma1', 't_1'], 1), 'equals2', 'sin', brac(['twoPi_1', 'f_1', ' ', brac(['t_6', 'min3', 'txv_2'], 5)], 4)
            ], 2),
          ], 2.5, 'element'), 'sin'),
          6: form(lines([
            line([
              'y_1', brac(['x_1', 'comma1', 't_1'], 1), 'equals2', 'sin', brac(bc(['twoPi_1', 'f_1', ' ', brac(['t_6', 'min3', 'txv_2'], 5)], ['twoPi_2', 'f_2', ' ', 't_2', 'min4', 'twoPi_3', 'f_3', ' ', 'txv_1'], 'brace', 0.01, 0.1, 0.7), 4)
            ], 2),
          ], 2.5, 'element'), 'sin'),
          7: form(lines([
            line([
              'y_1', brac(['x_1', 'comma1', 't_1'], 1), 'equals2', 'sin', brac(['twoPi_2', 'f_2', ' ', 't_2', 'min4', 'twoPi_3', 'f_3', ' ', 'txv_1'], 4)
            ], 2),
          ], 2.5, 'element'), 'sin'),
          8: form(lines([
            line([
              'y_1', brac(['x_1', 'comma1', 't_1'], 1), 'equals2', 'sin', brac([bc(['twoPi_2', 'f_2'], 'w', 'brace2', 0.05, 0.05, 0.9), ' ', 't_2', 'min4', 'twoPi_3', 'f_3', ' ', 'txv_1'], 4)
            ], 2),
          ], 2.5, 'element'), 'sin'),
          9: form(lines([
            line([
              'y_1', brac(['x_1', 'comma1', 't_1'], 1), 'equals2', 'sin', brac(['w', ' ', 't_2', 'min4', 'twoPi_3', 'f_3', ' ', 'txv_1'], 4)
            ], 2),
          ], 2.5, 'element'), 'sin'),
          10: form(lines([
            line([
              'y_1', brac(['x_1', 'comma1', 't_1'], 1), 'equals2', 'sin', brac(['w', ' ', 't_2', 'min4', 'twoPi_3', ' ', frac(['f_3', ' ', 'x_t2'], 2, 'v_t2', 0.7)], 4)
            ], 2),
          ], 2.5, 'element'), 'sin'),
          11: form(lines([
            line([
              'y_1', brac(['x_1', 'comma1', 't_1'], 1), 'equals2', 'sin', brac(['w', ' ', 't_2', 'min4', 'twoPi_3', ' ', frac('f_3', 2, 'v_t2', 0.7), ' ', 'x_t2'], 4)
            ], 2),
          ], 2.5, 'element'), 'sin'),
          12: form(lines([
            line([
              'y_1', brac(['x_1', 'comma1', 't_1'], 1), 'equals2', 'sin', brac(['w', ' ', 't_2', 'min4', 'twoPi_3', '    ', bc(box(frac('f_3', 2, 'v_t2', 0.7), 'box1'), frac('_1_4', 4, 'lambda'), 'arrow1', 0.05, 0.15, 0.6, 0.1, 0.35), '    ', 'x_t2'], 4)
            ], 2),
          ], 2.5, 'element'), 'sin'),
          13: form(lines([
            line([
              'y_1', brac(['x_1', 'comma1', 't_1'], 1), 'equals2', 'sin', brac(['w', ' ', 't_2', 'min4', frac('twoPi_3', 4, 'lambda', 0.7), ' ', 'x_t2'], 4)
            ], 2),
          ], 2.5, 'element'), 'sin'),
          14: form(lines([
            line([
              'y_1', brac(['x_1', 'comma1', 't_1'], 1), 'equals2', 'sin', brac(['w', ' ', 't_2', 'min4', bc(box(frac('twoPi_3', 4, 'lambda', 0.7), 'box'), 'k', 'arrow1', 0.05, 0.15, 0.7, 0.1, 0.35), '   ', 'x_t2'], 4)
            ], 2),
          ], 2.5, 'element'), 'sin'),
          15: form(lines([
            line([
              'y_1', brac(['x_1', 'comma1', 't_1'], 1), 'equals2', 'sin', brac(['w', ' ', 't_2', 'min4', 'k', ' ', 'x_t2'], 4)
            ], 2),
          ], 2.5, 'element'), 'sin'),
          16: form(lines([
            line([
              'y_1', brac(['x_1', 'comma1', 't_1'], 1), 'equals2', 'sin', brac(['w', ' ', 't_2', '_  +  ', 'k', ' ', 'x_t2'], 4)
            ], 2),
          ], 2.5, 'element'), 'sin'),
        },
        position: [-1, 3.5],
      },
      {
        name: 'description',
        make: 'equation',
        scale: 3.6,
        color: colorLight,
        textFont: { style: 'normal', color: colorLight },
        elements: {
          // f: { style: 'italic', color: colorFText },
          disturbance: { color: colorDisturbanceText },
          // disturbance_1: { color: colorFText },
          // position: { color: colorPositionText },
          // 'Position ': { color: colorPositionText },
          'any position ': { color: colorPositionText },
          // 'any position _1': { color: colorPositionText },
          'any time ': { color: colorTimeText },
          time: { color: colorTimeText },
          // time_1: { color: colorTimeText },
          // 'initial position': { color: colorPositionText },
          // 'initial position_1': { color: colorPositionText },
          // 'initial disturbance': { color: colorFText },
          'disturbance that happened at ': { color: colorFText },
          'disturbance at ': { color: colorFText },
          'delayed time ': { color: colorTimeText },
          h: { color: colorFText },
          f: { style: 'italic' },
          // 'function of time': { color: colorTimeText },
          ago: { color: colorTimeText },
          sin: { color: colorFText },
          // 'disturbance at ': { color: colorFText },
          // '_ is ago ': { color: colorTimeText },
          // 'How long ': { color: colorTimeText },
          // 'how far': { color: colorPositionText },
          velocity: { color: colorVelocityText },
          stop: '.',
          stop_1: '.',
          vin1: { symbol: 'vinculum', lineWidth: 0.05 },
          vin2: { symbol: 'vinculum', lineWidth: 0.05, color: colorTimeText },
          x_1: { style: 'italic', color: colorPositionText },
          x_2: { style: 'italic', color: colorFText },
          x_3: { style: 'italic', color: colorFText },
          // x_4: { style: 'italic', color: colorPositionText },
          // x_5: { style: 'italic', color: colorPositionText },
          // x_6: { style: 'italic', color: colorPositionText },
          x_t: { style: 'italic', color: colorTimeText },
          _0_1: { color: colorPositionText },
          _0_2: { color: colorFText },
          _0_3: { color: colorFText },
          // _1_1: { color: colorPositionText },
          // _1_2: { color: colorPositionText },
          // _1_3: { color: colorPositionText },
          t_1: { style: 'italic', color: colorTimeText },
          t_2: { style: 'italic', color: colorTimeText },
          // _1_4: { color: colorTimeText },
          // _1_5: { color: colorTimeText },
          v_1: { style: 'italic', color: colorVelocityText },
          v_2: { style: 'italic', color: colorVelocityText },
          plusV: { text: '+v', style: 'italic', color: colorVelocityText },
          v_3: { style: 'italic', color: colorTimeText },
          twoPif: { text: '2\u03c0f', style: 'italic' },
          twoPi: { text: '2\u03c0', style: 'italic' },
          w: { text: '\u03c9', style: 'italic' },
          lambda_1: { text: '\u03bb', style: 'italic' },
          lambda_2: { text: '\u03bb', style: 'italic' },
          f: { style: 'italic' },
        },
        phrases: {
          x0_1: sub('x_1', '_0_1'),
          x0_2: sub('x_2', '_0_2'),
          x0_3: sub('x_3', '_0_3'),
          // x1_1: sub('x_3', '_1_1'),
          // x1_2: sub('x_4', '_1_2'),
          // x1_3: sub('x_5', '_1_3'),
          // t1_1: sub('t_1', '_1_4'),
          // t1_2: sub('t_2', '_1_5'),
          xOnV: frac('x_5', 1, 'v_1', 0.8, 0.02, 0.02),
          xOnV1: frac('x_t', 2, 'v_3', 0.8, 0.02, 0.02),
          velf: ['v_1', '_ = ', 'lambda_1', 'f'],
          twoPiL: frac('twoPi', 1, 'lambda_2'),
        },
        formDefaults: { alignment: { xAlign: 'center' } },
        forms: {
          0: lines([
            ['The ', 'disturbance', '_ at _', 'any position ', 'x_1', '_ and ', 'any time ', 't_1', '_ is the'],
            ['disturbance that happened at ', 'x0_2', '_ at ', 'time', '  ', 'xOnV1', '  ', 'ago', 'stop'],
          ], 1),
          1: lines([
            ['Make the ', 'disturbance at ', 'x0_3', '_ a ', 'sin', '_ function.'],
          ]),
          '1a': lines([
            ['The sin function\'s output repeats every time it\'s input is a'],
            ['multiple of ', 'twoPi', '_. Thus the ', 'twoPif', '_ term repeats the sin function'],
            ['f', ' ', '_ times per second.']
          ], 1),
          2: lines([
            ['Substitute the ', 'delayed time ', 'into ', 'h', 'stop'],
          ]),
          3: lines([
            ['Equate like terms.'],
          ]),
          4: lines([
            ['Expand the ', 'sin', '_ function input.'],
          ]),
          5: lines([
            ['twoPif', '_ is commonly called the angular frequency ', 'w', 'stop'],
          ]),
          6: lines([
            ['Use ', 'velf', ' ', '_ to simplify the second term.'],
          ]),
          7: lines([
            ['twoPiL', '_ is commonly called the wave number ', 'k'],
          ]),
          8: lines([
            ['This equation describes a sine wave travelling with velocity ', 'plusV', 'stop'],
          ]),
          9: lines([
            ['If the wave were travelling in the negative direction, then the sign'],
            ['would switch.'],
          ], 1),
        }
      },
      {
        name: 'nav',
        make: 'collections.slideNavigator',
        equation: ['description', 'eqn'],
        color: colorLight,
        nextButton: { type: 'arrow', position: [11, -0.3], width: 2, length: 1,color: colorLight },
        prevButton: { type: 'arrow', position: [-11, -0.3], width: 2, length: 1, color: colorLight },
        slides: [
          { form: ['0', '0'] },
          { form: ['1', '0'] },
          { form: ['1', '1'] },
          { form: ['1a', '1'] },
          { form: ['2', '1'] },
          { form: ['2', '2'] },
          { form: ['2', '3'] },
          { form: ['3', '3'] },
          { form: ['3', '4'] },
          { form: ['3', '5'] },
          { form: ['4', '5'] },
          { form: ['4', '6'] },
          { form: ['4', '7'] },
          { form: ['5', '7'] },
          { form: ['5', '8'] },
          { form: ['5', '9'] },
          { form: ['6', '9'] },
          { form: ['6', '10'] },
          { form: ['6', '11'] },
          { form: ['6', '12'] },
          { form: ['6', '13'] },
          { form: ['7', '13'] },
          { form: ['7', '14'] },
          { form: ['7', '15'] },
          { form: ['8', '15'] },
          { form: ['9', '15'] },
          { form: ['9', '16'] },
          // { form: ['2', '0'] },
          // { form: ['3', '0'] },
          // { form: ['3', '1'] },
          // { form: ['4', '1'] },
          // { form: ['5', '1'] },
          // { form: ['5', '2'] },
          // { form: ['5', '3'] },
          // { form: ['6', '3'] },
          // { form: ['6', '4'] },
          // { form: ['7', '5'] },
        ],
      },
    ],
    position: [12, 3],
  });
};
