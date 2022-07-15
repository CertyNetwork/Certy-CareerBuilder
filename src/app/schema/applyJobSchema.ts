import * as Yup from 'yup';

export const ApplyJobSchema = Yup.object().shape({
  contactNumber: Yup.string().required('Mobile is required'),
  contactEmail: Yup.string()
    .email('Email invalid format')
    .required('Email is required'),
});
