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
  // let buffered = false;
  // let index;
  let data;
  // let lastManualValue;
  // let lastManualTime;
  // state = 'pulse' | 'sin' | 'manual'
  // f
  // startTime = Array<number> | number
  // convert to manual
  let state = {
    index: 0,
  };
  // let state = 'manual';
  let f = 0.2;
  // let startTime = null;

  const time = Array(num);
  for (let i = 0; i < num; i += 1) {
    time[i] = i * timeStep;
  }

  function incrementIndex() {
    state.index += 1;
    if (state.index === num * 2) {
      // console.log('incrementing');
      data = [...data.slice(num), ...Array(num)];
      state.index = num;
      state.buffered = true;
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
    state = {
      index: num,
      mode: 'pulse',
      startTime: [],
      lastManualValue: 0,
      lastManualTime: null,
      buffered: false,
    };
  }

  let lastDelta = 0;
  function setManual() {
    if (state.mode !== 'manual') {
      reset();
      state.mode = 'manual';
      state.lastManualValue = 0;
      state.lastManualTime = timeKeeper.now();
    }
    // lastManualTime = timeKeeper.now();
    // if (timeKeeper.now() - lastManualTime > duration) {
    //   lastManualTime = timeKeeper.now();
    // }
  }

  function setDeltaTime(delta) {
    // console.log(delta)
    if (state.mode === 'manual') {
      state.lastManualTime += delta;
      return;
    }
    // if (state.mode === 'sine') {
    //   state.startTime += delta;
    // }
    // if (Array.isArray(state.startTime)) {
    state.startTime = state.startTime.map(st => st + delta);
    // }
  }
  // Add a value to the recording, and the amount of time that has ellapsed
  // since the last record. If the ellapsed time is longer than `timeStep`, then
  // interpolated values will be added at each `timeStep`.

  function record(value, deltaTimeIn) {
    // let deltaTimeIn = timeKeeper.step();
    if (state.mode !== 'manual') {
      reset();
      setManual();
      // deltaTimeIn = 0;
    }
    // state = 'manual';
    const deltaTime = deltaTimeIn + lastDelta;
    if (deltaTime < timeStep) {
      lastDelta = deltaTime;
      return;
    }
    // Count the number of samples that need to be added to the signal
    const count = Math.floor(deltaTime / timeStep);
    lastDelta = deltaTime - count * timeStep;

    const lastValue = data[state.index - 1];
    const deltaValue = (value - lastValue) / count;
    for (let i = 0; i < count; i += 1) {
      data[state.index] = Fig.tools.math.roundNum(lastValue + deltaValue * (i + 1), 2);
      incrementIndex();
    }
    if (value !== state.lastManualValue) {
      state.lastManualValue = value;
      state.lastManualTime = timeKeeper.now();
    }
  }

  function isStationary() {
    const t = timeKeeper.now();
    if (state.mode === 'pulse') {
      if (state.startTime.length === 0) {
        return true;
      }
      if (t - state.startTime.slice(-1)[0] < duration + 4) {
        return false;
      }
    }
    if (state.mode === 'pulse2') {
      if (state.startTime.length === 0) {
        return true;
      }
      if (t - state.startTime.slice(-1)[0] < duration + 8) {
        return false;
      }
    }
    if (state.mode === 'sine') {
      return false;
    }
    if (state.mode === 'manual') {
      if (state.lastManualTime == null || t - state.lastManualTime < duration) {
        return false;
      }
    }
    return true;
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
    // let d;
    // if (state.buffered) {
    //   d = data.slice(index - num, index);
    // } else {
    //   d = data.slice(num, index);
    // }
    // const rounded = d.map(n => Fig.tools.math.roundNum(n, precision));
    const rounded = data.slice(state.index - num, state.index).map(n => Fig.tools.math.roundNum(n, precision));
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
    data = [
      ...Array(state.index - num).fill(0), ...decoded.slice(), ...Array(2 * num - state.index)];
    // state.buffered = false;
    // state.index = num + decoded.length;
  }

  function getPulse(t) {
    const amplitude = 1;
    const A = 1.5;
    return 1.5 * A * amplitude * Math.exp(-(((t / 2 - 0.6) * 4.4 - t / 2 + 0.05) ** 2));
  }

  function getPulse2(t) {
    const A = 4;
    // const t = time.now() - startTime;
    let scaler = 4;
    let amp = 0.6;
    if (t < 2.7) {
      if (t - 0.65 > 0) {
        scaler = (4 - (t - 0.65) * 2);
        amp = 0.6 - (t - 0.65) * 0.2;
      }
      return A * amp * Math.exp(-(((t - 0.6) * scaler - t) ** 2));
    }
    return -A * 0.4 * Math.exp(-(((t * 3 - 10.2)) ** 2));
  }

  function getSine(t) {
    const A = 2.5;
    return A * 0.8 * Math.sin(2 * Math.PI * f * t);
  }

  function getValueAtTimeAgo(timeDelta) {
    if (state.mode === 'manual') {
      const deltaIndex = Math.floor(timeDelta / timeStep + timeStep / 10);
      return data[state.index - deltaIndex - 1];
    }
    const timeToGet = timeKeeper.now() - timeDelta;
    if (state.mode === 'pulse') {
      if (state.startTime.length === 0) {
        return 0;
      }
      if (state.startTime[0] > timeToGet) {
        return 0;
      }
      let closestPastStartTime = null;
      for (let i = 0; i < state.startTime.length; i += 1) {
        const s = state.startTime[i];
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
    if (state.mode === 'pulse2') {
      if (state.startTime.length === 0) {
        return 0;
      }
      if (state.startTime[0] > timeToGet) {
        return 0;
      }
      let closestPastStartTime = null;
      for (let i = 0; i < state.startTime.length; i += 1) {
        const s = state.startTime[i];
        if (timeToGet >= s) {
          closestPastStartTime = s;
        }
      }
      if (closestPastStartTime == null) {
        return 0;
      }
      const t = timeToGet - closestPastStartTime;
      return getPulse2(t);
    }
    if (state.mode === 'sine') {
      if (state.startTime.length === 0) {
        return 0;
      }
      // const timeToGet = timeKeeper.now() - timeDelta;
      if (state.startTime[0] > timeToGet) {
        return 0;
      }
      const t = timeToGet - state.startTime[0];
      // if (timeDelta === 0) {
      //   console.log(t);
      // }
      return getSine(t);
    }
    return 0;
  }

  function setF(newFreq) {
    f = newFreq;
  }

  reset();

  function getIndex() {
    return state.index;
  }

  function getData() {
    return data;
  }

  function pulse() {
    timeKeeper.step();
    if (state.mode !== 'pulse') {
      reset();
    }
    state.mode = 'pulse';
    if (state.startTime == null) {
      state.startTime = [];
    }
    state.startTime.push(timeKeeper.now());
  }

  function pulse2() {
    timeKeeper.step();
    if (state.mode !== 'pulse2') {
      reset();
    }
    state.mode = 'pulse2';
    if (state.startTime == null) {
      state.startTime = [];
    }
    state.startTime.push(timeKeeper.now());
  }

  function sine() {
    timeKeeper.step();
    if (state.mode !== 'sine') {
      reset();
    }
    state.mode = 'sine';
    state.startTime = [timeKeeper.now()];
  }

  function getState() {
    return state;
  }

  function setState(s) {
    state = s;
  }

  function getRecording(fullBuffer = false, timeDuration = 5) {
    if (state.mode === 'manual') {
      const n = Math.floor(timeDuration / timeStep);
      const i = state.index - num;
      if (fullBuffer || state.buffered || i > n) {
        return {
          time: time.slice(0, n),
          data: data.slice(state.index - n, state.index),
        };
      }
      return {
        time: time.slice(0, i + 1),
        data: data.slice(num, num + i),
      };
    }

    if (state.mode === 'pulse') {
      if (state.startTime.length === 0) {
        return {
          time: [0],
          data: [0],
        };
      }
      const now = timeKeeper.now();
      const out = Array(num).fill(0);
      let sIndex = state.startTime.length - 1;
      let tIndex = 0;
      while (tIndex < num && sIndex > -1) {
        const tt = now - tIndex * timeStep;
        if (tt < state.startTime[sIndex]) {
          sIndex -= 1;
        } else {
          out[num - 1 - tIndex] = getPulse(tt - state.startTime[sIndex]);
          tIndex += 1;
        }
      }
      if (tIndex === num) {
        tIndex -= 1;
      }
      return {
        time: time.slice(0, tIndex),
        data: out.slice(num - 1 - tIndex),
      };
    }
    if (state.mode === 'pulse2') {
      if (state.startTime.length === 0) {
        return {
          time: [0],
          data: [0],
        };
      }
      const now = timeKeeper.now();
      const out = Array(num).fill(0);
      let sIndex = state.startTime.length - 1;
      let tIndex = 0;
      while (tIndex < num && sIndex > -1) {
        const tt = now - tIndex * timeStep;
        if (tt < state.startTime[sIndex]) {
          sIndex -= 1;
        } else {
          out[num - 1 - tIndex] = getPulse2(tt - state.startTime[sIndex]);
          tIndex += 1;
        }
      }
      if (tIndex === num) {
        tIndex -= 1;
      }
      return {
        time: time.slice(0, tIndex),
        data: out.slice(num - 1 - tIndex),
      };
    }
    if (state.startTime.length === 0) {
      return {
        time: [0],
        data: [0],
      };
    }
    const now = timeKeeper.now();
    const out = Array(num).fill(0);
    let tIndex = 0;
    let beforeStart = false;
    while (tIndex < num && beforeStart === false) {
      const tt = now - tIndex * timeStep;
      if (tt < state.startTime[0]) {
        beforeStart = true;
      } else {
        out[num - 1 - tIndex] = getSine(tt - state.startTime[0]);
        tIndex += 1;
      }
    }
    if (tIndex === num) {
      tIndex -= 1;
    }
    return {
      time: time.slice(0, tIndex),
      data: out.slice(num - 1 - tIndex),
    };
  }

  function getNum() {
    return num;
  }


  // function getStartTime() {
  //   return startTime;
  // }

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
    pulse2,
    sine,
    getState,
    setManual,
    isStationary,
    // getStartTime,
    setDeltaTime,
    setState,
    getNum,
  };
}
