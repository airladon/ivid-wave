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
          min1: { text: '  \u2212  ', color: colorTimeText },
          f_1: { color: colorFText },
          f_2: { color: colorFText },
          y_1: { color: colorDisturbanceText },
          y_2: { color: colorDisturbanceText },
          v: { color: colorVelocityText },
          v_t: { color: colorTimeText },
          equals1: '  =  ',
          equals2: '  =  ',
          comma1: ' , ',  
          comma2: ' , ',
          arrow1: { symbol: 'line', width: 0.04, arrow: { start: { head: 'triangle' } } },
          arrow2: { symbol: 'line', width: 0.04, arrow: { start: { head: 'triangle' } } },
          vin1: { symbol: 'vinculum', lineWidth: 0.05 },
          vin2: { symbol: 'vinculum', lineWidth: 0.05, color: colorTimeText },
          x_1: { color: colorPositionText },
          x_2: { color: colorPositionText },
          x_3: { color: colorPositionText },
          x_4: { color: colorPositionText },
          x_5: { color: colorPositionText },
          x_6: { color: colorTimeText },
          _0_1: { color: colorPositionText },
          _1_1: { color: colorPositionText },
          _1_2: { color: colorPositionText },
          t_1: { color: colorTimeText },
          t_2: { color: colorTimeText },
          t_3: { color: colorTimeText },
          t_4: { color: colorTimeText },
          t_5: { color: colorTimeText },
          _1_3: { color: colorTimeText },
        },
        phrases: {
          x0_1: sub('x_1', '_0_1'),
          x1_1: sub('x_2', '_1_1'),
          x1_2: sub('x_3', '_1_2'),
          t1_1: sub('t_5', '_1_3'),
        },
        // formDefaults: { alignment: { fixTo: 'equals1' } },
        formDefaults: { alignment: { xAlign: 'center' } },
        forms: {
          0: ['y_1', brac(['x0_1', 'comma1', 't_1'], 1), 'equals1', ' ', 'f_1', ' ', brac('t_2', 2)],
          1: form(lines([
            ['y_1', brac(['x0_1', 'comma1', 't_1'], 1), 'equals1', ' ', 'f_1', ' ', brac('t_2', 2)],
            ['y_2', brac(['x1_1', 'comma2', 't_3'], 3), 'equals2', ' ', 'f_2', ' ', brac(['t_4', 'min1', 't1_1'], 4)],
          ], 2.5), 'center', 0.3),
          2: lines([
            ['y_2', brac(['x1_1', 'comma2', 't_3'], 3), 'equals2', ' ', 'f_2', ' ', brac(['t_4', 'min1', tc('t1_1', frac('x1_2', 1, 'v', 0.7), 'arrow1')], 4)],
          ]),
          3: lines([
            ['y_2', brac(['x1_1', 'comma2', 't_3'], 3), 'equals2', ' ', 'f_2', ' ', brac(['t_4', 'min1', frac('x1_2', 1, 'v', 0.7)], 4)],
          ]),
          4: lines([
            ['y_2', brac(['x_2', 'comma2', 't_3'], 3), 'equals2', ' ', 'f_2', ' ', brac(['t_4', 'min1', frac('x_3', 1, 'v', 0.7)], 4)],
          ]),
          5: lines([
            [
              'y_2', brac(['x_2', 'comma2', 't_3'], 3), 'equals2', ' ', 'f_2', ' ',
              brac([
                't_4', 'min1',
                {
                  container: {
                    content: frac('x_3', 1, 'v', 0.7), inSize: false,
                  },
                },
                frac('x_6', 2, 'v_t', 0.7),
              ], 4),
            ],
          ]),
        },
        position: [0, 3.5],
      },
      {
        name: 'description',
        make: 'equation',
        scale: 3.6,
        color: colorLight,
        textFont: { style: 'normal', color: colorLight },
        elements: {
          f: { style: 'italic', color: colorFText },
          disturbance: { color: colorDisturbanceText },
          disturbance_1: { color: colorFText },
          position: { color: colorPositionText },
          'Position ': { color: colorPositionText },
          'any position ': { color: colorPositionText },
          'any position _1': { color: colorPositionText },
          'any time ': { color: colorTimeText },
          time: { color: colorTimeText },
          time_1: { color: colorTimeText },
          'initial position': { color: colorPositionText },
          'initial position_1': { color: colorPositionText },
          'initial disturbance': { color: colorFText },
          'disturbance that happened at ': { color: colorFText },
          'function of time': { color: colorTimeText },
          ago: { color: colorTimeText },
          'disturbance at ': { color: colorFText },
          '_ is ago ': { color: colorTimeText },
          'How long ': { color: colorTimeText },
          'how far': { color: colorPositionText },
          velocity: { color: colorVelocityText },
          stop: '.',
          stop_1: '.',
          vin1: { symbol: 'vinculum', lineWidth: 0.05 },
          vin2: { symbol: 'vinculum', lineWidth: 0.05, color: colorTimeText },
          x_1: { style: 'italic', color: colorPositionText },
          x_2: { style: 'italic', color: colorFText },
          x_3: { style: 'italic', color: colorPositionText },
          x_4: { style: 'italic', color: colorPositionText },
          x_5: { style: 'italic', color: colorPositionText },
          x_6: { style: 'italic', color: colorPositionText },
          x_7: { style: 'italic', color: colorTimeText },
          _0_1: { color: colorPositionText },
          _0_2: { color: colorFText },
          _0_3: { color: colorFText },
          _1_1: { color: colorPositionText },
          _1_2: { color: colorPositionText },
          _1_3: { color: colorPositionText },
          t_1: { style: 'italic', color: colorTimeText },
          t_2: { style: 'italic', color: colorTimeText },
          _1_4: { color: colorTimeText },
          _1_5: { color: colorTimeText },
          v_1: { style: 'italic', color: colorVelocityText },
          v_2: { style: 'italic', color: colorVelocityText },
          v_3: { style: 'italic', color: colorTimeText },
        },
        phrases: {
          x0_1: sub('x_1', '_0_1'),
          x0_2: sub('x_2', '_0_2'),
          x1_1: sub('x_3', '_1_1'),
          x1_2: sub('x_4', '_1_2'),
          x1_3: sub('x_5', '_1_3'),
          t1_1: sub('t_1', '_1_4'),
          t1_2: sub('t_2', '_1_5'),
          xOnV: frac('x_5', 1, 'v_1', 0.8, 0.02, 0.02),
          xOnV1: frac('x_7', 2, 'v_3', 0.8, 0.02, 0.02),
        },
        formDefaults: { alignment: { xAlign: 'center' } },
        forms: {
          0: lines([
            ['A ', 'disturbance', '_ at ', 'initial position', '  ', 'x0_1', '_ is a ', 'function of time'],
            ['equal to ', 'f', 'stop'],
          ], 1),
          1: lines([
            ['The ', 'initial disturbance', '_ propogates away from the ', 'initial position_1'],
          ], 1),
          2: lines([
            ['The ', 'initial disturbance', '_ propogates away from the ', 'initial position_1'],
            ['and so some ', 'position', '  ', 'x1_1', '_ feels the ','disturbance_1', '_ some ', 'time', '_ after ', 'x0_1', 'stop']
          ], 1),
          3: lines([
            ['In other words, the ', 'disturbance', '_ at ', 'x1_2', '_ is the ', 'disturbance at ', 'x0_2'],
            ['that happened ', 'time_1', '  ', 't1_1', '  ', 'ago', 'stop_1']
          ], 1),
          4: lines([
            ['How long ', 't1_2', '_ is ago ', '_ depends on ', 'how far', '_ the wave moved ', 'x1_1'],
            ['and the ', 'velocity', '_ it moved at ', 'v_1', 'stop'],
          ], 1),
          5: lines([
            ['How long ', 't1_2', '_ is ago ', '_ depends on ', 'how far', '_ the wave moved ', 'x1_1'],
            ['and the ', 'velocity', '_ it moved at ', 'v_1', 'stop'],
            ['Time ', 't1_1', '_ can then be expressed as velocity and distance.'],
          ], 1),
          6: lines([
            ['Position ', 'x1_2', '_ was arbitrarily chosen and it can represent '],
            ['any position ', 'x_1', '_, so we can generalize by replacing ', 'x1_3', '_ with ', 'x_6', 'stop_1'],
          ], 1),
          7: lines([
            ['The ', 'disturbance', '_ at _', 'any position _1', 'x_3', '_ and ', 'any time ', 't_1', '_ is the'],
            ['disturbance that happened at ', 'x0_2', '_ at ', 'time', '  ', 'xOnV1', '  ', 'ago', 'stop'],
          ], 1)
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
          { form: ['2', '0'] },
          { form: ['3', '0'] },
          { form: ['3', '1'] },
          { form: ['4', '1'] },
          { form: ['5', '1'] },
          { form: ['5', '2'] },
          { form: ['5', '3'] },
          { form: ['6', '3'] },
          { form: ['6', '4'] },
          { form: ['7', '5'] },
        ],
      },
    ],
    position: [12, 3],
  });
};

