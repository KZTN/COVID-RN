import React from 'react';
import Routes from './routes';
import MapContainer from './components/Map';
import {FaFacebook, FaGithub, FaTwitter, FaWhatsapp} from 'react-icons/fa';
import Footer from './components/Footer'; 
import News from './components/News';
import StateGrow from './components/StateGrow';
import ModalAlert from './components/ModalAlert';
import Top10 from './components/Top10';
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
    <>
    <div className="container">
      <div className="msg">
        <ModalAlert/>
      </div>
      <header>
        <div className="title-box">
          <h1><strong><a href="/"> COVID-RN</a></strong></h1>
        </div>
      </header>
      <div className="content">
        <main>
        <Routes/>
        </main>
      </div>
      <div className="box-scrollboxes">
        <News/>
        <StateGrow/>
      </div>
      <Top10/>
       <div className="box-map">
      </div>
      <div className="map" style={{width: '100%', height: '450px'}}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          process.env.REACT_APP_GOOGLE_KEY
        }`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      </div>

{/*       <div className="chart-race">
      <iframe src='https://flo.uri.sh/visualisation/1990037/embed' frameborder='0' scrolling='no' style={{width:"100%", height:"600px"}}>
        </iframe><div style={{width:"100%", marginTop:"4px", textAlign:"right"}}>
          <a 
            class='flourish-credit' 
            href='https://public.flourish.studio/visualisation/1990037/?utm_source=embed&utm_campaign=visualisation/1990037' 
            target='_top' 
            style={{textDecoration:"none"}}>
              <img alt='Made with Flourish' 
                src='https://public.flourish.studio/resources/made_with_flourish.svg' 
                style={{width:"105px", height:"16px", border:"none", margin:"0"}}/> 
            </a>
      </div>
      </div> */}
      <div className="box-contact">
        <button onClick={popupFB}><FaFacebook size={28} color="#353244"/></button>
        <button onClick={popupWPP}><FaWhatsapp fa size={28} color="#353244"/></button>
        <button onClick={popupTT}><FaTwitter fa size={28} color="#353244"/></button>
        <button onClick={popupGH}><FaGithub fa size={28} color="#353244"/></button>          
      </div>
    </div>
          <Footer/>
</>
  );
}

export default App;
