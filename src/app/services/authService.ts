import BaseApi from 'app/axios/instance';

export const getNonce = accountId => {
  return BaseApi.get(`auth/get-nonce/${accountId}`);
};

export const signCerty = params => {
  return BaseApi.post('auth', params);
};
