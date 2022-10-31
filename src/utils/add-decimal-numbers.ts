export default (a: number, b: number, numberOfDecimals: number) => {
  const numCharA: number = `${a}`.split(".").slice(-1).length;
  const numCharB: number = `${b}`.split(".").slice(-1).length;

  const multiplierBase: number = !numberOfDecimals
    ? numCharA > numCharB
      ? numCharA
      : numCharB
    : numberOfDecimals;

  const multiplier: number = 10 ** multiplierBase;

  const result: number =
    Math.floor(a * multiplier + b * multiplier) / multiplier;
  return result;
};
