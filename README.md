## interval-scheduler-nodejs

## Custom Interval Scheduler

This utility helps in scheduling multiple functions (callbacks) to be invoked at different intervals. It has been built using JavaScript's `setTimeout` mechanism and provides an easy-to-use API to manage multiple intervals.

### How it works

1. **Global Timer Reference**:
    A global reference (`currentTimer`) is used to keep track of any active timer. This ensures that there's always only one active timer, and it can be cleared if required.

2. **Setting a System Timer (`setSystemTimer` function)**:
    - Accepts a delay (`n` in milliseconds) and a callback function (`cb`).
    - If there's an active timer, it gets cleared.
    - A new timer is set using `setTimeout`, which after the delay, invokes the callback and then resets the global timer reference.

3. **Scheduling Intervals (`setIntervals` function)**:
    - Uses two parameters: an array of intervals (`intervals`) and the corresponding array of callback functions (`cbs`).
    - Internally, a function `setNextTimer` is defined, which calculates the next closest interval and schedules the respective callback.
    - It does this by:
        - Calculating the remaining time for each interval based on the passed time.
        - Finding the smallest remaining time and identifying the corresponding interval and callback.
        - Setting a system timer for the identified delay.

### Usage Example

```javascript
const start = Date.now();

const cb1 = () => console.log('Timer 1: ', (Date.now() - start)/1000 + 's');
const cb2 = () => console.log('Timer 2: ', (Date.now() - start)/1000 + 's');
const cb3 = () => console.log('Timer 3: ', (Date.now() - start)/1000 + 's');

const intervals = [3, 5, 7];
const cbs = [cb1, cb2, cb3];

setIntervals(intervals, cbs);
```

#### Expected Output

Based on the usage example, the expected sequence of events is:

```
(3s) Timer 1: 3s
(5s) Timer 2: 5s
(6s) Timer 1: 6s
(7s) Timer 3: 7s
...
(15s) Timer 1: 15s
(15s) Timer 2: 15s
```

### Notes

- Ensure that the length of the `intervals` array matches the length of the `cbs` array.
- The implementation assumes unique intervals. If you have two identical intervals, one of the callbacks will be ignored.

---

By using this custom interval scheduler, developers can manage multiple intervals with ease, ensuring the correct function is called at the specified intervals.




This code aims to repeatedly call a set of callback functions based on a specific set of intervals. I'll break it down step-by-step:

1. **Global Variable `currentTimer`**: This variable will store a timer, which allows the code to clear (or cancel) a timer if it's currently active.

2. **`setSystemTimer(n, cb)` Function**:
   - Checks if `currentTimer` is active (i.e., has a value). If it is, then it clears (or cancels) that timer using `clearTimeout()`.
   - Then, it creates a new timer that waits for `n` milliseconds and then runs the callback function `cb`. After the callback has been called, `currentTimer` is reset to `null`.

3. **`setIntervals(intervals, cbs)` Function**:
   - This is the main function, designed to repeatedly call a set of callbacks (`cbs`) based on a specific set of intervals (`intervals`).
   - It maintains a local variable `passed` to track the total time that has passed since the function began running.
   - The nested function `setNextTimer()` calculates the delay for the next callback to run, sets a timer for that delay, and then runs the appropriate callback.

4. **Calculating the Next Callback**:
   - For each interval, the code calculates the remaining time to reach the next multiple of that interval.
   - The code then finds the smallest remaining time (i.e., the next callback that should run).
   - Based on the smallest remaining time, the code identifies which callback to run next.
   - `setSystemTimer()` is then used to wait for the appropriate delay, after which the chosen callback is executed, the `passed` time is updated, and `setNextTimer()` is called again to continue the cycle.

5. **Test Setup**:
   - `start` captures the current time to provide a reference point.
   - Three callback functions `cb1`, `cb2`, and `cb3` are defined, each of which logs the time elapsed since `start` when they are called.
   - `intervals` is an array of time intervals (in seconds), and `cbs` is an array of the corresponding callback functions.
   - `setIntervals(intervals, cbs)` is then called to start the cycle of timers.

6. **Expected Output**:
   - The provided comments indicate the expected behavior of the code. Callbacks should be called based on the time intervals provided in the `intervals` array. For instance, at 3 seconds, `cb1` should run, at 5 seconds, `cb2` should run, and so forth.

The logic now handles the intervals properly, ensuring that the callbacks run at the expected times.