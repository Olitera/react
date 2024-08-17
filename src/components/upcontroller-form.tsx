import React from 'react';

const UpcontrollerForm: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="upcontroller-form">
      <label htmlFor="name">Name</label>
      <input type="text" id="name" required />
      <label>Age</label>
      <input type="number" required />
      <label>Email</label>
      <input type="email" required />
      <label>Password</label>
      <input type="password" required />
      <label>Confirm password</label>
      <input type="password" required />
      <label>Gender</label>
      <select required>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <label>
        <input type="checkbox" required />
        Accept Terms and Conditions
      </label>
      <label>Upload Picture</label>
      <input type="file" accept=".png,.jpeg" />
      <label htmlFor="country">Country</label>
      <input type="text" id="country" list="countryList" required />
      <datalist id="countryList"></datalist>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UpcontrollerForm;
