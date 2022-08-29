const timeConverter = (timeStamp) => {
  // Pad to 2 or 3 digits, default is 2
  function pad(n, z) {
    z = z || 2;
    return ('00' + n).slice(-z);
  }

  const ms = timeStamp % 1000;
  timeStamp = (timeStamp - ms) / 1000;
  const secs = timeStamp % 60;
  timeStamp = (timeStamp - secs) / 60;
  const mins = timeStamp % 60;
  const hrs = (timeStamp - mins) / 60;

  return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
};
export default timeConverter;
