import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

export const instance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

interface RequestParams {
  params?: object,
  headers?: object,
}

interface PostRequestParams extends RequestParams {
  data: object,
  method?: 'post' | 'put' | 'patch' | 'delete',
}

export const postRequest = async (
  url: string,
  reqParams?: PostRequestParams,
) => {
  const {
    data = {},
    headers = {},
    params = {},
    method = 'post',
  } = reqParams ?? {};

  const config: any = {
    headers,
    params,
  };

  const res = await instance[method](url, data, config);
  return res;
};

export const getRequest = async (
  url: string,
  reqParams?: RequestParams,
) => {
  const {
    params = {},
    headers = {},
  } = reqParams ?? {};

  const config: any = {
    url,
    params,
    headers,
  };

  const res = await instance.get(url, config);
  return res;
};
