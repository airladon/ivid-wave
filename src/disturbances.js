
function getDisturbances() {
  // Pulse disturbance - disturb the first particle with a pulse
  // Instead of using the normal animation time step (which is real time)
  // a custom animation step is used where time is taken from the TimeKeeper.
  // This means if the TimeKeeper pauses, or is sped up or slowed down, then the
  // animation will be too.
  const pulse = (med, amplitude = randSign() * rand(0.3, 0.6)) => {
    unpause();
    const startTime = time.now();
    const { movePad, A } = med.custom;
    movePad.animations.new('_noStop_disturb_')
      .custom({
        callback: () => {
          if (!time.isPaused()) {
            const t = time.now() - startTime;
            movePad.setPosition(0, A * amplitude * Math.exp(-(((t / 2 - 0.6) * 4 - t / 2) ** 2)));
          }
        },
        duration: 10000,
      })
      .start();
  };

  const sineWave = (med, delay = 0) => {
    unpause();
    const { movePad, A } = med.custom;
    const startTime = time.now();
    movePad.animations.new('_noStop_disturb_')
      .delay(delay)
      .custom({
        callback: () => {
          if (!time.isPaused()) {
            const t = time.now() - startTime;
            movePad.setPosition(0, A * 0.8 * Math.sin(2 * Math.PI * med.custom.f * t));
          }
        },
        duration: 10000,
      })
      .start();
  };

  return {
    pulse, sineWave
  };
}