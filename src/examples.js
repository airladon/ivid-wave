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
    font: { color: color1, size },
    xAlign: 'center',
  })
  const s = 0.8;
  const examples = figure.add({
    name: 'examples',
    make: 'collection',
    elements: [
      text('ocean', 'Ocean Waves', 1.2 * s, [18, 9]),
      text('sound', 'Sound', 1.2 * s, [11, 2]),
      text('light', 'Light', 1.2 * s, [2.5, 5]),
      text('wifi', 'WiFi Signals', 1.2 * s, [21, 4.5]),
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
  figure.fnMap.global.add('showExamples', () => {
    examples.show();
    examples.hideAll();
    examples.animations.new()
      .dissolveIn({ element: 'ocean', duration: 0.4 })
      .dissolveIn({ element: 'sound', duration: 0.4, delay: 0.5 })
      .dissolveIn({ element: 'light', duration: 0.4, delay: 0.5 })
      .dissolveIn({ element: 'wifi', duration: 0.4, delay: 0.5 })
      .dissolveIn({ element: 'seismic', duration: d })
      .dissolveIn({ element: 'shock', duration: d })
      .dissolveIn({ element: 'gravity', duration: d })
      .dissolveIn({ element: 'ultrasound', duration: d })
      .dissolveIn({ element: 'radar', duration: d })
      .dissolveIn({ element: 'radio', duration: d })
      .dissolveIn({ element: 'cell', duration: d })
      .dissolveIn({ element: 'gps', duration: d })
      .dissolveIn({ element: 'ripples', duration: d })
      .dissolveIn({ element: 'xrays', duration: d })
      .dissolveIn({ element: 'gamma', duration: d })
      .dissolveIn({ element: 'micro', duration: d })
      .dissolveIn({ element: 'infra', duration: d })
      .dissolveIn({ element: 'vibrating', duration: d })
      .dissolveIn({ element: 'uv', duration: d })
      .start();
  });
  figure.fnMap.global.add('outExamples', () => {
    examples.animations.new().dissolveOut(0.5).start();
  });
}
