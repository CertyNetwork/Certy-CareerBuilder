import * as Yup from 'yup';

export const PostJobSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  location: Yup.string().required('Location is required'),
  department: Yup.string().required('Department is required'),
  jobType: Yup.string().required('Job type is required'),
});
