import * as Yup from 'yup';
import moment from 'moment';

const signUpRegularExp: any =
  '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Username/Email Required')
    .email('Invalid Email'),
  password: Yup.string()
    .required('Password Required')
    .min(8, 'Password Too Short'),
});

export const ForgotPasswordPhoneSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required('Phone Number Required')
    .min(10, 'Enter complete number'),
});

export const ForgotPasswordEmailSchema = Yup.object().shape({
  email: Yup.string().required('Email Required').email('Invalid email'),
});

export const SignUpSchema = Yup.object().shape({
  fullName: Yup.string().required('First Name Required'),
  middleName: Yup.string().required('Middle Name Required'),
  lastName: Yup.string().required('Last Name Required'),
  email: Yup.string().required('Email Required').email('Invalid Email'),
  password: Yup.string()
    .required('Password Required')
    .min(8, 'Password Too Short')
    .matches(
      signUpRegularExp,
      'Your password must be 8 characters long should contain at-least 1 Upercase , 1 Lowercase, 1 numeric and 1 special character.',
    ),
  confirmPassword: Yup.string()
    .required('Confirm Your Password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  phoneNumber: Yup.string().required('Phone No. is Required'),
  dateOfBirth: Yup.string()
    .required('Date of Birth is Required')
    .test('DOB', 'You have to be 18 years or older to sign up', value => {
      return moment().diff(moment(value), 'years') >= 18;
    }),
});

export const supportScheme = Yup.object().shape({
  // subjectLine: Yup.string().required('Please write subject'),
  content: Yup.string().required('Please write your issue'),
});

export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password Required')
    .min(8, 'Password Too Short')
    .matches(
      signUpRegularExp,
      'Your password must be 8 characters long should contain at-least 1 Upercase , 1 Lowercase, 1 numeric and 1 special character.',
    ),
  confirmPassword: Yup.string()
    .required('Confirm Your Password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const editProfileSchema = Yup.object().shape({
  fullName: Yup.string().required('First Name Required'),
  phoneNumber: Yup.string()
    .required('Phone Number Required')
    .min(10, 'Enter complete number'),
  middleName: Yup.string().required('Middle Name Required'),
  lastName: Yup.string().required('Last Name Required'),
  email: Yup.string().required('Email Required').email('Invalid Email'),
  // gender:Yup.string().required('Gender Required'),
});
