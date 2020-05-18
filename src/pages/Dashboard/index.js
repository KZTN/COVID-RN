import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import mongodb from '../../services/mongodb';
import './styles.css';
import DateTime from '../../utils/datetime';
import SpinnerPage from '../../utils/SpinnerPage';
import { capitalize } from '../../utils/capitalize';
import Graph from '../../components/Graph';
//import Calendar from '../../components/Calendar';
import { isMobile } from 'react-device-detect';

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [datedata, setDatedata] = useState();
    const [boxname, setBoxname] = useState('Rio Grande do Norte');
    const [boxsuspects, setBoxsuspects] = useState('-');
    const [boxrefuses, setBoxrefuses] = useState('-');
    const [boxcases, setBoxcases] = useState('-');
    const [boxdeaths, setBoxdeaths] = useState('-');
    const [boxrecovered, setBoxrecovered] = useState('-');
    const [chartcases, setChartcases] = useState([]);
    const [chartdates, setChartDates] = useState([]);
    const [chartdeaths, setChartdeaths] = useState([]);
    const [chartrecovered, setChartrecovered] = useState([]);

    const [surname, setSurname] = useState('o');
    const [name, setName] = useState('');

    useEffect(() => {
        async function handleAPI() {
            const response = await mongodb.get('/uf/RN');
            setBoxname(response.data.name);
            setBoxsuspects(response.data.suspects[0]);
            setBoxrefuses(response.data.refuses[0]);
            setBoxcases(response.data.cases[0]);
            setBoxdeaths(response.data.deaths[0]);
            setDatedata(response.data.date[0]);
            setBoxrecovered(response.data.recovered[0]);
            setChartDates(response.data.date.reverse());
            setChartcases(response.data.cases.reverse());
            setChartdeaths(response.data.deaths.reverse());
            setChartrecovered(response.data.recovered.reverse());
            setLoading(false);
        }
        handleAPI();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await mongodb.post('/RN/cidade', {
                name: capitalize(name),
            });
            setBoxname(response.data.name);
            setBoxsuspects(response.data.suspects[0]);
            setBoxrefuses(response.data.refuses[0]);
            setBoxcases(response.data.cases[0]);
            setBoxdeaths(response.data.deaths[0]);
            setBoxrecovered(response.data.recovered[0]);

            setChartDates(response.data.date.reverse());
            setChartcases(response.data.cases.reverse());
            setChartdeaths(response.data.deaths.reverse());
            setChartrecovered(response.data.recovered.reverse());

            setSurname('e');
        } catch (error) {
            alert('Cidade não encontrada, digite novamente');
        }
        setLoading(false);
        window.scrollTo(0, 0);
        document.getElementById('input').blur();
        window.blur();
        setName('');
    }
    function has_any_spaces(str) {
        const expression = /^\S+$/g;
        if (expression.test(str) || str === '') {
            return false;
        }
        return true;
    }
    function breakline(ste) {
        var output = [ste.slice(0, 10), '\r\n', ste.slice(10)].join('');
        return output;
    }
    return (
        <>
            <div className="box-situation">
                <p>Situação d{surname}</p>
                <div className="box-rn">
                    <h1>
                        <strong>
                            <mark>
                                {!isMobile
                                    ? boxname
                                    : has_any_spaces(boxname)
                                    ? boxname
                                    : boxname.length > 10
                                    ? breakline(boxname)
                                    : boxname}
                            </mark>
                        </strong>
                    </h1>
                </div>
            </div>
            <div className="box-datetime">
                <span>
                    <DateTime date={datedata} />
                </span>
            </div>
            <form className="box-form" onSubmit={handleSubmit}>
                <FaSearch
                    classname="icon-search"
                    size={28}
                    color="#6a6a6a"
                    style={{ margin: 'auto 0 auto 10px' }}
                />
                <input
                    id="input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Busque por sua cidade"
                />
                <button type="submit">Buscar</button>
            </form>
            <div className="box-loading">
                {loading ? <SpinnerPage /> : null}
            </div>
            <ul>
                <li className="box-item">
                    <header>
                        <strong>{boxsuspects}</strong>
                    </header>
                    <span>Suspeitos</span>
                </li>
                <li className="box-item">
                    <header>
                        <strong>{boxrefuses}</strong>
                    </header>
                    <span>Descartados</span>
                </li>
                <li className="box-item">
                    <header>
                        <strong>{boxcases}</strong>
                    </header>
                    <span>Confirmados</span>
                </li>
                <li className="box-item">
                    <header>
                        <strong>{boxcases-(boxrecovered+boxdeaths)}</strong>
                    </header>
                    <span>Ativos</span>
                </li>
                <li className="box-item">
                    <header>
                        <strong>{boxdeaths}</strong>
                    </header>
                    <span>Óbitos</span>
                </li>
                <li
                    className="box-item"
                    style={{ background: '#1db954', color: '#fff' }}
                >
                    <header>
                        <strong style={{ color: '#fff' }}>
                            {boxrecovered ? boxrecovered : '-'}
                        </strong>
                    </header>
                    <span style={{ color: '#fdfefc' }}>Recuperados*</span>
                </li>
            </ul>
            <div
                className="box-star"
                style={{ fontSize: 10, color: '#999', marginTop: 4 }}
            >
                <p>
                    (*) Algumas secretarias estão demorando ou não divulgando
                    este dado
                </p>
            </div>

            <div className="box-chart">
                <div className="box-header-boxchart">
                    <p>
                        Gráfico d{surname} {boxname}
                    </p>
                </div>
                <Graph
                    cases={chartcases}
                    deaths={chartdeaths}
                    dates={chartdates}
                    recovered={chartrecovered}
                />
            </div>
        </>
    );
}
