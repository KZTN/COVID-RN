import React, {useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import * as moment from 'moment';
import 'moment/locale/pt-br';

export default function Chart({cases, deaths, dates}) {
  let arr = [];
    async function formatDate() {
      dates.map((date) => {
        arr.push(moment(date).utcOffset("-03:00").format("DD/MMMM", 'pt-BR'));
      })
    }
      formatDate();
    

  const data = {
    labels: arr,
    datasets: [
      {
        label: 'Número de casos confirmados',
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
      },
      {
        label: 'Número de óbitos',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(226, 106, 106, 1)',
        borderColor: 'rgba(224, 130, 131, 1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(224, 130, 131, 1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(224, 130, 131, 1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: deaths
      }
    ]
  };
    return (
        <Line useRef="chart" data={data} options={{responsive : true, maintainAspectRatio : false }}/>
    );

}