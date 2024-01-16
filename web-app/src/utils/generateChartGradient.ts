let width: number, height: number, gradient: any

export const getGradient = (ctx: any, chartArea: any) => {
  const chartWidth = chartArea.right - chartArea.left
  const chartHeight = chartArea.bottom - chartArea.top
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    width = chartWidth
    height = chartHeight
    gradient = ctx.createLinearGradient(0, chartArea.left, 0, chartArea.right)

    gradient.addColorStop(0, '#FFCB52')
    gradient.addColorStop(0.5, '#FF7B02')
    gradient.addColorStop(1, '#FFCB52')
  }

  return gradient
}