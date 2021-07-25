function addSineEquation(name) {
  const brac = (content, index) => ({
    brac: [`lb${index}`, content, `rb${index}`],
  });

  const top = (content, comment, symbol, commentSpace = 0.2, scale = 1) => ({
    topComment: {
      content,
      comment,
      symbol,
      commentSpace,
      commentLineSpace: 0.2,
      contentLineSpace: 0.2,
      inSize: false,
      scale,
    },
  });
  
  const box = (content, symbol, inSize = false, space = 0.02) => ({
    box: {
      content, symbol, inSize, space,
    },
  });
  const topBox = (content, comment, commentSpace) => top(box(content, 'box'), comment, 'arrow1', commentSpace);

  const getElementMods = (elements, color) => {
    const elementMods = {};
    elements.forEach(e => {
      elementMods[e] = { color: color.slice() };
    });
    return elementMods;
  }
  const form = (content, elements, color = colorYellow) => ({
      content, elementMods: getElementMods(elements, color),
  });

  figure.add({
    name,
    make: 'equation',
    scale: 4,
    position: [4, 8],
    color: colorLight,
    mods: {
      scenarios: {
        default: { position: [12, 6], scale: 1 },
        summary: { position: [15, 6], scale: 1 },
      }
    },
    elements: {
      sin: { style: 'normal' },
      lb1: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
      rb1: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
      lb2: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
      rb2: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
      lb3: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
      rb3: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
      lb4: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
      rb4: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
      lb7: { symbol: 'squareBracket', side: 'left', lineWidth: 0.05, width: 0.16 },
      rb7: { symbol: 'squareBracket', side: 'right', lineWidth: 0.05, width: 0.16 },
      pi: 'π',
      pi1: 'π',
      pi2: 'π',
      x_r: { color: colorZero },
      zero_r: { text: '0', color: colorZero },
      x_b: { color: colorOne },
      one_b: { text: '1', color: colorOne },
      x_b1: { color: colorOne },
      one_b1: { text: '1', color: colorOne },
      equals: '  =  ',
      equals1: '  =  ',
      w1: '\u03c9',
      min1: '  \u2212  ',
      min2: '  \u2212  ',
      min3: '  \u2212  ',
      comma1: ' , ',
      comma2: ' , ',
      comma3: ' , ',
      lambda: '\u03bb',
      lambda1: '\u03bb',
      arrow1: { symbol: 'line', width: 0.04, arrow: { start: { head: 'triangle' } } },
      arrow2: { symbol: 'line', width: 0.04, arrow: { start: { head: 'triangle' } } },
      vin1: { symbol: 'vinculum', lineWidth: 0.05 },
      vin2: { symbol: 'vinculum', lineWidth: 0.05 },
      brace: { symbol: 'brace', side: 'top', lineWidth: 0.05 },
      box: { symbol: 'box', lineWidth: 0.04 },
      strike1: { symbol: 'strike', lineWidth: 0.05 },
    },
    phrases: {
      x0r: { sub: ['x_r', 'zero_r'] },
      x1b: { sub: ['x_b', 'one_b'] },
      x1bToX: top({ sub: ['x_b', 'one_b'] }, 'x_1', 'arrow1', 0.3),
      t1_11: { sub: ['t_1', '_1_1']},
      t1_12: { sub: ['t_2', '_1_2']},
      x1_11: { sub: ['x_b1', 'one_b1']},
      x1_11ToX: top({ sub: ['x_b1', 'one_b1']}, 'x_2', 'arrow2', 0.3),
      yx0t: ['y', brac(['x0r', 'comma1', 't_3'], 1)],
      yx0tmt1: ['y', brac(['x0r', 'comma1', 't_4', 'min1', 't1_11'], 1)],
      yx1t: ['y_1', brac(['x1b', 'comma2', ' ', 't_5'], 2)],
      yx1ToXt: ['y_1', brac(['x1bToX', 'comma2', ' ', 't_5'], 2)],
      yxt: ['y_1', brac(['x_1', 'comma2', ' ', 't_5'], 2)],
      yxtConstT: ['y_1', brac(['x_1', 'comma2', ' ', top('t_5', 'constant_1', 'arrow1', 0.4, 0.6)], 2)],
      yxtConstX: ['y_1', brac([top('x_1', 'constant_1', 'arrow1', 0.4, 0.6), 'comma2', ' ', 't_5'], 2)],
      _2pf: ['2', 'pi', 'f'],
      _2pf1: ['2_1', 'pi1', 'f_1'],
      _2pf2: ['2_2', 'pi2', 'f_2'],
      _2pf2OnV: ['2_2', 'pi2', '  ', { frac: ['f_2', 'vin1', 'v'] }, ' '],
      _2pf2OnVBox: ['2_2', 'pi2', '  ', top(
        { frac: ['f_2', 'vin1', 'v'] },
        { frac: ['_1_4', 'vin2', 'lambda'] },
        'arrow1', 0.2, 0.6,
      ), ' '],
      _2pf2OnL: ['2_2', 'pi2', '  ', { frac: ['_1_4', 'vin2', 'lambda'] }, ' '],
      _2pfOnL1: [{ frac: [['2_2', 'pi2'], 'vin2', 'lambda'] }, ' ', '_1_4', ' '],
      _2pfOnLS1: [{ frac: [['2_2', 'pi2'], 'vin2', 'lambda'] }, ' ', {strike: ['_1_4', 'strike1'] }, ' '],
      _2pfOnL: [{ frac: [['2_2', 'pi2'], 'vin2', 'lambda'] }, ' '],
      sin2pft: ['sin', brac(['_2pf', ' ', 't_6'], 3)],
      sin2pftmt1: ['sin', brac(['_2pf', ' ', brac(['t_6', 'min2', 't1_12'], 7)], 3)],
      _2pftm2pft1: ['_2pf1', ' ', 't_3', 'min1', '_2pf2', ' ', 't1_11'],
      x1onv: { frac: ['x1_11', 'vin1', 'v'] },
      _2pftm2pft1Up: [
        '_2pf1', ' ', 't_3', 'min1', '_2pf2', '   ',
        top('t1_11', 'x1onv', 'arrow1', 0.2, 0.6),
      ],
      _2pftm2pftx1Onv: ['_2pf1', ' ', 't_3', 'min1', '_2pf2', ' ', 'x1onv'],
      _2pftm2pftfOnV: ['_2pf1', ' ', 't_3', 'min1', '_2pf2OnV', ' ', 'x1_11'],
      _2pftm2pftfOnVLUp: ['_2pf1', ' ', 't_3', 'min1', '_2pf2OnVBox', ' ', 'x1_11'],
      _2pftm2pftfOnVL: ['_2pf1', ' ', 't_3', 'min1', '_2pf2OnL', ' ', 'x1_11'],
      _2pftm2pftL1: ['_2pf1', ' ', 't_3', 'min1', '_2pfOnL1', ' ', 'x1_11'],
      _2pftm2pftLS1: ['_2pf1', ' ', 't_3', 'min1', '_2pfOnLS1', ' ', 'x1_11'],
      _2pftm2pftL: ['_2pf1', ' ', 't_3', 'min1', '_2pfOnL', ' ', 'x1_11'],
      _2pftm2pLXUp: ['_2pf1', ' ', 't_3', 'min1', '_2pfOnL', ' ', 'x1_11ToX'],
      _2pftm2pLX: ['_2pf1', ' ', 't_3', 'min1', '_2pfOnL', ' ', 'x_2'],
      _2pfwUptm2pLX: [top('_2pf1', 'w1', 'arrow1', 0.4), ' ', 't_3', 'min1', '_2pfOnL', ' ', 'x_2'],
      _wtm2pLX: ['w1', 't_3', 'min1', '_2pfOnL', ' ', 'x_2'],
      _wtm2pLKUpX: ['w1', 't_3', 'min1', top('_2pfOnL', 'k', 'arrow1'), ' ', 'x_2'],
      _wtmkx: ['w1', 't_3', 'min1', 'k', 'x_2'],
      _2pftm2pLXConstt: [top(['_2pf1', ' ', 't_3'], 'constant_2', 'arrow2', 0.4, 0.6), 'min1', '_2pfOnL', ' ', 'x_2'],
      _2pftm2pLXConstX: ['_2pf1', ' ', 't_3', 'min1', top(['_2pfOnL', ' ', 'x_2'], 'constant_2', 'arrow2', 0.2, 0.6)],
    },
    formDefaults: {
      elementMods: getElementMods(['2', 'pi', 'f', 'lb7', 'rb7', 't_6', 'min2', 't_2', '_1_2', '2_1', 'pi1', 'f_1', 't_3', 'min1', '2_2', 'pi2', 'f_2', 't_1', '_1_1', 'f_2', 'vin1', 'v', 'vin2', 'lambda', 'x_1', 't_5', 'x_1', 'x_2'], colorLight),
    },
    forms: {
      yx0: ['yx0t', 'equals', 'sin2pft'],
      yx1eyx0: ['yx1t', 'equals', 'yx0tmt1'],
      yx1eyx0es: ['yx1t', 'equals', 'yx0tmt1', 'equals1', 'sin2pftmt1'],
      yx1estmt1: ['yx1t', 'equals', 'sin2pftmt1'],
      yx1estmt1expandUnder: form(['yx1t', 'equals', 'sin', brac({
        topComment: {
          content: ['_2pf', ' ', brac(['t_6', 'min2', 't1_12'], 7)],
          comment: '_2pftm2pft1',
          symbol: 'brace',
          inSize: false,
        },
      }, 3)], ['2', 'pi', 'f', 'lb7', 'rb7', 't_6', 'min2', 't_2', '_1_2', ]),
      yx1estmt1expand: form(['yx1t', 'equals', 'sin', brac('_2pftm2pft1', 3)], ['2', 'pi', 'f', 'lb7', 'rb7', 't_6', 'min2', 't_2', '_1_2', ]),
      yx1estmt1up: form(['yx1t', 'equals', 'sin', brac('_2pftm2pft1Up', 3)], ['t_1', '_1_1']),
      yx1estmt1xv: form(['yx1t', 'equals', 'sin', brac('_2pftm2pftx1Onv', 3)],['t_1', '_1_1']),
      yx1estmt1fOnV: ['yx1t', 'equals', 'sin', brac('_2pftm2pftfOnV', 3)],
      yx1estmt1fOnVLUp: form(['yx1t', 'equals', 'sin', brac('_2pftm2pftfOnVLUp', 3)], ['f_2', 'vin1', 'v']),
      yx1estmt1fOnVL: form(['yx1t', 'equals', 'sin', brac('_2pftm2pftfOnVL', 3)], ['f_2', 'vin1', 'v']),
      yx1estmt1fL1: ['yx1t', 'equals', 'sin', brac('_2pftm2pftL1', 3)],
      yx1estmt1fLS1: ['yx1t', 'equals', 'sin', brac('_2pftm2pftLS1', 3)],
      yx1estmt1fL: ['yx1t', 'equals', 'sin', brac('_2pftm2pftL', 3)],
      yx1estmt1fLToX: ['yx1ToXt', 'equals', 'sin', brac('_2pftm2pLXUp', 3)],
      yxestmt1fL: ['yxt', 'equals', 'sin', brac('_2pftm2pLX', 3)],
      yxestmt1fLConstT: form(['yxtConstT', 'equals', 'sin', brac('_2pftm2pLXConstt', 3)], ['t_5', '2_1', 'pi1', 'f_1', 't_3'], colorMid),
      yxestmt1fLConstX: form(['yxtConstX', 'equals', 'sin', brac('_2pftm2pLXConstX', 3)], ['x_1', '2_2', 'pi2', 'vin2', 'lambda', 'x_2'], colorMid),
      yxeswUpL: form(['yxt', 'equals', 'sin', brac('_2pfwUptm2pLX', 3)], ['2_1', 'pi1', 'f_1']),
      yxewL: form(['yxt', 'equals', 'sin', brac('_wtm2pLX', 3)], ['2_1', 'pi1', 'f_1']),
      yxewLUpK: form(['yxt', 'equals', 'sin', brac('_wtm2pLKUpX', 3)], ['2_2', 'pi2', 'vin2', 'lambda']),
      yxewK: form(['yxt', 'equals', 'sin', brac('_wtmkx', 3)], ['2_2', 'pi2', 'vin2', 'lambda']),
    },
  });
}

