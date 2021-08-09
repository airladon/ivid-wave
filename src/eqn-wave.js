/* eslint-disable camelcase, object-curly-newline, max-len */
/* globals colorDisturbanceText, colorPositionText, colorDisturbanceText, colorLight, colorTimeText, colorGText, tBox, brac, tc, figure, highlightN, lines, frac */
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
    dimColor: colorLight,
    font: { family: 'TeXGyreTermes' },
    textFont: { family: 'TeXGyreTermes' },
    mods: {
      scenarios: {
        default: { position: [8, 5], scale: 1 },
        summary: { position: [15.12, 5.7], scale: 1 },
      },
    },
    elements: {
      lb1: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
      rb1: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
      lb2: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
      rb2: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
      y: 'y',
      x: 'x',
      x_1: 'x',
      t: 't',
      g: 'g',
      v: 'v',
      y_c: { color: colorDisturbanceText },
      x_c: { color: colorPositionText },
      x_c1: { color: colorPositionText },
      t_c: { color: colorTimeText },
      g_c: { color: colorGText },
      v_c: { color: colorPositionText },
      t_c1: { color: colorPositionText },
      equals: ' = ',
      min: '  \u2212  ',
      min_c: { text: '  \u2212  ', color: colorPositionText },
      xDash: 'x\'',
      comma: ' , ',
      arrow1: { symbol: 'line', width: 0.04, arrow: { start: { head: 'triangle' } } },
      tBox1: tBox([0.5, 0.5, 0.5, 0.5]),
      tBox2: tBox([0.5, 0.7, 0.2, 0.7]),
      tBox3: tBox([0.1, 0.5, 0.5, 0.5]),
      tBox4: tBox([0.5, 0.5, 0.5, 0.5]),
      tBox5: tBox([0, 0.5, 0, 0.5]),
    },
    phrases: {
    },
    forms: {
      yxt: ['y', brac(['x', 'comma', 't'], 1), 'equals', 'g', brac(['x_1', 'min', 'xdash'], 2)],
      subVT: ['y', brac(['x', 'comma', 't'], 1), 'equals', 'g', brac(['x_1', 'min', tc('xdash', ['v', 't'], 'arrow1', 0.15, 0.15)], 2)],
      final: ['y', brac(['x', 'comma', 't'], 1), 'equals', 'g', brac(['x_1', 'min', 'v', 't_1'], 2)],
      highlighted: [
        {
          container: {
            content: [['y', brac(['x', 'comma', 't'], 1), 'equals', 'g', brac(['x_1', 'min', 'v', 't'], 2)]],
            inSize: false,
          },
        },
        [t('y_c', 1), brac([t('x_c', 2), 'comma', t('t_c', 3)], 1), 'equals', t('g_c', 4), brac(t(['x_c1', 'min_c', 'v_c', 't_c1'], 5), 2)],
      ],
    },
  });
  const description = figure.add({
    name: 'eqnWaveDescription',
    make: 'equation',
    color: colorLight,
    // textFont: { style: 'normal' },
    font: { family: 'TeXGyreTermes' },
    textFont: { family: 'TeXGyreTermes', style: 'normal' },
    scale: 3.7,
    position: [2, 2],
    mods: {
      scenarios: {
        default: { position: [12, 4] },
        mathx: { position: [1, 2] },
      },
    },
    elements: {
      disturbance: { color: colorDisturbanceText },
      'any position': { color: colorPositionText },
      'any time': { color: colorTimeText },
      'disturbance at some initial time': { color: colorGText },
      'shifted by the distance the wave has propogated since the initial time': { color: colorPositionText },
      tBox1: { symbol: 'tBox', touchBorder: [0.5, 0.2, 0.5, 0.2], isTouchable: true },
      tBox2: { symbol: 'tBox', touchBorder: [0.5, 0, 0.5, 0.2], isTouchable: true },
      tBox3: { symbol: 'tBox', touchBorder: [0.5, 0.2, 0.2, 0.2], isTouchable: true },
      tBox4: { symbol: 'tBox', touchBorder: [0.05, 0.2, 0.05, 0.2], isTouchable: true },
      tBox5: { symbol: 'tBox', touchBorder: [0.2, 0.1, 0.5, 0.2], isTouchable: true },
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
              ['is the', '  ', t('disturbance at some initial time', 4)],
              [t(['shifted by the distance the wave has propogated since the initial time'], 5), '_.'],
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
  highlightN(1, d, e, [0.1, 0.2, 0.1, 0.2], 0.1, 1.1, 1.1);
  highlightN(2, d, e, [0.1, 0.2, 0.1, 0.2], 0.1, 1.3, 1.1);
  highlightN(3, d, e, [0.1, 0.2, 0.1, 0.2], 0.1, 1.1, 1.1);
  highlightN(4, d, e, [0.3, 0.1, 0.1, 0.2], 0.1, 1.3, 1.1);
  highlightN(5, d, e, [-0.1, 0.2, -0.1, 0.2], 0.1, 1.3, 1.1);
}

