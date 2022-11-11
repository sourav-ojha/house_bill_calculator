export const urlEncoder = (text: string) => {
  let res = text.replace(" ", "+").replaceAll("\n", "%0A");
  return res;
};
