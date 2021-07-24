function addExamples() {
  const text = (label, size, location) => ({
    text: label,
    location,
    font: { size },
  })
  const s = 0.8;
  figure.add({
    name: 'examples',
    make: 'collection',
    elements: [
      {
        name: 'ocean',
        make: 'text',
        font: { color: color1, size: 2 },
        xAlign: 'center',
        text: [
          text('Ocean Waves', 1.2 * s, [18, 9]),
        ],
      },
      {
        name: 'sound',
        make: 'text',
        font: { color: color1, size: 2 },
        xAlign: 'center',
        text: [
          text('Sound', 1.2 * s, [11, 2]),
        ],
      },
      {
        name: 'light',
        make: 'text',
        font: { color: color1, size: 2 },
        xAlign: 'center',
        text: [
          text('Light', 1.2 * s, [2.5, 5]),
          text('WiFi Signals', 1.2 * s, [21, 4.5]),
        ],
      },
      {
        name: 'allTheRest',
        make: 'text',
        font: { color: color1, size: 2 },
        xAlign: 'center',
        text: [
          text('Seismic Waves', 0.6 * s, [11, 9.5]),
          text('Shock Waves', 0.6 * s, [2, 11]),
          text('Gravity Waves', 0.6 * s, [19, 0.7]),
          text('Ultrasound', 0.6 * s, [3.5, 7]),
          text('Radio', 0.6 * s, [3, 2]),
          text('Cellular Signals', 0.6 * s, [20, 7]),
          text('GPS Signals', 0.6 * s, [6, 3.3]),
          text('Water Ripples', 0.6 * s, [6, 1]),
          text('X-Rays', 0.6 * s, [4, 9]),
          text('Gamma-Rays', 0.6 * s, [21, 11]),
          text('Microwaves', 0.6 * s, [8, 10.5]),
          text('Infrared', 0.6 * s, [15, 1]),
          text('Vibrating Strings', 0.6 * s, [20, 2.5]),
        ],
        color: color1,
      }
    ],
  });
}
