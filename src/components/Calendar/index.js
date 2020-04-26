import React, {useState, useEffect} from 'react';
import Chart from "react-apexcharts";
import * as moment from 'moment';


export default function Calendar({cases, deaths, dates, recovered}) {
  var ptbr = require("apexcharts/dist/locales/pt-br.json");
  var arrCases = [];
  var sundays = [0];
  var mondays = [0];
  var tuesdays = [0];
  var wednesdays = [];
  var thursdays = [];
  var fridays = [];
  var saturdays = [];
  function comparateCases() {
    for (let i = 0; i < cases.length; i++) {
          if(i === 0) {
              arrCases[0] = cases[0];
          } else {
              arrCases[i] = cases[i] - cases[i-1];
          }              
    }
}
        function separateDatesByDay() {
            dates.map((date, index) => {
                if(moment(date).isoWeekday() === 1) {
                    mondays.push(arrCases[index]);
                }
                if(moment(date).isoWeekday() === 2) {
                    tuesdays.push(arrCases[index]);
                }
                if(moment(date).isoWeekday() === 3) {
                    wednesdays.push(arrCases[index]);
                }
                if(moment(date).isoWeekday() === 4) {
                    thursdays.push(arrCases[index]);
                }
                if(moment(date).isoWeekday() === 5) {
                    fridays.push(arrCases[index]);
                }
                if(moment(date).isoWeekday() === 6) {
                    saturdays.push(arrCases[index]);
                }
                if(moment(date).isoWeekday() === 7) {
                    sundays.push(arrCases[index]);
                }
                if(index % 7 === 0) {
                    var week = ((index / 7) - 1);
                    if(mondays[week] === null) {
                        mondays.push(0);
                    }
                    if(tuesdays[week] === null) {
                        tuesdays.push(0);
                    }
                    if(wednesdays[week] === null) {
                        wednesdays.push(0);
                    }
                    if(thursdays[week] === null) {
                        thursdays.push(0)
                    }
                    if(fridays[week] === null) {
                        fridays.push(0);
                    }
                    if(saturdays[week] === null) {
                        saturdays.push(0);
                    }
                    if(sundays[week] === null) {
                        sundays.push(0)
                    }
                }
            });
        }
        comparateCases();
    separateDatesByDay();
  const data = {
    series: [
    {
      name: 'Sábado',
      data: saturdays
    },
    {
      name: 'Sexta',
      data: fridays
    },
    {
      name: 'Quinta',
      data: thursdays
    },
    {
      name: 'Quarta',
      data: wednesdays
    },
    {
      name: 'Terça',
      data: tuesdays
    },
    {
      name: 'Segunda',
      data: mondays
    },
    {
    name: 'Domingo',
    data: sundays
    }
    ],
    options: {
      chart: {
        zoom: false,
        toolbar: {
          show: false,
          
        },
        height: 350,
        type: 'heatmap',
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#008FFB"],
      title: {
      },
    }
};
    return (
        <Chart
        options={data.options}
        series={data.series}
        type = "heatmap"
        height="100%"
        width="98%"
      />
    );
  };




