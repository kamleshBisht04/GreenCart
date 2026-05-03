export const shuffleProduct = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};
