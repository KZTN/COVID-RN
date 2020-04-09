import React from 'react';
import Routes from './routes';
import emblem from './assets/RN_emblem.png';
import MapContainer from './components/Map';
import {withScriptjs, withGoogleMap} from 'react-google-maps'
import './App.css';
import 'dotenv';

function App() {
  const MapWrapped = withScriptjs(withGoogleMap(MapContainer));
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
      <div className="map" style={{width: '100%', height: '450px', marginTop: '50px'}}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          process.env.REACT_APP_GOOGLE_KEY
        }`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
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
