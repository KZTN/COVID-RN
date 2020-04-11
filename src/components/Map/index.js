import React, {useState, useEffect} from 'react';
import {GoogleMap, Marker, InfoWindow, Polygon} from 'react-google-maps'
import mongodb from '../../services/mongodb';
import styles from './GoogleMapStyles.json';
import coordinates from './polygons.json';
import './styles.css'
let Arrcoordinates = (coordinates[0].geojson.coordinates[0][0]);
let cordArr = [];
Arrcoordinates.map(coordinate => cordArr.push({lat:coordinate[1], lng:coordinate[0]}));
console.log(cordArr);
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
        data={"!3m1!4b1!4m5!3m4!1s0x7b04df549e8eaad:0xa92509ac1c4d9ec4!8m2!3d-5.4025803!4d-36.954107"}
        defaultZoom={8} 
        defaultCenter={{lat:-5.699659599999999, lng:-36.2444833}}
        defaultOptions={{ styles: styles }}
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
                      scaledSize: new window.google.maps.Size(25 + ((city.cases[0]+(city.deaths[0] *2)) / 2), 25 + ((city.cases[0]+(city.deaths[0] *2)) / 2))
                    }}
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
                        <div className="box-info">
                            <h3>{selectedcity.name}</h3>
                            <span>Casos: {selectedcity.cases[0]}</span>
                            <span>Mortes: {selectedcity.deaths[0]}</span>
                        </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}