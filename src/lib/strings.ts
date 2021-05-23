export const omitByCount = (s: string, max: number): string => {
  if (s.length > max) {
    return s.substr(0, max) + '...';
  } else {
    return s;
  }
};
