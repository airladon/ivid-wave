function addExamples() {
  const text = (label, size, location) => ({
    text: label,
    location,
    font: { size },
  })
  figure.add({
    name: 'examples',
    make: 'text',
    font: { color: color1, size: 2 },
    xAlign: 'center',
    text: [
      text('Ocean Waves', 1.2, [18, 9]),
      text('Sound', 1.2, [12, 2]),
      text('Light', 1.2, [2.5, 5]),
      text('Seismic Waves', 0.5, [11, 9.5]),
      text('Shock Waves', 0.5, [2, 11]),
      text('Gravity Waves', 0.6, [19, 0.7]),
      text('Ultrasound', 0.6, [3, 8]),
      text('Radio', 0.7, [4, 2]),
      text('Cellular Signals', 0.6, [19, 6]),
      text('WiFi Signals', 0.8, [21, 4]),
      text('GPS Signals', 0.6, [8, 3]),
      text('Water Ripples', 0.5, [7, 1]),
      text('X-Rays', 0.8, [4, 9]),
      text('Gamma-Rays', 0.6, [20, 11]),
      text('Microwaves', 0.5, [8, 10.5]),
      text('Infrared', 0.7, [14, 1]),
      text('Vibrating Strings', 0.6, [21, 2.5]),
    ],
    color: color1,
  });
}
