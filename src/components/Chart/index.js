import React, {Component, useEffect, useState} from 'react';
import { Line } from 'react-chartjs-2';
import mongodb from '../../services/mongodb';


export default function Chart() {
  const [dates, setDates] = useState([]);
  const [cases, SetCases] = useState([]);
  useEffect(() => {
    async function getData() {
      const response = await mongodb.post('/stateshow', {name: "Rio Grande do Norte"});
      setDates(response.data.date.reverse());
      SetCases(response.data.cases.reverse());
    }
    getData();
  }, []);
  console.log(dates);
  console.log(cases);
  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Números de casos confirmados',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: cases
      }
    ]
  };
    return (
        <Line useRef="chart" data={data} />
    );

}