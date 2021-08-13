// Inspiration: https://www.acs.psu.edu/drussell/demos/waves/wavemotion.html

function addWaveInterference(
  name, length,
) {
  const x = Fig.range(0, length, 0.02);
  const points = Array(x.length);
  for (let i = 0; i < x.length; i += 1) {
    points[i] = [x[i], 0];
  }
  console.log(points)
  const wave = figure.add({
    name,
    make: 'collection',
    mods: {
      scenarios: {
        default: { position: [12 - length / 2, 4] },
        center: { position: [12 - length / 2, 6] },
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
    ],
  });
  const A = 1;
  const v = 1.1;
  const lambda = 2;
  const f = v / lambda;
  const k = Math.PI * 2 / lambda;
  const w = Math.PI * 2 * f;
  figure.fnMap.global.add('calcWave', (p) => {
    const newPoints = Array(x.length).fill(0);
    const t = p * 10 + 8;
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
    const newPoints = Array(x.length).fill(0);
    const t = p * 10 + 8;
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
  return wave;
}