import BaseApi from 'app/axios/instance';

export const getAvatar = () => {
  return BaseApi.get(`profile/me/avatar`);
};

export const getBackground = () => {
  return BaseApi.get(`profile/me/bg-image`);
};

export const getProfile = () => {
  return BaseApi.get(`profile/me`);
};

export const getProfileUser = (userId: string) => {
  return BaseApi.get(`profile/public/${userId}`);
};

export const getProfileType = () => {
  return BaseApi.get(`profile/type`);
};
