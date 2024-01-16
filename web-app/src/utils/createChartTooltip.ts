import { isBrowser } from '@/utils/isBrowser'

const getOrCreateTooltip = (chart: any) => {
  if (!isBrowser()) {
    return
  }
  
  let tooltipEl = chart.canvas.parentNode.querySelector('div')

  if (!tooltipEl) {
    tooltipEl = document.createElement('div')
    tooltipEl.style.display = 'flex'
    tooltipEl.style.justifyContent = 'center'
    tooltipEl.style.alignItems = 'center'
    tooltipEl.style.textAlign = 'center'
    tooltipEl.style.backgroundImage = 'url(/assets/images/tooltip-bg.svg)'
    tooltipEl.style.backgroundRepeat = 'no-repeat'
    tooltipEl.style.backgroundPosition = 'center center'
    tooltipEl.style.backgroundSize = 'cover'
    tooltipEl.style.width = '120px'
    tooltipEl.style.height = '90px'
    tooltipEl.style.color = '#000'
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute'
    tooltipEl.style.transform = 'translate(-50%, -100%)'
    tooltipEl.style.transition = 'all .2s ease'

    const table = document.createElement('table')
    table.style.margin = '0px'

    tooltipEl.appendChild(table)
    chart.canvas.parentNode.appendChild(tooltipEl)
  }

  return tooltipEl
}

export const externalTooltipHandler = (context: any) => {
  if (!isBrowser()) {
    return
  }
  
  const {chart, tooltip} = context
  const tooltipEl = getOrCreateTooltip(chart)

  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0
    return
  }

  if (tooltip.body) {
    const titleLines = tooltip.title || []
    const bodyLines = tooltip.body.map((b: any) => b.lines)

    const tableHead = document.createElement('thead')

    titleLines.forEach((title: any) => {
      const tr = document.createElement('tr')
      tr.style.borderWidth = '0'

      const th = document.createElement('th')
      th.style.borderWidth = '0'
      const text = document.createTextNode(title)

      th.appendChild(text)
      tr.appendChild(th);
      tableHead.appendChild(tr)
    })

    const tableBody = document.createElement('tbody')
    bodyLines.forEach((body: any, i: any) => {
      const tr = document.createElement('tr')
      tr.style.backgroundColor = 'inherit'
      tr.style.borderWidth = '0'

      const td = document.createElement('td')
      td.style.borderWidth = '0'

      const text = document.createTextNode(body)

      td.appendChild(text)
      tr.appendChild(td)
      tableBody.appendChild(tr)
    })

    const tableRoot = tooltipEl.querySelector('table')

    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove()
    }

    tableRoot.appendChild(tableHead)
    tableRoot.appendChild(tableBody)
  }

  const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas

  tooltipEl.style.opacity = 1
  tooltipEl.style.left = positionX + tooltip.caretX + 'px'
  tooltipEl.style.top = positionY + tooltip.caretY + 'px'
  tooltipEl.style.font = tooltip.options.bodyFont.string
  tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px'
}