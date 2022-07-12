import { useQuery } from 'react-query';

import { getAvatar, getProfile, getProfileType } from 'app/services/profile';

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
