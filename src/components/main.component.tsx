import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';
import { FormData } from '../interfaces/form-data.ts';

const MainComponent: React.FC = () => {
  const { uncontrolledFormData, hookFormData, lastUpdated } = useSelector(
    (state: RootState) => state.form,
  );
  const [highlighted, setHighlighted] = useState<
    'uncontrolled' | 'hookForm' | null
  >(null);

  useEffect(() => {
    if (lastUpdated) {
      setHighlighted(lastUpdated);
      const timer = setTimeout(() => setHighlighted(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [lastUpdated]);

  const renderTiles = (
    data: FormData[],
    formType: 'uncontrolled' | 'hookForm',
  ) =>
    data.map((item, index) => (
      <div
        key={index}
        className={`tile ${highlighted === formType ? 'highlighted' : ''}`}
      >
        <h3>
          {formType === 'uncontrolled'
            ? 'Uncontrolled Form'
            : 'React Hook Form'}
        </h3>
        <p>Name: {item.name}</p>
        <p>Age: {item.age}</p>
        <p>Email: {item.email}</p>
        <p>Gender: {item.gender}</p>
        <p>Country: {item.country}</p>
        <p>Accept T&C : {item.tnc ? 'Yes' : 'No'}</p>
        <img src={item.picture as string} alt="uploaded" width="100" />
      </div>
    ));

  return (
    <div className="main-container">
      <h2>Main page</h2>
      <nav>
        <ul>
          <li>
            <Link to="/upcontroller-form">Uncontrolled Form</Link>
          </li>
          <li>
            <Link to="/react-hook-form">React Hook Form</Link>
          </li>
        </ul>
      </nav>
      <h4>Submitted Data</h4>
      <div className="tiles-container">
        {renderTiles(uncontrolledFormData, 'uncontrolled')}
        {renderTiles(hookFormData, 'hookForm')}
      </div>
    </div>
  );
};

export default MainComponent;
