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
    position: [12 - length / 2, 3],
    elements: [
      {
        name: 'line',
        make: 'polyline',
        points,
        width: 0.08,
        color: [1, 0, 0, 1],
      },
    ],
  });
  figure.fnMap.global.add('animateInterference', () => {
    // time.reset();
    // time.unpause();
    // console.log(wave.animations)
    wave.animations.new()
      .custom({
        callback: (p) => {
          const A = 1;
          const v = 1;
          const lambda = 2;
          const f = v / lambda;
          const t = p * 20 + 4;
          // console.log(t)
          const k = Math.PI * 2 / lambda;
          const w = Math.PI * 2 * f;
          const newPoints = Array(x.length).fill(0);
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
        },
        // callback: (p) => console.log(p),
        duration: 20,
      })
      .start();
  });
  return wave;
}