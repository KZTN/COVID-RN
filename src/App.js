import React, {useState} from 'react';
import Routes from './routes';
import emblem from './assets/RN_emblem.png';
import DateTime from './utils/datetime';
import {FaSearch} from 'react-icons/fa';
import './App.css';
function App() {
  const [cidade, setCidade] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    alert(cidade);
    setCidade('');
  }

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
      <form onSubmit={handleSubmit}>
        <input type="text" value={cidade} onChange={e => setCidade(e.target.value)} placeholder="Busque por sua cidade"/>
        <button type="submit"><FaSearch size={24} color="#a277f6"/></button>
      </form>
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
