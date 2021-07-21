/*
....###....##.....##.########..######.
...##.##....##...##..##.......##....##
..##...##....##.##...##.......##......
.##.....##....###....######....######.
.#########...##.##...##.............##
.##.....##..##...##..##.......##....##
.##.....##.##.....##.########..######.
*/
const xAxis = (name, title, units, xLength, XMaxValue) => ({
  name,
  make: 'collections.axis',
  options: {
    start: 0,
    color: color4,
    stop: XMaxValue + 0.1,
    length: xLength,
    line: { width: 0.032, arrow: { end: 'barb' } },
    title: {
      font: { style: 'italic', family: 'serif', size: 0.18 * 4 },
      text: [title, { font: { size: 0.24 }, lineSpace: 0.24, text: units }],
      position: [xLength - 0.12, -0.16],
    },
  },
});

const yAxis = (name, title, units, AValue, yAxisTitleSide) => ({
  name: 'yAxis',
  make: 'collections.axis',
  options: {
    axis: 'y',
    color: color4,
    start: -AValue,
    stop: AValue,
    length: AValue * 2 + 0.4,
    line: { width: 0.032, arrow: 'barb' },
    position: [0, -AValue - 0.2],
    title: {
      font: { style: 'italic', family: 'serif', size: 0.18 * 4 },
      text: {
        text: `${title}|unitsText|`,
      },
      modifiers: {
        unitsText: { text: units, font: { size: 0.09 * 4 } },
      },
      xAlign: 'left',
      rotation: 0,
      offset: yAxisTitleSide ? [0, AValue - 0.24] : [0.2, AValue + 0.24],
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
const button = (name, position, text) => ({
  name,
  make: 'collections.rectangle',
  options: {
    button: true,
    line: { width: 0.02 },
    label: { text },
    width: 1.2,
    height: 0.8,
    corner: { radius: 0.12, sides: 3 },
    position,
    color: color4,
  },
  mods: {
    isTouchable: true,
    touchBorder: [0.2, 0.2, 0.2, 0.4],
  },
});

function toggle(name, position, height, onDirectionRight = true)
{
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
      custom: {
        state: false,
        off: () => {
          const e = figure.get(name);
          e._circ.setPosition(dir * offset, 0)
          e._background.setColor(colorOff);
          e.custom.state = false;
        },
        on: () => {
          const e = figure.get(name);
          e._circ.setPosition(-dir * offset, 0)
          e._background.setColor(colorOn);
          e.custom.state = true;
        }
      },
      onClick: () => {
        const e = figure.get(name);
        if (e.custom.state) {
          e.custom.off();
        } else {
          e.custom.on();
        }
      },
    },
  };
}

/*
.##..........###....########..########.##........######.
.##.........##.##...##.....##.##.......##.......##....##
.##........##...##..##.....##.##.......##.......##......
.##.......##.....##.########..######...##........######.
.##.......#########.##.....##.##.......##.............##
.##.......##.....##.##.....##.##.......##.......##....##
.########.##.....##.########..########.########..######.
*/
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

