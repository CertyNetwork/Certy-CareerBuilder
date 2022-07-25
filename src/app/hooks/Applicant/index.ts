import { useQuery } from 'react-query';

import { getCandidates } from 'app/services/jobs';

export const useApplicant = () => {
  const { data, refetch, error, isLoading } = useQuery(
    ['getApplicant'],
    async () => await getCandidates(),
  );
  return {
    dataApplicant: data?.data?.data,
    refetchDataApplicant: refetch,
    loadingDataApplicant: isLoading,
    errorDataApplicant: error,
  };
};
