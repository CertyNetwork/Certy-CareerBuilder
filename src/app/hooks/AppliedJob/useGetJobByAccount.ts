import { gql, useQuery } from '@apollo/client';

const FIND_JOB = gql`
  query Job($where: Job_filter) {
    jobByAccount: jobs(
      where: $where
      orderBy: updated_at
      orderDirection: desc
    ) {
      id
      owner_id
      extra
      reference
      reference_hash
      reference_result
      title
      description
      issued_at
      updated_at
      work_location_country
      work_location_city
      job_type
      application_deadline
      salary_from
      salary_to
      experience_level
      job_specialities {
        id
        value
      }
    }
  }
`;

export const useGetJobByAccount = whereJob => {
  const { data, error, loading } = useQuery(FIND_JOB, {
    notifyOnNetworkStatusChange: true,
    variables: {
      where: whereJob,
    },
  });
  return {
    dataJob: data?.jobByAccount,
    loadingJob: loading,
    errorJob: error,
  };
};
