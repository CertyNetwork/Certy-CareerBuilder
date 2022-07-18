import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { storage } from 'utils/util';

import HttpStatusCodes from './HttpStatusCodes';
import { transformErrors } from './Utils';

const instance: any = axios.create({
  baseURL: process.env.REACT_APP_CERTY_API,
});

const AuthInterceptor = (
  config: AxiosRequestConfig | any,
): AxiosRequestConfig => {
  const accessToken = localStorage.getItem('Near_token_bearer');
  if (accessToken) config.headers['Authorization'] = accessToken;
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

const handleAccessTokenExpire = async err => {
  const originalConfig = err.config;
  const refreshToken = localStorage.getItem('REFRESH_TOKEN');
  if (refreshToken) {
    try {
      const rs = await instance.post('auth/refresh-token', {
        refreshToken,
      });
      const { accessToken } = rs.data.data;
      localStorage.setItem('Near_token_bearer', accessToken);
      return instance(originalConfig);
    } catch (_error) {
      return Promise.reject(_error);
    }
  }
};

const onResponseFailure = (error: any): Promise<any> => {
  const httpStatus = error?.response?.status;
  const errors = transformErrors(error?.response?.data);
  switch (httpStatus) {
    case HttpStatusCodes.UNAUTHORIZED:
      handleAccessTokenExpire(error);
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

instance.defaults.headers.get.Accepts = 'application/json';
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
instance.defaults.headers.common['Access-Control-Allow-Methods'] =
  'DELETE, POST, GET, OPTIONS, PUT';
instance.defaults.headers.common['Access-Control-Allow-Headers'] =
  'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Origin';

instance.interceptors.request.use(AuthInterceptor, onRequestError);

instance.interceptors.response.use(onResponseSuccess, onResponseFailure);

export default instance;
