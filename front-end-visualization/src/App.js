import React from 'react'
import './App.css'
import TestChart from './charts/TestChart'
import TestChartLoad from './charts/TestChartLoad'
import SubredditChart from './charts/SubredditChart'

const App = () => {
    return (
        <div>
            <SubredditChart />

            <TestChart />
            <TestChartLoad />
        </div>
    )
}

export default App
