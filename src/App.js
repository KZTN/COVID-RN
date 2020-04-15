import React from 'react';
import Routes from './routes';
import emblem from './assets/RN_emblem.png';
import MapContainer from './components/Map';
import {FaFacebook, FaGithub, FaTwitter, FaWhatsapp} from 'react-icons/fa';
import News from './components/News';
import ModalAlert from './components/ModalAlert';
import {withScriptjs, withGoogleMap} from 'react-google-maps'
import './App.css';
import 'dotenv';

function App() {
  function popupFB() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      window.open('https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcovid-rn.herokuapp.com&t=Veja as cidades brasileiras com casos confirmados de coronavírus. No mapa do mundo','popup','width=600,height=600'); 
      return false; 
    }
    window.open('https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcovid-rn.herokuapp.com&t=Veja as cidades brasileiras com casos confirmados de coronavírus. No mapa do mundo','popup','width=600,height=600'); 
    return false;
  }

  function popupGH() {
    window.open('https://github.com/KZTN/COVID-RN','_blank'); 
    return false;
  }

  function popupTT() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      window.open('twitter://post?message=Confira os últimos casos de coronavirus do RN https%3A%2F%2Fcovid-rn.herokuapp.com','popup','width=600,height=600'); 
      return false; 
    }
    window.open('https://twitter.com/intent/tweet?url=https%3A%2F%2Fcovid-rn.herokuapp.com&text=Confira os últimos casos de coronavirus do RN','popup','width=600,height=600'); 
    return false;
  }
  function popupWPP() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      window.open('whatsapp://send?text=Confira os últimos casos de coronavirus do RN https%3A%2F%2Fcovid-rn.herokuapp.com','_top'); 
      return false; 
    }
    window.open('https://web.whatsapp.com/send?Confira os últimos casos de coronavirus do Rio Grande do Norte em tempo real https%3A%2F%2Fcovid-rn.herokuapp.com','popup','width=600,height=600'); 
    return false;
  }
  const MapWrapped = withScriptjs(withGoogleMap(MapContainer));
  return (
    <div className="container">
      <div className="msg">
        <ModalAlert/>
      </div>
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
      <News/>
      <div className="box-map">
      </div>
      <div className="map" style={{minWidth: '100%', height: '450px'}}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          process.env.REACT_APP_GOOGLE_KEY
        }`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      </div>
      <div className="box-contact">
        <button onClick={popupFB}><FaFacebook size={28} color="#353244"/></button>
        <button onClick={popupWPP}><FaWhatsapp fa size={28} color="#353244"/></button>
        <button onClick={popupTT}><FaTwitter fa size={28} color="#353244"/></button>
        <button onClick={popupGH}><FaGithub fa size={28} color="#353244"/></button>          
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
