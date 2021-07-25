function addVLFEquation(name) {

  figure.add({
    name,
    make: 'equation',
    scale: 4,
    position: [12, 4],
    color: colorOne,
    elements: {
      equals: { text: ' = ', color: colorLight },
      lambda: '\u03bb',
    },
    forms: {
      vlf: ['v', 'equals', 'lambda', 'f'],
    },
    mods: {
      scenarios: {
        default: { position: [12, 6], scale: 1 },
        summary: { position: [18, 6], scale: 1 },
      },
    },
  });
}

