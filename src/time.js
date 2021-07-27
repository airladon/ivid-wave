function addTimePlot(name, length, maxValue, recording, A, defaultPosition) {
  figure.add({
    name,
    make: 'collection',
    elements: [
      {
        name: 'grid',
        make: 'grid',
        bounds: [0, -A, length, 2 * A],
        xStep: length / 10,
        yStep: A / 5,
        line: { width: 0.03 },
      },
      xAxis('xAxis', 't', '', length, maxValue),
      yAxis('yAxis', 'y', 'x = 0', A, false),
      {
        name: 'trace',
        make: 'polyline',
        options: {
          simple: true,
          width: 0.08,
          color: color0,
        },
      },
      {
        name: 'eqn',
        make: 'equation',
        color: colorFText,
        scale: 4,
        elements: {
          lb: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
          rb: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
        },
        forms: {
          0: [{ sub: ['f', 't'] }, { brac: ['lb', 't_1', 'rb'] }],
        },
        position: [4, -1],
      }
    ],
    mods: {
      scenarios: {
        default: { position: defaultPosition, scale: 1 },
        right: { position: [1.5, 6], scale: 1 },
        top: { position: [4.5, 8.4], scale: 0.7 },
        bottom: { position: [5, 3], scale: 0.6 },
        rightSmall: { position: [2, 7], scale: 0.9 },
      },
    },
  });
  const timePlot = figure.getElement(name);
  const axis = timePlot.getElement('xAxis');
  const trace = timePlot.getElement('trace');
  timePlot.custom.update = () => {
    const recorded = recording.getRecording(false, maxValue);
    const points = Array(recorded.time.length);
    for (let i = 0; i < points.length; i += 1) {
      points[i] = new Point(axis.valueToDraw(recorded.time[i]), recorded.data[i]);
    }
    trace.custom.updatePoints({ points });
  };
  return timePlot;
}
