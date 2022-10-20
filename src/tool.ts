export const rawToPreview = (str: string) => {
  return JSON.stringify(JSON.parse(str), null, 4);
};
