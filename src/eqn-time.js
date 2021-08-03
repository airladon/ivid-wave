function addTimeWave(name) {

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
          min1: '  \u2212  ',
          min2: '  \u2212  ',
          equals1: '  =  ',
          equals2: '  =  ',
          comma1: ' , ',  
          comma2: ' , ',
          arrow1: { symbol: 'line', width: 0.04, arrow: { start: { head: 'triangle' } } },
          arrow2: { symbol: 'line', width: 0.04, arrow: { start: { head: 'triangle' } } },
          vin1: { symbol: 'vinculum', lineWidth: 0.05 },
          vin2: { symbol: 'vinculum', lineWidth: 0.05 },
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
          'f': { style: 'italic' },
          'x_1': { style: 'italic' },
          'x_2': { style: 'italic' },
          'x_3': { style: 'italic' },
          'x_4': { style: 'italic' },
          'x_5': { style: 'italic' },
          't_1': { style: 'italic' },
          't_2': { style: 'italic' },
          'v_1': { style: 'italic' },
          'v_2': { style: 'italic' },
          stop: '.',
          vin1: { symbol: 'vinculum', lineWidth: 0.05 },
        },
        phrases: {
          x0_1: sub('x_1', '_0_1'),
          x0_2: sub('x_2', '_0_2'),
          x1_1: sub('x_3', '_1_1'),
          x1_2: sub('x_4', '_1_2'),
          t1_1: sub('t_1', '_1_3'),
          t1_2: sub('t_2', '_1_4'),
          xOnV: frac('x_5', 1, 'v_1', 0.8, 0.02, 0.02),
        },
        formDefaults: { alignment: { xAlign: 'center' } },
        forms: {
          0: lines([
            ['A disturbance', '_ at initial position ', 'x0_1', '_ is a function of time'],
            ['equal to ', 'f', 'stop'],
          ], 1),
          1: lines([
            ['The initial disturbance propogates away from the initial position'],
          ], 1),
          2: lines([
            ['The initial disturbance propogates away from the initial position'],
            ['and so some position ', 'x1_1', '_ feels the disturbance some time after ', 'x0_1', 'stop']
          ], 1),
          3: lines([
            ['In other words, the disturbance at ', 'x1_2', '_ is the disturbance at ', 'x0_2'],
            ['that happened time ', 't1_1', '_ ago.']
          ], 1),
          4: lines([
            ['How long ago ', 't1_2', '_ depends on how far the wave moved ', 'x1_1'],
            ['and the velocity it moved ', 'v_1', 'stop'],
          ], 1),
          5: lines([
            ['As velocity is distance over time, then time is distance'],
            ['over velocity'],
          ], 1),
          6: lines([
            ['Position ', 'x1_1', '_ was arbitrarily chosen and it can represent any'],
            ['position ', 'x_4', '_ so we can generalize the equation.'],
          ], 1),
          7: lines([
            ['The disturbance at any position ', 'x_2', '_ and any time ', 't_1', '_ is the'],
            ['disturbance that happened at ', 'x0_1', '_ at time ', 'xOnV', '_ ago'],
          ], 1)
        }
      },
      {
        name: 'nav',
        make: 'collections.slideNavigator',
        equation: ['description', 'eqn'],
        // text: { position: [0, 0], font: { size: 0.5 }, yAlign: 'middle' },
        // text: null,
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
          { form: ['7', '4'] },
          // { form: ['1', '1'] },
          // { form: ['2', '1'] },
          // { form: ['2', '2'] },
          // { form: ['3', '2'] },
          // { form: ['3', '3'] },
          // // { form: '0' },
          // // { form: '1' },
          // // { form: '2' },
          // // { form: '3' },
          // { text: 'A disturbance at initial position |x0| depends on time', form: '0' },
          // { text: 'Subtract b from both sides' },
          // { form: '1' },
          // { text: 'The b terms cancel on the left hand side' },
          // { form: '2' },
        ],
      },
    ],
    position: [12, 3],
  });
};
