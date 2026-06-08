import React from 'react'
import { Antenna } from '../types'
import './KPIPanel.css'

interface KPIPanelProps {
  antennas: Antenna[]
}

function KPIPanel({ antennas }: KPIPanelProps) {
  const avgRSSI = (antennas.reduce((sum, a) => sum + a.rssi, 0) / antennas.length).toFixed(1)
  const totalThroughput = antennas.reduce((sum, a) => sum + a.throughput, 0).toFixed(1)
  const avgTemp = (antennas.reduce((sum, a) => sum + a.temperature, 0) / antennas.length).toFixed(1)
  const availability = ((antennas.filter(a => a.status !== 'offline').length / antennas.length) * 100).toFixed(1)

  return (
    <div className="kpi-panel">
      <div className="kpi-card">
        <div className="kpi-label">RSSI Promedio</div>
        <div className="kpi-value">{avgRSSI}</div>
        <div className="kpi-unit">dBm</div>
      </div>

      <div className="kpi-card">
        <div className="kpi-label">Tráfico Total</div>
        <div className="kpi-value">{totalThroughput}</div>
        <div className="kpi-unit">Mbps</div>
      </div>

      <div className="kpi-card">
        <div className="kpi-label">Temperatura Promedio</div>
        <div className="kpi-value">{avgTemp}</div>
        <div className="kpi-unit">°C</div>
      </div>

      <div className="kpi-card">
        <div className="kpi-label">Disponibilidad Global</div>
        <div className="kpi-value">{availability}</div>
        <div className="kpi-unit">%</div>
      </div>
    </div>
  )
}

export default KPIPanel
