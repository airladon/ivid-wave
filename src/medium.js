/*
globals figure, colorPosition, time, colorGText,
colorLight, maxTimeReached, unpause, Transform, range, xAxis, yAxis,
arrow, Fig, colorYellow, colorDisturbance, colorWave, colorHighlight,
*/

/* eslint-disable camelcase, object-curly-newline */

// eslint-disable-next-line no-unused-vars
function addMedium(
  stringName, length, maxValue, A, defaultPosition, yAxisTitle, ballSize, ballSpace, recorder,
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
        highlight: { color: colorWave, scale: [1.2, 1.2] },
      },
    },
  });
  figure.add({
    name: stringName,
    make: 'collection',
    transform: new Transform().scale(1, 1).translate(0, 0),
    elements: [
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
        name: 'balls',
        make: 'collection',
        options: {
          transform: new Transform(),
        },
      },
      {
        name: 'envelope2',
        make: 'polyline',
        width: 0.15,
        color: colorYellow,
        simple: true,
      },
      {
        name: 'envelope',
        make: 'polyline',
        width: 0.15,
        color: colorDisturbance,
        simple: true,
        mods: {
          dimColor: colorLight,
        },
      },
      {
        name: 'periodicEnvelope',
        make: 'polyline',
        width: 0.15,
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
      {
        name: 'marker',
        make: 'rectangle',
        options: {
          width: 0.05,
          color: colorHighlight,
          height: A * length / maxValue * 2,
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
            font: { color: colorPosition },
          },
          p1: [100, 0],
          p2: [101, 0],
        },
      },
      {
        name: 'xDashLine',
        make: 'collections.line',
        width: 0.06,
        // dash: [0.2, 0.1],
        p1: [4.29, -1.8],
        p2: [4.29, -3.7],
        color: colorLight,
        arrow: { start: { head: 'barb' } },
        label: {
          text: 'x\'',
          location: 'end',
          scale: 4,
          font: { color: colorLight },
        },
      },
      {
        name: 'xDashLineG',
        make: 'collections.line',
        width: 0.06,
        // dash: [0.2, 0.1],
        arrow: { start: { head: 'barb' } },
        p1: [1.69, -1.8],
        p2: [1.69, -3.7],
        label: {
          text: 'x\' \u2212 4',
          location: 'end',
          scale: 3.8,
          font: { color: colorLight },
        },
        color: colorLight,
      },
      arrow('vArrow', '6', [0, -1], [3 / maxValue * length, -1], colorLight),
      arrow('v2Arrow', '12', [0, -1], [6 / maxValue * length, -1], colorLight),
      arrow('lambdaArrow', '', [1.2 / maxValue * length, -2.5], [6.3 / maxValue * length, -2.5], colorLight),
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
          color: colorYellow,
          arrow: { end: 'barb' },
          label: {
            text: 'v',
            offset: 0.04,
            style: 'italic',
            location: 'top',
            scale: 4,
          },
          p1: [4.2, 4],
          p2: [7.2, 4],
        },
      },
      {
        name: 'propogation',
        make: 'collections.line',
        options: {
          width: 0.05,
          color: colorYellow,
          arrow: { end: 'barb' },
          p1: [5, 4],
          p2: [7, 4],
        },
      },
      {
        name: 'x0',
        make: 'collections.line',
        width: 0.05,
        arrow: { end: 'barb' },
        label: {
          text: { forms: { base: { sub: ['x', '1'] } } },
          scale: 4,
          location: 'start',
        },
        color: colorPosition,
        p1: [5, -3],
        p2: [5, -2],
      },
      arrow('waveDirection', 'wave', [4.5, -A * length / maxValue / 5 * 2], [8.5, -A * length / maxValue / 5 * 2], colorWave, 'end', 'start', { end: 'barb' }, 3),
      arrow('disturbanceDirection', 'disturbance', [5 / maxValue * length, -A * length / maxValue / 5 * 3], [5 / maxValue * length, A * length / maxValue / 5 * 3], colorWave, 'start', 'center', 'barb', 3),
      {
        name: 'eqn',
        make: 'equation',
        color: colorDisturbance,
        dimColor: colorLight,
        scale: 4,
        elements: {
          lb: {
            symbol: 'bracket', side: 'left', lineWidth: 0.07, width: 0.16,
          },
          rb: {
            symbol: 'bracket', side: 'right', lineWidth: 0.07, width: 0.16,
          },
          // x_1: { color: colorPosition },
        },
        formDefaults: {
          alignment: { xAlign: 'center' },
        },
        forms: {
          0: ['g', { brac: ['lb', 'x_1', 'rb'] }],
        },
        position: [5, 2],
      },
      {
        name: 'eqn1',
        make: 'equation',
        color: colorYellow,
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
          0: ['g', { brac: ['lb', ['x_1', ' ', 'sign', ' ', 'value'], 'rb'] }],
        },
        position: [5, 2],
      },
      {
        name: 'ballTracker',
        make: 'arrow',
        align: 'tip',
        angle: Math.PI / 2,
        head: 'triangle',
        width: 0.4,
        length: 0.5,
        tail: 0.2,
        tailWidth: 0.2,
        color: colorDisturbance,
      },
    ],
    mods: {
      scenarios: {
        default: { position: defaultPosition, scale: 1 },
        summary: { position: [2, 6], scale: 0.85 },
        right: { position: [9.5, 6], scale: 1 },
        eqn: { position: [10, 8.4], scale: 0.7 },
        mathx: { position: [7.5, 8.4], scale: 0.7 },
        bottom: { position: [10, 3], scale: 0.6 },
        rightSmall: { position: [10, 7], scale: 0.9 },
        one: { position: [7, 4], scale: 0.75 },
      },
    },
  });
  // stamp('medium 3');
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
  const ballH = medium.add(ball(5 / maxValue * length, 'h', ballSize * 1.5));
  ballH.custom.drawX = axis.valueToDraw(5);
  ballH.scenarios.default.color = colorWave.slice();

  // eslint-disable-next-line
  const highlights = xValues.map((x, i) => ((x % 2 === 0) && (x > 0)) ? i : -1).filter(i => i > -1).map(i => `ball${i}`);
  balls.toFront(highlights);
  const tracker = medium.getElement('ballTracker');
  const movePad = medium.getElement('movePad');
  const firstBall = medium.getElement('firstBall');
  const envelope = medium.getElement('envelope');
  const envelope2 = medium.getElement('envelope2');
  const periodicEnvelope = medium.getElement('periodicEnvelope');
  const eqn = medium.getElement('eqn');
  const eqn1 = medium.getElement('eqn1');
  const wavelength = medium.getElement('wavelength');
  const velocity = medium.getElement('velocity');
  const widthArrow = medium.getElement('widthArrow');
  const movePadEnv = medium.get('movePadEnv');
  const propogation = medium.get('propogation');
  let lastEnvelope = [];
  let lastEnvelopeNumVertices = 0;
  medium.customState = {
    f: 0.2,   // Current frequency of sine wave for medium
    c: 1,     // Propagation velocity of medium
    trackingTime: -10000,
  };
  medium.custom = {
    A,        // Amplitude of pulse or sine wave for medium
    axis,     // Make some elements easily available
    balls,
    tracker,
    wavelength,
    ball0: balls.getElement('ball0'),
    recording: recorder,
    highlights,
    updateEqn1: () => {
      const sign = movePadEnv.customState.x > 0 ? '\u2212' : '+';
      eqn1.updateElementText({
        value: `${Math.abs(Fig.tools.math.round(movePadEnv.customState.x / length * maxValue * 2, 1)).toFixed(1)}`,
        sign,
        x_1: 'x',
      }, 'current');
    },
    // Update function gets the position of the movePad, then records it, and
    // updates all the particles with their current displacement.
    update: (deltaTime) => {
      // Get movePad displacement
      // const y = movePad.transform.t().y;
      let y;
      // Record the displacement
      if (medium.custom.recording.getState().mode === 'manual') {
        y = movePad.transform.t().y;
        medium.custom.recording.record(y, deltaTime);
      } else {
        y = medium.custom.recording.getValueAtTimeAgo(0);
        movePad.transform.updateTranslation(0, y);
      }
      firstBall.setPosition(0, y);
      // Calculate the displacement of each particle and set it
      const envelopePoints = [];
      if (balls.isShown) {
        for (let i = 0; i < xValues.length; i += 1) {
          const b = balls[`_ball${i}`];
          const by = medium.custom.recording.getValueAtTimeAgo((b.custom.x) / medium.customState.c);
          b.setPosition(b.custom.drawX, by);
        }
      }
      if (ballH.isShown) {
        const by = medium.custom.recording.getValueAtTimeAgo(5 / medium.customState.c);
        ballH.setPosition(ballH.custom.drawX, by);
      }
      if (envelope.isShown) {
        for (let i = 0; i < xValuesSmall.length; i += 1) {
          envelopePoints.push([
            xValuesSmall[i] / maxValue * length,
            medium.custom.recording.getValueAtTimeAgo(xValuesSmall[i] / medium.customState.c),
          ]);
        }
        // if (envelope.isShown) {
        envelope.custom.updatePoints({ points: envelopePoints });
        envelope.pointsToDraw = envelope.drawingObject.points.length / 2;
        lastEnvelope = envelopePoints;
        lastEnvelopeNumVertices = envelope.drawingObject.points.length / 2;
        if (eqn.isShown) {
          let max = envelopePoints[0].y;
          let x = 0;
          for (let i = 0; i < envelopePoints.length; i += 1) {
            if (envelopePoints[i].y > max) {
              x = envelopePoints[i].x;
              max = envelopePoints[i].y;
            }
          }
          if (max > A / 2) {
            eqn.setPosition(x, max + 0.5);
            if (eqn.opacity === 0) {
              eqn.setOpacity(1);
            }
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
          const newX = x + movePadEnv.customState.x / maxValue * length;
          const minNewX = Math.min(Math.max(0, newX / length * maxValue), length);
          if (minValue < 0) {
            eqn1.setPosition(
              minNewX,
              minValue - 1,
            );
            const a2 = figure.get('arrow2');
            if (a2.isShown) {
              a2.setPosition(eqn1._sign.getPositionInBounds('figure', 'center', 'bottom').sub(0, 0.7));
              a2.setRotation(Math.PI / 2);
            }
            // }
            if (eqn1.opacity === 0) {
              eqn1.setOpacity(1);
            }
          } else {
            eqn1.setOpacity(0);
          }
        }
      }
      if (envelope2.isShown) {
        const envelope2Points = [];
        for (let i = 0; i < xValuesSmall.length; i += 1) {
          const tAgo = xValuesSmall[i] / medium.customState.c
            - movePadEnv.customState.x / length * maxValue / medium.customState.c;
          const yVal = medium.custom.recording.getValueAtTimeAgo(Math.max(tAgo, 0));
          envelope2Points.push([xValuesSmall[i] / maxValue * length, yVal]);
        }
        medium._envelope2.custom.updatePoints({ points: envelope2Points });
      }
      if (periodicEnvelope.isShown) {
        const threeSLength = medium.customState.c * 3;
        const numParticles = threeSLength / ballSpace;
        periodicEnvelope.custom.updatePoints({
          points: envelopePoints.slice(numParticles, numParticles * 2),
        });
        periodicEnvelope.pointsToDraw = periodicEnvelope.drawingObject.points.length / 2;
      }

      // If the tracker is being used, then calculate its current position and
      // place it there
      if (tracker.isShown) {
        const tt = time.now() - medium.customState.trackingTime;
        // If the tracker is within the axis, then position it appropriately,
        // otherwise position it way off
        const xValue = Math.max(tt * medium.customState.c, 0);
        const x = axis.valueToDraw(xValue);
        if (tt > 0.1 && axis.inAxis(xValue) && x < length) {
          tracker.setPosition(x, -0.2);
        } else {
          tracker.setPosition(100, 0);
        }
      }
      if (eqn1.isShown) {
        medium.custom.updateEqn1();
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
      for (let i = 0; i < xValues.length; i += 1) {
        const b = balls[`_ball${i}`];
        b.setPosition(b.custom.drawX, 0);
      }
    },
    setVelocity: (v) => {
      medium.customState.c = v;
    },
    setFrequency: (frequency) => {
      medium.customState.f = frequency;
    },
    // Find the minimum of the displayed sine curve and position the
    // wavelength arrow annotation to align with it.
    setWavelengthPosition: (deltaX = 0) => {
      // const t = time.now();
      const x0Phase = (2 * Math.PI * medium.customState.f * time.now()) % (2 * Math.PI);
      const lambda = medium.customState.c / medium.customState.f;
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
  // stamp('medium 6');
  medium.backupState = medium._state;
  medium._state = (options) => {
    medium.customState.recorder = medium.custom.recording.encodeData();
    medium.customState.recorderState = medium.custom.recording.getState();
    medium.customState.timeState = time.getState();
    return medium.backupState(options);
  };
  medium.backupStateSet = medium.stateSet;
  medium.stateSet = () => {
    medium.backupStateSet();
    if (medium.customState.recorderState != null) {
      medium.custom.recording.setState(medium.customState.recorderState);
    }
    if (medium.customState.timeState != null) {
      time.setState(medium.customState.timeState);
    }
    if (medium.customState.recorder != null) {
      medium.custom.recording.loadEncodedData(
        medium.customState.recorder[0], medium.customState.recorder[1],
      );
    }
  };
  figure.fnMap.global.add('showEnvelope', () => {
    envelope.show();
    envelope.stop();
    medium.custom.update(0);
    // console.log('showEnvelope');
    envelope.animations.new()
      .custom({
        callback: (p) => {
          envelope.pointsToDraw = Math.floor(envelope.drawingObject.numVertices / 6 * p) * 6;
          // console.log(p, envelope.pointsToDraw)
        },
        duration: 2,
      })
      .start();
  });
  figure.fnMap.global.add('copyEnvelope', () => {
    // console.log('copied')
    if (lastEnvelope.length > 0) {
      medium._envelope2.custom.updatePoints({ points: lastEnvelope });
      medium._envelope2.pointsToDraw = lastEnvelopeNumVertices;
      medium._envelope2.custom.lastPoints = lastEnvelope;
    }
  });
  figure.fnMap.global.add('copyEnvelopeReset', () => {
    // console.log('copied')
    medium._envelope2.custom.updatePoints({ points: lastEnvelope });
    medium._envelope2.pointsToDraw = lastEnvelopeNumVertices;
    movePadEnv.customState.x = 0;
    medium._envelope2.custom.lastPoints = lastEnvelope;
  });
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
    // const y = movePad.getPosition().y;
    //   medium.custom.recording.record(y, time.step());
    unpause();
    const currentMode = medium.custom.recording.getState().mode;
    medium.custom.recording.setManual();
    if (currentMode !== 'manual') {
      medium.customState.trackingTime = 0;
      time.reset();
    }
    figure.fnMap.exec('forceUpdate');
  });
  movePadEnv.notifications.add('setTransform', () => {
    if (time.isPaused()) {
      const x = movePadEnv.getPosition().x - length / 2;
      movePadEnv.customState.x += x;
      movePadEnv.transform.updateTranslation(length / 2, 0);
      medium.custom.updateFlag = true;
    }
  });
  // const velocity = medium._velocity;
  figure.fnMap.global.add('growV', () => {
    velocity.showAll();
    velocity._label.hide();
    velocity.animations.new()
      .length({ start: 0.5, target: 5, duration: 3 })
      .dissolveIn({ element: 'label' })
      .start();
  });
  figure.fnMap.global.add('growV2', () => {
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
  figure.fnMap.global.add('growPropagation', () => {
    propogation.showAll();
    propogation.animations.new()
      .length({ start: 0.5, target: 3, duration: 2 })
      // .dissolveIn({ element: 'label' })
      .start();
  });
  // stamp('medium 7');

  const marker = medium._marker;
  medium.custom.updateMarker = (p) => {
    const initialDisturbance = time.now() - medium.customState.trackingTime;
    const initialDisturbanceDistance = initialDisturbance / 10 * length;
    if (initialDisturbance < 10) {
      marker.transform.updateTranslation(
        Math.max(initialDisturbanceDistance - p * length, 0),
        0,
      );
    } else {
      marker.transform.updateTranslation(10 - p * length, 0);
    }
  };
  marker.notifications.add('setTransform', () => {
    const initialDisturbance = time.now() - medium.customState.trackingTime;
    const initialDisturbanceDistance = initialDisturbance / 10 * length;
    let p;
    const { x } = marker.getPosition('local');
    if (initialDisturbance < 10) {
      p = Math.max((initialDisturbanceDistance - x) / length, 0);
    } else {
      p = 1 - (marker.getPosition('local').x / length);
    }
    figure.get('timePlot1').custom.updateMarker(p);
  });

  return medium;
}
