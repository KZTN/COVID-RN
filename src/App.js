import React from 'react';
import Routes from './routes';
import DateTime from './utils/datetime';
import './App.css';
function App() {
  return (
    <div className="container">
      <header>
        <div className="title-box">
          <strong>COVID-19 RN</strong>
        </div>
      </header>
      <div className="box-situation">
        <p>Situação do</p>
          <div className="box-rn">
            <h1><strong><mark>Rio grande do Norte</mark></strong></h1>
          </div>
      </div>
      <div className="box-datetime">
        <span>até às 21h do dia 5 de abril</span>
      </div>
      <div className="content">
        <main>
          <Routes/>
        </main>
      </div>
    </div>
  );
}

export default App;
