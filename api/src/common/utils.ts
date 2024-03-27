export const cleanObject = <T>(e: Partial<T>) => {
  const keys = Object.keys(e);
  let res = {};

  keys.forEach((key) => {
    if (e[key as keyof typeof e] !== undefined) {
      res = {
        ...res,
        [key]: e[key as keyof typeof e],
      };
    }
  });

  return res;
};
