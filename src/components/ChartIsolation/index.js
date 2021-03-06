import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import mongodb from '../../services/mongodb';

export default function ChartIsolation() {
    const [date, setDate] = useState([]);
    const [isolation, setIsolation] = useState([]);
    async function getData() {
        await mongodb.get('/uf/RN').then((response) => {
            setDate(response.data.date.reverse());
            setIsolation(response.data.isolation.reverse());
        });
    }

    useEffect(() => {
        getData();
    }, []);
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
                    format: 'dddd (dd MMMM)',
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: 'vertical',
                    shadeIntensity: 0.5,
                    gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100],
                    colorStops: [
                        [
                            {
                                offset: 0,
                                color: '#E70023',
                                opacity: 1,
                            },
                            {
                                offset: 100,
                                color: '#810000',
                                opacity: 1,
                            },
                        ],
                    ],
                },
            },
            colors: ['#C60002'],
            chart: {
                locales: [ptbr],
                defaultLocale: 'pt-br',
                id: 'area-datetime',
                type: 'area',
                zoom: false,
                toolbar: {
                    show: false,
                },
            },

            annotations: {
                yaxis: [
                    {
                        y: 0,
                        borderColor: '#999',
                        label: {
                            show: true,
                            text: '',
                            style: {
                                color: "#fff",
                                background: '#00E396'
                              }
                        },
                    },
                ],
            },
            xaxis: {
                categories: date,
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
                forceNiceScale: false,
                floating: true,
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                labels: {
                    show: false,
                    formatter: (value) => value.toFixed(2) + '%',
                },
            },
        },
        series: [
            {
                name: 'Isolamento',
                data: isolation,
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
