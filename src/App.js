import React, { useEffect, useState } from 'react';
import Routes from './routes';
import MapContainer from './components/Map';
import { FaFacebook, FaGithub, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import Footer from './components/Footer';
import News from './components/News';
import StateGrow from './components/StateGrow';
import ModalAlert from './components/ModalAlert';
import Top10 from './components/Top10';
import { withScriptjs, withGoogleMap } from 'react-google-maps';
import mongodb from './services/mongodb';

import './App.css';
import 'dotenv';

function App() {
    const [readyuf, setReadyuf] = useState(false);
    const [readycity, setReadycity] = useState(false);
    const [UF, setUF] = useState();
    const [cities, setCities] = useState([]);
    useEffect(() => {
        async function getUFData() {
            await mongodb
                .get('/uf/RN')
                .then((response) => {
                    setUF(response.data);
                    setReadyuf(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        getUFData();
    }, []);
    useEffect(() => {
        async function getData() {
            await mongodb
                .get('/RN/cidades')
                .then((response) => {
                    setCities(response.data);
                    setReadycity(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        getData();
    }, []);
    function popupFB() {
        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            window.open(
                'https://www.facebook.com/sharer/sharer.php?u=covid19rn.com.br',
                '_blank'
            );
            return false;
        }
        window.open(
            'https://www.facebook.com/sharer/sharer.php?u=covid19rn.com.br',
            'popup',
            'width=600,height=600'
        );
        return false;
    }

    function popupGH() {
        window.open('https://github.com/KZTN/COVID-RN', '_blank');
        return false;
    }

    function popupTT() {
        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            window.open(
                'twitter://post?message=Confira os últimos casos de coronavirus do RN https%3A%2F%2Fcovid19rn.com.br',
                'popup',
                'width=600,height=600'
            );
            return false;
        }
        window.open(
            'https://twitter.com/intent/tweet?url=https%3A%2F%2Fcovid19rn.com.br&text=Confira os últimos casos de coronavirus do RN',
            'popup',
            'width=600,height=600'
        );
        return false;
    }
    function popupWPP() {
        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            window.open(
                'whatsapp://send?text=Confira os últimos casos de coronavirus do RN https%3A%2F%2Fcovid19rn.com.br',
                '_top'
            );
            return false;
        }
        window.open(
            'https://web.whatsapp.com/send?Confira%20os%20últimos%20casos%20de%20coronavirus%20do%20Rio%20Grande%20do%20Norte%20em%20tempo%20real%20https%3A%2F%2Fcovid19rn.com.br',
            'popup',
            'width=600,height=600'
        );
        return false;
    }
    const MapWrapped = withScriptjs(withGoogleMap(MapContainer));
    return (
        <>
            <div className="container">
                <div className="msg">
                    {readycity && readyuf ? <ModalAlert /> : null}
                </div>
                <header>
                    <div className="title-box">
                        <h1>
                            <strong>
                                <a href="/">COVID-RN</a>
                            </strong>
                        </h1>
                    </div>
                </header>
                <div className="content">
                    <main>
                        <Routes />
                    </main>
                </div>
                <div className="box-scrollboxes">
                    {readycity ? <News cities={cities} /> : null}
                    {readyuf ? <StateGrow uf={UF} /> : null}
                </div>
                {readycity && readyuf ? (
                    <Top10 uf={UF} cities={cities} />
                ) : null}
                <div className="box-map"></div>
                <div className="map">
                    <MapWrapped
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `100%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </div>
                <div className="box-contact">
                    <button onClick={popupFB}>
                        <FaFacebook size={28} color="#353244" />
                    </button>
                    <button onClick={popupWPP}>
                        <FaWhatsapp size={28} color="#353244" />
                    </button>
                    <button onClick={popupTT}>
                        <FaTwitter size={28} color="#353244" />
                    </button>
                    <button onClick={popupGH}>
                        <FaGithub size={28} color="#353244" />
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default App;
