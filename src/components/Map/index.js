import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow, Polygon } from 'react-google-maps';
import mongodb from '../../services/mongodb';
import styles from './GoogleMapStyles.json';
import coordinates from './polygons.json';
import { isMobile } from 'react-device-detect';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

import './styles.css';
import * as moment from 'moment';
let Arrcoordinates = coordinates[0].geojson.coordinates[0][0];
let cordArr = [];

Arrcoordinates.map((coordinate) =>
    cordArr.push({ lat: coordinate[1], lng: coordinate[0] })
);
export default function Map() {
    const [selectedsample, setSelectedsample] = useState(0);
    const [isready, setIsready] = useState(false);
    const [cities, setCities] = useState([]);
    const [samples, setSamples] = useState(0);
    const [dates, setDates] = useState([]);
    const [selectedcity, setSelectedcity] = useState();
    function valuetext(value) {
        return moment(dates[value-1]).utc().format('DD-MM');
    }
    function handleChangeSlider(number) {
        var result = number - samples;
        if (result < 0) {
            result = Math.abs(result);
        }
        setSelectedsample(result);
    }

    useEffect(() => {
        async function getData() {
            await mongodb.get('/uf/RN').then((response) => {
                setDates(response.data.date.reverse());
                setSamples(response.data.date.length);
                setSelectedsample(0);
                setIsready(true);
            });
        }
        getData();
    }, []);

    useEffect(() => {
        async function getData() {
            const response = await mongodb.get('/RN/cidades');
            setCities(response.data);
        }
        getData();
    }, []);
    useEffect(() => {
        const listener = (e) => {
            if (e.key === 'Escape') {
                setSelectedcity(null);
            }
        };
        window.addEventListener('keydown', listener);

        return () => {
            window.removeEventListener('keydown', listener);
        };
    }, []);

    return (
        <>
            <GoogleMap
                streetViewControl={false}
                defaultZoom={isMobile ? 7 : 8}
                defaultCenter={{ lat: -5.799659599999999, lng: -36.6444833 }}
                defaultOptions={{
                    styles: styles,
                    mapTypeControl: false,
                    streetViewControl: false,
                }}
            >
                <Polygon
                    onMouseOut={() => {
                        setSelectedcity(null);
                    }}
                    paths={cordArr}
                    options={{
                        strokeColor: '#b0b0b0',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#ddd',
                        fillOpacity: 0.35,
                    }}
                />
                {cities.filter((city) => (city.cases[selectedsample] > 0)).map((city) => (
                    <Marker
                        icon={{
                            url: require('./circle.png'),
                            scaledSize: new window.google.maps.Size(
                                (isMobile ? 9.99 : 13.33) +
                                    city.cases[selectedsample] / (isMobile ? 29.99 : 26.66),
                                (isMobile ? 9.99 : 13.33) +
                                    city.cases[selectedsample] / (isMobile ? 29.99 : 26.66)
                            ),
                        }}
                        key={city._id}
                        position={{
                            lat: city.location.coordinates[0],
                            lng: city.location.coordinates[1],
                        }}
                        onMouseOver={() => {
                            setSelectedcity(city);
                        }}
                        onClick={() => {
                            setSelectedcity(city);
                        }}
                    />
                ))}
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
                            lng: selectedcity.location.coordinates[1],
                        }}
                    >
                        <div
                            className="box-info"
                            onMouseLeave={() => {
                                setSelectedcity(null);
                            }}
                        >
                            <h3>{selectedcity.name}</h3>
                            <span>Casos: {selectedcity.cases[selectedsample]}</span>
                            <span>
                                Ativos:{' '}
                                {selectedcity.cases[selectedsample] -
                                    (selectedcity.recovered[selectedsample] +
                                        selectedcity.deaths[selectedsample])}
                            </span>
                            <span>Mortes: {selectedcity.deaths[selectedsample]}</span>
                            <span>
                                Recuperados:{' '}
                                {selectedcity.recovered[selectedsample]
                                    ? selectedcity.recovered[selectedsample]
                                    : '-'}{' '}
                            </span>
                            <div className="box-content"></div>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
            <div className="box-slider">
                {isready ? (
                    <Slider
                        defaultValue={samples}
                        aria-labelledby="discrete-slider-small-steps"
                        step={1}
                        marks={isMobile ? false : true}
                        min={1}
                        max={samples}
                        valueLabelDisplay="on"
                        valueLabelFormat={valuetext}
                        onChange={(event, number) => handleChangeSlider(number)}
                    />
                ) : null}
            </div>
        </>
    );
}
