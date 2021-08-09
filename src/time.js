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
      yAxis('yAxis', 'y', 'x = 0', A, false, colorDisturbanceText),
      {
        name: 'trace',
        make: 'polyline',
        options: {
          simple: true,
          width: 0.08,
          color: colorTimeText,
        },
      },
      {
        name: 'marker',
        make: 'rectangle',
        options: {
          width: 0.05,
          color: colorHighlight,
          height: A * 2,
        },
        mods: {
          scenarios: { default: { position: [length / 2, 0] } },
          isMovable: true,
          touchBorder: 0.5,
          move: {
            bounds: {
              translation: {
                left: 0, right: length, bottom: 0, top: 0,
              },
            },
          },
        },
      },
      // {
      //   name: 'widthArrow',
      //   make: 'collections.line',
      //   options: {
      //     width: 0.05,
      //     color: colorLight,
      //     arrow: 'barb',
      //     label: {
      //       text: 'T',
      //       location: 'bottom',
      //       offset: 0.3,
      //       scale: 4,
      //       color: colorTimeText,
      //     },
      //     p1: [0, -1],
      //     p2: [2, -1],
      //     align: 'center',
      //   },
      // },
      arrow('TArrow', 'T', [0, -1], [2, -1], colorTimeText),
      arrow('secondsArrow', '3', [0, -1], [2, -1], colorTimeText),
      // {
      //   name: 'secondsArrow',
      //   make: 'collections.line',
      //   options: {
      //     width: 0.05,
      //     color: colorLight,
      //     arrow: 'barb',
      //     label: {
      //       text: '3',
      //       location: 'bottom',
      //       offset: 0.3,
      //       scale: 4,
      //       color: colorTimeText,
      //     },
      //     p1: [0, -1],
      //     p2: [2, -1],
      //     align: 'center',
      //   },
      // },
      {
        name: 'eqn',
        make: 'equation',
        color: colorFText,
        scale: 4,
        elements: {
          lb: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
          rb: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
          t_1: { color: colorTimeText },
        },
        forms: {
          0: ['f', ' ', { brac: ['lb', 't_1', 'rb'] }],
        },
        position: [4, -1],
      }
    ],
    mods: {
      scenarios: {
        default: { position: defaultPosition, scale: 1 },
        // right: { position: [1.5, 6], scale: 1 },
        // top: { position: [4.5, 8.4], scale: 0.7 },
        // bottom: { position: [5, 3], scale: 0.6 },
        // rightSmall: { position: [2, 7], scale: 0.9 },
      },
    },
  });
  const timePlot = figure.getElement(name);
  const axis = timePlot.getElement('xAxis');
  const trace = timePlot.getElement('trace');
  timePlot.custom.update = () => {
    const recorded = recording.getRecording(false, 10);
    const points = Array(recorded.time.length);
    for (let i = 0; i < points.length; i += 1) {
      points[i] = new Point(axis.valueToDraw(recorded.time[i]), recorded.data[i]);
    }
    trace.custom.updatePoints({ points });
  };
  const marker = timePlot._marker;
  timePlot.custom.updateMarker = (p) => {
    marker.transform.updateTranslation(p * length, 0);
  };
  marker.notifications.add('setTransform', () => {
    const p = marker.getPosition('local').x / length;
    figure.get('m1').custom.updateMarker(p);
  });
  // const T = timePlot._widthArrow;
  // figure.fnMap.global.add('growT', () => {
  //   T.showAll();
  //   T._label.hide();
  //   T.animations.new()
  //     .length({ start: 0.5, target: 2, duration: 1 })
  //     .dissolveIn({ element: 'label' })
  //     .start();
  // });
  // const S = timePlot._secondsArrow;
  // figure.fnMap.global.add('grow3', () => {
  //   S.showAll();
  //   S._label.hide();
  //   S.animations.new()
  //     .length({ start: 0.5, target: 2, duration: 1 })
  //     .dissolveIn({ element: 'label' })
  //     .start();
  // });
  figure.fnMap.global.add('growArrow', (payload) => {
    const [name, duration] = payload;
    const S = figure.get(name);
    S.showAll();
    S._label.hide();
    S.animations.new()
      .length({ start: 0.5, duration })
      .dissolveIn({ element: 'label' })
      .start();
  });
  figure.fnMap.global.add('setArrow', (name) => {
    const S = figure.get(name);
    S.showAll();
    S.setEndPoints(S.custom.endPoints[0], S.custom.endPoints[1]);
  });

  figure.fnMap.global.add('growTimeTrace', () => {
    trace.show();
    trace.stop();
    trace.animations.new()
      .custom({
        callback: (p) => {
          trace.pointsToDraw = Math.floor(trace.drawingObject.numVertices / 6 * p) * 6;
        },
        duration: 1,
      })
      .start();
  });
  return timePlot;
}
