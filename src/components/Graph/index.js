import React from 'react';
import Chart from 'react-apexcharts';

export default function Graph({ cases, deaths, dates, recovered }) {
       var casesarr = cases;
    var activearr = [];
    casesarr.map((casesarr, index) => {
        activearr.push(casesarr - (recovered[index] + deaths[index]));
    });
    var ptbr = require('apexcharts/dist/locales/pt-br.json');
    const data = {
        options: {
            grid: {
                row: {
                    colors: ['#dfdfdf', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.3,
                },
            },
            tooltip: {
                x: {
                  format: 'dddd (dd MMMM)'
                }
              },
            colors: ['#4bc0c0', '#e26a6a', '#1db954', '#52d'],
            chart: {
                locales: [ptbr],
                defaultLocale: 'pt-br',
                id: 'basic-bar',
                zoom: false,
                toolbar: {
                    show: false,
                },
            },
            xaxis: {
                categories: dates,
                type: 'datetime',
                tickAmount: 'dataPoints',
                labels: {
                    hideOverlappingLabels: true,
                    format: 'dd/MM',
                    rotate: -45,
                    rotateAlways: false,
                    showDuplicates: false,
                    trim: false,
                    minHeight: undefined,
                    maxHeight: 120,
                    style: {
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 400,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                    offsetX: 0,
                    offsetY: 0,
                    axisBorder: {
                        show: true,
                        color: '#78909C',
                        height: 1,
                        width: '100%',
                        offsetX: 0,
                        offsetY: 0,
                    },
                },
            },
            yaxis: {
                floating: true,
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                labels: {
                    show: false,
                },
            },
        },
        series: [
            {
                name: 'Casos',
                data: cases,
            },
            {
                name: 'Óbitos',
                data: deaths,
            },
            {
                name: 'Recuperados',
                data: recovered,
            },
                        {
                name: 'Ativos',
                data: activearr,
            },
        ],
    };

    return (
        <Chart
            options={data.options}
            series={data.series}
            type="line"
            height="100%"
            width="100%"
        />
    );
}
