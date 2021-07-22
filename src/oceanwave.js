// Inspiration: https://www.acs.psu.edu/drussell/demos/waves/wavemotion.html

function addOceanMedium(
  name, length, height, particleSize, gridStep,
) {
  const vertexShader = `
attribute vec2 a_position;
attribute vec2 a_center;
uniform mat3 u_matrix;
uniform float u_time;
void main() {
  float r = ((a_center.y + 2.0) * (a_center.y + 2.0)) / 40.0;
  float f = 0.2;
  float c = 1.0;
  float theta = -2.0 * 3.1415926 * f * (u_time - a_center.x / c);
  float x = a_position.x + r * cos(theta);
  float y = a_position.y + r * sin(theta);
  gl_Position = vec4((u_matrix * vec3(x, y, 1)).xy, 0, 1);
}`;

  const points = [];
  const sides = 10;
  const step = Math.PI * 2 / (sides);
  const centers = [];
  for (let x = 0; x <= length; x += gridStep) {
    const r = particleSize;
    for (let y = -height / 2; y <= height / 2; y += gridStep) {
      const x1 = x;
      const y1 = y;
      for (let j = 0; j < sides; j += 1) {
        points.push(x1, y1);
        points.push(r * Math.cos(step * j) + x1, r * Math.sin(step * j) + y1);
        points.push(r * Math.cos(step * (j + 1)) + x1, r * Math.sin(step * (j + 1)) + y1);
        centers.push(x, y, x, y, x, y);
      }
    }
  }
  const medium = figure.add({
    name,
    make: 'collection',
    elements: [
      {
        name: 'grid',
        make: 'grid',
        bounds: [0, -height, length, height * 2],
        line: { width: 0.03 },
        xStep: length / 20,
        yStep: length / 20,
      },
      {
        name: 'particles',
        make: 'gl',
        // Define the custom shader and variables (u_matrix is the element transform
        // matrix)
        vertexShader: {
          src: vertexShader,
          vars: ['a_position', 'u_matrix', 'u_time', 'a_center'],
        },
        // vertexShader: 'simple',
        // Build in shader with one color for all vertices
        fragShader: 'simple',
        // fragShader: {
        //   src: fragmentShader,
        //   vars: ['u_color'],
        // },
        // Define buffers and uniforms
        buffers: [{ name: 'a_center', data: centers, size: 2, usage: 'STATIC' }],
        vertices: { data: points },
        // buffers: [{ name: 'a_offset', data: offsets, size: 1, usage: 'DYNAMIC' }],
        uniforms: [{ name: 'u_time', length: 1, type: 'FLOAT' }],
        // Element color and mods
        color: colorLight,
        // position: [10, 5],
        // mods: { state: { isChanging: true } },
      },
      // {
      //   name: 'mask',
      //   make: 'rectangle',
      //   width: 19.2,
      //   height: 7,
      //   line: { width: 1 },
      //   color: [0, 0, 0, 1],
      //   position: [9, 0],
      // },
    ],
    // transform: [['t', 5, 6]],
    position: [0, 6],
  });
  console.log(medium._particles.drawingObject.uniforms)
  // const movePad = medium._movePad;
  medium.custom = {
    // c: 2,
    // A: 0.5,
    // f: 0.2,
    // movePad,
    // recording: new Recorder(10),
    update: () => {
      medium._particles.drawingObject.uniforms.u_time.value = [figure.timeKeeper.now() / 1000];
      // const newOffsets = Array(offsets.length);
      // const x = movePad.transform.t().x;
      // medium._diaphram.setPosition(x, 0);
      // medium.custom.recording.record(x, deltaTime);
      // for (let i = 0; i < xLocations.length; i += 1) {
      //   const xOffset = medium.custom.recording.getValueAtTimeAgo(xLocations[i] / medium.custom.c);
      //   newOffsets[i * 3] = xOffset;
      //   newOffsets[i * 3 + 1] = xOffset;
      //   newOffsets[i * 3 + 2] = xOffset;
      // }
      // medium._particles.drawingObject.updateBuffer('a_offset', newOffsets);
    },
    stop: () => {
      medium.stop();
      // movePad.animations.cancel('_noStop_disturb_');
    },
    reset: () => {
      // medium.custom.stop();
      // movePad.setPosition(0, 0);
      // medium.custom.recording.reset(0);
    },
    setVelocity: (velocity) => {
      // medium.custom.c = velocity;
    },
    setFrequency: (frequency) => {
      // medium.custom.f = frequency;
    },
  };
  // medium._particles.drawingObject.uniforms.u_highlight.value = [1];
  // movePad.notifications.add('setTransform', () => {
  //   // if (maxTimeReached) {
  //   //   return;
  //   // }
  //   // // If the movePad has been manually moved, then stop current animations
  //   if (movePad.state.isBeingMoved && movePad.isAnimating()) {
  //     medium.custom.stop();
  //   }
  //   unpause();
  //   // medium.custom.update();
  // });
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