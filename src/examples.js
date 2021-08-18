function addExamples() {
  // const text = (label, size, location) => ({
  //   text: label,
  //   location,
  //   font: { size },
  // });
  const text = (name, label, size, position) => ({
    name,
    make: 'text',
    text: label,
    position,
    font: { color: colorBlueText, size },
    xAlign: 'center',
  })
  const s = 0.8;
  const examples = figure.add({
    name: 'examples',
    make: 'collection',
    elements: [
      text('light', 'Light', 1.2 * s, [2.5, 5]),
      text('sound', 'Sound', 1.2 * s, [11, 2]),
      text('wifi', 'WiFi Signals', 1.2 * s, [21, 4.5]),
      text('ocean', 'Ocean Waves', 0.6 * s, [18, 9]),
      text('seismic', 'Seismic Waves', 0.6 * s, [11, 9.5]),
      text('shock', 'Shock Waves', 0.6 * s, [2, 11]),
      text('gravity', 'Gravity Waves', 0.6 * s, [19, 0.7]),
      text('ultrasound', 'Ultrasound', 0.6 * s, [3.5, 7]),
      text('radio', 'Radio', 0.6 * s, [3, 2]),
      text('cell', 'Cellular Signals', 0.6 * s, [20, 7]),
      text('gps', 'GPS Signals', 0.6 * s, [6, 3.3]),
      text('ripples', 'Water Ripples', 0.6 * s, [6, 1]),
      text('xrays', 'X-Rays', 0.6 * s, [4, 9]),
      text('gamma', 'Gamma-Rays', 0.6 * s, [21, 11]),
      text('radar', 'Radar', 0.6 * s, [15, 3]),
      text('micro', 'Microwaves', 0.6 * s, [8, 10.5]),
      text('infra', 'Infrared', 0.6 * s, [15, 1]),
      text('vibrating', 'Vibrating Strings', 0.6 * s, [20, 2.5]),
      text('uv', 'UV Radiation', 0.6 * s, [15, 10.6]),
    ],
  });
  const d = 0.4;
  const delay = 0;
  figure.fnMap.global.add('showExamples', () => {
    examples.show();
    examples.hideAll();
    examples.animations.new()
      .dissolveIn({ element: 'light', duration: d })
      .dissolveIn({ element: 'sound', duration: d, delay: 3 })
      .dissolveIn({ element: 'wifi', duration: d, delay: 3 })
      .dissolveIn({ element: 'ocean', duration: d, delay: 2 })
      .dissolveIn({ element: 'seismic', duration: d, delay })
      .dissolveIn({ element: 'shock', duration: d, delay })
      .dissolveIn({ element: 'gravity', duration: d, delay })
      .dissolveIn({ element: 'ultrasound', duration: d, delay })
      .dissolveIn({ element: 'radar', duration: d, delay })
      .dissolveIn({ element: 'radio', duration: d, delay })
      .dissolveIn({ element: 'cell', duration: d, delay })
      .dissolveIn({ element: 'gps', duration: d, delay })
      .dissolveIn({ element: 'ripples', duration: d, delay })
      .dissolveIn({ element: 'xrays', duration: d, delay })
      .dissolveIn({ element: 'gamma', duration: d, delay })
      .dissolveIn({ element: 'micro', duration: d, delay })
      .dissolveIn({ element: 'infra', duration: d, delay })
      .dissolveIn({ element: 'vibrating', duration: d, delay })
      .dissolveIn({ element: 'uv', duration: d, delay })
      .start();
  });
  figure.fnMap.global.add('outExamples', () => {
    examples.animations.new().dissolveOut(0.5).start();
  });
}
