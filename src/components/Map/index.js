import React, {useState, useEffect} from 'react';
import {GoogleMap, Marker, InfoWindow, Polygon} from 'react-google-maps'
import mongodb from '../../services/mongodb';
import styles from './GoogleMapStyles.json';
import coordinates from './polygons.json';
import {isMobile} from 'react-device-detect';
import './styles.css'
let Arrcoordinates = (coordinates[0].geojson.coordinates[0][0]);
let cordArr = [];
Arrcoordinates.map(coordinate => cordArr.push({lat:coordinate[1], lng:coordinate[0]}));
export default function Map() {
    const [cities, setCities] = useState([]);
    const [selectedcity, setSelectedcity] = useState();
    useEffect(() => {
        async function getData() {
            const response = await mongodb.get('/maps');
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
        streetViewControl={false}
        defaultZoom={isMobile? 7 : 8} 
        defaultCenter={{lat:-5.799659599999999, lng:-36.6444833}}
        defaultOptions={{ styles: styles, mapTypeControl: false, streetViewControl: false }}
        >
      <Polygon
        paths={cordArr}
        options={{
          strokeColor: "#b0b0b0",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#ddd",
          fillOpacity: 0.35
        }}
      />
             {   
                cities.map((city) => (
                    <Marker
                    icon={{
                      url: require('./circle.png'),
                      scaledSize: new window.google.maps.Size(15 + ((city.cases[0]+(city.deaths[0] *10)) / 3), 15 + ((city.cases[0]+(city.deaths[0] *10)) / 3))
                    }}
                        key={city._id} 
                        position={{
                            lat: city.location.coordinates[0], 
                            lng: city.location.coordinates[1]
                        }}
                        onMouseOver={() => {
                            setSelectedcity(city);

                        }}
                        onClick={() => {
                          setSelectedcity(city);

                      }}
                    />
                ))
                
            }
            {selectedcity && (
                <InfoWindow 
                
                onMouseOut={() => {
                  setSelectedcity(null);
              }}
                onCloseClick={() => {
                    setSelectedcity(null);
                }}
                    position={{
                        lat: selectedcity.location.coordinates[0], 
                        lng: selectedcity.location.coordinates[1]
                    }}
                    >
                        <div className="box-info">
                            <h3>{selectedcity.name}</h3>
                            <span>Casos: {selectedcity.cases[0]}</span>
                            <span>Mortes: {selectedcity.deaths[0]}</span>
                            <span>Recuperados: {selectedcity.recovered[0]}</span>
                        </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}