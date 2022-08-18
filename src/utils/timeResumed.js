export const timeReducer = (arr) => {
  return arr.reduce((sum, next, i) => {
    if (i % 2) {
      return sum + (next - arr[i - 1]);
    }
    return sum;
  }, 0);
};

const timeResumed = (item, isPaused) => {
  const hasToggles = Boolean(item.toggles?.length);

  // Function that takes an array of times,  subtract them in pairs and then and sum the pairs

  // if it started and never stopped
  if (!hasToggles) {
    return Date.now() - item.started;
  }
  // if it is paused, we add only the started time to the arr
  if (isPaused) {
    const arr = [item.started, ...item.toggles];
    return timeReducer(arr);
  }
  // if it is resumed, we add the started time and the time now in ms
  const arr = [item.started, ...item.toggles, Date.now()];
  return timeReducer(arr);
};

export default timeResumed;
