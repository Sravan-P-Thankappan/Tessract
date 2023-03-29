import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

function App() {

  const [details, setDetails] = useState([])


  const state = {

    series: [{

      data: details

    }],

    options: {
      chart: {
        type: 'candlestick',
        height: 350
      },
      title: {
        text: 'NIFTY',
        align: 'left'
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    },


  };





  useEffect(() => {

    axios.get('http://localhost:5000/details')
      .then((resp) => {

        const data = resp.data.map((item) => {        
          return {
              x: item.date,
              y: [item.open,item.high,item.low,item.close]
          }
        })
        setDetails(data)
      })
      .catch((er) => {
        console.log(er)
      })

  }, [])


  return (

    <div className="App">

      <Chart
        options={state.options}
        series={state.series}
        type="candlestick"
        height={650}
      />

    </div>
  );


}

export default App;



















