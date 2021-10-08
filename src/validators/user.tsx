import * as Yup from 'yup';

export const userLoginSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

export const userRegisterSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
  fullName: Yup.string().required('Full Name is required'),
});
