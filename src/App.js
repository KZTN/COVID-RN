import React from 'react';
import Routes from './routes';
import emblem from './assets/RN_emblem.png';

import './App.css';

function App() {

  return (
    <div className="container">
      <header>
        <div className="title-box">
          <h1><strong><a href="/"> COVID-19 RN</a></strong></h1>
        </div>
      </header>
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
          <img src={emblem} alt="Logomarca RN"/>
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
