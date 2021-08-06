
function getDisturbances() {
  // Pulse disturbance - disturb the first particle with a pulse
  // Instead of using the normal animation time step (which is real time)
  // a custom animation step is used where time is taken from the TimeKeeper.
  // This means if the TimeKeeper pauses, or is sped up or slowed down, then the
  // animation will be too.
  figure.fnMap.global.add('pulseM1DisturbanceStep', (p) => {
    const med = figure.get('m1')
    const { movePad, A } = med.custom;
    const { amplitude } = med.customState;
    if (!time.isPaused()) {
      // const t = p * 10000;
      const t = time.now() - med.custom.startTime;
      movePad.setPosition(0, A * amplitude * Math.exp(-(((t / 2 - 0.6) * 4 - t / 2) ** 2)));
    }
  });
  figure.fnMap.global.add('pulseP1DisturbanceStep', (p) => {
    const med = figure.get('p1');
    const { movePad, A } = med.custom;
    const { amplitude } = med.customState;
    if (!time.isPaused()) {
      // const t = p * 10000;
      const t = time.now() - med.custom.startTime;
      movePad.setPosition(1.5 * A * amplitude * Math.exp(-(((t / 2 - 0.6) * 4 - t / 2) ** 2)), 0);
    }
  });

  const pulse = (med, amplitude = randSign() * rand(0.3, 0.6)) => {
    unpause();
    // const startTime = time.now();
    const { movePad, A } = med.custom;
    med.customState.amplitude = amplitude;
    med.custom.startTime = time.now();
    let fnToUse = '';
    if (med.name === 'm1') {
      fnToUse = 'pulseM1DisturbanceStep';
    } else if (med.name === 'p1') {
      fnToUse = 'pulseP1DisturbanceStep';
    }
    movePad.animations.new('_noStop_disturb_')
      .custom({
        callback: fnToUse,
        duration: 10000,
      })
      .start();
  };

  figure.fnMap.global.add('sineM1DisturbanceStep', (p) => {
    const med = figure.get('m1')
    const { movePad, A } = med.custom;
    if (!time.isPaused()) {
      // const t = p * 10000;
      const t = time.now() - med.custom.startTime;
      movePad.setPosition(0, A * 0.8 * Math.sin(2 * Math.PI * med.custom.f * t));
    }
  });
  figure.fnMap.global.add('sineP1DisturbanceStep', (p) => {
    const med = figure.get('p1');
    const { movePad, A } = med.custom;
    if (!time.isPaused()) {
      // const t = p * 10000;
      const t = time.now() - med.custom.startTime;
      movePad.setPosition(A * 0.8 * Math.sin(2 * Math.PI * med.custom.f * t), 0);
    }
  });
  const sineWave = (med) => {
    unpause();
    const { movePad, A } = med.custom;
    const startTime = time.now();
    med.custom.startTime = time.now();
    let fnToUse = '';
    if (med.name === 'm1') {
      fnToUse = 'sineM1DisturbanceStep';
    } else if (med.name === 'p1') {
      fnToUse = 'sineP1DisturbanceStep';
    }
    movePad.animations.new('_noStop_disturb_')
      // .delay(delay)
      .custom({
        callback: fnToUse,
        duration: 10000,
      })
      .start();
  };

  return {
    pulse, sineWave
  };
}