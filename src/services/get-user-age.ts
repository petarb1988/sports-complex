export default () => (birthDate: string) => {
  const birthDateConverted: Date = new Date(birthDate);
  const now: Date = new Date();
  const currentYear: number = now.getFullYear();
  const yearDiff: number = currentYear - birthDateConverted.getFullYear();
  const birthdayThisYear: Date = new Date(
    currentYear,
    birthDateConverted.getMonth(),
    birthDateConverted.getDate()
  );
  const age: number = now >= birthdayThisYear ? yearDiff : yearDiff - 1;

  return age;
};
