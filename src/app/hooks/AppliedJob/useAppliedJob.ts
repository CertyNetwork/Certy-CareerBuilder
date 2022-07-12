import { useQuery } from 'react-query';

import { getAppliedJob } from 'app/services/jobs';

export const useAppliedJob = () => {
  const { data, refetch, error, isLoading } = useQuery(
    ['getAppliedJob'],
    async () => await getAppliedJob(),
  );
  return {
    dataAppliedJob: data?.data,
    refetchDataAppliedJob: refetch,
    loadingDataAppliedJob: isLoading,
    errorDataAppliedJob: error,
  };
};
