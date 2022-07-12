import BaseApi from 'app/axios/instance';

export const getAvatar = () => {
  return BaseApi.get(`profile/me/avatar`);
};

export const getProfile = () => {
  return BaseApi.get(`profile/me`);
};

export const getProfileType = () => {
  return BaseApi.get(`profile/type`);
};
