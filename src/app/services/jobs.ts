import BaseApi from 'app/axios/instance';

export const getAppliedJob = () => {
  return BaseApi.get(`job/get-applied-jobs`);
};

export const getCandidates = (id: string) => {
  return BaseApi.get(`job/${id}/candidates`);
};

export const applyJob = params => {
  return BaseApi.post('job/apply', params);
};
