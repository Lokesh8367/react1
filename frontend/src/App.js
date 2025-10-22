import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/message`)
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage('Could not reach backend'));
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>
      <h1>🚀 React + Node.js + Docker</h1>
      <h2>{message}</h2>
    </div>
  );
}

export default App;
