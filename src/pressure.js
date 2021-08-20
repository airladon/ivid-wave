/* globals Fig, figure, colorWave, colorLight, arrow, unpause */

// eslint-disable-next-line no-unused-vars
function addPressureMedium(
  name, length, height, particleSize, gridStep, recorder,
) {
  const vertexShader = `
attribute vec2 a_position;
attribute float a_offset;
uniform mat3 u_matrix;
uniform float u_time;
varying float v_col;
// uniform float u_highlight;
void main() {
  float x = a_position.x + a_offset;
  float y = a_position.y;
  gl_Position = vec4((u_matrix * vec3(x, y, 1)).xy, 0, 1);
  v_col = 0.0;
  // if (u_highlight > 0.0) {
  //   if (mod(a_position.x, 7.2) == 0.0) {
  //     v_col = 1.0;
  //   }
  // }
  if (a_position.x < 0.25) {
    v_col = 2.0;
  }
}`;
  const fragmentShader = `
precision mediump float;
uniform vec4 u_color;
varying float v_col;
void main() {
  if (v_col > 0.0) {
    gl_FragColor = vec4(0, 0.5, 1, u_color.a);
  }
  if (v_col > 1.0) {
    gl_FragColor = vec4(1, 0, 0, u_color.a);
  }
  if (v_col == 0.0) {
    gl_FragColor = u_color;
  }
  gl_FragColor.rgb *= gl_FragColor.a;
}`;

  const points = [];
  const sides = 10;
  const step = Math.PI * 2 / (sides);
  const offsets = [];
  const xLocations = [];
  for (let x = 0; x <= length; x += gridStep) {
    const r = particleSize;
    for (let y = -height / 2; y <= height / 2; y += gridStep) {
      const x1 = x;
      const y1 = y;
      for (let j = 0; j < sides; j += 1) {
        points.push(x1, y1);
        points.push(r * Math.cos(step * j) + x1, r * Math.sin(step * j) + y1);
        points.push(r * Math.cos(step * (j + 1)) + x1, r * Math.sin(step * (j + 1)) + y1);
        offsets.push(0, 0, 0);
        xLocations.push(x1);
      }
    }
  }
  const centers = [
    new Fig.Point(7.2, height / 2 - gridStep * 5),
  ];
  const addCircle = (nameIn, index) => {
    const position = Fig.getPoint([centers[index], centers[index + 1]]);
    const radius = ((position.y + 2) * (position.y + 2)) / 25;
    return {
      name: nameIn,
      make: 'polygon',
      sides: 20,
      position,
      radius,
      // line: { width: 0.04 },
      color: colorWave,
    };
  };
  const medium = figure.add({
    name,
    make: 'collection',
    mods: {
      scenarios: {
        default: { position: [3, 6], scale: 1 },
        summary: { position: [2, 3], scale: 0.58 },
      },
    },
    elements: [
      {
        name: 'grid',
        make: 'grid',
        bounds: [0, -height * 1.5, length, height * 3],
        line: { width: 0.03 },
        xStep: length / 20,
        yStep: length / 20,
      },
      arrow('waveDirection', 'wave', [12, -1.7], [16, -1.7], colorWave, 'bottom', 'start', { end: 'barb' }, 3),
      arrow('disturbanceDirection', 'disturbance', [5.2, -1.7], [9.2, -1.7], colorWave, 'bottom', 'center', 'barb', 3),
      {
        name: 'particles',
        make: 'gl',
        vertexShader: {
          src: vertexShader,
          vars: ['a_position', 'a_offset', 'u_matrix'],
        },
        fragShader: {
          src: fragmentShader,
          vars: ['u_color'],
        },
        // Define buffers and uniforms
        vertices: { data: points },
        buffers: [{
          name: 'a_offset', data: offsets, size: 1, usage: 'DYNAMIC',
        }],
        // Element color and mods
        color: colorLight,
      },
      addCircle('c6', 6),
      {
        name: 'diaphragm',
        make: 'rectangle',
        height: height * 1.2,
        width: 0.5,
        color: [1, 0, 0, 1],
        corner: { radius: 0.2, sides: 5 },
      },
      {
        name: 'movePad',
        make: 'rectangle',
        height: height * 1.2,
        width: 4,
        color: [0, 0, 1, 0],
        mods: {
          isMovable: true,
          move: {
            bounds: {
              translation: {
                left: -0.5, right: 0.5, bottom: 0, top: 0,
              },
            },
          },
        },
      },
    ],
  });
  const movePad = medium._movePad;
  const c6 = medium.get('c6');
  medium.customState = {
    c: 2,
  };
  medium.custom = {
    // c: 2,
    A: 0.5,
    f: 0.2,
    movePad,
    recording: recorder,
    update: (deltaTime) => {
      const newOffsets = Array(offsets.length);
      let x;
      if (medium.custom.recording.getState().mode === 'manual') {
        x = movePad.transform.t().x;
        medium.custom.recording.record(x, deltaTime);
      } else {
        x = medium.custom.recording.getValueAtTimeAgo(0) / 3;
        movePad.transform.updateTranslation(x, 0);
      }
      medium._diaphragm.setPosition(x, 0);
      for (let i = 0; i < xLocations.length; i += 1) {
        let xOffset = medium.custom.recording.getValueAtTimeAgo(
          xLocations[i] / medium.customState.c,
        );
        if (medium.custom.recording.getState().mode !== 'manual') {
          xOffset /= 3;
        }
        newOffsets[i * 3] = xOffset;
        newOffsets[i * 3 + 1] = xOffset;
        newOffsets[i * 3 + 2] = xOffset;
      }
      if (c6.isShown) {
        let xOffset = medium.custom.recording.getValueAtTimeAgo(7.2 / medium.customState.c);
        if (medium.custom.recording.getState().mode !== 'manual') {
          xOffset /= 3;
        }
        // c1.setPosition(centers[0].add(xOffset, 0));
        c6.setPosition(centers[0].add(xOffset, 0));
        // c3.setPosition(centers[2].add(xOffset, 0));
      }
      medium._particles.drawingObject.updateBuffer('a_offset', newOffsets);
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
      medium.customState.c = velocity;
    },
    setFrequency: (frequency) => {
      medium.custom.f = frequency;
    },
  };
  movePad.notifications.add('setTransform', () => {
    if (movePad.state.isBeingMoved && movePad.isAnimating()) {
      medium.custom.stop();
    }
    unpause();
    medium.custom.recording.setManual();
    figure.fnMap.exec('forceUpdate');
  });
  return medium;
}
