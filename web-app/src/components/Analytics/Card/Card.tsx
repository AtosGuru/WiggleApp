
import { FC } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { analyticsItemProps } from '@/types/analyticsTypes'
import { getGradient } from '@/utils/generateChartGradient'
import styles from '@/components/Analytics/Card/Card.module.scss'
import SectionTitle from '@/components/UI/SectionTitle/SectionTitle'

ChartJS.register(ArcElement, Tooltip, Legend)

const options = {
  responsive: true,
  cutout: '65%',
  cutoutPercentage: 0,
  plugins: {
    legend: {
      position: 'top' as const,
      display: false
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
}

const labels = ['Male', 'Female']

const data = {
  labels,
  datasets: [
    {
      label: '# of Votes',
      data: [40, 60],
      backgroundColor: function(context: any) {
        const { chart, dataIndex } = context
        const { ctx, chartArea } = chart

        if (!chartArea) {
          return
        }
        return dataIndex ? '#686868' : getGradient(ctx, chartArea)
      },
      borderWidth: 0,
      borderRadius: [10, 10],
      spacing: -10
    },
  ],
  interaction: {
    intersect: false,
  },
}

const Card: FC<analyticsItemProps> = ({ title, totalCount, maleCount, femaleCount, desc, circularChart, progressChart }) => {
  return (
    <div className={styles.card}>
      <SectionTitle leavel={3}>{title}</SectionTitle>
      { !circularChart && !progressChart && (
        <div className={`${styles.count} ${desc ? styles.countSmall : styles.countBig}`}>{totalCount}</div>
      ) }
      { (maleCount || femaleCount) && !circularChart && !progressChart && (
        <div className={styles.info}>
          <div className={styles.item}>
            <div className={styles.value}>{maleCount}</div>
            <div className={styles.label}>Male</div>
          </div>
          <div className={styles.item}>
            <div className={styles.value}>{femaleCount}</div>
            <div className={styles.label}>Female</div>
          </div>
        </div>
      ) }
      { desc && (
        <div className={styles.desc} dangerouslySetInnerHTML={{ __html: desc }} />
      ) }
      { circularChart && (
        <>
          <div className={styles.chart}>
            <Doughnut options={options} data={data} />
          </div>
          <div className={styles.tooltips}>
            <div className={styles.tooltipItem}>
              <span className={styles.tooltipIcon} style={{ background: '#686868' }} />
              <div className={styles.tooltipName}>Male</div>
            </div>
            <div className={styles.tooltipItem}>
              <span className={styles.tooltipIcon} style={{ background: 'linear-gradient(180deg, #FFCB52 0%, #FF7B02 100%)' }} />
              <div className={styles.tooltipName}>Female</div>
            </div>
          </div>
        </>
      ) }
      {  progressChart && (
        <div className={styles.progress}>
          <div className={styles.progressItem}>
            <div className={styles.progressTitle}>Pre checks</div>
            <div className={styles.progressTitle}>Bounce Rate</div>
            <div className={styles.progressTrack}>
              <span className={styles.progressThumb} style={{ width: '100%' }}>100</span>
            </div>
          </div>
          <div className={styles.progressItem}>
            <div className={styles.progressTitle}>check ins</div>
            <div className={styles.progressCount}>20%</div>
            <div className={styles.progressTrack}>
              <span className={styles.progressThumb} style={{ width: '80%' }}>80</span>
            </div>
          </div>
        </div>
      ) }
    </div>
  )
}

export default Card