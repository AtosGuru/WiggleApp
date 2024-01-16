import { FC } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { externalTooltipHandler } from '@/utils/createChartTooltip'
import { getGradient } from '@/utils/generateChartGradient'
import styles from '@/components/Analytics/ActiveTimes/ActiveTimes.module.scss'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
)

const plugins = [{
  id: 'hoverLine',
  afterDraw(chart: any) {
    const { ctx, tooltip, chartArea: { bottom }, scales: { x, y } } = chart

    if (tooltip?._active.length > 0) {
      const xCoor = x.getPixelForValue(tooltip.dataPoints[0].dataIndex)
      const yCoor = y.getPixelForValue(tooltip.dataPoints[0].parsed.y)

      ctx.save()
      ctx.beginPath()
      ctx.lineWidth = 1
      ctx.strokeStyle = '#FFCB52'
      ctx.setLineDash([6, 6])
      ctx.moveTo(xCoor, yCoor)
      ctx.lineTo(xCoor, bottom)
      ctx.stroke()
      ctx.closePath()
    }
  }
}]

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      display: false
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
    tooltip: {
      enabled: false,
      external: externalTooltipHandler
    },
  },
  scales: {
    x: {
      border: {
        display: false
      },
      grid: {
        display: false
      }
    },
    y: {
      border: {
        display: false
      },
      grid: {
        color: () => 'rgba(255, 255, 255, .05)'
      }
    }
  },
  interaction: {
    intersect: false,
  },
}

const labels = ['10am', '11am', '12am', '02am', '03am', '04am', '05am', '06am', '07am']

const data = {
  labels,
  datasets: [
    {
      fill: true,
      lineTension: .3,
      pointRadius: 0,
      label: 'Dataset 2',
      data: [10, 2, 10, 20, 5, 7, 5, 6, 4],
      borderWidth: 5,
      borderColor: function(context: any) {
        const chart = context.chart
        const {ctx, chartArea} = chart

        if (!chartArea) {
          return
        }
        return getGradient(ctx, chartArea)
      },
      backgroundColor: 'rgba(94, 195, 255, 0.04)',
    },
  ],
}

const ActiveTimesChart: FC = () => {
  return (
    <div className={styles.chart}>
      <Line options={options} data={data} plugins={plugins} />
    </div>
  )
}

export default ActiveTimesChart