// Inspiration: https://www.acs.psu.edu/drussell/demos/waves/wavemotion.html
/* globals Fig, figure, colorWave, colorLight, time */

// eslint-disable-next-line no-unused-vars
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
  const addCircle = (nameIn, index) => {
    const position = Fig.getPoint([centers[index], centers[index + 1]]);
    const radius = ((position.y + 2) * (position.y + 2)) / 40;
    return {
      name: nameIn,
      make: 'polygon',
      sides: 30,
      position,
      radius,
      line: { width: 0.03 },
      color: colorWave,
    };
  };
  const addHighlight = (nameIn, index) => {
    const position = Fig.getPoint([centers[index], centers[index + 1]]);
    return {
      name: nameIn,
      make: 'polygon',
      sides: 20,
      position,
      radius: (position.y + 2) / 20,
      color: colorWave,
      mods: {
        update: (deltaTime) => {
          const r = ((position.y + 2) * (position.y + 2)) / 40;
          const f = 0.2;
          const c = 1.0;
          const theta = -2.0 * 3.1415926 * f * (deltaTime - position.x / c);
          const x = position.x + r * Math.cos(theta);
          const y = position.y + r * Math.sin(theta);
          figure.get(`ocean.${nameIn}`).setPosition(x, y);
        },
      },
    };
  };
  const medium = figure.add({
    name,
    make: 'collection',
    elements: [
      {
        name: 'grid',
        make: 'grid',
        bounds: [0, -length / 20 * 2.5, length, length / 20 * 5],
        line: { width: 0.03 },
        xStep: length / 20,
        yStep: length / 20,
      },
      addCircle('c1', 20100),
      addCircle('c2', 20250),
      addCircle('c3', 20400),
      addCircle('c4', 25050),
      {
        name: 'particles',
        make: 'gl',
        vertexShader: {
          src: vertexShader,
          vars: ['a_position', 'u_matrix', 'u_time', 'a_center'],
        },
        fragShader: 'simple',
        buffers: [{
          name: 'a_center', data: centers, size: 2, usage: 'STATIC',
        }],
        vertices: { data: points },
        uniforms: [{ name: 'u_time', length: 1, type: 'FLOAT' }],
        color: colorLight,
      },
      addHighlight('h1', 20100),
      addHighlight('h2', 20250),
      addHighlight('h3', 20400),
      addHighlight('h4', 25050),
    ],
    position: [0, 6],
  });
  medium.custom = {
    update: () => {
      const t = time.now();
      medium._particles.drawingObject.uniforms.u_time.value = [t];
      medium._h1.update(t);
      medium._h2.update(t);
      medium._h3.update(t);
      medium._h4.update(t);
    },
    stop: () => {
      medium.stop();
    },
  };
  return medium;
}
