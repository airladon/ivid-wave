/* globals Fig */
/**
This function records values over time. The recorder samples at a specific rate
(`timeStep`), and if values are input with larger time steps, then additional
points will be added with linear interpolation.

Either all values, or values at specific times can be retrieved.

The recording is stored in a queue array. The array is double the length of the
recording available. When it is full, the last half of the array is copied to
the first half and recording continues from half way. This limits the number
of times arrays need to be copied.
 */
// eslint-disable-next-line no-unused-vars
function Recorder(duration, timeKeeper) {
  const timeStep = 0.016;
  const num = duration / timeStep;
  let buffered = false;
  let index;
  let data;
  let lastManualValue;
  let lastManualTime;
  // state = 'pulse' | 'sin' | 'manual'
  // f
  // startTime = Array<number> | number
  // convert to manual
  let state = {};
  // let state = 'manual';
  let f = 0.2;
  let startTime = null;

  const time = Array(num);
  for (let i = 0; i < num; i += 1) {
    time[i] = i * timeStep;
  }

  function incrementIndex() {
    index += 1;
    if (index === num * 2) {
      // console.log('incrementing');
      data = [...data.slice(num), ...Array(num)];
      index = num;
      buffered = true;
    }
  }

  // Reset all the data values with an initial value or a callback function
  // that fills out all values
  function reset(initialValueOrCallback = 0) {
    if (typeof initialValueOrCallback === 'number') {
      data = [...Array(num).fill(initialValueOrCallback), ...Array(num)];
    } else {
      data = [...initialValueOrCallback(timeStep, num), ...Array(num)];
    }
    buffered = false;
    index = num;
    startTime = [];
    state = {
      mode: 'pulse',
      startTime: [],
      lastManualValue: 0,
      lastManualTime: null,
    },
  }

  let lastDelta = 0;
  function setManual() {
    if (state !== 'manual') {
      reset();
      state = 'manual';
    }
    lastManualTime = timeKeeper.now();
    // if (timeKeeper.now() - lastManualTime > duration) {
    //   lastManualTime = timeKeeper.now();
    // }
  }
  // Add a value to the recording, and the amount of time that has ellapsed
  // since the last record. If the ellapsed time is longer than `timeStep`, then
  // interpolated values will be added at each `timeStep`.

  function record(value, deltaTimeIn) {
    // let deltaTimeIn = timeKeeper.step();
    if (state !== 'manual') {
      reset();
      // deltaTimeIn = 0;
    }
    state = 'manual';
    const deltaTime = deltaTimeIn + lastDelta;
    if (deltaTime < timeStep) {
      lastDelta = deltaTime;
      return;
    }
    // Count the number of samples that need to be added to the signal
    const count = Math.floor(deltaTime / timeStep);
    lastDelta = deltaTime - count * timeStep;

    const lastValue = data[index - 1];
    const deltaValue = (value - lastValue) / count;
    for (let i = 0; i < count; i += 1) {
      data[index] = lastValue + deltaValue * (i + 1);
      incrementIndex();
    }
    if (value !== lastManualValue) {
      lastManualValue = value;
      lastManualTime = timeKeeper.now();
    }
  }

  function isStationary() {
    const t = timeKeeper.now();
    if (state === 'pulse') {
      if (startTime.length === 0) {
        return true;
      }
      if (t - startTime.slice(-1)[0] < duration + 4) {
        return false;
      }
    }
    if (state === 'sine') {
      return false;
    }
    if (state === 'manual') {
      if (lastManualTime == null || t - lastManualTime < duration) {
        return false;
      }
    }
    return true;
  }

  function getRecording(fullBuffer = false, timeDuration = 5) {
    const n = timeDuration / timeStep;
    const i = index - num;
    if (fullBuffer || buffered || i > n) {
      return {
        time: time.slice(0, n),
        data: data.slice(index - n, index),
      };
    }
    return {
      time: time.slice(0, i + 1),
      data: data.slice(num, num + i),
    };
  }


  function encodeData(precision = 2) {
    const getZerosNum = (i, dataIn) => {
      let n = i;
      let counter = 0;
      while (dataIn[n] === 0 && n < num) {
        counter += 1;
        n += 1;
      }
      return counter;
    };
    const rounded = data.slice(index - num, index).map(n => Fig.tools.math.roundNum(n, precision));
    const deltaValues = [];
    deltaValues[0] = 0;
    for (let i = 1; i < rounded.length; i += 1) {
      deltaValues[i] = Fig.tools.math.roundNum((rounded[i] - rounded[i - 1]) * (10 ** precision));
    }
    const compressed = [];
    let i = 0;
    while (i < num) {
      const n = getZerosNum(i, deltaValues);
      if (n > 0) {
        compressed.push(Fig.tools.math.round(n / 100000, 6));
        i += n;
      } else {
        compressed.push(deltaValues[i]);
        i += 1;
      }
    }
    return [rounded[0], compressed];
  }

  function decodeData(firstValue, dataIn, precision = 2) {
    // first decompress the data
    const decompressed = [];
    for (let i = 0; i < dataIn.length; i += 1) {
      if (Math.abs(dataIn[i]) < 1) {
        for (let j = 0; j < Fig.tools.math.roundNum(dataIn[i] * 100000); j += 1) {
          decompressed.push(0);
        }
      } else {
        decompressed.push(dataIn[i]);
      }
    }
    const decoded = Array(num);
    decoded[0] = firstValue;
    for (let i = 1; i < num; i += 1) {
      decoded[i] = decoded[i - 1] + decompressed[i] / (10 ** precision);
    }
    return decoded;
  }

  function loadEncodedData(firstValue, dataIn, precision = 2) {
    const decoded = decodeData(firstValue, dataIn, precision);
    data = [...decoded.slice(), ...Array(num)];
    buffered = false;
    index = num;
  }

  function getPulse(t) {
    const amplitude = 1;
    const A = 1.5;
    return 1.5 * A * amplitude * Math.exp(-(((t / 2 - 0.6) * 4 - t / 2) ** 2));
  }

  function getSine(t) {
    const A = 2.5;
    return A * 0.8 * Math.sin(2 * Math.PI * f * t);
  }

  function getValueAtTimeAgo(timeDelta) {
    if (state === 'manual') {
      const deltaIndex = Math.floor(timeDelta / timeStep + timeStep / 10);
      return data[index - deltaIndex - 1];
    }
    const timeToGet = timeKeeper.now() - timeDelta;
    if (state === 'pulse') {
      if (startTime.length === 0) {
        return 0;
      }
      if (startTime[0] > timeToGet) {
        return 0;
      }
      let closestPastStartTime = null;
      for (let i = 0; i < startTime.length; i += 1) {
        const s = startTime[i];
        if (timeToGet >= s) {
          closestPastStartTime = s;
        }
      }
      if (closestPastStartTime == null) {
        return 0;
      }
      const t = timeToGet - closestPastStartTime;
      return getPulse(t);
    }
    if (state === 'sine') {
      if (startTime == null) {
        return 0;
      }
      // const timeToGet = timeKeeper.now() - timeDelta;
      if (startTime > timeToGet) {
        return 0;
      }
      const t = timeToGet - startTime;
      return getSine(t);
    }
    return 0;
  }

  function setF(newFreq) {
    f = newFreq;
  }

  reset();

  function getIndex() {
    return index;
  }

  function getData() {
    return data;
  }

  function pulse() {
    timeKeeper.step();
    if (state !== 'pulse') {
      reset();
    }
    state = 'pulse';
    if (startTime == null) {
      startTime = [];
    }
    startTime.push(timeKeeper.now());
  }

  function sine() {
    timeKeeper.step();
    if (state !== 'sine') {
      reset();
    }
    state = 'sine';
    startTime.push(timeKeeper.now());
  }

  function getState() {
    return state;
  }

  function getStartTime() {
    return startTime;
  }

  return {
    record,
    getRecording,
    getValueAtTimeAgo,
    reset,
    encodeData,
    loadEncodedData,
    decodeData,
    getIndex,
    getData,
    setF,
    pulse,
    sine,
    getState,
    setManual,
    isStationary,
    getStartTime,
  };
}
