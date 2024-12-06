export const removePdfExtension = (text: string) => {
  return text.replace(/\.pdf$/, "");
};
