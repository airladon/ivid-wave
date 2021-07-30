/*
globals figure, color1, color2, time, color3, color0, Recorder,
minVelocity, maxTimeReached, unpause, Transform, range
*/

function addMedium(
  stringName, length, maxValue, A, defaultPosition, yAxisTitle, ballSize, ballSpace,
) {
  // Particle creater
  const ball = (x, index, radius, sides = 20) => ({
    name: `ball${index}`,
    make: 'primitives.polygon',
    options: {
      sides,
      radius,
      transform: new Transform().scale(1, 1).translate(x, 0),
      color: colorLight,
      position: [x, 0],
    },
    mods: {
      dimColor: colorLight,
      scenarios: {
        default: { color: colorLight, scale: [1, 1] },
        highlight: { color: color1, scale: [1.2, 1.2] },
      }
    },
  });
  const makeVertLine = (xPos) => ({
    make: 'line',
    p1: [xPos / maxValue * length, -A / 2],
    p2: [xPos / maxValue * length, A / 2],
    arrow: 'barb',
    width: 0.05,
    color: color1,
  });
  figure.add({
    name: stringName,
    make: 'collection',
    transform: new Transform().scale(1, 1).translate(0, 0),
    elements: [
      // {
      //   name: 'minorGrid',
      //   make: 'grid',
      //   bounds: [0, -A * length / maxValue, length, A * length / maxValue * 2],
      //   line: { width: 0.01 },
      //   xStep: length / 50,
      //   yStep: length / 50,
      // },
      {
        name: 'grid',
        make: 'grid',
        bounds: [0, -A * length / maxValue, length, A * length / maxValue * 2],
        line: { width: 0.03 },
        xStep: length / 20,
        yStep: length / 20,
      },
      xAxis('xAxis', 'x', '', length, maxValue),
      yAxis('yAxis', 'y', '', A * length / maxValue, yAxisTitle),
      {
        name: 'disturbanceLines',
        make: 'collection',
        elements: [
          makeVertLine(2),
          makeVertLine(4),
          makeVertLine(6),
          makeVertLine(8),
          makeVertLine(10),
        ],
      },
      {
        name: 'balls',
        make: 'collection',
        options: {
          transform: new Transform(),
        },
      },
      // movePad moves the first particle in the medium
      {
        name: 'envelope2',
        make: 'polyline',
        width: 0.1,
        color: colorPositionText,
        simple: true,
      },
      {
        name: 'envelope',
        make: 'polyline',
        width: 0.1,
        color: colorGText,
        simple: true,
      },
      {
        name: 'firstBall',
        make: 'primitives.polygon',
        radius: 0.2,
        sides: 40,
        color: [1, 0, 0, 1],
      },
      {
        name: 'movePadEnv',
        make: 'rectangle',
        width: length,
        height: A * 3,
        color: [1, 0, 0, 0],
        position: [length / 2, 0],
        touch: true,
        mods: {
          isMovable: true,
          custom: { x: 0 },
          // move: {
          //   bounds: {
          //     translation: {
          //       left: 0, right: 0, bottom: -A * length / maxValue, top: A * length / maxValue,
          //     },
          //   },
          // },
        },
      },
      {
        name: 'movePad',
        make: 'primitives.polygon',
        radius: 0.6,
        sides: 8,
        color: [1, 0, 0, 0],
        touch: true,
        mods: {
          isMovable: true,
          move: {
            bounds: {
              translation: {
                left: 0, right: 0, bottom: -A * length / maxValue, top: A * length / maxValue,
              },
            },
          },
        },
      },
      // Arrowed line showing a wavelength of a sine wave
      {
        name: 'wavelength',
        make: 'collections.line',
        options: {
          width: 0.05,
          color: colorLight,
          arrow: 'barb',
          label: {
            text: '\u03bb',
            offset: 0.04,
            location: 'top',
            scale: 4,
            font: { color: colorPositionText },
          },
          p1: [100, 0],
          p2: [101, 0],
        },
      },
      {
        name: 'widthArrow',
        make: 'collections.line',
        options: {
          width: 0.05,
          color: colorLight,
          arrow: 'barb',
          p1: [0, -1],
          p2: [2, -1],
          align: 'center',
        },
      },
      {
        name: 'velocity',
        make: 'collections.line',
        options: {
          width: 0.05,
          color: colorOne,
          arrow: { end: 'barb' },
          label: {
            text: 'v',
            offset: 0.04,
            style: 'italic',
            location: 'top',
            scale: 4,
          },
          p1: [4.2, 3],
          p2: [6.2, 3],
        },
      },
      {
        name: 'x0',
        make: 'collections.line',
        width: 0.05,
        arrow: { end: 'barb' },
        label: {
          text: { forms: { base: { sub: ['x', '1' ] } } },
          scale: 4,
          location: 'start',
        },
        color: colorPositionText,
        p1: [5, -3],
        p2: [5, -2],
      },
      {
        name: 'eqn',
        make: 'equation',
        color: colorGText,
        scale: 4,
        elements: {
          lb: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
          rb: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
          x_1: { color: colorPositionText },
        },
        formDefaults: {
          alignment: { xAlign: 'center' },
        },
        forms: {
          // 0: [{ sub: ['g', 'x'] }, { brac: ['lb', ['x_1', '_ , ', { sub: ['t', '_0'] }], 'rb'] }],
          0: ['g', { brac: ['lb', 'x_1', 'rb'] }],
        },
        position: [5, 2],
      },
      {
        name: 'eqn1',
        make: 'equation',
        color: colorPositionText,
        scale: 4,
        elements: {
          lb: { symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16 },
          rb: { symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16 },
          value: { text: '0.0', style: 'normal' },
          sign: { text: '+', style: 'normal' },
        },
        formDefaults: {
          alignment: { xAlign: 'center' },
        },
        forms: {
          0: ['g', { brac: ['lb', ['x_1', ' ' , 'sign', ' ', 'value'], 'rb'] }],
        },
        position: [5, 2],
      },
    ],
    mods: {
      scenarios: {
        default: { position: defaultPosition, scale: 1 },
        summary: { position: [2, 8], scale: 0.8 },
        right: { position: [9.5, 6], scale: 1 },
        top: { position: [10, 8.4], scale: 0.7 },
        mathx: { position: [7.5, 8.4], scale: 0.7 },
        bottom: { position: [10, 3], scale: 0.6 },
        rightSmall: { position: [10, 7], scale: 0.9 },
      },
    },
  });
  const medium = figure.getElement(stringName);
  const axis = medium.getElement('xAxis');
  // const ballSize = 0.02;
  const xValues = range(0, maxValue, ballSpace);
  const xValuesSmall = range(0, maxValue, ballSpace / 3);

  const balls = medium.getElement('balls');
  // const toFront = [];
  xValues.forEach((x, index) => {
    balls.add(ball(x, index, ballSize * (x === 0 ? 1 : 1)));
    const b = balls.getElement(`ball${index}`);
    b.custom.x = x;
    b.custom.drawX = axis.valueToDraw(x);
  });
  const highlights = xValues.map((x, i) => x % 2 === 0 && x > 0 ? i : -1).filter(i => i > -1).map(i => `ball${i}`);
  balls.toFront(highlights);
  const tracker = medium.add(ball(0, 'Tracker', ballSize));
  tracker.scenarios.default.color = color1;
  const movePad = medium.getElement('movePad');
  const firstBall = medium.getElement('firstBall');
  const envelope = medium.getElement('envelope');
  const eqn = medium.getElement('eqn');
  const eqn1 = medium.getElement('eqn1');
  const wavelength = medium.getElement('wavelength');
  const velocity = medium.getElement('velocity');
  const widthArrow = medium.getElement('widthArrow');
  let lastEnvelope = [];
  let lastEnvelopeNumVertices = 0;
  medium.custom = {
    f: 0.2,   // Current frequency of sine wave for medium
    c: 1,     // Propagation velocity of medium
    A,        // Amplitude of pulse or sine wave for medium
    axis,     // Make some elements easily available
    balls,
    tracker,
    wavelength,
    trackingTime: -10000,
    ball0: balls.getElement('ball0'),
    recording: new Recorder(maxValue / minVelocity),
    highlights,
    // xValues.filter((x, i) => (x % 1 === 0) && x > 0).map(x => `ball${x}`),
    // Update function gets the position of the movePad, then records it, and
    // updates all the particles with their current displacement.
    update: (deltaTime) => {
      // Get movePad displacement
      const y = movePad.transform.t().y;
      firstBall.setPosition(0, y);
      // Record the displacement
      medium.custom.recording.record(y, deltaTime);
      // Calculate the displacement of each particle and set it
      const envelopePoints = [];
      if (balls.isShown) {
        for (let i = 0; i < xValues.length; i += 1) {
          const b = balls[`_ball${i}`];
          const by = medium.custom.recording.getValueAtTimeAgo((b.custom.x) / medium.custom.c);
          b.setPosition(b.custom.drawX, by);
          if (envelope.isShown) {
            envelopePoints.push([b.custom.drawX, by]);
          }
        }
        // envelope.pointsToDraw = xValues.length * 6;
      } else if (envelope.isShown) {
        for (let i = 0; i < xValuesSmall.length; i += 1) {
          envelopePoints.push([xValuesSmall[i] / maxValue * length, medium.custom.recording.getValueAtTimeAgo(xValuesSmall[i] / medium.custom.c)]);
        }
      }
      if (envelope.isShown) {
        envelope.custom.updatePoints({ points: envelopePoints });
        envelope.pointsToDraw = envelope.drawingObject.points.length / 2;
        lastEnvelope = envelopePoints;
        lastEnvelopeNumVertices = envelope.drawingObject.points.length / 2;
        if (eqn.isShown) {
          let maxValue = envelopePoints[0].y;
          let x = 0;
          for (let i = 0; i < envelopePoints.length; i += 1) {
            if (envelopePoints[i].y > maxValue) {
              x = envelopePoints[i].x;
              maxValue = envelopePoints[i].y;
            }
          }
          if (maxValue > A / 2) {
            eqn.setPosition(x, maxValue + 0.5);
            eqn.setOpacity(1);
          } else {
            eqn.setOpacity(0);
          }
        }
        if (medium._envelope2.isShown) {
          let minValue = envelopePoints[0].y;
          let x = 0;
          for (let i = 0; i < envelopePoints.length; i += 1) {
            if (envelopePoints[i].y < minValue) {
              x = envelopePoints[i].x;
              minValue = envelopePoints[i].y;
            }
          }
          if (minValue < 0) {
            const newX = x + movePadEnv.custom.x / maxValue * length;
            eqn1.setPosition(
              Math.min(Math.max(0, newX), length),
              minValue - 1,
            );
            eqn1.setOpacity(1);
          } else {
            eqn1.setOpacity(0);
          }
        }
      }

      // If the tracker is being used, then calculate its current position and
      // place it there
      if (tracker.isShown) {
        // The space between particles in seconds (from the velocity)
        const ballSpaceTime = axis.drawToValue(ballSize * 2) / medium.custom.c;
        // Quantize the space so the tracker particle can only exist on an
        // existing particle and not between
        // const t = Math.floor(
        //   (time.now() + medium.custom.trackingTime) / ballSpaceTime,
        // ) * ballSpaceTime;
        const t = time.now() + medium.custom.trackingTime;
        // console.log(time.now(), t)
        // If the tracker is within the axis, then position it appropriately,
        // otherwise position it way off
        const xValue = Math.max(t * medium.custom.c, 0);
        const x = axis.valueToDraw(xValue);
        if (t > 0 && axis.inAxis(xValue + 0.2)) {
          const by = medium.custom.recording.getValueAtTimeAgo(t);
          tracker.setPosition(x, by);
        } else {
          tracker.setPosition(100, 0);
        }
      }
    },
    stop: () => {
      medium.stop();
      movePad.animations.cancel('_noStop_disturb_');
    },
    reset: () => {
      medium.custom.stop();
      movePad.setPosition(0, 0);
      medium.custom.recording.reset(0);
    },
    setVelocity: (velocity) => {
      medium.custom.c = velocity;
    },
    setFrequency: (frequency) => {
      medium.custom.f = frequency;
    },
    // drawEnvelope: () => {
    //   envelope.stop();
    //   envelope.animations.new()
    //     .custom({
    //       callback: (p) => {
    //         envelope.pointsToDraw = Math.floor(envelope.drawingObject.numVertices / 6 * p) * 6;
    //       },
    //       duration: 2,
    //     })
    //     .start();
    // },
    // Find the minimum of the displayed sine curve and position the
    // wavelength arrow annotation to align with it.
    setWavelengthPosition: (deltaX = 0) => {
      const t = time.now();
      const x0Phase = (2 * Math.PI * medium.custom.f * t) % (2 * Math.PI);
      const lambda = medium.custom.c / medium.custom.f;
      const wavelengthDraw = axis.valueToDraw(lambda);
      const wavelengthStartPhase = Math.PI / 2;
      let deltaPhase = Math.PI * 2 - (wavelengthStartPhase - x0Phase);
      if (x0Phase > wavelengthStartPhase) {
        deltaPhase = x0Phase - wavelengthStartPhase;
      }
      const xDistanceToStart = deltaPhase / Math.PI / 2 * lambda;
      const xDraw = axis.valueToDraw(xDistanceToStart) + deltaX;
      wavelength.setEndPoints([xDraw, A], [xDraw + wavelengthDraw, A]);
    },
    setWidthArrow: (x0, x1, y) => {
      const x0Draw = axis.valueToDraw(x0);
      const x1Draw = axis.valueToDraw(x1);
      widthArrow.setEndPoints([x0Draw, y], [x1Draw, y]);
    },
    movePad,
  };
  medium.backupState = medium._state;
  medium._state = (options) => {
    medium.customState.recorder = medium.custom.recording.encodeData();
    return medium.backupState(options);
  };
  medium.backupStateSet = medium.stateSet;
  medium.stateSet = () => {
    medium.backupStateSet();
    console.log(medium.customState.recorder);
    medium.custom.recording.loadEncodedData(medium.customState.recorder[0], medium.customState.recorder[1]);
  }
  figure.fnMap.global.add('showEnvelope', () => {
    envelope.show();
    envelope.stop();
      envelope.animations.new()
        .custom({
          callback: (p) => {
            envelope.pointsToDraw = Math.floor(envelope.drawingObject.numVertices / 6 * p) * 6;
          },
          duration: 2,
        })
        .start();
  });
  figure.fnMap.global.add('copyEnvelope', () => {
    console.log('copied')
    medium._envelope2.custom.updatePoints({ points: lastEnvelope });
    medium._envelope2.pointsToDraw = lastEnvelopeNumVertices;
    movePadEnv.custom.x = 0;
    medium._envelope2.custom.lastPoints = lastEnvelope;
  })
  figure.fnMap.global.add('showWavelength', () => {
    medium.custom.setWavelengthPosition(0);
    wavelength.animations.new().dissolveIn(0.5).start();
  });
  figure.fnMap.global.add('hideWavelength', () => {
    wavelength.animations.new().dissolveOut(0.5).start();
  });
  figure.fnMap.global.add('showVelocity', () => {
    velocity.animations.new().dissolveIn(0.5).start();
  });
  figure.fnMap.global.add('hideVelocity', () => {
    velocity.animations.new().dissolveOut(0.5).start();
  });
  movePad.notifications.add('setTransform', () => {
    if (maxTimeReached) {
      return;
    }
    // If the movePad has been manually moved, then stop current animations
    if (movePad.state.isBeingMoved && movePad.isAnimating()) {
      medium.custom.stop();
    }
    unpause();
  });
  const movePadEnv = medium.get('movePadEnv');
  movePadEnv.notifications.add('setTransform', (t) => {
    if (time.isPaused()) {
      const x = movePadEnv.getPosition().x - length / 2;
      movePadEnv.custom.x += x;
      const envelopePoints = [];
      for (let i = 0; i < xValuesSmall.length; i += 1) {
        const tAgo = xValuesSmall[i] / medium.custom.c - movePadEnv.custom.x
        const y = medium.custom.recording.getValueAtTimeAgo(Math.max(tAgo, 0));
        envelopePoints.push([xValuesSmall[i] / maxValue * length, y]);
      }
      // console.log(movePad)
      // const newEnvelope = lastEnvelope.map(p => p.add(movePadEnv.custom.x, 0));
      medium._envelope2.custom.updatePoints({ points: envelopePoints });
      movePadEnv.transform.updateTranslation(length / 2, 0);
      // if (medium._envelope2.isShown) {
      const sign = movePadEnv.custom.x > 0 ? '\u2212' : '+';
      eqn1.updateElementText({
        value: `${Math.abs(Fig.tools.math.round(movePadEnv.custom.x * 2, 1)).toFixed(1)}`,
        sign: sign,
      }, 'current');
      // }
    }
  });
  // const velocity = medium._velocity;
  figure.fnMap.global.add('growV', () => {
    velocity.showAll();
    velocity._label.hide();
    velocity.animations.new()
      .length({ start: 0.5, target: 2, duration: 1 })
      .dissolveIn({ element: 'label' })
      .start();
  });
  // const widthArrow = medium._widthArrow;
  figure.fnMap.global.add('growWA', () => {
    widthArrow.showAll();
    widthArrow.animations.new()
      .length({ start: 0.5, target: 7.8, duration: 1 })
      // .dissolveIn({ element: 'label' })
      .start();
  });
  figure.fnMap.global.add('growWASmall', () => {
    widthArrow.showAll();
    widthArrow.animations.new()
      .length({ start: 0.5, target: 3.9, duration: 1 })
      // .dissolveIn({ element: 'label' })
      .start();
  });
  return medium;
}
