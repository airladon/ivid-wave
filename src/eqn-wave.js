/* eslint-disable camelcase, object-curly-newline, max-len */
/* globals colorDisturbanceText, colorPositionText, colorDisturbanceText, colorLight, colorTimeText, tBox, brac, tc, figure, highlightN, lines, frac, line, bc, colorGreenText, colorPurpleText, colorYellowText, colorCyanText, sub, under, scale, hide, box */
function addTravellingWaveEquation(name) {
  const t = (content, boxIndex) => ({
    tBox: [content, `tBox${boxIndex}`],
  });

  // const getElementMods = (elements, color) => {
  //   const elementMods = {};
  //   elements.forEach(e => {
  //     elementMods[e] = { color: color.slice() };
  //   });
  //   return elementMods;
  // }
  // const form = (content, elements, color = colorYellow) => ({
  //     content, elementMods: getElementMods(elements, color),
  // });

  const eqn = figure.add({
    name,
    make: 'equation',
    scale: 5,
    position: [4, 8],
    color: colorLight,
    dimColor: colorYellowText,
    font: { family: 'TeXGyreTermes' },
    textFont: { family: 'TeXGyreTermes' },
    mods: {
      scenarios: {
        default: { position: [10, 5], scale: 1.3 },
        summary: { position: [17.7, 6], scale: 1 },
        high: { position: [10, 8.5], scale: 1.3 },
        highSmall: { position: [10, 9.2], scale: 1.1 },
      },
    },
    elements: {
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
      lb6: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
      rb6: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
      y: 'y',
      x: 'x',
      x_1: 'x',
      t: 't',
      g: 'g',
      v: 'v',
      t_1: 't',
      y_c: { color: colorDisturbanceText },
      x_c: { color: colorPositionText },
      x_c1: { color: colorGreenText },
      t_c: { color: colorTimeText },
      g_c: { color: colorGreenText },
      v_c: { color: colorPurpleText },
      t_c1: { color: colorPurpleText },
      equals1: '  =  ',
      equals2: '  =  ',
      equals3: '  =  ',
      min: '  \u2212  ',
      min_c: { text: '  \u2212  ', color: colorCyanText },
      min1: '  \u2212  ',
      min2: '  \u2212  ',
      // xDash: 'x\'',
      comma: ' , ',
      comma2: ' , ',
      arrow1: { symbol: 'line', width: 0.04, arrow: { start: { head: 'triangle' } } },
      arrow2: { symbol: 'line', width: 0.04, arrow: { start: { head: 'triangle' } } },
      tBox1: tBox([0.5, 0.5, 0.25, 0.5]),
      tBox2: tBox([0.2, 0.7, 0.3, 0.5]),
      tBox3: tBox([0.3, 0.5, 0.5, 0.5]),
      tBox4: tBox([0.5, 0.5, 1.1, 0.7]),
      tBox5: tBox([-0.2, 0.5, -0.2, 0.5]),
      tBox6: tBox([0.2, 0.5, 0.5, 0.5]),
      shift: 'shift',
      shift_1: { color: colorYellowText },
      twoPi: { text: '2\u03c0', style: 'italic' },
      twoPi_1: { text: '2\u03c0', style: 'italic' },
      twoPi_2: { text: '2\u03c0', style: 'italic' },
      w: { text: '\u03c9', style: 'italic' },
      lambda: { text: '\u03bb', style: 'italic' },
      lambda_1: { text: '\u03bb', style: 'italic' },
      lambda_2: { text: '\u03bb', style: 'italic' },
      vin1: { symbol: 'vinculum', lineWidth: 0.05 },
      vin2: { symbol: 'vinculum', lineWidth: 0.05 },
      vin3: { symbol: 'vinculum', lineWidth: 0.05 },
      sin: { style: 'normal' },
      sin_1: { style: 'normal' },
      box1: { symbol: 'box', lineWidth: 0.04 },
      box2: { symbol: 'box', lineWidth: 0.04 },
    },
    phrases: {
      general: ['y', brac(['x', 'comma', 't'], 1), 'equals1', 'g', brac(['x_1', 'min', 'v', 't_1'], 2)],
      g2: ['g_2', brac(['x_2', 'min1', 'v_2', 't_2'], 3)],
    },
    formDefaults: {
      alignment: { fixTo: 'equals1' },
      translation: {
        twoPi_1: { style: 'linear' },
        vin2: { style: 'linear' },
        lambda_1: { style: 'linear' },
      },
      lazyLayout: true,
    },
    forms: {
      shiftedG_0: [sub('g_1', 'shifted'), 'equals1'],
      shiftedG_1: [sub('g_1', 'shifted'), 'equals1', 'g'],
      shiftedG_2: [sub('g_1', 'shifted'), 'equals1', 'g', brac(['x_1', 'min', 'shift'], 2)],
      shiftedG_3: [sub('g_1', 'shifted'), 'equals1', 'g', brac(['x_1', 'min', tc([under('shift'), 'shift_1'], '', '', 0.15, 0.15)], 2)],
      shiftedG_4: [sub('g_1', 'shifted'), 'equals1', 'g', brac(['x_1', 'min', tc([under('shift'), 'shift_1'], scale(lines([['propogation ', 'v', 'elocity']], 1), 0.8, 'center'), 'arrow1', 0.15, 0.15)], 2)],
      shiftedG_5: [sub('g_1', 'shifted'), 'equals1', 'g', brac(['x_1', 'min', tc([under('shift'), 'shift_1'], scale(lines([['propogation ', 'v', 'elocity'], ['propogation _1', 't_1', 'ime']], 1, 'center'), 0.8), 'arrow1', 0.15, 0.15)], 2)],
      shiftedG_6: [sub('g_1', 'shifted'), 'equals1', 'g', brac(['x_1', 'min', tc([under('shift'), 'shift_1'], ['v', 't_1'], 'arrow1', 0.15, 0.15)], 2)],
      shiftedG_7: [sub('g_1', 'shifted'), 'equals1', 'g', brac(['x_1', 'min', 'v', 't_1'], 2)],
      final: ['y', brac(['x', 'comma', 't'], 1), 'equals1', 'g', brac(['x_1', 'min', 'v', 't_1'], 2)],
      highlight: [
        {
          container: {
            content: [['y', brac(['x', 'comma', 't'], 1), 'equals1', 'g', brac(['x_1', 'min', 'v', 't_1'], 2)]],
            inSize: false,
          },
        },
        [t('y_c', 1), brac([t('x_c', 2), 'comma', t('t_c', 3)], 1), 'equals2', t('g_c', 4), brac(['x_c1', t('min_c', 5), t(['v_c', 't_c1'], 6)], 2)],
      ],
      sinInput_g: lines([
        line('general', 1),
        line(['g_2', brac('x_2', 3), 'equals2'], 2),
      ], 2.5, 'element'),
      sinInput: lines([
        line('general', 1),
        line(['g_2', brac('x_2', 3), 'equals2', 'sin', brac([frac('twoPi', 1, 'lambda', 0.6), ' ', 'x_3'], 4)], 2),
      ], 2.5, 'element'),
      sinInput_noInput: lines([
        line('general', 1),
        line(['g_2', brac('x_4', 3), 'equals2', 'sin', brac(hide(['twoPi', '  ', frac('x_5', 1, 'lambda', 0.6)]), 4)], 2),
      ], 2.5, 'element'),
      sinInput_xOnL: lines([
        line('general', 1),
        line(['g_2', brac('x_4', 3), 'equals2', 'sin', brac(['twoPi', '  ', frac('x_5', 1, 'lambda', 0.6)], 4)], 2),
      ], 2.5, 'element'),
      sinInputStart: lines([
        line('general', 1),
        line(['g_2', brac('x_4', 3), 'equals2', 'sin', brac([frac('twoPi', 1, 'lambda', 0.6), ' ', 'x_5'], 4)], 2),
      ], 2.5, 'element'),
      sinInput_subvt: lines([
        line('general', 1),
        line(['g_2', brac(bc('x_4', ['x_2', 'min1', 'v_2', 't_2'], 'arrow1', 0.1, 0.1, 0.7, 0.1, 0.2), 3), 'equals2', 'sin', brac([frac('twoPi', 1, 'lambda', 0.6), ' ', bc('x_5', ['x_3', 'min2', 'v_3', 't_3'], 'arrow2', 0.1, 0.1, 0.7, 0.1, 0.2)], 4)], 2),
      ], 2.5, 'element'),
      sinInput_1: lines([
        line('general', 1),
        line(['g2', 'equals2', 'sin', brac([under(frac('twoPi', 1, 'lambda', 0.6)), frac('twoPi_1', 2, 'lambda_1', 0.6), ' ', brac(['x_3', 'min2', 'v_3', 't_3'], 5)], 4)], 2),
      ], 2.5, 'element'),
      sinInput_2: {
        content: lines([
          line('general', 1),
          line(['g2', 'equals2', 'sin', brac([frac('twoPi', 1, 'lambda', 0.6), ' ', 'x_3', 'min2', frac('twoPi_1', 2, 'lambda_1', 0.6), ' ', 'v_3', 't_3'], 4)], 2),
        ], 2.5, 'element'),
        translation: {
          twoPi_1: { style: 'curve', mag: 0.8, direction: 'down' },
          vin2: { style: 'curve', mag: 0.8, direction: 'down' },
          lambda_1: { style: 'curve', mag: 0.8, direction: 'down' },
        },
      },
      sinInput_2a: {
        content: lines([
          line('general', 1),
          line(['g2', 'equals2', 'sin', brac([frac('twoPi', 1, 'lambda', 0.6), ' ', 'x_3', 'min2', frac(['twoPi_1', ' ', 'v_3'], 2, 'lambda_1', 0.6), '  ', 't_3'], 4)], 2),
        ], 2.5, 'element'),
      },
      sinInput_2b: {
        content: lines([
          line('general', 1),
          line(['g2', 'equals2', 'sin', brac([frac('twoPi', 1, 'lambda', 0.6), ' ', 'x_3', 'min2', 'twoPi_1', '  ', frac('v_3', 2, 'lambda_1', 0.6), '  ', 't_3'], 4)], 2),
        ], 2.5, 'element'),
      },
      sinInput_3: lines([
        line('general', 1),
        line(['g2', 'equals2', 'sin', brac([' ', bc(box(frac('twoPi', 1, 'lambda', 0.6), 'box1', 0.02), 'k', 'arrow1', 0.1, 0.1, 0.7, 0.1, 0.2), '  ', 'x_3', 'min2', bc(box([frac('twoPi_1', 2, 'lambda_1', 0.6), ' ', 'v_3'], 'box2', 0.02), 'w', 'arrow2', 0.1, 0.1, 0.7, 0.1, 0.2), '  ', 't_3'], 4)], 2),
      ], 2.5, 'element'),
      sinInput_3a: {
        content: lines([
          line('general', 1),
          line(['g2', 'equals2', 'sin', brac([frac('twoPi', 1, 'lambda', 0.6), ' ', 'x_3', 'min2', 'twoPi_1', '   ', bc(box(frac('v_3', 2, 'lambda_1', 0.6), 'box1'), frac('_1', 3, 'T', 0.6), 'arrow1', 0.1, 0.1, 0.7, 0.1, 0.3), '   ', 't_3'], 4)], 2),
        ], 2.5, 'element'),
      },
      // sinInput_3b: {
      //   content: lines([
      //     line('general', 1),
      //     line(['g2', 'equals2', 'sin', brac([frac('twoPi', 1, 'lambda', 0.6), ' ', 'x_3', 'min2', 'twoPi_1', '   ', bc(box(frac('v_3', 2, 'lambda_1', 0.6), 'box1'), [frac('_1', 3, 'T', 0.6), 'equals3', 'f'], 'arrow1', 0.1, 0.1, 0.7, 0.1, 0.3), '   ', 't_3'], 4)], 2),
      //   ], 2.5, 'element'),
      // },
      sinInput_3b: {
        content: lines([
          line('general', 1),
          line(['g2', 'equals2', 'sin', brac([frac('twoPi', 1, 'lambda', 0.6), ' ', 'x_3', 'min2', 'twoPi_1', ' ', frac('_1', 3, 'T', 0.6), ' ', 't_3'], 4)], 2),
        ], 2.5, 'element'),
      },
      sinInput_3c: {
        content: lines([
          line('general', 1),
          line(['g2', 'equals2', 'sin', brac([frac('twoPi', 1, 'lambda', 0.6), ' ', 'x_3', 'min2', frac('twoPi_1', 3, 'T', 0.6), ' ', 't_3'], 4)], 2),
        ], 2.5, 'element'),
      },
      // sinInput_3c: {
      //   content: lines([
      //     line('general', 1),
      //     line(['g2', 'equals2', 'sin', brac([frac('twoPi', 1, 'lambda', 0.6), ' ', 'x_3', 'min2', 'twoPi_1', ' ', 'f', ' ', 't_3'], 4)], 2),
      //   ], 2.5, 'element'),
      // },
      sinInput_3d: {
        content: lines([
          line('general', 1),
          line(['g2', 'equals2', 'sin', brac([frac('twoPi', 1, 'lambda', 0.6), ' ', 'x_3', 'min2', bc(box([frac('twoPi_1', 3, 'T', 0.6)], 'box1'), 'w', 'arrow1', 0.1, 0.1, 0.7, 0.05, 0.35), '   ', 't_3'], 4)], 2),
        ], 2.5, 'element'),
      },
      sinInput_3e: {
        content: lines([
          line('general', 1),
          line(['g2', 'equals2', 'sin', brac([frac('twoPi', 1, 'lambda', 0.6), ' ', 'x_3', 'min2', 'w', ' ', 't_3'], 4)], 2),
        ], 2.5, 'element'),
      },
      sinInput_3f: {
        content: lines([
          line('general', 1),
          line(['g2', 'equals2', 'sin', brac(['  ', bc(box(frac('twoPi', 1, 'lambda', 0.6), 'box1'), 'k', 'arrow1', 0.1, 0.1, 0.7, 0.1, 0.3), '   ', 'x_3', 'min2', 'w', ' ', 't_3'], 4)], 2),
        ], 2.5, 'element'),
      },
      sinInput_3g: {
        content: lines([
          line('general', 1),
          line(['g2', 'equals2', 'sin', brac(['k', ' ', 'x_3', 'min2', 'w', ' ', 't_3'], 4)], 2),
        ], 2.5, 'element'),
      },
      sinInput_4: lines([
        line('general', 1),
        line(['g2', 'equals2', 'sin', brac(['k', ' ', 'x_3', 'min2', 'w', ' ', 't_3'], 4)], 2),
      ], 2.5, 'element'),
      sinInput_4a: {
        content: lines([
          line(['y', brac(['x', 'comma', 't'], 1), 'equals1', box(['g', brac(['x_1', 'min', 'v', 't_1'], 2)], 'box1')], 1),
          line([bc(box(['g2'], 'box2'), ['y_2', brac(['x_4', 'comma2', 't_4'], 5)], 'arrow1', 0.1, 0.1, 0.7, 0.02, 0.35), 'equals2', 'sin', brac(['k', ' ', 'x_3', 'min2', 'w', ' ', 't_3'], 4)], 2),
        ], 2.5, 'element'),
      },
      sinInput_5a: {
        content: lines([
          line(['y', brac(['x', 'comma', 't'], 1), 'equals1', 'g', brac(['x_1', 'min', 'v', 't_1'], 2)], 1),
          line(['y_2', brac(['x_4', 'comma2', 't_4'], 5), 'equals2', 'sin', brac(['k', ' ', 'x_3', 'min2', 'w', ' ', 't_3'], 4)], 2),
        ], 2.5, 'element'),
      },

      sinInput_5: lines([
        line('general', 1),
        line(['y_1', brac(['x_2', 'comma2', 't_2'], 3), 'equals2', 'sin', brac(['k', ' ', 'x_3', 'min2', 'w', ' ', 't_3'], 4)], 2),
      ], 2.5, 'element'),
    },
  });
  eqn.getAllElements().forEach((e) => {
    e.scenarios.description = { color: colorLight };
    e.scenarios.highlight1 = { color: colorYellowText };
    e.scenarios.highlight2 = { color: colorDisturbanceText };
    e.scenarios.hide = { color: [0, 0, 0, 0] };
  });
  const description = figure.add({
    name: 'eqnWaveDescription',
    make: 'equation',
    color: colorLight,
    // textFont: { style: 'normal' },
    font: { family: 'TeXGyreTermes' },
    textFont: { family: 'TeXGyreTermes', style: 'normal' },
    scale: 4.5,
    position: [2, 2],
    mods: {
      scenarios: {
        default: { position: [12, 5] },
        mathx: { position: [1, 2] },
      },
    },
    formDefaults: { lazyLayout: true },
    elements: {
      disturbance: { color: colorDisturbanceText },
      'any position': { color: colorPositionText },
      'any time': { color: colorTimeText },
      'disturbance at an initial time': { color: colorGreenText },
      'shifted by': { color: colorCyanText },
      'distance the wave has propogated since the initial time': { color: colorPurpleText },
      tBox1: tBox([0.5, 0.2, 0.5, 0.2]),
      tBox2: tBox([0.5, 0, 0.5, 0.2]),
      tBox3: tBox([0.5, 0.2, 0.2, 0.2]),
      tBox4: tBox([0.5, 0.2, 0.2, 0.2]),
      tBox5: tBox([0.05, 0.2, 0.05, 0.2]),
      tBox6: tBox([0.2, 0.1, 0.5, 0.2]),
      // tBox1: { symbol: 'tBox', touchBorder: [0.5, 0.2, 0.5, 0.2], isTouchable: true },
      // tBox2: { symbol: 'tBox', touchBorder: [0.5, 0, 0.5, 0.2], isTouchable: true },
      // tBox3: { symbol: 'tBox', touchBorder: [0.5, 0.2, 0.2, 0.2], isTouchable: true },
      // tBox4: { symbol: 'tBox', touchBorder: [0.05, 0.2, 0.05, 0.2], isTouchable: true },
      // tBox5: { symbol: 'tBox', touchBorder: [0.2, 0.1, 0.5, 0.2], isTouchable: true },
    },
    phrases: {
    },
    forms: {
      summary: {
        alignment: { xAlign: 'center' },
        content: {
          lines: {
            content: [
              ['The ', t('disturbance', 1), '_ at ', t(['any position'], 2), '_ and ', t(['any time'], 3)],
              ['is the', '  ', t('disturbance at an initial time', 4), '  ', t('shifted by', 5), '_ the'],
              [t(['distance the wave has propogated since the initial time'], 6), '_.'],
            ],
            baselineSpace: 1.2,
            justify: 'center',
          },
        },
      },
    },
  });
  for (let i = 1; i <= 5; i += 1) {
    const d = description.get(`tBox${i}`);
    const e = eqn.get(`tBox${i}`);
    d.dimColor = [0, 0, 0, 0];
    e.dimColor = [0, 0, 0, 0];
    d.setColor([0, 0, 0, 0]);
    e.setColor([0, 0, 0, 0]);
    // e.dimColor = [0, 0, 0, 0];
  }
  // const [d1, d2, d3, d4, d5, d6] = description.get(['tBox1', 'tBox2', 'tBox3', 'tBox4', 'tBox5', 'tBox6']);
  // const [d7, d8, d9, d10, d11, d12] = description.get(['tBox7', 'tBox8', 'tBox9', 'tBox10', 'tBox11', 'tBox12']);
  // const [e7, e8, e9, d10, d11, d12] = description.get(['tBox7', 'tBox8', 'tBox9', 'tBox10', 'tBox11', 'tBox12']);
  // const highlight = (index, e1, e2, s1, s2, p1, p2) => {
  //   const d = description.get(`tBox${index}`);
  //   const e = eqn.get(`tBox${index}`);
  //   const onclick = () => {
  //     if (eqn.isShown === false || description.isShown === false) {
  //       return;
  //     }
  //     const h1 = figure.get('highlighter');
  //     const h2 = figure.get('highlighter2');
  //     h1.showAll();
  //     h2.showAll();
  //     h1.surround(eqn.get(e1), s1);
  //     h2.surround(description.get(e2), s2);
  //     h1.pulse({ scale: p1 });
  //     h2.pulse({ scale: p2 });
  //   };
  //   d.onClick = onclick;
  //   e.onClick = onclick;
  // }
  const d = description;
  const e = eqn;
  // highlight(1, d, e, 'y_2', 'disturbance', [0.2, 0.2, 0.1, 0.2], 0.1, 1.3, 1.1);
  // highlight(2, d, e, 'x_2', ['any position', 'x_1'], [0.1, 0.2, 0.1, 0.2], 0.1, 1.3, 1.1);
  // highlight(3, d, e, 't_3', ['any time', 't_1'], [0.1, 0.2, 0.15, 0.05], 0.1, 1.3, 1.1);
  // highlight(4, d, e, 'equals2', 'is the', [-0.2, 0.2, -0.2, 0.2], 0.1, 1.3, 1.1);
  // highlight(5, d, e, ['f_2'], ['disturbance that happened at', '_0_f'], [0.3, 0.3, 0.3, 0.1], 0.1, 1.3, 1.05);
  // highlight(6, d, e, ['t_6', 'vin1', 'v_t', 'x_t'], ['time_1', 'ago', 'x_t', 'v'], [0.1, 0.1, 0.1, 0.1], 0.1, 1.3, 1.1);

  // highlight(7, d, e, 'y_1', 'disturbance', [0.2, 0.1, 0.1, 0.1], 0.1, 1.3, 1.1);
  // highlight(8, d, e, ['x_1', 'zeroX'], ['position', '_0'], [0.1, 0.1, 0.1, 0.1], 0.1, 1.3, 1.1);
  // highlight(9, d, e, 't_1', 'functionOfTime', [0.1, 0.1, 0.1, 0.1], 0.1, 1.3, 1.1);
  // highlight(10, d, e, 'equals1', 'equal', [-0.2, 0.1, -0.2, 0.1], 0.1, 1.3, 1.1);
  // highlight(11, d, e, ['f_1', 't_2'], ['f'], [0.3, 0.35, 0.5, 0.35], [0.25, 0.3, 0.3, 0.1], 1.3, 1.1);
  // highlight(12, d, e, ['y_2'], ['disturbance'], [0.2, 0.1, 0.1, 0.2], [0.1, 0.1, 0.1, 0.1], 1.3, 1.1);
  // highlight(13, d, e, ['x_2'], ['position', 'x_1'], [0.15, 0.2, 0.2, 0.2], [0.1, 0.1, 0.1, 0.1], 1.3, 1.1);
  // highlight(14, d, e, ['t_3'], ['time', 't_1'], [0.2, 0.2, 0.15, 0.1], [0.1, 0.1, 0.1, 0.1], 1.3, 1.1);
  // highlight(15, d, e, ['equals2'], ['is the1'], [0.2, 0.1, 0.1, 0.2], [0.1, 0.1, 0.1, 0.1], 1.3, 1.1);
  // highlight(16, d, e, ['g_2'], ['disturbance at time ', 't_g1', '_0_g1'], [0.2, 0.1, 0.1, 0.2], [0.1, 0.1, 0.1, 0.1], 1.3, 1.1);
  // highlight(17, d, e, ['x_5', 'v_x', 't_x'], ['shifted', 't_g2', '_0_g2'], [0.1, 0.2, 0.1, 0.1], [0.1, 0.1, 0.1, 0.1], 1.3, 1.1);
  // // highlight(12, d, e, ['t_2'], 'functionOfTime_1', [0.1, 0.1, 0.1, 0.1], 0.1, 1.3, 1.1);
  highlightN(1, d, e, [0.2, 0.15, 0.1, 0.2], 0.1, 1.1, 1.1);
  highlightN(2, d, e, [0.1, 0.2, 0.1, 0.2], 0.1, 1.3, 1.1);
  highlightN(3, d, e, [0.1, 0.2, 0.15, 0.1], 0.1, 1.1, 1.1);
  highlightN(4, d, e, [0.3, 0.2, 1.4, 0.7], 0.1, 1.3, 1.1);
  highlightN(5, d, e, [-0.4, 0.2, -0.4, 0.1], 0.1, 1.3, 1.1);
  highlightN(6, d, e, [0.2, 0.2, 0.2, 0.1], 0.1, 1.3, 1.1);

  const hl = (hl1Elements = [], hl2Elements = [], hideElements = []) => () => {
    let hl1 = hl1Elements;
    let hl2 = hl2Elements;
    let hide = hideElements;
    if (!Array.isArray(hl1)) { hl1 = [hl1]; }
    if (!Array.isArray(hl2)) { hl2 = [hl2]; }
    if (!Array.isArray(hide)) { hide = [hide]; }
    eqn.get(hl1).forEach(element => element.setScenario('highlight1'));
    eqn.get(hl2).forEach(element => element.setScenario('highlight2'));
    eqn.get(hide).forEach(element => element.setScenario('hide'));
  };

  const [sinMore, sinNav] = figure.add([
    {
      name: 'sinMoreButton',
      make: 'collections.rectangle',
      options: {
        button: true,
        line: { width: 0.04 },
        label: { text: 'Show All Steps', font: { color: colorYellowText } },
        width: 5,
        height: 1.2,
        corner: { radius: 0.2, sides: 3 },
        position: [21, 1],
        color: colorLight,
      },
      mods: {
        isTouchable: true,
        touchBorder: [0.1, 0.2, 0.1, 0.4],
      },
    },
    // {
    //   name: 'description',
    //   make: 'equation',
    //   scale: 3.4,
    //   color: colorLight,
    //   textFont: { style: 'normal', color: colorLight },
    //   elements: {
    //     disturbance: { color: colorDisturbanceText },
    //     'any position ': { color: colorPositionText },
    //     'any time ': { color: colorTimeText },
    //     time: { color: colorDelay },
    //     'disturbance that happened at ': { color: colorGText },
    //     'disturbance at ': { color: colorGText },
    //     'delayed time ': { color: colorDelay },
    //     h: { color: colorGText, style: 'italic' },
    //     f: { style: 'italic' },
    //     ago: { color: colorDelay },
    //     sin: { color: colorGText },
    //     stop: '.',
    //     vin1: { symbol: 'vinculum', lineWidth: 0.05 },
    //     vin2: { symbol: 'vinculum', lineWidth: 0.05, color: colorDelay },
    //     x_1: { style: 'italic', color: colorPositionText },
    //     x_2: { style: 'italic', color: colorGText },
    //     x_3: { style: 'italic', color: colorGText },
    //     x_t: { style: 'italic', color: colorDelay },
    //     _0_2: { color: colorGText },
    //     _0_3: { color: colorGText },
    //     t_1: { style: 'italic' },
    //     t_2: { style: 'italic' },
    //     t_3: { style: 'italic' },
    //     v_1: { style: 'italic', color: colorVelocityText },
    //     plusV: { text: '+v', style: 'italic', color: colorVelocityText },
    //     v_3: { style: 'italic', color: colorDelay },
    //     // twoPiL: { text: '2\u03c0f', style: 'italic' },
    //     twoPi_1: { text: '2\u03c0', style: 'italic' },
    //     twoPi_2: { text: '2\u03c0', style: 'italic' },
    //     w: { text: '\u03c9', style: 'italic', color: colorOmega },
    //     lambda_1: { text: '\u03bb', style: 'italic' },
    //     lambda_2: { text: '\u03bb', style: 'italic' },
    //     f: { style: 'italic' },
    //     f_2: { style: 'italic' },
    //     'angular frequency ': { color: colorOmega },
    //     'wave number ': { color: colorK },
    //     k: { color: colorK, style: 'italic' },
    //   },
    //   position: [12, 2],
    //   phrases: {
    //     t0_1: sub('t_1', '_0_1'),
    //     t0_2: sub('t_2', '_0_2'),
    //     x0_3: sub('x_3', '_0_3'),
    //     xOnV: frac('x_5', 1, 'v_1', 0.8, 0.02, 0.02),
    //     xOnV1: frac('x_t', 2, 'v_3', 0.8, 0.02, 0.02),
    //     velf: ['v_1', '_ = ', 'lambda_1', 'f'],
    //     twoPif: ['twoPi_2', ' ', 'f_2'],
    //     twoPiL: frac('twoPi_2', 1, 'lambda_2', 0.7),
    //   },
    //   formDefaults: { alignment: { xAlign: 'center' } },
    //   forms: {
    //     initial: 'Manually progress through each step by pressing arrows',
    //     // 0: 'The initial disturbance is a sin function'
    //     0: lines([
    //       ['The ', 'disturbance', '_ at _', 'position ', 'x_1', '_ and ', 'time ', 't_3', '_ is the ', 'disturbance at time ', 't0_1'],
    //       ['shifted by the distance the wave has propogated since'],
    //     ], 1),
    //     1: lines([
    //       ['Make the ', 'disturbance at ', 't0_2', '_ a ', 'sin', '_ function.'],
    //     ]),
    //     '1a': lines([
    //       ['The sin function\'s output repeats every time it\'s input is a'],
    //       ['multiple of ', 'twoPi_1', '_. Thus the ', 'twoPiL', '_ term repeats the sin function'],
    //       ['each ', 'lambda_1', '_ in distance.']
    //     ], 1),
    //     2: lines([
    //       ['Substitute the ', 'shifted position ', 'into ', 'g', 'stop'],
    //     ]),
    //     3: lines([
    //       ['Equate like terms.'],
    //     ]),
    //     4: lines([
    //       ['Expand the ', 'sin', '_ function input.'],
    //     ]),
    //     5: lines([
    //       ['twoPiL', '_ is commonly called the ', 'wave number ', 'k', 'stop'],
    //     ]),
    //     6: lines([
    //       ['Use ', 'velf', ' ', '_ to simplify the second term.'],
    //     ]),
    //     7: lines([
    //       ['twoPif', '_ is commonly called the ', 'angular frequency ', 'w'],
    //     ]),
    //     8: lines([
    //       ['This equation describes a sine wave travelling with velocity ', 'plusV', 'stop'],
    //     ]),
    //     9: lines([
    //       ['If the wave were travelling in the negative direction, then the sign'],
    //       ['would switch.'],
    //     ], 1),
    //   }
    // },
    {
      name: 'sinNav',
      make: 'collections.slideNavigator',
      equation: 'eqnWave',
      color: colorLight,
      position: [12, 2],
      nextButton: { type: 'arrow', position: [11, 0], width: 2, length: 1,color: colorLight, line: { width: 0.02 }, touchBorder: 0.5 },
      prevButton: { type: 'arrow', position: [-11, 0], width: 2, length: 1, color: colorLight, line: { width: 0.02 }, touchBorder: 0.5 },
      disableOpacity: 0.2,
      text: {
        defaultAccent: { color: colorYellowText },
        position: [0, 0],
        font: { size: 0.7, color: colorLight, width: 1 },
        justify: 'center',
        xAlign: 'center',
        yAlign: 'middle',
        lineSpace: 1.2,
        modifiers: {
          sin: { font: { family: 'TeXGyreTermes', color: colorDisturbanceText, size: 0.8 } },
          twoPi: { text: '2\u03c0', font: { family: 'TeXGyreTermes', style: 'italic', size: 0.8 } },
          twoPiY: { text: '2\u03c0', font: { family: 'TeXGyreTermes', style: 'italic', size: 0.8, color: colorYellowText } },
          lambda: { text: '\u03bb', font: { size: 0.8, family: 'TeXGyreTermes', style: 'italic' } },
          lambdaY: { text: '\u03bb', font: { size: 0.8, family: 'TeXGyreTermes', style: 'italic', color: colorYellowText } },
          x: { font: { family: 'TeXGyreTermes', size: 0.8, style: 'italic', color: colorYellowText } },
          g: { font: { family: 'TeXGyreTermes', size: 0.8, style: 'italic', color: colorYellowText } },
          vt: { font: { family: 'TeXGyreTermes', size: 0.8, style: 'italic', color: colorYellowText } },
          T: { font: { family: 'TeXGyreTermes', size: 0.8, style: 'italic', color: colorYellowText } },
          lvT: { text: '\u03bb = vT', font: { family: 'TeXGyreTermes', size: 0.8, style: 'italic', color: colorYellowText } },
          // f: { font: { family: 'TeXGyreTermes', size: 0.8, style: 'italic' } },
          k: { font: { family: 'TeXGyreTermes', size: 0.8, style: 'italic', color: colorYellowText } },
          w: { text: '\u03c9', font: { family: 'TeXGyreTermes', size: 0.8, style: 'italic', color: colorYellowText } },
          // 'initial disturbance': { font: { color: colorYellowText } },
        },
      },
      slides: [
        // {
        //   scenarioCommon: ['default', 'highSmall', 'description'],
        //   // enterStateCommon: () => {
        //   //   eqn.undim();
        //   // },
        //   form: 'final',
        // },
        {
          form: 'final',
          enterStateCommon: () => {
            eqn.setScenarios('description');
          },
          // enterState: hl(['y', 'lb1', 'rb1', 'x', 'comma', 't', 'equals1', 'g', 'lb2', 'rb2', 'x_1', 'min', 'v', 't_1']),
          text: ['Start with the |general description for a wave|.', { text: 'Use the |arrows| to progress through the steps', font: { size: 0.5 }, lineSpace: 1.5 }],
          steadyState: () => {
            figure.get('sinNav')._nextButton.setColor(colorYellowText);
            // hl(['y', 'lb1', 'rb1', 'x', 'comma', 't', 'equals1', 'g', 'lb2', 'rb2', 'x_1', 'min', 'v', 't_1'])();
          },
          leaveState: () => {
            figure.get('sinNav')._nextButton.setColor(colorLight);
          },
        },
        {
          text: 'Set the |initial disturbance| |g| to a sin function.',
          steadyState: hl(['g']),
        },
        {
          form: 'sinInput_noInput',
          enterState: hl(['g_2', 'lb3', 'x_4', 'rb3', 'g']),
        },
        {
          text: [
            'We want a wave that repeats every distance |lambda|.',
            'Sin repeats when its |input| is an integer multiple of |twoPi|.',
          ],
          enterState: hl(['lb4', 'rb4']),
        },
        { form: 'sinInput_xOnL', enterState: hl(['lb4', 'rb4', 'twoPi', 'x_5', 'lambda', 'vin1']) },
        {
          enterState: hl(['lambda', 'x_5']),
          text: [
            'Everytime |x| is an integer multiple of |lambdaY|, the input to', 'the sin function will be an integer multiple of |twoPi|.'],
        },
        {
          enterState: hl(['sin', 'lb4', 'rb4', 'twoPi', 'x_5', 'lambda', 'vin1']),
          text: [
            'Thus this expression describes a |sin disturbance|', '|in space that repeats every| |lambdaY|.'],
        },
        {
          enterState: hl(['twoPi', 'x_5', 'lambda', 'vin1']),
          text: ['|Rearrange| the sine input.'],
        },
        { form: 'sinInputStart', enterState: hl(['twoPi', 'x_5', 'lambda', 'vin1']) },
        {
          enterState: hl(['x_4', 'x_5']),
          text: ['Shift |x| by |vt|.'],
        },
        {
          enterState: hl(['x_4', 'x_2', 'min1', 'v_2', 't_2', 'arrow1', 'x_5', 'x_3', 'min2', 'v_3', 't_3', 'arrow2']),
          form: 'sinInput_subvt' },
        {
          enterState: hl(['x_4', 'x_2', 'min1', 'v_2', 't_2', 'arrow1', 'x_5', 'x_3', 'min2', 'v_3', 't_3', 'arrow2']),
          form: 'sinInput_1',
        },
        {
          enterState: hl(['x_3', 'min2', 'v_3', 't_3', 'twoPi_1', 'vin2', 'lambda_1', 'lb5', 'rb5']),
          text: ['|Expand brackets| in sin function.'],
        },
        {
          enterState: hl(['twoPi', 'vin1', 'lambda', 'x_3', 'min2', 'v_3', 't_3', 'twoPi_1', 'vin2', 'lambda_1', 'lb5', 'rb5']),
          form: 'sinInput_2',
        },
        {
          enterState: hl(['v_3', 't_3', 'twoPi_1', 'vin2', 'lambda_1']),
          text: ['|Rearrange| order of second term in sin function.'],
        },
        {
          enterState: hl(['v_3', 't_3', 'twoPi_1', 'vin2', 'lambda_1']),
          form: 'sinInput_2a',
        },
        {
          enterState: hl(['v_3', 't_3', 'twoPi_1', 'vin2', 'lambda_1']),
          form: 'sinInput_2b',
        },
        {
          enterState: hl(['v_3', 'lambda_1', 'vin2', 'vin3', '_1', 'T']),
          text: ['For a periodic function (like sin), we showed earlier', 'that |lvT| where |T| is the period of the repeated wave.'],
        },
        {
          enterState: hl(['v_3', 'lambda_1', 'vin2', 'vin3', '_1', 'T', 'arrow1', 'box1']),
          form: 'sinInput_3a',
        },
        {
          enterState: hl(['v_3', 'lambda_1', 'vin2', 'vin3', '_1', 'T', 'arrow1', 'box1']),
          form: 'sinInput_3b',
        },
        {
          enterState: hl(['v_3', 'lambda_1', 'vin2', 'vin3', '_1', 'T', 'arrow1', 'box1']),
          form: 'sinInput_3c',
        },
        {
          enterState: hl(['twoPi_1', 'vin3', 'T', 'arrow1', 'box1', 'w']),
          text: ['The number of |twoPiY| |cycles per second| is often called', 'the |angular frequency| |w|.'],
        },
        {
          enterState: hl(['twoPi_1', 'vin3', 'T', 'arrow1', 'box1', 'w']),
          form: 'sinInput_3d',
        },
        {
          enterState: hl(['twoPi_1', 'vin3', 'T', 'arrow1', 'box1', 'w']),
          form: 'sinInput_3e',
        },
        {
          enterState: hl(['twoPi', 'vin1', 'lambda', 'arrow1', 'box1', 'k']),
          text: ['The number of |twoPiY| |cycles per wavelength| |lambdaY| is often', 'called the |wave number| |k|.'],
        },
        {
          enterState: hl(['twoPi', 'vin1', 'lambda', 'arrow1', 'box1', 'k']),
          form: 'sinInput_3f',
        },
        {
          enterState: hl(['twoPi', 'vin1', 'lambda', 'arrow1', 'box1', 'k']),
          form: 'sinInput_3g',
        },
        {
          enterState: hl(['g_2', 'lb3', 'rb3', 'x_2', 'min1', 'v_2', 't_2', 'g', 'lb2', 'rb2', 'x_1', 'min', 'v', 't_1', 'box1', 'box2']),
          text: ['Both equations are |equal|.'],
        },
        {
          enterState: hl(['g_2', 'lb3', 'rb3', 'x_2', 'min1', 'v_2', 't_2', 'g', 'lb2', 'rb2', 'x_1', 'min', 'v', 't_1', 'box1', 'box2', 'arrow1', 'y_2', 'lb5', 'rb5', 'x_4', 'comma2', 't_4']),
          form: 'sinInput_4a',
        },
        {
          enterState: hl(['g_2', 'lb3', 'rb3', 'x_2', 'min1', 'v_2', 't_2', 'g', 'lb2', 'rb2', 'x_1', 'min', 'v', 't_1', 'box1', 'box2', 'y_2', 'lb5', 'rb5', 'x_4', 'comma2', 't_4', 'arrow1']),
          form: 'sinInput_5a',
        },
        {
          enterState: hl(['y_2', 'lb5', 'rb5', 'x_4', 'comma2', 't_4', 'equals2', 'sin', 'lb4', 'rb4', 'k', ' ', 'x_3', 'min2', 'w', ' ', 't_3']),
          text: 'And so we have an expression for a |travelling sine wave|.',
        },
      ],
    },
  ]);
  sinMore.onClick = () => {
    sinNav.goToSlide(20);
    sinNav.hide();
    figure.elements.animations.new()
      .inParallel([
        sinMore.animations.dissolveOut(0.3),
        eqn.animations.goToForm({ target: 'final', animate: 'move' }),
        eqn.animations.scenario({ target: 'highSmall', start: 'high', duration: 1 }),
      ])
      .dissolveIn({ element: sinNav, duration: 0.3 })
      .start();
    // sinNav.showAll();
    // sinMore.hide();
    // sinNav.goToSlide(0);
  };
}

