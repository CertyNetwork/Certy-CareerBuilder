import BaseApi from 'app/axios/instance';

export const getNonce = accountId => {
  return BaseApi.get(`auth/get-nonce/${accountId}`);
};

export const signCerty = params => {
  return BaseApi.post('auth', params);
};

export const refreshAccessToken = (token: string) => {
  return BaseApi.post('auth/refresh-token', { refreshToken: token });
};
