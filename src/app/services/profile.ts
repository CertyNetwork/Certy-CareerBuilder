import BaseApi from 'app/axios/instance';

export const getAvatar = () => {
  return BaseApi.get(`profile/me/avatar`);
};

export const getAvatarById = (accountId: string) => {
  return BaseApi.get(`profile/avatar/${accountId}`);
};

export const getBackground = () => {
  return BaseApi.get(`profile/me/bg-image`);
};

export const getBackgroundByAccount = (accountId: string) => {
  return BaseApi.get(`profile/bg/${accountId}`);
};

export const getProfile = () => {
  return BaseApi.get(`profile/me`);
};

export const getProfileUser = (userId: string) => {
  return BaseApi.get(`profile/public/${userId}`);
};

export const getProfileByAccount = (userId: string) => {
  return BaseApi.get(`profile/accounts/${userId}`);
};

export const getProfileType = () => {
  return BaseApi.get(`profile/type`);
};
