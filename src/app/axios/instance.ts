import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { storage } from 'utils/util';

import HttpStatusCodes from './HttpStatusCodes';
import { transformErrors } from './Utils';

const AuthInterceptor = (
  config: AxiosRequestConfig | any,
): AxiosRequestConfig => {
  const accessToken = storage.get('access-token');
  if (accessToken) config.headers['access-token'] = accessToken;
  return config;
};

const onRequestError = (error: any) => {
  // Do something with request error
  throw error;
};

const onResponseSuccess = (
  response: AxiosResponse<any>,
): AxiosResponse<any> => {
  return response;
};

const onResponseFailure = (error: any): Promise<any> => {
  const httpStatus = error?.response?.status;
  const errors = transformErrors(error?.response?.data);
  switch (httpStatus) {
    case HttpStatusCodes.UNAUTHORIZED:
      storage.clear('access-token');
      storage.set(
        'returnURL',
        window.location.pathname + window.location.search,
      );
      window.location.replace(`${process.env.PUBLIC_URL}/session/signin`);
      break;
    case HttpStatusCodes.NOT_FOUND:
      console.log(
        errors?.length > 0 ? errors : ['Requested resource was not found.'],
      );
      break;
    case HttpStatusCodes.BAD_REQUEST:
      console.log(errors?.length > 0 ? errors : ['Bad Request.']);
      throw errors;
    case HttpStatusCodes.FORBIDDEN:
      console.log(
        errors?.length > 0 ? errors : ['Access to this resource is forbidden'],
      );
      break;
    case HttpStatusCodes.UNPROCESSABLE_ENTITY:
      // This case should be handled at the forms
      break;
    case HttpStatusCodes.INTERNAL_SERVER_ERROR:
      throw errors;
    default:
      const err =
        errors?.length > 0
          ? errors
          : ['Unknown error occurred, please try again later.'];

      throw err;
  }
  return Promise.reject(errors);
};

const instance: Readonly<AxiosInstance> = axios.create({
  baseURL: process.env.REACT_APP_NFT,
});

instance.defaults.headers.get.Accepts = 'application/json';
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
instance.defaults.headers.common['Access-Control-Allow-Methods'] =
  'DELETE, POST, GET, OPTIONS, PUT';
instance.defaults.headers.common['Access-Control-Allow-Headers'] =
  'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Origin';

instance.interceptors.request.use(AuthInterceptor, onRequestError);

instance.interceptors.response.use(onResponseSuccess, onResponseFailure);

export default instance;
