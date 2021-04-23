import moment from 'moment';
import * as Yup from 'yup';

// const nameSchema = Yup.string()
//   .min(2, 'error.short')
//   .max(50, 'error.long')
//   .required('error.mandatory');

// const emailSchema = Yup.string()
//   .email('error.badEmail')
//   .required('error.mandatory');

// const passwordSchema = Yup.string()
//   .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, 'error.weakPassword')
//   .required('error.mandatory');

// const oldPasswordSchema = Yup.string().required('error.mandatory');

// const passwordCheckSchema = Yup.string()
//   .oneOf([Yup.ref('password'), null], 'error.samePassword')
//   .required('error.mandatory');

// export const loginSchema = Yup.object().shape({
//   email: emailSchema,
//   password: oldPasswordSchema,
// });

// export const resetPasswordSchema = Yup.object().shape({
//   email: emailSchema,
// });

// export const registerSchema = Yup.object().shape({
//   email: emailSchema,
//   password: passwordSchema,
//   passwordCheck: passwordCheckSchema,
// });

// export const passwordChangeSchema = Yup.object().shape({
//   oldPassword: oldPasswordSchema,
//   password: passwordSchema,
//   passwordCheck: passwordCheckSchema,
// });

// export const profileSchema = Yup.object().shape({
//   firstName: nameSchema,
//   lastName: nameSchema,
//   email: emailSchema,
//   birth: ageSchema,
//   gender: genderSchema,
// });
