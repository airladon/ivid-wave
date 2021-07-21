function addTimePlot(name, length, maxValue, recording, A, defaultPosition) {
  figure.add({
    name,
    make: 'collection',
    elements: [
      xAxis('xAxis', 't', '', length, maxValue),
      yAxis('yAxis', 'y', 'x=0', A, false),
      {
        name: 'trace',
        make: 'polyline',
        options: {
          simple: true,
          width: 0.08,
          color: color0,
        },
      },
    ],
    mods: {
      scenarios: {
        default: { position: defaultPosition, scale: 1 },
        smallold: { position: [-0.6, 0.8], scale: 1 },
        small: { position: [-1.85, 1.5], scale: 1 },
      },
    },
  });
  const timePlot = figure.getElement(name);
  const axis = timePlot.getElement('xAxis');
  const trace = timePlot.getElement('trace');
  timePlot.custom.update = () => {
    const recorded = recording.getRecording(false, maxValue - 0.5);
    const points = Array(recorded.time.length);
    for (let i = 0; i < points.length; i += 1) {
      points[i] = new Point(axis.valueToDraw(recorded.time[i]), recorded.data[i]);
    }
    trace.custom.updatePoints({ points });
  };
  return timePlot;
}
