export const cloneDeep = <T extends Record<string, unknown>>(value: T): T => {
  return JSON.parse(JSON.stringify(value)) as T;
};
