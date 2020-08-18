import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState("FAIL");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/healthcheck");
      const json = await res.json();
      setData(json.body);
    };
    fetchData().then(null).catch((err) => console.log(err));
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Express Connection Status: {data}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
