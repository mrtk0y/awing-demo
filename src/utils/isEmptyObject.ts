
export const isEmpty = (obj: unknown) =>
  obj instanceof Object && Object.entries(obj).length === 0;
