import BaseApi from 'app/axios/instance';

export const upload = file => {
  let formData = new FormData();
  formData.append('files', file);
  return BaseApi.post(`web3-storage/put-files`, formData, {
    headers: { 'Content-type': 'multipart/form-data' },
  });
};
