let currentTimer = null;
function setSystemTimer(n, cb) {
  if (currentTimer) {
    clearTimeout(currentTimer);
  }

  currentTimer = setTimeout(() => {
    cb();
    currentTimer = null;
  }, n);
}

function setIntervals(intervals, cbs) {
  let passed = 0;

  function setNextTimer() {
    // Calculate the time for each interval from the current passed time
    const timesForIntervals = intervals.map(interval => {
      //interval - (passed % interval)
      // console.log("interval", interval )
      // console.log("passed % interval", passed % interval)
      // console.log("reult", interval - (passed % interval))
      return interval - (passed % interval)

    });

  //  console.log("timesForIntervals", timesForIntervals)

    // Find the smallest time from the calculated times
    const minTime = Math.min(...timesForIntervals);
    //console.log("minTime", minTime)

    // Identify which interval has this time
    const nextIntervalIndex = timesForIntervals.indexOf(minTime);

    
    // Calculate the delay for the next event
    const delay = intervals[nextIntervalIndex] - (passed % intervals[nextIntervalIndex]);
    //console.log("delay", delay)

    setSystemTimer(delay * 1000, () => {
      cbs[nextIntervalIndex]();
      passed += delay;
      setNextTimer();
    });
  }

  // Start recursive func
  setNextTimer();
}

const start = Date.now();
const cb1 = () => console.log('Timer 1: ', (Date.now() - start)/1000 + 's');
const cb2 = () => console.log('Timer 2: ', (Date.now() - start)/1000 + 's');
const cb3 = () => console.log('Timer 3: ', (Date.now() - start)/1000 + 's');

const intervals = [3, 5, 7];
const cbs = [cb1, cb2, cb3];

setIntervals(intervals, cbs);


/*
Expected output
[(3s) Timer 1: 3s
(5s) Timer 2: 5s
(6s) Timer 1: 6s
(7s) Timer 3: 7s
....
(15s) Timer 1: 15s ?
(15s) Timer 2: 15s]    
*/
