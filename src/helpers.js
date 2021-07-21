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
    line: { width: 0.008, arrow: { end: 'barb' } },
    title: {
      font: { style: 'italic', family: 'serif', size: 0.18 },
      text: [title, { font: { size: 0.06 }, lineSpace: 0.06, text: units }],
      position: [xLength - 0.03, -0.04],
    },
  },
});

const yAxis = (name, title, units, AValue, yAxisTitleSide) => ({
  name: 'yAxis',
  make: 'collections.axis',
  options: {
    axis: 'y',
    color: color4,
    start: -AValue - 0.05,
    stop: AValue + 0.05,
    length: AValue * 2 + 0.1,
    line: { width: 0.008, arrow: 'barb' },
    position: [0, -AValue - 0.05],
    title: {
      font: { style: 'italic', family: 'serif', size: 0.18 },
      text: {
        text: `${title} |unitsText|`,
      },
      modifiers: {
        unitsText: { text: units, font: { size: 0.06 } },
      },
      xAlign: 'left',
      rotation: 0,
      offset: yAxisTitleSide ? [0, AValue - 0.06] : [0.05, AValue + 0.06],
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
    line: { width: 0.005 },
    label: { text },
    width: 0.3,
    height: 0.2,
    corner: { radius: 0.03, sides: 3 },
    position,
    color: color4,
  },
  mods: {
    isTouchable: true,
    touchBorder: [0.05, 0.05, 0.05, 0.1],
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
const label = (name, position, col, text) => ({
  name,
  make: 'primitives.textLines',
  options: {
    text,
    position,
    font: { size: 0.09, color: col },
    xAlign: 'center',
    yAlign: 'middle',
    color: color4,
  },
});
