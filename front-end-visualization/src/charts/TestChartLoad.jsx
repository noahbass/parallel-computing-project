import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import { data as scatterData } from './data/data.json'


// Example chart with external dataset from disk (../data/data.json)
const options = {
    credits: false,
    chart: {
        type: 'scatter',
        zoomType: 'xy'
    },
    xAxis: {
        title: {
            text: 'Height (cm)'
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: 'Weight (kg)'
        }
    },
    plotOptions: {
        scatter: {
            marker: {
                radius: 5,
                states: {
                    hover: {
                        enabled: true,
                        lineColor: 'rgb(100,100,100)'
                    }
                }
            },
            states: {
                hover: {
                    marker: {
                        enabled: false
                    }
                }
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x} cm, {point.y} kg'
            }
        }
    },
    title: {
        text: 'Test Chart (Loaded Data)'
    },
    series: [
        {
            name: 'Female',
            color: 'rgba(223, 83, 83, .5)',
            data: scatterData
        }
    ]
}

const TestChartLoad = () => {
    return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default TestChartLoad
