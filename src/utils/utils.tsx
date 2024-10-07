// utils/formatNumber.ts
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

export const abbrAddress = (address: string, startLength = 6, endLength = 4): string => {
  if (!address) return '';
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
};