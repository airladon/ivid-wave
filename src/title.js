/* globals Fig, figure, getLoader, colorLight, time */
// eslint-disable-next-line no-unused-vars
function addTitle(
  length, height, gridStep, recorder,
) {
  const vertexShader = {
    src: `
attribute float a_offset;
attribute vec2 a_texcoord;
attribute vec2 a_position;
uniform float u_time;
uniform mat3 u_matrix;
varying vec2 v_texcoord;
void main() {
  float twopi = 2.0 * 3.1415926;
  float L = 10.08;
  float f = 0.4;
  float delta = 0.4 * sin(twopi / L * a_position.x - twopi * f * u_time);
  delta = a_offset;
  gl_Position = vec4((u_matrix * vec3(a_position.x, a_position.y + delta, 1)).xy, 0, 1);
  v_texcoord = a_texcoord;
}`,
    vars: ['a_position', 'a_texcoord', 'u_matrix', 'a_offset', 'u_time'],
  };
  const points = [];
  const offsets = [];
  const y = height;
  for (let x = 0; x < length; x += gridStep) {
    points.push(x, 0);
    points.push(x + gridStep, y);
    points.push(x + gridStep, 0);
    points.push(x, 0);
    points.push(x, y);
    points.push(x + gridStep, y);
    offsets.push(0, 0, 0, 0, 0, 0);
  }
  const xValues = Fig.range(0, length, gridStep);
  const title = figure.add({
    name: 'title',
    make: 'collection',
    elements: [
      {
        name: 'title',
        make: 'gl',
        vertexShader,
        fragShader: 'withTexture',
        vertices: { data: points },
        buffers: [{
          name: 'a_offset', data: offsets, size: 1, usage: 'DYNAMIC',
        }],
        uniforms: [{ name: 'u_time', length: 1, type: 'FLOAT' }],
        texture: {
          src: './src/title.png',
          mapTo: new Fig.Rect(0, 0, length, height),
          onLoad: getLoader('title'),
        },
        color: [1, 0, 0, 1],
        transform: [['t', 0, -0.6]],
      },
      // {
      //   name: 'title',
      //   make: 'text',
      //   text: 'waves',
      // },
      {
        name: 'envelope',
        make: 'polyline',
        width: 0.05,
        color: colorLight,
      },
      {
        name: 'movePadHighlight',
        make: 'polygon',
        radius: 0.2,
        color: [1, 0, 0, 1],
        sides: 40,
      },
      {
        name: 'movePad',
        make: 'polygon',
        radius: 2,
        color: [1, 0, 0, 0],
        sides: 8,
        position: [0, 0],
        mods: {
          isMovable: true,
          move: {
            bounds: {
              translation: {
                left: 0, right: 0, bottom: -1, top: 1,
              },
            },
          },
        },
      },
    ],
    // transform: [['t', 12 - length / 2, 6 - height / 2]],
    position: [8, 5],
  });
  // title.setPosition(5, 5);
  const envelope = title.getElement('envelope');
  const movePad = title.getElement('movePad');
  const movePadHighlight = title.getElement('movePadHighlight');
  title.custom = {
    c: 2,
    recording: recorder,
    update: (deltaTime) => {
      let yh;
      if (title.custom.recording.getState().mode === 'manual') {
        yh = movePad.transform.t().y;
        title.custom.recording.record(yh, deltaTime);
      } else {
        yh = title.custom.recording.getValueAtTimeAgo(0) / 3;
        movePad.transform.updateTranslation(0, yh);
      }
      // title._diaphragm.setPosition(x, 0);

      const t = time.now();
      // const y = movePad.transform.t().y;
      // title.custom.recording.record(y, deltaTime);
      title._title.drawingObject.uniforms.u_time.value = [t];
      const envelopePoints = [];
      for (let i = 0; i < xValues.length; i += 1) {
        const x = xValues[i];
        let y1 = title.custom.recording.getValueAtTimeAgo(x / title.custom.c);
        let y2 = title.custom.recording.getValueAtTimeAgo((x + gridStep) / title.custom.c);
        if (title.custom.recording.getState().mode !== 'manual') {
          y1 /= 3;
          y2 /= 3;
        }
        offsets[i * 6] = y1;
        offsets[i * 6 + 1] = y2;
        offsets[i * 6 + 2] = y2;
        offsets[i * 6 + 3] = y1;
        offsets[i * 6 + 4] = y1;
        offsets[i * 6 + 5] = y2;
        envelopePoints.push([x, y1]);
      }
      movePadHighlight.setPosition(0, yh);
      envelope.custom.updatePoints({ points: envelopePoints });
      title._title.drawingObject.updateBuffer('a_offset', offsets);
    },
  };
  figure.fnMap.global.add('outTitle', () => {
    title.animations.new().dissolveOut(0.5).start();
  });
  movePad.notifications.add('setTransform', () => {
    recorder.setManual();
    figure.fnMap.exec('forceUpdate');
  });
  return title;
}
