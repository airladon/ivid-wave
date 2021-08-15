
function addTitle(
  length, height, gridStep, recorder,
) {
  const vertexShader = {
    src: `
attribute vec2 a_position;
attribute vec2 a_texcoord;
uniform float u_time;
attribute float a_offset;
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
  const offsets = [];
  const xLocations = [];
  const y = height;
  const offset = [];
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
      // {
      //   make: 'line',
      //   p1: [-20, 0],
      //   p2: [20, 0],
      //   width: 0.05,
      // },
      {
        name: 'title',
        make: 'gl',
        vertexShader,
        fragShader: 'withTexture',
        vertices: { data: points },
        buffers: [{ name: 'a_offset', data: offsets, size: 1, usage: 'DYNAMIC' }],
        uniforms: [{ name: 'u_time', length: 1, type: 'FLOAT' }],
        texture: { src: './title.png', mapTo: new Fig.Rect(0, 0, length, height) },
        color: [1, 0, 0, 1],
        transform: [['t', 0, -0.6]],
      },
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
      // title._diaphram.setPosition(x, 0);

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
  }
  figure.fnMap.global.add('outTitle', () => {
    title.animations.new().dissolveOut(0.5).start();
  });
  movePad.notifications.add('setTransform', () => {
    // unpause();
    recorder.setManual();
    figure.fnMap.exec('forceUpdate');
  });
  // title.notifications.add('getState', () => {
  //   title.customState.recorder = title.custom.recording.encodeData();
  // });
  // // title.backupState = title._state;
  // // title._state = (options) => {
  // //   title.customState.recorder = title.custom.recording.encodeData();
  // //   return title.backupState(options);
  // // };
  
  // title.notifications.add('setState', () => {
  //   if (title.customState.recorder != null) {
  //     title.custom.recording.loadEncodedData(title.customState.recorder[0], title.customState.recorder[1]);
  //   }
  // });


  // title.backupStateSet = title.stateSet;
  // title.stateSet = () => {
  //   title.backupStateSet();
  //   if (title.customState.recorder != null) {
  //     title.custom.recording.loadEncodedData(title.customState.recorder[0], title.customState.recorder[1]);
  //   }
  // }
  return title;
}