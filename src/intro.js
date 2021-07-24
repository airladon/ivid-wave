// Inspiration: https://www.acs.psu.edu/drussell/demos/waves/wavemotion.html

function addIntro(
  length, height, gridStep,
) {
  const vertexShader = `
attribute vec2 a_position;
attribute float a_center;
uniform float u_style;
uniform mat3 u_matrix;
uniform float u_time;
void main() {
  float x;
  float y;
  if (u_style < 1.0) {
    if (a_position.y > 0.0) {
      float r = ((a_position.y + 2.0) * (a_position.y + 2.0)) / 80.0;
      float f = 0.6;
      float c = 1.5;
      float theta = -2.0 * 3.1415926 * f * (u_time - a_position.x / c);
      x = a_position.x + r * cos(theta);
      y = a_position.y + r * sin(theta);
    } else {
      x = a_position.x;
      y = a_position.y;
    }
  }
  if (u_style > 1.0) {
    float f = 0.3;
    float L = 4.0;
    float c = -2.0;
    float twoPi = 3.131596 * 2.0;
    float d = 0.3 * sin(twoPi * f * u_time + twoPi / L * a_center);
    x = a_position.x + d;
    y = a_position.y;
  }
  gl_Position = vec4((u_matrix * vec3(x, y, 1)).xy, 0, 1);
}`;

  const points = [];
  // const sides = 10;
  // const step = Math.PI * 2 / (sides);
  const centers = [];
  const y = height;
  for (let x = 0; x < length; x += gridStep) {
    points.push(x, 0);
    points.push(x + gridStep, y);
    points.push(x + gridStep, 0);
    points.push(x, 0);
    points.push(x, y);
    points.push(x + gridStep, y);
    centers.push(x + gridStep / 2, x + gridStep / 2, x + gridStep / 2, x + gridStep / 2, x + gridStep / 2, x + gridStep / 2);
  }

  const medium = figure.add({
    name: 'intro',
    make: 'collection',
    elements: [
      // {
      //   name: 'grid',
      //   make: 'grid',
      //   bounds: [0, -height, length, height * 2],
      //   line: { width: 0.03 },
      //   xStep: length / 20,
      //   yStep: length / 20,
      // },
      // addCircle('c1', 20100),
      // addCircle('c2', 20250),
      // addCircle('c3', 20400),
      // addCircle('c4', 25050),
      {
        name: 'particles',
        make: 'gl',
        // Define the custom shader and variables (u_matrix is the element transform
        // matrix)
        vertexShader: {
          src: vertexShader,
          vars: ['a_position', 'u_matrix', 'u_time', 'u_style', 'a_center'],
        },
        // vertexShader: 'simple',
        // Build in shader with one color for all vertices
        fragShader: 'simple',
        // fragShader: {
        //   src: fragmentShader,
        //   vars: ['u_color'],
        // },
        // Define buffers and uniforms
        buffers: [{ name: 'a_center', data: centers, size: 1, usage: 'STATIC' }],
        vertices: { data: points },
        // buffers: [{ name: 'a_offset', data: offsets, size: 1, usage: 'DYNAMIC' }],
        uniforms: [
          { name: 'u_time', length: 1, type: 'FLOAT' },
          { name: 'u_style', length: 1, type: 'FLOAT' },
        ],
        // Element color and mods
        color: [0, 0.5, 1, 0.8],
        // position: [10, 5],
        // mods: { state: { isChanging: true } },
      },
      // addHighlight('h1', 20100),
      // addHighlight('h2', 20250),
      // addHighlight('h3', 20400),
      // addHighlight('h4', 25050),
    ],
    // transform: [['t', 5, 6]],
    position: [6, 6],
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
      const t = figure.timeKeeper.now() / 1000;
      medium._particles.drawingObject.uniforms.u_time.value = [t];
      medium._particles.drawingObject.uniforms.u_style.value = [2.0];
      // medium._h1.update(t);
      // medium._h2.update(t);
      // medium._h3.update(t);
      // medium._h4.update(t);
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