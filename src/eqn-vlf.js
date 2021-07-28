function addVLFEquation(name) {

  figure.add({
    name,
    make: 'equation',
    scale: 5,
    position: [12, 4],
    color: colorOne,
    dimColor: colorLight,
    font: { family: 'TeXGyreTermes' },
    textFont: { family: 'TeXGyreTermes' },
    elements: {
      equals: { text: ' = ', color: colorLight },
      lambda: '\u03bb',
    },
    forms: {
      vlf: ['v', 'equals', 'lambda', ' ', 'f'],
    },
    mods: {
      scenarios: {
        default: { position: [12, 6], scale: 1 },
        summary: { position: [18, 5.7], scale: 1 },
      },
    },
  });
}

