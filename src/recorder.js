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
function Recorder(duration) {
  const timeStep = 0.01;
  const num = duration / timeStep;
  let buffered = false;
  let index;
  let data;
  const time = Array(num);
  for (let i = 0; i < num; i += 1) {
    time[i] = i * timeStep;
  }

  function incrementIndex() {
    index += 1;
    if (index === num * 2) {
      console.log('incrementing');
      data = [...data.slice(num), ...Array(num)];
      index = num;
      buffered = true;
    }
  }

  let lastDelta = 0;
  // Add a value to the recording, and the amount of time that has ellapsed
  // since the last record. If the ellapsed time is longer than `timeStep`, then
  // interpolated values will be added at each `timeStep`.
  function record(value, deltaTimeIn) {
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
    }
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
        for (j = 0; j < Fig.tools.math.roundNum(dataIn[i] * 100000); j += 1) {
          decompressed.push(0);
        }
      } else {
        decompressed.push(dataIn[i]);
      }
    }
    const decoded = Array(num);
    decoded[0] = firstValue;
    for(let i = 1; i < num; i += 1) {
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

  function getValueAtTimeAgo(timeDelta) {
    const deltaIndex = Math.floor(timeDelta / timeStep + timeStep / 10);
    return data[index - deltaIndex - 1];
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
  }
  reset();

  function getIndex() {
    return index;
  }

  function getData() {
    return data;
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
  };
}
