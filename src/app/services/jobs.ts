import BaseApi from 'app/axios/instance';

export const getAppliedJob = () => {
  return BaseApi.get(`job/get-applied-jobs`);
};

export const getCandidatesById = (id: string) => {
  return BaseApi.get(`job/${id}/candidates`);
};

export const applyJob = params => {
  return BaseApi.post('job/apply', params, {
    headers: { 'Content-type': 'multipart/form-data' },
  });
};

export const getCandidates = () => {
  return BaseApi.get('job/candidates');
};

export const getFile = params => {
  return BaseApi.post('job/get-applicant-documents', params);
};
