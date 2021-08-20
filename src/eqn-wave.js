/* eslint-disable camelcase, object-curly-newline, max-len */
/* globals colorDisturbance, colorPosition, colorDisturbance, colorLight, tBox, brac, tc, figure, highlightN, lines, frac, line, bc, colorGreen, colorPurple, colorYellow, colorCyan, sub, under, scale, hide, box */
// eslint-disable-next-line no-unused-vars
function addTravellingWaveEquation(name) {
  const t = (content, boxIndex) => ({
    tBox: [content, `tBox${boxIndex}`],
  });

  const eqn = figure.add({
    name,
    make: 'equation',
    scale: 5,
    position: [4, 8],
    color: colorLight,
    dimColor: colorYellow,
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
      y_c: { color: colorDisturbance },
      x_c: { color: colorPosition },
      x_c1: { color: colorGreen },
      t_c: { color: colorYellow },
      g_c: { color: colorGreen },
      v_c: { color: colorPurple },
      t_c1: { color: colorPurple },
      equals1: '  =  ',
      equals2: '  =  ',
      equals3: '  =  ',
      min: '  \u2212  ',
      min_c: { text: '  \u2212  ', color: colorCyan },
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
      shift_1: { color: colorYellow },
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
  eqn.getChildren().forEach((e) => {
    if (e.name.startsWith('tBox') || e.name.endsWith('_c') || e.name.endsWith('_c1') || e.name === 'eqnWave') {
      return;
    }
    e.scenarios.description = { color: e.color.slice() };
    e.scenarios.mono = { color: colorLight };
    e.scenarios.highlight1 = { color: colorYellow };
    e.scenarios.highlight2 = { color: colorDisturbance };
    e.scenarios.hide = { color: [0, 0, 0, 0] };
  });
  const description = figure.add({
    name: 'eqnWaveDescription',
    make: 'equation',
    color: colorLight,
    font: { family: 'Open Sans', width: 1.13, midAscent: 1.1, maxAscent: 1.5 },
    textFont: { family: 'Open Sans', style: 'normal', width: 1.13, midAscent: 1.1, maxAscent: 1.5 },
    scale: 4,
    position: [2, 2],
    mods: {
      scenarios: {
        default: { position: [12, 5] },
        mathx: { position: [1, 2] },
      },
    },
    formDefaults: { lazyLayout: true },
    elements: {
      disturbance: { color: colorDisturbance },
      'any position': { color: colorPosition },
      'any time': { color: colorYellow },
      'disturbance at an initial time': { color: colorGreen },
      'shifted by': { color: colorCyan },
      'distance the wave has propogated since the initial time': { color: colorPurple },
      tBox1: tBox([0.5, 0.3, 0.5, 0.2]),
      tBox2: tBox([0.5, 0.1, 0.5, 0.2]),
      tBox3: tBox([0.5, 0.1, 0.2, 0.2]),
      tBox4: tBox([0.5, 0.2, 0.2, 0.2]),
      tBox5: tBox([0.05, 0.2, 0.05, 0.2]),
      tBox6: tBox([0.2, 0.1, 0.5, 0.2]),
    },
    phrases: {
    },
    forms: {
      summary: {
        alignment: { xAlign: 'center' },
        content: {
          lines: {
            content: [
              ['The ', t('disturbance', 1), ' ', '_ at ', t(['any position'], 2), '_ and ', t(['any time'], 3)],
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
  for (let i = 1; i <= 6; i += 1) {
    const d = description.get(`tBox${i}`);
    const e = eqn.get(`tBox${i}`);
    d.dimColor = [0, 0, 0, 0];
    e.dimColor = [0, 0, 0, 0];
    d.setColor([0, 0, 0, 0]);
    e.setColor([0, 0, 0, 0]);
  }
  const d = description;
  const e = eqn;
  highlightN(1, d, e, [0.2, 0.15, 0.1, 0.2], [0.1, 0.1, 0.2, 0.1], 1.1, 1.1);
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
        line: { width: 0.02, color: colorLight },
        label: { text: 'Show All Steps' },
        width: 5,
        height: 1.2,
        corner: { radius: 0.2, sides: 3 },
        position: [21, 1],
        color: colorYellow,
      },
      mods: {
        isTouchable: true,
        touchBorder: [0.1, 0.2, 0.1, 0.4],
      },
    },
    {
      name: 'sinNav',
      make: 'collections.slideNavigator',
      equation: 'eqnWave',
      color: colorLight,
      position: [12, 2],
      nextButton: { type: 'arrow', position: [11, 0], width: 2, length: 1, color: colorLight, line: { width: 0.02 }, touchBorder: 0.5 },
      prevButton: { type: 'arrow', position: [-11, 0], width: 2, length: 1, color: colorLight, line: { width: 0.02 }, touchBorder: 0.5 },
      disableOpacity: 0.2,
      text: {
        defaultAccent: { color: colorYellow },
        position: [0, 0],
        font: { size: 0.7, color: colorLight, width: 1 },
        justify: 'center',
        xAlign: 'center',
        yAlign: 'middle',
        lineSpace: 1.2,
        modifiers: {
          sin: { font: { family: 'TeXGyreTermes', color: colorDisturbance, size: 0.8 } },
          twoPi: { text: '2\u03c0', font: { family: 'TeXGyreTermes', style: 'italic', size: 0.8 } },
          twoPiY: { text: '2\u03c0', font: { family: 'TeXGyreTermes', style: 'italic', size: 0.8, color: colorYellow } },
          lambda: { text: '\u03bb', font: { size: 0.8, family: 'TeXGyreTermes', style: 'italic' } },
          lambdaY: { text: '\u03bb', font: { size: 0.8, family: 'TeXGyreTermes', style: 'italic', color: colorYellow } },
          x: { font: { family: 'TeXGyreTermes', size: 0.8, style: 'italic', color: colorYellow } },
          g: { font: { family: 'TeXGyreTermes', size: 0.8, style: 'italic', color: colorYellow } },
          vt: { font: { family: 'TeXGyreTermes', size: 0.8, style: 'italic', color: colorYellow } },
          T: { font: { family: 'TeXGyreTermes', size: 0.8, style: 'italic', color: colorYellow } },
          lvT: { text: '\u03bb = vT', font: { family: 'TeXGyreTermes', size: 0.8, style: 'italic', color: colorYellow } },
          // f: { font: { family: 'TeXGyreTermes', size: 0.8, style: 'italic' } },
          k: { font: { family: 'TeXGyreTermes', size: 0.8, style: 'italic', color: colorYellow } },
          w: { text: '\u03c9', font: { family: 'TeXGyreTermes', size: 0.8, style: 'italic', color: colorYellow } },
          // 'initial disturbance': { font: { color: colorYellow } },
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
            figure.get('sinNav')._nextButton.setColor(colorYellow);
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
    sinNav.goToSlide(0);
    sinNav.hide();
    eqn.showForm('final');
    figure.elements.animations.new()
      .inParallel([
        sinMore.animations.dissolveOut(0.3),
        // eqn.animations.goToForm({ target: 'final', animate: 'move' }),
        eqn.animations.scenario({ target: 'highSmall', start: 'high', duration: 1 }),
      ])
      .dissolveIn({ element: sinNav, duration: 0.3 })
      .start();
  };
}

