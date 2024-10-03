export const cloneDeep = <T extends Record<string, unknown>>(value: T): T => {
  return JSON.parse(JSON.stringify(value)) as T;
};

export function findMidpoint(a: number, b: number): number {
  return (a + b) / 2;
}

export const formatPrice = (price: number): string => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
