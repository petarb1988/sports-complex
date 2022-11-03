export default () => (birthDate: string) => {
  try {
    const birthYear = +birthDate.slice(0, 4);
    const birthMonth = +birthDate.slice(5, 7);
    const birthDay = +birthDate.slice(8);

    const now: Date = new Date();
    const currentYear: number = now.getFullYear();
    const yearDiff: number = currentYear - birthYear;
    const birthdayThisYear: Date = new Date(currentYear, birthMonth, birthDay);
    const age: number = now >= birthdayThisYear ? yearDiff : yearDiff - 1;

    return age;
  } catch (error) {
    return null;
  }
};
