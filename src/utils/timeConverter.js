const timeConverter = (milliseconds) => {
  const pad = (n, z = 2) => ('00' + n).slice(-z);
  const hh = pad((milliseconds / 3.6e6) | 0);
  const mm = pad(((milliseconds % 3.6e6) / 6e4) | 0);
  const ss = pad(((milliseconds % 6e4) / 1000) | 0);
  const mmm = pad(milliseconds % 1000, 3);

  return `${hh}:${mm}:${ss}.${mmm}`;
};
export default timeConverter;
