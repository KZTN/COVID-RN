import React, { useEffect, useState } from 'react';
import './styles.css';
import * as moment from 'moment';
export default function StateGrow({ uf }) {
    const [statecases, setStatecases] = useState([]);
    const [statedates, setStateDates] = useState([]);
    const [statedeaths, setStatedeaths] = useState([]);
    let arrCases = [];
    let arrDates = [];
    let arrDeaths = [];
    useEffect(() => {
        async function getData() {
            setStatecases(uf.cases.reverse());
            setStateDates(uf.date.reverse());
            setStatedeaths(uf.deaths.reverse());
        }
        getData();
    }, []);

    function comparateCases() {
        for (let i = 0; i < statecases.length; i++) {
            if (i === 0) {
                arrCases[0] = statecases[0];
            } else {
                arrCases[i] = statecases[i] - statecases[i - 1];
            }
        }
        arrCases.reverse();
    }

    function comparateDeaths() {
        for (let i = 0; i < statedeaths.length; i++) {
            if (i === 0) {
                arrDeaths[0] = statedeaths[0];
            } else {
                arrDeaths[i] = statedeaths[i] - statedeaths[i - 1];
            }
        }
        arrDeaths.reverse();
    }

    function getDates() {
        statedates.map((eDates) => {
            arrDates.push(eDates);
        });
        arrDates.reverse();
    }

    comparateCases();
    comparateDeaths();
    getDates();

    return (
        <div className="box-stategrow">
            <div className="box-header-stategrow">
                <p>Evolução dos casos no RN</p>
            </div>
            <ul className="list-stategrow">
                <div className="box-elements">
                    <div className="list-box-name">
                        <span>Data</span>
                    </div>
                    <div className="list-box"></div>
                    <div className="list-box"></div>
                    <div className="list-box"></div>
                    <div className="list-box">
                        <span>Casos</span>
                    </div>
                    <div className="list-box">
                        <span>Mortes</span>
                    </div>
                </div>
                {arrCases.map((cases, index) => (
                    <li key={index}>
                        <div className="list-box-name">
                            {moment(arrDates[index])
                                .utcOffset('-03:00')
                                .format('DD/MM', 'pt-BR')}
                        </div>
                        <div className="list-box-bar">
                            <div
                                className="list-progress-bar-deaths"
                                style={{
                                    width: `${arrDeaths[index] / 17}%`,
                                    right: `${cases / 17}%`,
                                }}
                            ></div>
                            <div
                                className="list-progress-bar-cases"
                                style={{ width: `${cases / 17}%` }}
                            ></div>
                        </div>
                        <div className="list-box">
                            <span>{cases}</span>
                        </div>
                        <div className="list-box">
                            <span>{arrDeaths[index]}</span>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="box-bottom-stategrow"></div>
        </div>
    );
}
