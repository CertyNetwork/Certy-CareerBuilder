import * as Yup from 'yup';

export const ApplyJobSchema = Yup.object().shape({
  mobile: Yup.string().required('Mobile is required'),
  email: Yup.string()
    .email('Email invalid format')
    .required('Email is required'),
  resume: Yup.string().required('Resume is required'),
  cover: Yup.mixed().required('Cover is required'),
});
