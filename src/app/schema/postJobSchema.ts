import * as Yup from 'yup';

export const PostJobSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  specialties: Yup.string().required('Specialties is required'),
  qualification: Yup.string().required('Qualification is required'),
  experiences: Yup.string().required('Experiences is required'),
  location: Yup.string().required('Location is required'),
  salary: Yup.string().required('Salary is required'),
  department: Yup.string().required('Department is required'),
  deadline: Yup.string().required('Deadline is required'),
});
