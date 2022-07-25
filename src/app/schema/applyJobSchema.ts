import * as Yup from 'yup';

export const ApplyJobSchema = Yup.object().shape({
  contactNumber: Yup.string().required('Mobile is required'),
  contactEmail: Yup.string()
    .email('Email invalid format')
    .required('Email is required'),
  resume: Yup.mixed().test('required', 'You need to provide a file', file => {
    // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
    if (file) return true;
    return false;
  }),
  coverLetter: Yup.mixed().test(
    'required',
    'You need to provide a file',
    file => {
      // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
      if (file) return true;
      return false;
    },
  ),
});
