import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, InfoWindow, Polygon } from 'react-google-maps';
import mongodb from '../../services/mongodb';
import styles from './GoogleMapStyles.json';
import coordinates from './polygons.json';
import { isMobile } from 'react-device-detect';
import Form from '../Form';
import { ThemeProvider } from '@material-ui/styles';
import Slider from '@material-ui/core/Slider';
import { createMuiTheme } from '@material-ui/core';
import * as moment from 'moment';
import './styles.css';

let Arrcoordinates = coordinates[0].geojson.coordinates[0][0];
let cordArr = [];
Arrcoordinates.map((coordinate) =>
    cordArr.push({ lat: coordinate[1], lng: coordinate[0] })
);

export default function Map() {
    const AmountSlider = createMuiTheme({
        overrides: {
            MuiSlider: {
                root: {
                    color: '#4bc0c0',
                    height: 12,
                },
                mark: {
                    height: 6,
                    width: 0,
                    border: '1px solid #fff',
                    '&:last-child, &first-child': {
                        display: 'none',
                    },
                },
                thumb: {
                    height: 26,
                    width: 26,
                    backgroundColor: '#fff',
                    border: '2px solid currentColor',
                    marginTop: -8,
                    marginLeft: -16,
                    '&:focus,&:hover,&$active': {
                        boxShadow: 'inherit',
                    },
                },
                active: {},
                valueLabel: {
                    left: 'calc(-50% + 6px)',
                },
                track: {
                    height: 12,
                    borderRadius: 6,
                    width: '102%',
                    marginLeft: -11,
                },
                rail: {
                    height: 12,
                    borderRadius: 6,
                    width: '102%',
                    marginLeft: -11,
                },
            },
        },
    });

    const [coords, setCoords] = useState({
        lat: -5.65,
        lng: -36.6444833,
    });
    const [selectedsample, setSelectedsample] = useState(0);
    const [isready, setIsready] = useState(false);
    const [cities, setCities] = useState([]);
    const [samples, setSamples] = useState(0);
    const [dates, setDates] = useState([]);
    const [selectedcity, setSelectedcity] = useState();
    const [fieldpressed, setFieldpressed] = useState(false);
    const [zoomChanged, setzoomChanged] = useState(5);
    const [mouseover, setMouseover] = useState(false);
    const mapRef = useRef(null);
    function valuetext(value) {
        return moment(dates[value - 1])
            .utc()
            .format('DD-MM');
    }
    function handleChangeSlider(number) {
        var result = number - samples;
        if (result < 0) {
            result = Math.abs(result);
        }
        setSelectedsample(result);
        return true;
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
    function handleLoad(map) {
        mapRef.current = map;
    }
    function handleCenterChanged() {
        if (!mapRef.current) return;
        const newPos = mapRef.current.getCenter().toJSON();
        setCoords(newPos);
    }
    function handleInputField(data) {
        try {
            const result = cities.filter(
                (e) => e.name.toLowerCase() === data.inputfield.toLowerCase()
            );
            if (result) {
                setSelectedcity(result[0]);
                setFieldpressed(true);
                setzoomChanged(8);
                setTimeout(() => {
                    setzoomChanged(10);
                }, 500);
                setCoords({
                    lat: result[0].location.coordinates[0],
                    lng: result[0].location.coordinates[1],
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <section id="map">
            <Form onSubmit={handleInputField} />
            <GoogleMap
                id="map"
                ref={(e) => {handleLoad(e)}}
                streetViewControl={false}
                defaultZoom={isMobile ? 7 : 8}
                defaultCenter={{ lat: -5.65, lng: -36.6444833 }}
                center={{ lat: coords.lat, lng: coords.lng }}
                zoom={fieldpressed ? zoomChanged : isMobile ? 7 : 8}
                onZoomChanged={() => setFieldpressed(false)}
                defaultOptions={{
                    styles: styles,
                    mapTypeControl: false,
                    streetViewControl: false,
                }}
                onCenterChanged={mouseover? handleCenterChanged : null}
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
                {cities
                    .filter((city) => city.cases[selectedsample] > 0)
                    .map((city) => (
                        <Marker
                            icon={{
                                url: require('./circle.png'),
                                scaledSize: new window.google.maps.Size(
                                    (isMobile ? 8 : 11) +
                                        city.cases[selectedsample] /
                                            (isMobile ? 60 : 46.66),
                                    (isMobile ? 8 : 11) +
                                        city.cases[selectedsample] /
                                            (isMobile ? 60 : 46.66)
                                ),
                            }}
                            key={city._id}
                            position={{
                                lat: city.location.coordinates[0],
                                lng: city.location.coordinates[1],
                            }}
                            onMouseOver={() => {
                                setSelectedcity(city);
                                setMouseover(true);
                            }}
                            onClick={() => {
                                setSelectedcity(city);
                                setMouseover(true);
                            }}
                        />
                    ))}
                {selectedcity && (
                    <InfoWindow
                        onMouseOut={() => {
                            setSelectedcity(null);
                            setMouseover(false);
                        }}
                        onCloseClick={() => {
                            setSelectedcity(null);
                            setMouseover(false);

                        }}
                        position={{
                            lat: (selectedcity.location.coordinates[0]),
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
                            <span>
                                Casos: {selectedcity.cases[selectedsample]}
                                <br />
                            </span>
                            <span>
                                Ativos:
                                {selectedcity.cases[selectedsample] -
                                    (selectedcity.recovered[selectedsample] +
                                        selectedcity.deaths[selectedsample])}
                                <br />
                            </span>
                            <span>
                                Mortes: {selectedcity.deaths[selectedsample]}
                                <br />
                            </span>
                            <span>
                                Recuperados:
                                {selectedcity.recovered[selectedsample]
                                    ? selectedcity.recovered[selectedsample]
                                    : '-'}
                            </span>
                            <div className="box-content"></div>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
            <div className="box-slider">
                {isready ? (
                    <ThemeProvider theme={AmountSlider}>
                        <Slider
                            defaultValue={samples}
                            aria-labelledby="discrete-slider-small-steps"
                            step={1}
                            min={1}
                            marks={isMobile ? false : true}
                            max={samples}
                            valueLabelDisplay="on"
                            valueLabelFormat={valuetext}
                            onChange={(event, number) =>
                                handleChangeSlider(number)
                            }
                        />
                    </ThemeProvider>
                ) : null}
            </div>
        </section>
    );
}
