import TextField from '@mui/material/TextField';
import { FormikProps, useFormik } from 'formik';
import { useAuthContext } from 'src/contexts/context/LoginAuthContext';
import { object, ref, string } from 'yup';

export type RegisterValues = {
  email: string;
  login: string;
  name: string;
  password: string;
  repeatPassword: string;
  surname: string;
};

const RegisterInput = ({
  label,
  formik,
  inputValue,
  type,
}: {
  formik: FormikProps<RegisterValues>;
  inputValue: keyof RegisterValues;
  label: string;
  type: string;
}) => (
  <>
    {type === 'password' ? (
      <TextField
        type='password'
        id={inputValue}
        name={inputValue}
        label={label}
        onChange={formik.handleChange}
        value={formik.values[inputValue]}
      />
    ) : (
      <TextField
        id={inputValue}
        name={inputValue}
        label={label}
        onChange={formik.handleChange}
        value={formik.values[inputValue]}
        error={Boolean(formik.touched[inputValue]) && Boolean(formik.errors[inputValue])}
        helperText={
          formik.touched[inputValue] && formik.errors[inputValue] ? formik.errors[inputValue] : null
        }
      />
    )}
  </>
);

const RegisterSchema = object({
  name: string()
    .required('Name is required')
    .matches(/^[\w]{3,}$/),
  surname: string()
    .required('Surname is required')
    .matches(/^[\w]{3,}$/),
  login: string()
    .required('Login is required')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).+$/),
  password: string()
    .required('Password is required')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).+$/),
  repeatPassword: string()
    .required('Passwords must match')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).+$/)
    .oneOf([ref('password')]),
  email: string()
    .required('E-mail is required')
    .matches(/^[\w]+@[a-z]+\.[a-z]{2,3}$/),
});

export default function FakeRegister() {
  //! Context API
  const { addUser } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      login: '',
      password: '',
      repeatPassword: '',
      email: '',
    },
    onSubmit: (values: RegisterValues) => {
      addUser(values);
    },
    validationSchema: RegisterSchema,
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '500px' }}
    >
      <RegisterInput label='Name' formik={formik} inputValue='name' type='text' />
      <RegisterInput label='Surname' formik={formik} inputValue='surname' type='text' />
      <RegisterInput label='Login' formik={formik} inputValue='login' type='text' />
      <RegisterInput label='Password' formik={formik} inputValue='password' type='text' />
      <RegisterInput
        label='Repeat Password'
        formik={formik}
        inputValue='repeatPassword'
        type='text'
      />
      <RegisterInput label='E-mail' formik={formik} inputValue='email' type='text' />

      <button type='submit'>Register</button>
    </form>
  );
}
