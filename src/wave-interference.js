// Inspiration: https://www.acs.psu.edu/drussell/demos/waves/wavemotion.html

function addWaveInterference(
  name, length,
) {
  const x = Fig.range(0, length, 0.02);
  const points = Array(x.length);
  for (let i = 0; i < x.length; i += 1) {
    points[i] = [x[i], 0];
  }
  const wave = figure.add({
    name,
    make: 'collection',
    mods: {
      scenarios: {
        default: { position: [12 - length / 2, 4], scale: 1 },
        center: { position: [12 - length / 2, 6], scale: 1 },
        waveLow: { position: [12 - length / 2 * 0.7, 2], scale: 0.7 },
      },
    },
    elements: [
      {
        name: 'line',
        make: 'polyline',
        points,
        width: 0.08,
        color: colorYellowText,
      },
      {
        name: 'g',
        make: 'text',
        text: 'g',
        font: { family: 'TeXGyreTermes', size: 1.4, style: 'italic' },
        color: colorYellowText,
      },
      {
        name: 'h',
        make: 'text',
        text: 'h',
        font: { family: 'TeXGyreTermes', size: 1.4, style: 'italic' },
        color: colorYellowText,
      },
    ],
  });
  wave.customState = {
    offset: 4,
    v: 1.1,
    lastP: 0,
    lastFn: 'calcWave',
  };
  // const A = 1;
  // const v = 1.1;
  // const lambda = 2;
  // const f = v / lambda;
  // const k = Math.PI * 2 / lambda;
  // const w = Math.PI * 2 * f;
  figure.fnMap.global.add('calcWave', (p) => {
    wave.customState.lastP = p;
    wave.customState.lastFn = 'calcWave';
    const newPoints = Array(x.length).fill(0);
    const t = p * 10 + wave.customState.offset;
    const A = 1;
    const { v } = wave.customState;
    const lambda = 2;
    const f = v / lambda;
    const k = Math.PI * 2 / lambda;
    const w = Math.PI * 2 * f;
    for (let i = 0; i < x.length; i += 1) {
      let forward = 0;
      if (t * v >= x[i] && t * v <= x[i] + lambda * 3) {
        forward = A * Math.sin(k * x[i] - w * t);
      }
      newPoints[i] = [x[i], forward];
    }
    wave._line.custom.updatePoints({ points: newPoints });
  });
  figure.fnMap.global.add('calcInterference', (p) => {
    wave.customState.lastP = p;
    wave.customState.lastFn = 'calcInterference';
    const newPoints = Array(x.length).fill(0);
    const t = p * 10 + wave.customState.offset;
    const A = 1;
    const { v } = wave.customState;
    const lambda = 2;
    const f = v / lambda;
    const k = Math.PI * 2 / lambda;
    const w = Math.PI * 2 * f;
    for (let i = 0; i < x.length; i += 1) {
      let forward = 0;
      let reverse = 0;
      const xf = x[i];
      const xr = x[i];
      if (t * v >= x[i] && t * v <= x[i] + lambda * 3) {
        forward = A * Math.sin(k * xf - w * t);
      }
      if (
        x[x.length - 1] - t * v <= x[i]
        && x[x.length - 1] - t * v >= x[i] - lambda * 3
      ) {
        reverse = A * Math.sin(k * xr * 2 + w * t * 2);
      }
      newPoints[i] = [x[i], reverse + forward];
    }
    if (wave._g.isShown) {
      wave._g.setPosition(t * v - 3, A + 0.4);
    }
    if (wave._h.isShown) {
      wave._h.setPosition(length - t * v + 3, A + 0.4);
    }
    wave._line.custom.updatePoints({ points: newPoints });
  });
  figure.fnMap.global.add('animateInterference', () => {
    wave.animations.new()
      .custom({
        callback: 'calcInterference',
        duration: 10,
      })
      .start();
  });
  figure.fnMap.global.add('animateSingleWave', () => {
    wave.animations.new()
      .custom({
        callback: 'calcWave',
        duration: 10,
      })
      .start();
  });
  wave.notifications.add('setState', () => {
    if (wave.isShown) {
      wave.fnMap.exec(wave.customState.lastFn, wave.customState.lastP);
    }
  });
  return wave;
}