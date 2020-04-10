import React, {useState, useEffect} from 'react';
import {GoogleMap, Marker, InfoWindow} from 'react-google-maps'
import mongodb from '../../services/mongodb';
import styles from './GoogleMapStyles.json';

export default function Map() {
    const [cities, setCities] = useState([]);
    const [selectedcity, setSelectedcity] = useState();
    useEffect(() => {
        async function getData() {
            const response = await mongodb.get('/cidades');
                setCities(response.data);
        }
        getData();
    }, []);
    useEffect(() => {
        const listener = e => {
          if (e.key === "Escape") {
            setSelectedcity(null);
          }
        };
        window.addEventListener("keydown", listener);
    
        return () => {
          window.removeEventListener("keydown", listener);
        };
      }, []);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedcity(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);
    return(
        <GoogleMap 
        defaultZoom={8} 
        defaultCenter={{lat:-5.699659599999999, lng:-36.2444833}}
        defaultOptions={{ styles: styles }}
        >

             {   
                cities.map((city) => (
                    <Marker 
                        key={city._id} 
                        position={{
                            lat: city.location.coordinates[0], 
                            lng: city.location.coordinates[1]
                        }}
                        onClick={() => {
                            setSelectedcity(city);
                        }}

                    />
                ))
                
            }
            {selectedcity && (
                <InfoWindow 
                onCloseClick={() => {
                    setSelectedcity(null);
                }}
                    position={{
                        lat: selectedcity.location.coordinates[0], 
                        lng: selectedcity.location.coordinates[1]
                    }}
                    >
                        <div>
                            <h3>{selectedcity.name}</h3>
                            <p>Número de casos: {selectedcity.cases}</p>
                        </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}