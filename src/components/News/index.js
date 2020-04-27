import React, {useEffect, useState} from 'react';
import './styles.css';
import mongodb from '../../services/mongodb';
export default function News() {
    const [selectedcity, setSelectedcity] = useState();
    const [cities, setCities] = useState([]);
    let arr = [];
    async function handleClick(e) {
       const response = await mongodb.post('/cidade', {name: e.target.value});
       setSelectedcity(response.data);
    }

    useEffect(() => {
        async function getData() {
            const response = await mongodb.get('/cidades');
            setCities(response.data);
        }
        getData();

    }, []);
    function filtercities() {
        cities.map((city) => {
            if(city.cases[0] > city.cases[1] || city.deaths[0] > city.deaths[1]) {
                city.cases[0]-=city.cases[1];
                city.deaths[0]-=city.deaths[1];
                arr.push(city);
            }
        });
    }
    filtercities();
    return (
        <div className="box-news">
            <div className="box-header-news">
                <p>Novos casos confirmados</p>
            </div>
            <ul className="list-news">
                <div className="box-elements">
                    <div className="list-box-name"><span>Cidade</span></div>
                    <div className="list-box"><span>Casos</span></div>
                    <div className="list-box"><span>Mortes</span></div>
                </div>
                {arr.map((city) => (
                    <li key={city._id}>
                        <div className="list-box-name"><button value={city.name} /*onClick={handleClick}*/>{city.name}</button></div>
                        <div className="list-box"><span>{city.cases[0]}{city.cases[0]<0? '*': ''}</span></div>
                        <div className="list-box"><span>{city.deaths[0]}</span></div>
                    </li>
                ))}
            </ul>
            <div className="box-bottom-news">                
                <p>(*) Valor corrigido pelo último boletim da SESAP</p>
            </div>
        </div>
    );
}