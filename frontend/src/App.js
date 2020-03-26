import React from 'react';
import Routes from './routes';
import logo from './assets/Virus.svg';
import './App.css';
function App() {
  return (
    <div className="container">
      <header>
        <img src={logo} alt="Logomarga COVID-19 RN"/>
        <a href=".">COVID-19 RN</a>
      </header>
      <p>Rastreador de casos de coronavírus do Rio Grande do Norte em tempo real</p>
      <div className="content">
        <Routes />
      </div>
      <div className="footer">
        <p>Footer</p>
      </div>
    </div>
  );
}

export default App;
