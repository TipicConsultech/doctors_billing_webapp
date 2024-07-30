import React, { useEffect, useRef } from 'react'

import { CChartBar } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

const MainChart = () => {
  const chartRef = useRef(null)

  const getBarColor = (value) => {
    return value < 0 ? 'red' : getStyle('--cui-success'); // 'red' for negative values, green for non-negative
  };


  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color')
          chartRef.current.options.scales.y.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color')
          chartRef.current.update()
        })
      }
    })
  }, [chartRef])

  const random = () => Math.round(Math.random() * 100)

  return (
    <>
      <CChartBar
        ref={chartRef}
        style={{ height: '300px', marginTop: '40px' }}
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October',
                    'November','December'],
          datasets: [
            {
              label: 'Profit',
              backgroundColor: getStyle('--cui-success'),
          //     backgroundColor: dataValues.map(value => getBarColor(value)), // Apply color function to each value
          //     borderColor: dataValues.map(value => getBarColor(value)), // Optional: Apply color function to border as well
              pointHoverBackgroundColor: getStyle('--cui-info'),
              borderWidth: 2,
              data: [
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
              ],
              fill: true,
            },
            // {
            //   label: 'Losses',
            //   backgroundColor: getStyle('--cui-success'),
            //   borderColor: getStyle('--cui-success'),
            //   pointHoverBackgroundColor: getStyle('--cui-success'),
            //   borderWidth: 2,
            //   data: [
            //     random(50, 200),
            //     random(50, 200),
            //     random(50, 200),
            //     random(50, 200),
            //     random(50, 200),
            //     random(50, 200),
            //     random(50, 200),
            //   ],
            // },
            {
              label: 'Expenses',
              backgroundColor: getStyle('--cui-danger'),
              borderColor: getStyle('--cui-danger'),
              pointHoverBackgroundColor: getStyle('--cui-danger'),
              borderWidth: 1,
              borderDash: [8, 5],
              data: [65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65],
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            datalabels: {
              color: 'white',
              display:true,
              formatter: (value) => value,  // Display the actual data value
            }
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
                drawOnChartArea: false,
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              beginAtZero: true,
              border: {
                color: getStyle('--cui-border-color-translucent'),
              },
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              max: 250,
              ticks: {
                color: getStyle('--cui-body-color'),
                maxTicksLimit: 5,
                stepSize: Math.ceil(250 / 5),
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            },
          },
        }}
      />
    </>
  )
}

export default MainChart
