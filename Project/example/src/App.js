import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Dashboard from './Dashboard';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from your backend API
    axios.get('http://localhost:8080/api/data')
      .then(response => {
        setData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dashboard</h1>
      </header>
      <main>
        <Dashboard data={data} />
      </main>
    </div>
  );
}

export default App;
