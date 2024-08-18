export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: NonNullable<'male' | 'female' | 'other' | undefined>;
  tnc: NonNullable<boolean | undefined>;
  picture: unknown;
  country: string;
}
