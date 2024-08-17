import React from 'react';
import { Link } from 'react-router-dom';

const MainComponent: React.FC = () => {
  return (
    <div>
      <h1>Main page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/upcontroller-form">Upcontroller Form</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MainComponent;
