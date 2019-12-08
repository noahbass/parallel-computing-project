import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

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
        categories: ['/r/soccer', '/r/gaming', '/r/AskReddit', '/r/baseball', '/r/uCinci', '/r/cincinnati', '/r/trees', '/r/funny', '/r/'],
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
        data: [-0.1, 0.432, -0.1843, -0.326, -0.048, 0.013, 0.3, 0.3, -0.4]
    }]
}
 
const SubredditChart = () => {
    return <HighchartsReact highcharts={Highcharts} options={options} />
}
 
export default SubredditChart
