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
        name: 'balls',
        make: 'collection',
        options: {
          transform: new Transform(),
        },
      },
      // movePad moves the first particle in the medium
      {
        name: 'envelope',
        make: 'polyline',
        width: 0.1,
        color: color1,
      },
      {
        name: 'firstBall',
        make: 'primitives.polygon',
        radius: 0.2,
        sides: 40,
        color: [1, 0, 0, 1],
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
          color: colorOne,
          arrow: 'barb',
          label: {
            text: '\u03bb',
            offset: 0.04,
            location: 'top',
            scale: 4,
          },
          p1: [100, 0],
          p2: [101, 0],
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
          p1: [10, 1.5],
          p2: [12, 1.5],
        },
      },
    ],
    mods: {
      scenarios: {
        default: { position: defaultPosition, scale: 1 },
        summary: { position: [2, 6], scale: 0.8 },
      },
    },
  });
  const medium = figure.getElement(stringName);
  const axis = medium.getElement('xAxis');
  // const ballSize = 0.02;
  const xValues = range(0, maxValue, ballSpace);

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
  const wavelength = medium.getElement('wavelength');
  const velocity = medium.getElement('velocity');
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
      for (let i = 0; i < xValues.length; i += 1) {
        const b = balls[`_ball${i}`];
        const by = medium.custom.recording.getValueAtTimeAgo((b.custom.x) / medium.custom.c);
        b.setPosition(b.custom.drawX, by);
        if (envelope.isShown) {
          envelopePoints.push([b.custom.drawX, by]);
        }
      }
      if (envelope.isShown) {
        envelope.custom.updatePoints({ points: envelopePoints });
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
    movePad,
  };
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
  return medium;
}
