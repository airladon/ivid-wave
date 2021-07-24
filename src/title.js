
function addTitle(
  length, height, gridStep,
) {
  const vertexShader = {
    src: `
attribute vec2 a_position;
attribute vec2 a_texcoord;
uniform float u_time;
uniform mat3 u_matrix;
varying vec2 v_texcoord;
void main() {
  // float L = 0.3;
  // float f = 1.0;
  float twopi = 2.0 * 3.1415926;
  // float delta = 0.0 * sin(twopi / L * a_position.x - twopi * f * u_time);
  float L = 10.0;
  float f = 0.4;
  float delta = 0.4 * sin(twopi / L * a_position.x - twopi * f * u_time);
  gl_Position = vec4((u_matrix * vec3(a_position.x, a_position.y + delta, 1)).xy, 0, 1);
  v_texcoord = a_texcoord;
}`,
  vars: ['a_position', 'a_texcoord', 'u_matrix', 'u_time'],
  };
  const fragShader = {
    src: `
precision mediump float;
uniform vec4 u_color;
uniform sampler2D u_texture;
varying vec2 v_texcoord;
void main() {
  gl_FragColor = texture2D(u_texture, v_texcoord) * u_color.a;
}`,
    vars: ['u_color', 'u_texture'],
  };
  const points = [];
  const sides = 10;
  const step = Math.PI * 2 / (sides);
  const offsets = [];
  const xLocations = [];
  const y = height;
  for (let x = 0; x <= length; x += gridStep) {
    points.push(x, 0);
    points.push(x + gridStep, y);
    points.push(x + gridStep, 0);
    points.push(x, 0);
    points.push(x, y);
    points.push(x + gridStep, y);
  }
  console.log(points)
  const title = figure.add({
    name: 'title',
    make: 'gl',
    // vertexShader: 'simple',
    // fragShader: 'simple',
    vertexShader,
    fragShader,
    vertices: { data: points },
    buffers: [{ name: 'a_offset', data: offsets, size: 1, usage: 'STATIC' }],
    uniforms: [{ name: 'u_time', length: 1, type: 'FLOAT' }],
    texture: { src: './title.png', mapTo: new Fig.Rect(0, 0, length, height) },
    color: [1, 0, 0, 1],
    // position: [3, 6],
    transform: [['t', 12 - length / 2, 6 - height / 2]],
  });
  // title.setPosition(5, 5);
  title.custom.update = () => {
    const t = time.now();
    title.drawingObject.uniforms.u_time.value = [t];
  }
  return title;
}