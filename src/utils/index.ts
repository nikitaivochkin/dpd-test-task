import omitBy from 'lodash.omitby';

export const createArray = (n: number): number[] => [...Array(n)].map((_, i) => i + 1);

type BuildURLParams = {
  [key: string]: string,
};

export const buildURL = (params: BuildURLParams): void => {
  const { location: { pathname, origin, search } } = window;

  const currentUrlParams = new URLSearchParams(search.substr(1));
  const currentSerchParams = Object.fromEntries(currentUrlParams);
  const resultedParams = omitBy({ ...currentSerchParams, ...params }, (value) => !value);

  const searchParams = new URLSearchParams(resultedParams).toString();
  window.history.replaceState({}, '', `${origin}${pathname}?${searchParams}`);
};
