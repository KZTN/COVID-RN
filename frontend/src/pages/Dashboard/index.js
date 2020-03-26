import React, {useEffect, useState} from 'react';
import api from '../../services/api';
import Chart from './chart';
import './styles.css';
export default function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function handleAPI() {
            const response = await api.get('/');
            setData(response.data);
        }
        handleAPI();
    },[]);
    return (
        <div className="dashboard">
        <h1>Quadro geral</h1>
        <table>
            <td>Casos
                <th>{data.cases}</th>
            </td>
            <td>Mortes
                <th>{data.deaths}</th>
            </td>
            <td>Suspeitas
                <th>{data.suspects}</th>
            </td>
            <td>Negados
            <th>{data.refuses}</th>
            </td>
        </table>
        <Chart/>
        <p>Data da última atualização: {data.datetime}</p>
        </div>
    );
}