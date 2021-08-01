import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/api/ping');

      setData((prev) => [...prev, data.message]);
    };

    const timer = window.setInterval(() => {
      fetchData();
    }, 5000);
    fetchData();

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>{JSON.stringify(data)}</p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
