import { useQuery } from 'react-query';

import {
  getAvatar,
  getAvatarById,
  getBackground,
  getBackgroundByAccount,
  getProfile,
  getProfileType,
  getProfileUser,
} from 'app/services/profile';

export const useProfile = () => {
  const { data, refetch, error, isLoading } = useQuery(
    ['getProfile'],
    async () => await getProfile(),
  );
  return {
    dataProfile: data?.data?.data,
    refetchDataProfile: refetch,
    loadingDataProfile: isLoading,
    errorDataProfile: error,
  };
};

export const useProfileAvatar = () => {
  const { data, refetch, error, isLoading } = useQuery(
    ['getProfileAvatar'],
    async () => await getAvatar(),
  );
  return {
    dataProfileAvatar: data?.data?.data,
    refetchDataProfileAvatar: refetch,
    loadingDataProfileAvatar: isLoading,
    errorDataProfileAvatar: error,
  };
};

export const useProfileBackground = () => {
  const { data, refetch, error, isLoading } = useQuery(
    ['getProfileBackground'],
    async () => await getBackground(),
  );
  return {
    dataProfileBackground: data?.data?.data,
    refetchDataProfileBackground: refetch,
    loadingDataProfileBackground: isLoading,
    errorDataProfileBackground: error,
  };
};

export const useProfileType = () => {
  const { data, refetch, error, isLoading } = useQuery(
    ['getProfileType'],
    async () => await getProfileType(),
  );
  return {
    dataProfileType: data?.data?.data,
    refetchDataProfileAType: refetch,
    loadingDataProfileType: isLoading,
    errorDataProfileType: error,
  };
};

export const useProfileUser = (id: string) => {
  const { data, refetch, error, isLoading } = useQuery(
    ['getProfileUser'],
    async () => await getProfileUser(id),
    { enabled: !!id },
  );
  return {
    dataProfileUser: data?.data?.data,
    refetchDataUser: refetch,
    loadingDataUser: isLoading,
    errorDataUser: error,
  };
};

export const useBackgroundAccount = (id: string) => {
  const { data, refetch, error, isLoading } = useQuery(
    ['getBackground'],
    async () => await getBackgroundByAccount(id),
    { enabled: !!id },
  );
  return {
    dataBackground: data?.data?.data,
    refetchDataBackground: refetch,
    loadingDataBackground: isLoading,
    errorDataBackground: error,
  };
};

export const useAvatarAccount = (id: string) => {
  const { data, refetch, error, isLoading } = useQuery(
    ['getAvatar'],
    async () => await getAvatarById(id),
    { enabled: !!id },
  );
  return {
    dataProfileAvatar: data?.data?.data,
    refetchDataAvatar: refetch,
    loadingDataAvatar: isLoading,
    errorDataAvatar: error,
  };
};
