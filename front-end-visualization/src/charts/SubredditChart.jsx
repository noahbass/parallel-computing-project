import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

// TODO: read in CSV data into this data structure 
const data = [
    { 'sub': '/r/soccer', 'value': -0.1 },
    { 'sub': '/r/gaming', 'value': 0.432 },
    { 'sub': '/r/AskReddit', 'value': -0.1843 },
    { 'sub': '/r/baseball', 'value': -0.326 },
    { 'sub': '/r/uCinci', 'value': -0.048 },
    { 'sub': '/r/cincinnati', 'value': 0.013 },
    { 'sub': '/r/trees', 'value': 0.3 },
    { 'sub': '/r/funny', 'value': -0.4 }
]

// Create sorted data (high to low)
const sortedData = data.sort((a, b) => (a['value'] < b['value']) ? 1 : ((b['value'] < a['value']) ? -1 : 0))
const categories = sortedData.map(entry => entry['sub'])
const values = sortedData.map(entry => entry['value'])

const options = {
    chart: {
        type: 'column',
        zoomType: 'xy',
        inverted: true // flip the x and y axis
    },
    title: {
        text: 'Subreddit Toxicity'
    },
    xAxis: {
    	// list of subreddits here
        categories: categories,
        title: {
        	text: 'Subreddits'
        }
    },
    yAxis: {
        max: 1,
        min: -1,
        title: {
      	    text: 'Sentiment Value (-1 is most negative, 1 is most positive)'
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        data: values
    }]
}

const SubredditChart = () => {
    return <HighchartsReact highcharts={Highcharts} options={options} />
}
 
export default SubredditChart
