export type Currency = {
  [key: string]: {
    code: string;
    value: number;
  };
};

export type Config = {
  baseCurrency: string,
  currencies: [string],
  apiKey: string
};
