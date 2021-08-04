function addSinXEquation(name) {

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
          sin: { style: 'normal' },
          min1: { text: '  \u2212  ' },
          min2: { text: '  \u2212  ' },
          min3: { text: '  \u2212  ' },
          equals1: '  =  ',
          equals2: '  =  ',
          comma1: ' , ',  
          arrow1: { symbol: 'line', width: 0.04, arrow: { start: { head: 'triangle' } } },
          arrow2: { symbol: 'line', width: 0.04, arrow: { start: { head: 'triangle' } } },
          vin1: { symbol: 'vinculum', lineWidth: 0.05 },
          vin2: { symbol: 'vinculum', lineWidth: 0.05 },
          vin3: { symbol: 'vinculum', lineWidth: 0.05 },
          twoPi_1: '2\u03c0',
          twoPi_2: '2\u03c0',
          twoPi_3: '2\u03c0',
          box1: { symbol: 'box', lineWidth: 0.04 },
          box2: { symbol: 'box', lineWidth: 0.04 },
          brace: { symbol: 'brace', side: 'top', lineWidth: 0.04, width: 0.5 },
          w: { text: '\u03c9' },
          lambda_1: { text: '\u03bb' },
          lambda_2: { text: '\u03bb' },
          lambda_3: { text: '\u03bb' },
        },
        phrases: {
          yxt: ['y_1', brac(['x_1', 'comma1', 't_1'], 1), 'equals1', ' ', 'g_1', ' ', brac(['x_2', 'min1', 'v_1', 't_2'], 2 )],
          yxtBox: [box(['y_1', brac(['x_1', 'comma1', 't_1'], 1)], 'box1'), 'equals1', ' ', 'g_1', ' ', brac(['x_2', 'min1', 'v_1', 't_2'], 2 )],
          y: ['y_1', brac(['x_1', 'comma1', 't_1'], 1)],
          // yxtBox: [{ box: [['y_1', brac(['x_1', 'comma1', 't_1'], 1)], 'box1', false, 0.05] }, 'equals1', ' ', 'g_1', ' ', brac(['t_2', 'min1', frac('x_t', 1, 'v_t', 0.7)], 2)],
          tpl_1: frac('twoPi_1', 1, 'lambda_1', 0.7),
          tpl_2: frac('twoPi_2', 2, 'lambda_2', 0.7),
          tpl_3: frac('twoPi_3', 3, 'lambda_3', 0.7),
          // txv_2: frac('x_t3', 3, 'v_t3', 0.7),
        },
        formDefaults: { alignment: { fixTo: 'equals2' } },
        forms: {
          0: form(lines([
            line(['yxt'], 1),
          ], 2.5, 'element'), 'equals1'),
          1: lines([
            line(['yxt'], 1),
            line([
              'g_2', brac(['x_3'], 3), 'equals2', 'sin', brac(['tpl_1', ' ', 'x_4'], 4)
            ], 2),
          ], 2.5, 'element'),
          2: lines([
            line(['yxt'], 1),
            line([
              'g_2', brac(bc('x_3', ['x_5', 'min2', 'v_2', 't_3'], 'arrow1', 0.15, 0.05, 0.7, 0.1), 3), 'equals2', 'sin', brac(['tpl_1', ' ', bc('x_4', ['x_6', 'min3', 'v_3', 't_4'], 'arrow2', 0.15, 0.05, 0.7, 0.1)], 4)
            ], 2),
          ], 2.5, 'element'),
          3: lines([
            line(['yxt'], 1),
            line([
              'g_2', brac(['x_5', 'min2', 'v_2', 't_3'], 3), 'equals2', 'sin', brac(['tpl_1', ' ', brac(['x_6', 'min3', 'v_3', 't_4'], 5)], 4)
            ], 2),
          ], 2.5, 'element'),
          4: lines([
            line(['yxtBox'], 1),
            line([
              'g_2', brac(['x_5', 'min2', 'v_2', 't_3'], 3), 'equals2', box(['sin', brac(['tpl_1', ' ', brac(['x_6', 'min3', 'v_3', 't_4'], 5)], 4)], 'box2')
            ], 2),
          ], 2.5, 'element'),
          5: form(lines([
            line([
              'y', 'equals2', 'sin', brac(['tpl_1', ' ', brac(['x_6', 'min3', 'v_3', 't_4'], 5)], 4),
            ], 2),
          ], 2.5, 'element'), 'sin'),
          6: form(lines([
            line([
              'y', 'equals2', 'sin', brac(tc(['tpl_1', ' ', brac(['x_6', 'min3', 'v_3', 't_4'], 5)], ['tpl_2', ' ', 'x_3', 'min2', 'tpl_3', ' ', 'v_2', 't_3'], 'brace', 0.01, 0.1, 0.7), 4),
            ], 2),
          ], 2.5, 'element'), 'sin'),
          7: form(lines([
            line([
              'y', 'equals2', 'sin', brac(['tpl_2', ' ', 'x_3', 'min2', 'tpl_3', ' ', 'v_2', 't_3'], 4),
            ], 2),
          ], 2.5, 'element'), 'sin'),
          8: form(lines([
            line([
              'y', 'equals2', 'sin', brac(['  ', tc(box('tpl_2', 'box1'), 'k', 'arrow1', 0.05, 0.15, 0.8, 0.1, 0.35), '   ', 'x_3', 'min2', 'tpl_3', ' ', 'v_2', 't_3'], 4),
            ], 2),
          ], 2.5, 'element'), 'sin'),
          9: form(lines([
            line([
              'y', 'equals2', 'sin', brac(['k', ' ', 'x_3', 'min2', 'tpl_3', ' ', 'v_2', 't_3'], 4),
            ], 2),
          ], 2.5, 'element'), 'sin'),
          10: form(lines([
            line([
              'y', 'equals2', 'sin', brac(['k', ' ', 'x_3', 'min2', 'twoPi_3', ' ', frac('v_2', 3, 'lambda_3', 0.7), ' ', 't_3'], 4),
            ], 2),
          ], 2.5, 'element'), 'sin'),
          11: form(lines([
            line([
              'y', 'equals2', 'sin', brac(['k', ' ', 'x_3', 'min2', 'twoPi_3', '   ', tc(box(frac('v_2', 3, 'lambda_3', 0.7), 'box1'), 'f', 'arrow1', 0.05, 0.15, 0.8, 0.1, 0.35), '   ', 't_3'], 4),
            ], 2),
          ], 2.5, 'element'), 'sin'),
          12: form(lines([
            line([
              'y', 'equals2', 'sin', brac(['k', ' ', 'x_3', 'min2', 'twoPi_3', 'f', ' ', 't_3'], 4),
            ], 2),
          ], 2.5, 'element'), 'sin'),
          13: form(lines([
            line([
              'y', 'equals2', 'sin', brac(['k', ' ', 'x_3', 'min2', '  ', tc(box(['twoPi_3', 'f', ' '], 'box1'), 'w', 'arrow1', 0.05, 0.15, 0.8, 0.1, 0.35), '   ', 't_3'], 4),
            ], 2),
          ], 2.5, 'element'), 'sin'),
          14: form(lines([
            line([
              'y', 'equals2', 'sin', brac(['k', ' ', 'x_3', 'min2', 'w', ' ', 't_3'], 4),
            ], 2),
          ], 2.5, 'element'), 'sin'),
          15: form(lines([
            line([
              'y', 'equals2', 'sin', brac(['k', ' ', 'x_3', '_  +  ', 'w', ' ', 't_3'], 4),
            ], 2),
          ], 2.5, 'element'), 'sin'),
        },
        position: [-1, 3],
      },
      {
        name: 'description',
        make: 'equation',
        scale: 3.4,
        color: colorLight,
        textFont: { style: 'normal', color: colorLight },
        elements: {
          disturbance: { color: colorDisturbanceText },
          'any position ': { color: colorPositionText },
          'any time ': { color: colorTimeText },
          time: { color: colorDelay },
          'disturbance that happened at ': { color: colorGText },
          'disturbance at ': { color: colorGText },
          'delayed time ': { color: colorDelay },
          h: { color: colorGText, style: 'italic' },
          f: { style: 'italic' },
          ago: { color: colorDelay },
          sin: { color: colorGText },
          stop: '.',
          vin1: { symbol: 'vinculum', lineWidth: 0.05 },
          vin2: { symbol: 'vinculum', lineWidth: 0.05, color: colorDelay },
          x_1: { style: 'italic', color: colorPositionText },
          x_2: { style: 'italic', color: colorGText },
          x_3: { style: 'italic', color: colorGText },
          x_t: { style: 'italic', color: colorDelay },
          _0_2: { color: colorGText },
          _0_3: { color: colorGText },
          t_1: { style: 'italic' },
          t_2: { style: 'italic' },
          t_3: { style: 'italic' },
          v_1: { style: 'italic', color: colorVelocityText },
          plusV: { text: '+v', style: 'italic', color: colorVelocityText },
          v_3: { style: 'italic', color: colorDelay },
          // twoPiL: { text: '2\u03c0f', style: 'italic' },
          twoPi_1: { text: '2\u03c0', style: 'italic' },
          twoPi_2: { text: '2\u03c0', style: 'italic' },
          w: { text: '\u03c9', style: 'italic', color: colorOmega },
          lambda_1: { text: '\u03bb', style: 'italic' },
          lambda_2: { text: '\u03bb', style: 'italic' },
          f: { style: 'italic' },
          f_2: { style: 'italic' },
          'angular frequency ': { color: colorOmega },
          'wave number ': { color: colorK },
          k: { color: colorK, style: 'italic' },
        },
        phrases: {
          t0_1: sub('t_1', '_0_1'),
          t0_2: sub('t_2', '_0_2'),
          x0_3: sub('x_3', '_0_3'),
          xOnV: frac('x_5', 1, 'v_1', 0.8, 0.02, 0.02),
          xOnV1: frac('x_t', 2, 'v_3', 0.8, 0.02, 0.02),
          velf: ['v_1', '_ = ', 'lambda_1', 'f'],
          twoPif: ['twoPi_2', ' ', 'f_2'],
          twoPiL: frac('twoPi_2', 1, 'lambda_2', 0.7),
        },
        formDefaults: { alignment: { xAlign: 'center' } },
        forms: {
          0: lines([
            ['The ', 'disturbance', '_ at _', 'position ', 'x_1', '_ and ', 'time ', 't_3', '_ is the ', 'disturbance at time ', 't0_1'],
            ['shifted by the distance the wave has propogated since'],
          ], 1),
          1: lines([
            ['Make the ', 'disturbance at ', 't0_2', '_ a ', 'sin', '_ function.'],
          ]),
          '1a': lines([
            ['The sin function\'s output repeats every time it\'s input is a'],
            ['multiple of ', 'twoPi_1', '_. Thus the ', 'twoPiL', '_ term repeats the sin function'],
            ['each ', 'lambda_1', '_ in distance.']
          ], 1),
          2: lines([
            ['Substitute the ', 'shifted position ', 'into ', 'g', 'stop'],
          ]),
          3: lines([
            ['Equate like terms.'],
          ]),
          4: lines([
            ['Expand the ', 'sin', '_ function input.'],
          ]),
          5: lines([
            ['twoPiL', '_ is commonly called the ', 'wave number ', 'k', 'stop'],
          ]),
          6: lines([
            ['Use ', 'velf', ' ', '_ to simplify the second term.'],
          ]),
          7: lines([
            ['twoPif', '_ is commonly called the ', 'angular frequency ', 'w'],
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
        nextButton: { type: 'arrow', position: [11, 2.3], width: 2, length: 1,color: colorLight, line: { width: 0.02 }, touchBorder: 0.5 },
        prevButton: { type: 'arrow', position: [-11, 2.3], width: 2, length: 1, color: colorLight, line: { width: 0.02 }, touchBorder: 0.5 },
        disableOpacity: 0.2,
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
          // { form: ['6', '13'] },
          { form: ['7', '12'] },
          { form: ['7', '13'] },
          { form: ['7', '14'] },
          { form: ['8', '14'] },
          { form: ['8', '15'] },
          // { form: ['8', '15'] },
          // { form: ['9', '15'] },
          // { form: ['9', '16'] },
        ],
      },
    ],
    position: [12, 4.5],
  });
};
