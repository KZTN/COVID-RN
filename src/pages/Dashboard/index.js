import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import mongodb from '../../services/mongodb';
import './styles.css';
import DateTime from '../../utils/datetime';
import SpinnerPage from '../../utils/SpinnerPage';
import { capitalize } from '../../utils/capitalize';
import Graph from '../../components/Graph';
import ChartIsolation from '../../components/ChartIsolation';
import { createMuiTheme, MuiThemeProvider, Tooltip } from '@material-ui/core';
//import Calendar from '../../components/Calendar';
import { isMobile } from 'react-device-detect';
const theme = createMuiTheme({
    overrides: {
        MuiTooltip: {
            tooltip: {
                fontSize: '2rem',
                color: 'gray',
                backgroundColor: 'white',
                border: '1px solid #eee',
            },
        },
    },
});
export default function Dashboard() {
    const [selectedchart, setSelectedchart] = useState('epidemiologic');
    const [loading, setLoading] = useState(true);
    const [datedata, setDatedata] = useState();
    const [boxname, setBoxname] = useState('Rio Grande do Norte');
    const [boxsuspects, setBoxsuspects] = useState('-');
    const [boxrefuses, setBoxrefuses] = useState('-');
    const [boxcases, setBoxcases] = useState('-');
    const [boxdeaths, setBoxdeaths] = useState('-');
    const [boxactives, setBoxactives] = useState('-');
    const [boxrecovered, setBoxrecovered] = useState('-');
    const [chartcases, setChartcases] = useState([]);
    const [chartdates, setChartDates] = useState([]);
    const [chartdeaths, setChartdeaths] = useState([]);
    const [chartrecovered, setChartrecovered] = useState([]);
    const [surname, setSurname] = useState('o');
    const [name, setName] = useState('');
    const [suspectstitle, setSuspectstitle] = useState('-');
    const [refusestitle, setRefusestitle] = useState('-');
    const [casestitle, setCasestitle] = useState('-');
    const [deathstitle, setDeathstitle] = useState('-');
    const [activestitle, setActivestitle] = useState('-');
    const [recoveredtitle, setRecoveredtitle] = useState('-');
    const [suspectstooltipisselected, setSuspectstooltipisselected] = useState(
        false
    );
    const [refusestooltipisselected, setRefusesTooltipisselected] = useState(
        false
    );
    const [casesstooltipisselected, setCasesTooltipisselected] = useState(
        false
    );
    const [activestooltipisselected, setActivesTooltipisselected] = useState(
        false
    );
    const [deathstooltipisselected, setDeathsTooltipisselected] = useState(
        false
    );
    const [
        recoveredtooltipisselected,
        setRecoveredTooltipisselected,
    ] = useState(false);
    useEffect(() => {
        async function handleAPI() {
            const response = await mongodb.get('/uf/RN');

            const suspects = response.data.suspects[0];
            const suspectsbefore = response.data.suspects[1];
            const actives =
                response.data.cases[0] -
                (response.data.recovered[0] + response.data.deaths[0]);
            const activesbefore =
                response.data.cases[1] -
                (response.data.recovered[1] + response.data.deaths[1]);
            setBoxname(response.data.name);
            setBoxsuspects(response.data.suspects[0]);
            setBoxrefuses(response.data.refuses[0]);
            setBoxcases(response.data.cases[0]);
            setBoxactives(actives);
            setBoxdeaths(response.data.deaths[0]);
            setDatedata(response.data.date[0]);

            setRefusestitle(
                `Aumento: ${response.data.refuses[0] - response.data.refuses[1]} variação: ${(
                    ((response.data.refuses[0] * 100) /
                        response.data.refuses[1]) %
                    100
                ).toFixed(2)}% `
            );

            setCasestitle(
                `Aumento: ${response.data.cases[0] - response.data.cases[1]} variação: ${(
                    ((response.data.cases[0] * 100) / response.data.cases[1]) %
                    100
                ).toFixed(2)}% `
            );
            if (suspects > suspectsbefore) {
                setSuspectstitle(
                    `Aumento: ${suspects - suspectsbefore} variação: ${(
                        ((suspects * 100) / suspectsbefore) %
                        100
                    ).toFixed(2)}% `
                );
            } else {
                setSuspectstitle(
                    `Diminuição: ${suspectsbefore - suspects} variação: -${(
                        ((suspectsbefore * 100) / suspects) %
                        100
                    ).toFixed(2)}% `
                );
            }
            if (actives > activesbefore) {
                setActivestitle(
                    `Aumento: ${actives - activesbefore} variação: ${(
                        ((actives * 100) / activesbefore) %
                        100
                    ).toFixed(2)}% `
                );
            } else {
                setActivestitle(
                    `Diminuição: ${activesbefore - actives} variação: -${(
                        ((activesbefore * 100) / actives) %
                        100
                    ).toFixed(2)}% `
                );
            }
            setDeathstitle(
                `Aumento: ${response.data.deaths[0] - response.data.deaths[1]} variação: ${(
                    ((response.data.deaths[0] * 100) /
                        response.data.deaths[1]) %
                    100
                ).toFixed(2)}% `
            );
            setRecoveredtitle(
                `Aumento: ${response.data.recovered[0] - response.data.recovered[1]} variação: ${(
                    ((response.data.recovered[0] * 100) /
                        response.data.recovered[1]) %
                    100
                ).toFixed(2)}% `
            );
            setBoxrecovered(response.data.recovered[0]);
            setChartDates(response.data.date.reverse());
            setChartcases(response.data.cases.reverse());
            setChartdeaths(response.data.deaths.reverse());
            setChartrecovered(response.data.recovered.reverse());
            setLoading(false);
        }
        handleAPI();
    }, []);
    function handleSuspectsTolltipisselected(e) {
        setSuspectstooltipisselected(e);
    }
    function handleRefusesTolltipisselected(e) {
        setRefusesTooltipisselected(e);
    }
    function handleCasesTolltipisselected(e) {
        setCasesTooltipisselected(e);
    }
    function handleActivesTolltipisselected(e) {
        setActivesTooltipisselected(e);
    }
    function handleDeathsTolltipisselected(e) {
        setDeathsTooltipisselected(e);
    }
    function handleRecoveredTolltipisselected(e) {
        setRecoveredTooltipisselected(e);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await mongodb.post('/RN/cidade', {
                name: capitalize(name),
            });
            const suspects = response.data.suspects[0];
            const suspectsbefore = response.data.suspects[1];
            const actives =
                response.data.cases[0] -
                (response.data.recovered[0] + response.data.deaths[0]);
            const activesbefore =
                response.data.cases[1] -
                (response.data.recovered[1] + response.data.deaths[1]);
            setBoxname(response.data.name);
            setBoxsuspects(response.data.suspects[0]);
            setBoxrefuses(response.data.refuses[0]);
            setBoxdeaths(response.data.deaths[0]);
            setBoxactives(actives);
            if (suspects > suspectsbefore) {
                setSuspectstitle(
                    `Aumento: ${suspects - suspectsbefore} variação: ${(
                        ((suspects * 100) / suspectsbefore) %
                        100
                    ).toFixed(2)}% `
                );
            } else {
                setSuspectstitle(
                    `Diminuição: ${suspectsbefore - suspects} variação: -${(
                        ((suspectsbefore * 100) / suspects) %
                        100
                    ).toFixed(2)}% `
                );
            }
            setRefusestitle(
                `Aumento: ${response.data.refuses[0] - response.data.refuses[1]} variação: ${(
                    ((response.data.refuses[0] * 100) /
                        response.data.refuses[1]) %
                    100
                ).toFixed(2)}% `
            );
            setCasestitle(
                `Aumento: ${response.data.cases[0] - response.data.cases[1]} variação: ${(
                    ((response.data.cases[0] * 100) / response.data.cases[1]) %
                    100
                ).toFixed(2)}% `
            );
            if (actives > activesbefore) {
                setActivestitle(
                    `Aumento: ${actives - activesbefore} variação: ${(
                        ((actives * 100) / activesbefore) %
                        100
                    ).toFixed(2)}% `
                );
            } else {
                setActivestitle(
                    `Diminuição: ${activesbefore - actives} variação: -${(
                        ((activesbefore * 100) / actives) %
                        100
                    ).toFixed(2)}% `
                );
            }
            setDeathstitle(
                `Aumento: ${response.data.deaths[0] - response.data.deaths[1]} variação: ${(
                    ((response.data.deaths[0] * 100) /
                        response.data.deaths[1]) %
                    100
                ).toFixed(2)}% `
            );
            setRecoveredtitle(
                `Aumento: ${response.data.recovered[0] - response.data.recovered[1]} variação: ${(
                    ((response.data.recovered[0] * 100) /
                        response.data.recovered[1]) %
                    100
                ).toFixed(2)}% `
            );
            setBoxcases(response.data.cases[0]);
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
        setSelectedchart('epidemiologic');
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
                    className="icon-search"
                    size={30}
                    color="#6a6a6a"
                    style={{ margin: 'auto 10px auto 20px' }}
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
            <ul style={{}}>
                <MuiThemeProvider theme={theme}>
                    <Tooltip
                        title={suspectstitle}
                        aria-label={suspectstitle}
                        open={suspectstooltipisselected}
                    >
                        <li
                            className={
                                isMobile
                                    ? 'box-item mobile'
                                    : 'box-item desktop'
                            }
                            onTouchStart={() =>
                                handleSuspectsTolltipisselected(true)
                            }
                            onMouseOver={() =>
                                handleSuspectsTolltipisselected(true)
                            }
                            onMouseOut={() =>
                                handleSuspectsTolltipisselected(false)
                            }
                            onTouchEnd={() =>
                                handleSuspectsTolltipisselected(false)
                            }
                            onTouchMove={() =>
                                handleSuspectsTolltipisselected(false)
                            }
                        >
                            <header>
                                <strong>{boxsuspects}</strong>
                            </header>
                            <span>Suspeitos</span>
                        </li>
                    </Tooltip>
                </MuiThemeProvider>
                <MuiThemeProvider theme={theme}>
                    <Tooltip
                        title={refusestitle}
                        aria-label={refusestitle}
                        open={refusestooltipisselected}
                    >
                        <li
                            className={
                                isMobile
                                    ? 'box-item mobile'
                                    : 'box-item desktop'
                            }
                            onTouchStart={() =>
                                handleRefusesTolltipisselected(true)
                            }
                            onMouseOver={() =>
                                handleRefusesTolltipisselected(true)
                            }
                            onMouseOut={() =>
                                handleRefusesTolltipisselected(false)
                            }
                            onTouchEnd={() =>
                                handleRefusesTolltipisselected(false)
                            }
                            onTouchMove={() =>
                                handleRefusesTolltipisselected(false)
                            }
                        >
                            <header>
                                <strong>{boxrefuses}</strong>
                            </header>
                            <span>Descartados</span>
                        </li>
                    </Tooltip>
                </MuiThemeProvider>
                <MuiThemeProvider theme={theme}>
                    <Tooltip
                        title={casestitle}
                        aria-label={casestitle}
                        open={casesstooltipisselected}
                    >
                        <li
                            className={
                                isMobile
                                    ? 'box-item mobile'
                                    : 'box-item desktop'
                            }
                            onTouchStart={() =>
                                handleCasesTolltipisselected(true)
                            }
                            onMouseOver={() =>
                                handleCasesTolltipisselected(true)
                            }
                            onMouseOut={() =>
                                handleCasesTolltipisselected(false)
                            }
                            onTouchEnd={() =>
                                handleCasesTolltipisselected(false)
                            }
                            onTouchMove={() =>
                                handleCasesTolltipisselected(false)
                            }
                        >
                            <header>
                                <strong>{boxcases}</strong>
                            </header>
                            <span>Confirmados</span>
                        </li>
                    </Tooltip>
                </MuiThemeProvider>
                <MuiThemeProvider theme={theme}>
                    <Tooltip
                        title={activestitle}
                        aria-label={activestitle}
                        open={activestooltipisselected}
                    >
                        <li
                            className={
                                isMobile
                                    ? 'box-item mobile'
                                    : 'box-item desktop'
                            }
                            onTouchStart={() =>
                                handleActivesTolltipisselected(true)
                            }
                            onMouseOver={() =>
                                handleActivesTolltipisselected(true)
                            }
                            onMouseOut={() =>
                                handleActivesTolltipisselected(false)
                            }
                            onTouchEnd={() =>
                                handleActivesTolltipisselected(false)
                            }
                            onTouchMove={() =>
                                handleActivesTolltipisselected(false)
                            }
                        >
                            <header>
                                <strong>{boxactives}</strong>
                            </header>
                            <span>Ativos</span>
                        </li>
                    </Tooltip>
                </MuiThemeProvider>
                <MuiThemeProvider theme={theme}>
                    <Tooltip
                        title={deathstitle}
                        aria-label={deathstitle}
                        open={deathstooltipisselected}
                    >
                        <li
                            className={
                                isMobile
                                    ? 'box-item mobile'
                                    : 'box-item desktop'
                            }
                            onTouchStart={() =>
                                handleDeathsTolltipisselected(true)
                            }
                            onMouseOver={() =>
                                handleDeathsTolltipisselected(true)
                            }
                            onMouseOut={() =>
                                handleDeathsTolltipisselected(false)
                            }
                            onTouchEnd={() =>
                                handleDeathsTolltipisselected(false)
                            }
                            onTouchMove={() =>
                                handleDeathsTolltipisselected(false)
                            }
                        >
                            <header>
                                <strong>{boxdeaths}</strong>
                            </header>
                            <span>Óbitos</span>
                        </li>
                    </Tooltip>
                </MuiThemeProvider>
                <MuiThemeProvider theme={theme}>
                    <Tooltip
                        title={recoveredtitle}
                        aria-label={recoveredtitle}
                        open={recoveredtooltipisselected}
                    >
                        <li
                            className={
                                isMobile
                                    ? 'box-item mobile'
                                    : 'box-item desktop'
                            }
                            style={{ background: '#1db954', color: '#fff' }}
                            onTouchStart={() =>
                                handleRecoveredTolltipisselected(true)
                            }
                            onMouseOver={() =>
                                handleRecoveredTolltipisselected(true)
                            }
                            onMouseOut={() =>
                                handleRecoveredTolltipisselected(false)
                            }
                            onTouchEnd={() =>
                                handleRecoveredTolltipisselected(false)
                            }
                            onTouchMove={() =>
                                handleRecoveredTolltipisselected(false)
                            }
                        >
                            <header>
                                <strong style={{ color: '#fff' }}>
                                    {boxrecovered ? boxrecovered : '-'}
                                </strong>
                            </header>
                            <span style={{ color: '#fdfefc' }}>
                                Recuperados*
                            </span>
                        </li>
                    </Tooltip>
                </MuiThemeProvider>
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
            <section id="chart">
                <div className="box-chart">
                    <div className="box-header-boxchart">
                        <p>
                            {selectedchart === 'epidemiologic'
                                ? `Gráfico d${surname} ${boxname}`
                                : 'Gráfico do Rio Grande do Norte'}
                        </p>
                    </div>
                    {selectedchart === 'epidemiologic' ? (
                        <Graph
                            cases={chartcases}
                            deaths={chartdeaths}
                            dates={chartdates}
                            recovered={chartrecovered}
                        />
                    ) : (
                        <ChartIsolation />
                    )}
                </div>
                <div className="chart-actions">
                    <button
                        value="epidemiologic"
                        onClick={(e) => setSelectedchart(e.target.value)}
                    >
                        Gráfico epidemiológico
                    </button>
                    <button
                        value="isolation"
                        onClick={(e) => setSelectedchart(e.target.value)}
                    >
                        Gráfico isolamento
                    </button>
                </div>
            </section>
        </>
    );
}
