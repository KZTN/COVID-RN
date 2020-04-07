import React from 'react';
import Routes from './routes';
import emblem from './assets/RN_emblem.png';
import DateTime from './utils/datetime';
import './App.css';
function App() {
  return (
    <div className="container">
      <header>
        <div className="title-box">
          <h1><strong>COVID-19 RN</strong></h1>
        </div>
      </header>
      <div className="box-situation">
        <p>Situação do</p>
          <div className="box-rn">
            <h1><strong><mark>Rio grande do Norte</mark></strong></h1>
          </div>
      </div>
      <div className="box-datetime">
        <span><DateTime/></span>
      </div>
      <div className="content">
        <main>
          <Routes/>
        </main>
      </div>
      <footer>
        <div className="slogan-rn">
          <span>RIO GRANDE DO NORTE</span>
          <h2>FORTE NO COMBATE</h2>
          <h2>AO CORONAVIRUS</h2>
        </div>
        <div className="emblema-rn">
          <img src={emblem} alt="" srcset=""/>
        </div>
        <div className="hashtag">
          <div className="hashtag-item"><span>#FIQUEEMCASA</span></div>
          <div className="hashtag-item"><span>#RNCONTRACOVID-19</span></div>
        </div>
      </footer>
    </div>
  );
}

export default App;
