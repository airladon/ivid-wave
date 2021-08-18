/* eslint-disable camelcase, object-curly-newline, max-len */
/* global colorLight, colorOff, colorOn, figure, colorDark, color4, Fig */

/*
....###....##.....##.########..######.
...##.##....##...##..##.......##....##
..##...##....##.##...##.......##......
.##.....##....###....######....######.
.#########...##.##...##.............##
.##.....##..##...##..##.......##....##
.##.....##.##.....##.########..######.
*/
// eslint-disable-next-line no-unused-vars
const xAxis = (name, title, units, xLength, XMaxValue) => ({
  name,
  make: 'collections.axis',
  options: {
    start: 0,
    color: colorLight,
    stop: XMaxValue * 1.05,
    length: xLength * 1.05,
    line: { width: 0.032, arrow: { end: 'barb' } },
    title: {
      font: { style: 'italic', family: 'TeXGyreTermes', size: 0.18 * 4, color: colorLight },
      text: [title, { font: { size: 0.24 }, lineSpace: 0.24, text: units }],
      position: [xLength * 1.05 - 0.12, -0.3],
      color: colorLight,
    },
  },
});

// eslint-disable-next-line no-unused-vars
const yAxis = (name, title, units, AValue, yAxisTitleSide, color = colorLight) => ({
  name: 'yAxis',
  make: 'collections.axis',
  options: {
    axis: 'y',
    color: colorLight,
    start: -AValue,
    stop: AValue,
    length: AValue * 2 + 1,
    line: { width: 0.032, arrow: 'barb' },
    position: [0, -AValue - 0.5],
    title: {
      font: { style: 'italic', family: 'TeXGyreTermes', size: 0.18 * 4, color },
      text: {
        text: `${title}|unitsText|`,
      },
      modifiers: {
        unitsText: { text: units, font: { size: 0.09 * 4 }, offset: [0, -0.2] },
      },
      xAlign: 'left',
      rotation: 0,
      offset: yAxisTitleSide ? [0, AValue - 0.24] : [0.4, AValue + 0.6],
      color,
    },
  },
});

/*
.########..##.....##.########.########..#######..##....##..######.
.##.....##.##.....##....##.......##....##.....##.###...##.##....##
.##.....##.##.....##....##.......##....##.....##.####..##.##......
.########..##.....##....##.......##....##.....##.##.##.##..######.
.##.....##.##.....##....##.......##....##.....##.##..####.......##
.##.....##.##.....##....##.......##....##.....##.##...###.##....##
.########...#######.....##.......##.....#######..##....##..######.
*/
// eslint-disable-next-line no-unused-vars
const button = (name, position, text, modifiers = {}) => ({
  name,
  make: 'collections.rectangle',
  options: {
    button: true,
    line: { width: 0.04, color: colorOff },
    label: { text, font: { color: colorLight }, modifiers },
    width: 1.5,
    height: 0.9,
    corner: { radius: 0.2, sides: 3 },
    position,
    color: colorLight,
  },
  mods: {
    isTouchable: true,
    touchBorder: [0.1, 0.2, 0.1, 0.4],
  },
});

// eslint-disable-next-line no-unused-vars
function toggle(name, position, height, onDirectionRight = true) {
  const dir = onDirectionRight ? 1 : -1;
  const width = height * 1.7;
  const offset = -width / 2 + height / 2;
  return {
    name,
    make: 'collection',
    position,
    elements: [
      {
        name: 'background',
        make: 'rectangle',
        width,
        height: height / 1.5,
        corner: { radius: height / 2, sides: 10 },
        color: colorOff,
      },
      {
        name: 'circ',
        make: 'collection',
        elements: [
          {
            name: 'fill',
            make: 'polygon',
            radius: height / 2,
            sides: 40,
            color: colorLight,
          },
          {
            name: 'line',
            make: 'polygon',
            radius: height / 2,
            sides: 40,
            line: { width: 0.008 },
            color: colorDark,
          },
        ],
        position: [dir * offset, 0],
      },
    ],
    touchBorder: 0.2,
    mods: {
      isTouchable: true,
      customState: { state: false },
      custom: {
        off: () => {
          const e = figure.get(name);
          e._circ.setPosition(dir * offset, 0);
          e._background.setColor(colorOff);
          e.customState.state = false;
        },
        on: () => {
          const e = figure.get(name);
          e._circ.setPosition(-dir * offset, 0);
          e._background.setColor(colorOn);
          e.customState.state = true;
        },
      },
      onClick: () => {
        const e = figure.get(name);
        if (e.customState.state) {
          e.custom.off();
        } else {
          e.custom.on();
        }
      },
    },
  };
}

/*
.##.......####.##....##.########..######.
.##........##..###...##.##.......##....##
.##........##..####..##.##.......##......
.##........##..##.##.##.######....######.
.##........##..##..####.##.............##
.##........##..##...###.##.......##....##
.########.####.##....##.########..######.
*/
// eslint-disable-next-line no-unused-vars
const arrow = (name, text, p1, p2, color = colorLight, location = 'bottom', align = 'center', arrowIn = 'barb', scale = 4) => ({
  name,
  make: 'collections.line',
  options: {
    width: 0.05,
    color,
    arrow: arrowIn,
    label: {
      text,
      location,
      offset: 0.2,
      scale,
      color,
    },
    p1,
    p2,
    align,
  },
  mods: {
    custom: {
      endPoints: [p1, p2],
    },
  },
});

/*
.##..........###....########..########.##........######.
.##.........##.##...##.....##.##.......##.......##....##
.##........##...##..##.....##.##.......##.......##......
.##.......##.....##.########..######...##........######.
.##.......#########.##.....##.##.......##.............##
.##.......##.....##.##.....##.##.......##.......##....##
.########.##.....##.########..########.########..######.
*/
// eslint-disable-next-line no-unused-vars
const label = (name, position, col, text) => ({
  name,
  make: 'primitives.textLines',
  options: {
    text,
    position,
    font: { size: 0.36, color: col },
    xAlign: 'center',
    yAlign: 'middle',
    color: color4,
  },
});

// eslint-disable-next-line no-unused-vars
const labelButton = (name, position, text) => ({
  name,
  make: 'primitives.textLines',
  options: {
    text,
    position,
    font: { size: 0.45, color: colorLight },
    xAlign: 'center',
    justify: 'center',
    yAlign: 'middle',
    color: colorLight,
    touchBorder: 0.5,
  },
  mods: {
    isTouchable: true,
  },
});


/*
.########..#######..##....##
.##.......##.....##.###...##
.##.......##.....##.####..##
.######...##.....##.##.##.##
.##.......##..##.##.##..####
.##.......##....##..##...###
.########..#####.##.##....##
*/
// eslint-disable-next-line no-unused-vars
const frac = (numerator, vIndex, denominator, scale = 1, numeratorSpace = 0.05, denominatorSpace = 0.05, overhang = 0.05) => ({
  frac: {
    numerator, symbol: `vin${vIndex}`, denominator, scale, numeratorSpace, denominatorSpace, overhang,
  },
});

// eslint-disable-next-line no-unused-vars
const lines = (content, baselineSpace = 2, justify = 'left', options = {}) => ({
  lines: Fig.tools.misc.joinObjects({}, { content, justify, baselineSpace }, options),
});

// eslint-disable-next-line no-unused-vars
const line = (content, equalsIndex) => ({
  content,
  justify: `equals${equalsIndex}`,
});

// eslint-disable-next-line no-unused-vars
const sub = (content, subscript) => ({ sub: [content, subscript] });

// eslint-disable-next-line no-unused-vars
const brac = (content, index) => ({
  brac: [`lb${index}`, content, `rb${index}`],
});

// eslint-disable-next-line no-unused-vars
const scale = (content, s) => ({
  scale: [content, s],
});

let delay = 0;
// eslint-disable-next-line no-unused-vars
const dd = (reset = false) => {
  if (reset) { delay = 0; }
  delay += 0.1;
  return delay;
};

// eslint-disable-next-line no-unused-vars
const form = (content, alignment = 'equals1', yAlign = 'basline') => ({
  content,
  alignment: alignment === 'left' || alignment === 'center' || typeof alignment === 'number' ? { xAlign: alignment, yAlign } : { fixTo: alignment, yAlign },
});

// eslint-disable-next-line no-unused-vars
const cont = (content, width, inSize = true) => ({
  container: { content, width, inSize },
});

// eslint-disable-next-line no-unused-vars
const tc = (content, comment, symbol, commentSpace = 0.2, contentSpace = 0.2, scaleIn = 1, commentLineSpace = 0.2, contentLineSpace = 0.2) => ({
  topComment: {
    content,
    comment,
    symbol,
    commentSpace,
    commentLineSpace,
    contentSpace,
    contentLineSpace,
    inSize: false,
    scale: scaleIn,
  },
});

// eslint-disable-next-line no-unused-vars
const under = (content, width = null) => ({
  container: {
    content, inSize: false, width,
  },
});

// eslint-disable-next-line no-unused-vars
const hide = (content, width = null) => ({
  container: {
    content, inSize: true, showContent: false, width,
  },
});

// eslint-disable-next-line no-unused-vars
const bc = (content, comment, symbol, commentSpace = 0.2, contentSpace = 0.2, scaleIn = 1, commentLineSpace = 0.2, contentLineSpace = 0.2) => ({
  bottomComment: {
    content,
    comment,
    symbol,
    commentSpace,
    contentSpace,
    commentLineSpace,
    contentLineSpace,
    inSize: false,
    scale: scaleIn,
  },
});

// eslint-disable-next-line no-unused-vars
const box = (content, symbol, space = 0.05, inSize = false) => ({
  box: { content, symbol, inSize, space },
});

// eslint-disable-next-line no-unused-vars
const tBox = (touchBorder = 0) => ({
  symbol: 'tBox', touchBorder, isTouchable: true,
});

// const highlight = (index, description, eqn, e1, e2, s1, s2, p1, p2) => {
//     const d = description.get(`tBox${index}`);
//     const e = eqn.get(`tBox${index}`);
//     const onclick = () => {
//       if (eqn.isShown === false || description.isShown === false) {
//         return;
//       }
//       const h1 = figure.get('highlighter');
//       const h2 = figure.get('highlighter2');
//       h1.showAll();
//       h2.showAll();
//       h1.surround(eqn.get(e1), s1);
//       h2.surround(description.get(e2), s2);
//       h1.pulse({ scale: p1 });
//       h2.pulse({ scale: p2 });
//     };
//     d.onClick = onclick;
//     e.onClick = onclick;
//   }
// eslint-disable-next-line no-unused-vars
const highlightN = (index, description, eqn, s1, s2, p1, p2) => {
  const d = description.get(`tBox${index}`);
  const e = eqn.get(`tBox${index}`);
  const onclick = () => {
    if (eqn.isShown === false || description.isShown === false) {
      return;
    }
    const h1 = figure.get('highlighter');
    const h2 = figure.get('highlighter2');
    if (h1.isShown && h2.isShown && description.custom.selected === index) {
      h1.hide();
      h2.hide();
      return;
    }
    // eslint-disable-next-line no-param-reassign
    description.custom.selected = index;
    h1.showAll();
    h2.showAll();
    h1.surround(e, s1);
    h2.surround(d, s2);
    h1.pulse({ scale: p1 });
    h2.pulse({ scale: p2 });
  };
  d.onClick = onclick;
  e.onClick = onclick;
};
