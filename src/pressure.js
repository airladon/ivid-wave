
function addPressureMedium(
  name, length, height, particleSize, gridStep,
) {
  const vertexShader = `
attribute vec2 a_position;
attribute float a_offset;
uniform mat3 u_matrix;
uniform float u_time;
void main() {
  float x = a_position.x + a_offset;
  float y = a_position.y;
  gl_Position = vec4((u_matrix * vec3(x, y, 1)).xy, 0, 1);
}`;

  const points = [];
  const sides = 10;
  const step = Math.PI * 2 / (sides);
  const r = particleSize;
  const offsets = [];
  const xLocations = [];
  for (let x = 0; x <= length; x += gridStep) {
    for (let y = -height / 2; y <= height / 2; y += gridStep) {
      // const x1 = x + Fig.tools.math.rand(-gridStep / 30, gridStep / 30);
      // const y1 = y + Fig.tools.math.rand(-gridStep / 30, gridStep / 30);
      const x1 = x;
      const y1 = y;
      for (let j = 0; j < sides; j += 1) {
        points.push(x1, y1);
        points.push(r * Math.cos(step * j) + x1, r * Math.sin(step * j) + y1);
        points.push(r * Math.cos(step * (j + 1)) + x1, r * Math.sin(step * (j + 1)) + y1);
        offsets.push(0, 0, 0);
        xLocations.push(x1);
        // velocities.push(v[0], v[1], v[0], v[1], v[0], v[1]);
      }
      // particles.push(x, y);
    }
  }
  console.log([offsets]);
  const medium = figure.add({
    name,
    make: 'collection',
    elements: [
      {
        name: 'particles',
        make: 'gl',
        // Define the custom shader and variables (u_matrix is the element transform
        // matrix)
        vertexShader: {
          src: vertexShader,
          vars: ['a_position', 'a_offset', 'u_matrix'],
        },
        // vertexShader: 'simple',
        // Build in shader with one color for all vertices
        fragShader: 'simple',
        // Define buffers and uniforms
        vertices: { data: points },
        buffers: [{ name: 'a_offset', data: offsets, size: 1, usage: 'DYNAMIC' }],
        // uniforms: [{ name: 'u_time' }],
        // Element color and mods
        color: colorLight,
        // position: [10, 5],
        // mods: { state: { isChanging: true } },
      },
      {
        name: 'movePad',
        make: 'rectangle',
        height: height * 1.2,
        width: 2,
        color: [0, 0, 1, 0.5],
        mods: {
        isMovable: true,
        move: {
          bounds: {
            translation: {
              left: -1.5, right: 1.5, bottom:0, top: 0,
            },
          },
        },
      },
      },
    ],
    // transform: [['t', 5, 6]],
    position: [5, 6],
  });
  const movePad = medium._movePad;
  medium.custom = {
    c: 2,
    recording: new Recorder(10),
    update: (deltaTime) => {
      const newOffsets = Array(offsets.length);
      const x = movePad.transform.t().x / 5;
      medium.custom.recording.record(x, deltaTime);
      for (let i = 0; i < xLocations.length; i += 1) {
        const xOffset = medium.custom.recording.getValueAtTimeAgo(xLocations[i] / medium.custom.c);
        newOffsets[i * 3] = xOffset;
        newOffsets[i * 3 + 1] = xOffset;
        newOffsets[i * 3 + 2] = xOffset;
      }
      medium._particles.drawingObject.updateBuffer('a_offset', newOffsets);
    }
  };
  movePad.notifications.add('setTransform', () => {
    // if (maxTimeReached) {
    //   return;
    // }
    // // If the movePad has been manually moved, then stop current animations
    if (movePad.state.isBeingMoved && movePad.isAnimating()) {
      medium.custom.stop();
    }
    unpause();
    // medium.custom.update();
  });
  // const element = figure.add({
  //   name,
  //   make: 'gl',
  //   // Define the custom shader and variables (u_matrix is the element transform
  //   // matrix)
  //   // vertexShader: {
  //   //   src: vertexShader,
  //   //   vars: ['a_position', 'a_velocity', 'u_matrix', 'u_time'],
  //   // },
  //   vertexShader: 'simple',
  //   // Build in shader with one color for all vertices
  //   fragShader: 'simple',
  //   // Define buffers and uniforms
  //   vertices: { data: points },
  //   // buffers: [{ name: 'a_velocity', data: velocities }],
  //   // uniforms: [{ name: 'u_time' }],
  //   // Element color and mods
  //   color: [1, 0, 1, 0.5],
  //   // position: [10, 5],
  //   transform: [['t', 5, 6]],
  //   // mods: { state: { isChanging: true } },
  // });
  return medium;
}