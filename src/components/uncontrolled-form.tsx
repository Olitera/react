import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUncontrolledFormData } from '../redux/slices/form-slise.ts';
import { FormData } from '../interfaces/form-data.ts';
import countries from '../data/countries.ts';
import * as Yup from 'yup';

const UncontrolledForm: React.FC = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const nameRef = useRef<HTMLInputElement>(
    null,
  ) as React.MutableRefObject<HTMLInputElement>;
  const ageRef = useRef<HTMLInputElement>(
    null,
  ) as React.MutableRefObject<HTMLInputElement>;
  const emailRef = useRef<HTMLInputElement>(
    null,
  ) as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef<HTMLInputElement>(
    null,
  ) as React.MutableRefObject<HTMLInputElement>;
  const confirmPasswordRef = useRef<HTMLInputElement>(
    null,
  ) as React.MutableRefObject<HTMLInputElement>;
  const genderRef = useRef<HTMLSelectElement>(
    null,
  ) as React.MutableRefObject<HTMLSelectElement>;
  const tncRef = useRef<HTMLInputElement>(
    null,
  ) as React.MutableRefObject<HTMLInputElement>;
  const pictureRef = useRef<HTMLInputElement>(
    null,
  ) as React.MutableRefObject<HTMLInputElement>;
  const countryRef = useRef<HTMLInputElement>(
    null,
  ) as React.MutableRefObject<HTMLInputElement>;

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
    // picture: Yup.mixed()
    // .required('Picture is required')
    country: Yup.string()
      .oneOf(countries, 'Please select a valid country')
      .required('Country is required'),
  });

  const handleFileToBase64 = async (file: File): Promise<string> => {
    try {
      const reader = new FileReader();
      return await new Promise<string>((resolve, reject) => {
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () =>
          reject(new Error('Error during decoding the file'));
      });
    } catch (error) {
      console.error('Error converting file to Base64:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    let base64Picture = '';
    if (pictureRef.current?.files?.[0]) {
      const file = pictureRef.current.files[0];
      console.log('File type:', file.type);
      console.log('File size:', file.size);
      base64Picture = await handleFileToBase64(pictureRef.current.files[0]);
    }

    const formData: FormData = {
      name: nameRef.current?.value,
      age: ageRef.current?.valueAsNumber,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender: genderRef.current?.value as NonNullable<
        'male' | 'female' | 'other'
      >,
      tnc: tncRef.current?.checked,
      picture: base64Picture,
      country: countryRef.current?.value,
    };

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      dispatch(setUncontrolledFormData(formData));
    } catch (validationError) {
      console.error('Form validation failed');
      const errorMessages: { [key: string]: string } = {};
      if (validationError instanceof Yup.ValidationError) {
        validationError.inner.forEach((error) => {
          if (error.path) {
            errorMessages[error.path] = error.message;
          }
        });
      }
      setErrors(errorMessages);
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} className="uncontrolled-form">
      <label htmlFor="name">Name</label>
      <input type="text" id="name" ref={nameRef} />
      {errors.name && <div className="error">{errors.name}</div>}

      <label htmlFor="age">Age</label>
      <input type="number" id="age" ref={ageRef} />
      {errors.age && <div className="error">{errors.age}</div>}

      <label htmlFor="email">Email</label>
      <input type="email" id="email" ref={emailRef} />
      {errors.email && <div className="error">{errors.email}</div>}

      <label htmlFor="password">Password</label>
      <input type="password" id="password" ref={passwordRef} />
      {errors.password && <div className="error">{errors.password}</div>}

      <label htmlFor="confirmPassword">Confirm password</label>
      <input type="password" id="confirmPassword" ref={confirmPasswordRef} />
      {errors.confirmPassword && (
        <div className="error">{errors.confirmPassword}</div>
      )}

      <label htmlFor="gender">Gender</label>
      <select id="gender" ref={genderRef}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      {errors.gender && <div className="error">{errors.gender}</div>}

      <label>
        <input type="checkbox" ref={tncRef} />
        Accept Terms and Conditions
      </label>
      {errors.tnc && <div className="error">{errors.tnc}</div>}

      <label htmlFor="picture">Upload Picture</label>
      <input type="file" id="picture" ref={pictureRef} accept=".png,.jpeg" />
      {errors.picture && <div className="error">{errors.picture}</div>}

      <label htmlFor="country">Country</label>
      <input type="text" id="country" ref={countryRef} list="countryList" />
      <datalist id="countryList">
        {countries.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>
      {errors.country && <div className="error">{errors.country}</div>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledForm;
