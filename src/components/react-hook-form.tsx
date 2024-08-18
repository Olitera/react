import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setHookFormData } from '../redux/slices/form-slise.ts';
import { FormData } from '../interfaces/form-data.ts';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import countries from '../data/countries.ts';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter')
    .required('Name is required'),
  age: Yup.number()
    .min(0, 'Age must be a positive number')
    .required('Age is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[\W_]/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  gender: Yup.string()
    .oneOf(['male', 'female', 'other'], 'Invalid gender')
    .required('Gender is required'),
  tnc: Yup.bool()
    .oneOf([true], 'You must accept the Terms and Conditions')
    .required('You must accept the Terms and Conditions'),
  picture: Yup.mixed().required('Picture is required'),

  country: Yup.string().required('Country is required'),
});

const HookForm: React.FC = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmita = (data: FormData) => {
    if (data.picture instanceof File) {
      const reader = new FileReader();
      reader.readAsDataURL(data.picture);
      reader.onload = () => {
        const base64Picture = reader.result as string;
        const formData = { ...data, picture: base64Picture };
        dispatch(setHookFormData(formData));
      };
      reader.onerror = () => {
        console.error('File reading failed');
      };
    } else {
      dispatch(setHookFormData(data));
    }
  };

  return (
    <form
      onSubmit={(e) => void handleSubmit(onSubmita)(e)}
      className="hook-form"
    >
      <label htmlFor="name">Name</label>
      <input type="text" id="name" {...register('name')} />
      {errors.name && <div className="error">{errors.name.message}</div>}

      <label htmlFor="age">Age</label>
      <input type="number" id="age" {...register('age')} />
      {errors.age && <div className="error">{errors.age.message}</div>}

      <label htmlFor="email">Email</label>
      <input type="email" id="email" {...register('email')} />
      {errors.email && <div className="error">{errors.email.message}</div>}

      <label htmlFor="password">Password</label>
      <input type="password" id="password" {...register('password')} />
      {errors.password && (
        <div className="error">{errors.password.message}</div>
      )}

      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="password"
        id="confirmPassword"
        {...register('confirmPassword')}
      />
      {errors.confirmPassword && (
        <div className="error">{errors.confirmPassword.message}</div>
      )}

      <label htmlFor="gender">Gender</label>
      <select id="gender" {...register('gender')}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      {errors.gender && <div className="error">{errors.gender.message}</div>}

      <label htmlFor="tnc">
        <input type="checkbox" id="tnc" {...register('tnc')} />
        Accept Terms and Conditions
      </label>
      {errors.tnc && <div className="error">{errors.tnc.message}</div>}

      <label htmlFor="picture">Upload Picture</label>
      <input
        type="file"
        id="picture"
        {...register('picture')}
        accept=".jpeg,.png"
      />
      {errors.picture && <div className="error">{errors.picture.message}</div>}

      <label htmlFor="country">Country</label>
      <Controller
        control={control}
        name="country"
        render={({ field }) => (
          <input type="text" id="country" list="countryList" {...field} />
        )}
      />
      <datalist id="countryList">
        {countries.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>
      {errors.country && <div className="error">{errors.country.message}</div>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default HookForm;
