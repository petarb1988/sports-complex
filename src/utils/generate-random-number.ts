export default (numberOfDigits: number = 6) => {
  const multiplier = 10 ** (numberOfDigits - 1);
  return Math.floor((Math.random() + 1) * multiplier);
};
