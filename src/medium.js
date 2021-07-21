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
      color: color1,
      position: [x, 0],
    },
    mods: {
      dimColor: color2,
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
        bounds: [0, -1, length - 0.08, 2],
        xStep: 0.25,
        yStep: 0.25,
      },
      xAxis('xAxis', 'x', '', length, maxValue),
      yAxis('yAxis', 'y', '', A, yAxisTitle),
      {
        name: 'balls',
        make: 'collection',
        options: {
          transform: new Transform(),
        },
      },
      // movePad moves the first particle in the medium
      {
        name: 'movePad',
        make: 'primitives.polygon',
        radius: 0.4,
        sides: 8,
        color: [1, 0, 0, 0],
        touch: true,
        mods: {
          isMovable: true,
          move: {
            bounds: {
              p1: [0, -A],
              p2: [0, A],
              ends: 2,
            },
          },
        },
      },
      // Arrowed line showing a wavelength of a sine wave
      {
        name: 'wavelength',
        make: 'collections.line',
        options: {
          width: 0.01,
          color: color1,
          arrow: 'barb',
          label: {
            text: '\u03bb',
            offset: 0.04,
            location: 'bottom',
          },
          p1: [100, 0],
          p2: [101, 0],
        },
      },
    ],
    mods: {
      scenarios: {
        default: { position: defaultPosition, scale: 1 },
        title: { position: [-2, 0.9], scale: 1 },
        small: { position: [0.1, 1.5], scale: 1 },
      },
    },
  });
  const medium = figure.getElement(stringName);
  const axis = medium.getElement('xAxis');
  // const ballSize = 0.02;
  const xValues = range(0, length - 0.1, ballSpace);
  const balls = medium.getElement('balls');
  xValues.forEach((x, index) => {
    balls.add(ball(x, index, ballSize * (x === 0 ? 2 : 1)));
    const b = balls.getElement(`ball${index}`);
    b.custom.x = axis.drawToValue(x);
    b.custom.drawX = x;
    if (index === 0) { b.setColor(color0); }
  });
  balls.toFront(['ball0', 'ball40', 'ball20', 'ball60', 'ball80']);
  const tracker = medium.add(ball(0, 'Tracker', ballSize));
  tracker.setColor(color3);
  const movePad = medium.getElement('movePad');
  const wavelength = medium.getElement('wavelength');
  medium.custom = {
    f: 0.2,   // Current frequency of sine wave for medium
    c: 0.2,     // Propagation velocity of medium
    A,        // Amplitude of pulse or sine wave for medium
    axis,     // Make some elements easily available
    balls,
    tracker,
    wavelength,
    trackingTime: -10000,
    ball0: balls.getElement('ball0'),
    recording: new Recorder(maxValue / minVelocity),
    // Update function gets the position of the movePad, then records it, and
    // updates all the particles with their current displacement.
    update: (deltaTime) => {
      // Get movePad displacement
      const y = movePad.transform.t().y;
      // Record the displacement
      medium.custom.recording.record(y, deltaTime);

      // Calculate the displacement of each particle and set it
      for (let i = 0; i < xValues.length; i += 1) {
        const b = balls[`_ball${i}`];
        const by = medium.custom.recording.getValueAtTimeAgo((b.custom.x) / medium.custom.c);
        b.setPosition(b.custom.drawX, by);
      }

      // If the tracker is being used, then calculate its current position and
      // place it there
      if (tracker.isShown) {
        // The space between particles in seconds (from the velocity)
        const ballSpaceTime = axis.drawToValue(ballSize * 2) / medium.custom.c;
        // Quantize the space so the tracker particle can only exist on an
        // existing particle and not between
        const t = Math.floor(
          (time.now() + medium.custom.trackingTime) / ballSpaceTime,
        ) * ballSpaceTime;

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
    // Find the minimum of the displayed sine curve and position the
    // wavelength arrow annotation to align with it.
    setWavelengthPosition: (deltaX = 0) => {
      const t = time.now();
      const x0Phase = (2 * Math.PI * medium.custom.f * t) % (2 * Math.PI);
      const lambda = medium.custom.c / medium.custom.f;
      const wavelengthDraw = axis.valueToDraw(lambda);
      const wavelengthStartPhase = Math.PI / 2 * 3;
      let deltaPhase = Math.PI * 2 - (wavelengthStartPhase - x0Phase);
      if (x0Phase > wavelengthStartPhase) {
        deltaPhase = x0Phase - wavelengthStartPhase;
      }
      const xDistanceToStart = deltaPhase / Math.PI / 2 * lambda;
      const xDraw = axis.valueToDraw(xDistanceToStart) + deltaX;
      wavelength.setEndPoints([xDraw, -A], [xDraw + wavelengthDraw, -A]);
    },
    movePad,
  };
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
