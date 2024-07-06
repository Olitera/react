import React from 'react';
import './App.css';

function App() {
  const [count, setCount] = React.useState(0);
  return (
    <>
      <div className="container">
        <section className="top">
          <button onClick={() => setCount(count => count + 1)}>
            count is: {count}
          </button>
        </section>
        <section className="bottom"></section>
      </div>
    </>
  );
}

export default App;
