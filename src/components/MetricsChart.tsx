import React from 'react'
import { Antenna, HistoricalData } from '../types'
import './MetricsChart.css'

interface MetricsChartProps {
  antenna: Antenna
  historicalData: HistoricalData[]
}

function MetricsChart({ antenna, historicalData }: MetricsChartProps) {
  return (
    <div className="metrics-chart">
      <h3>Historial de Últimas 24 Horas</h3>
      
      <div className="chart-container">
        <div className="mini-chart">
          <h4>RSSI (dBm)</h4>
          <svg viewBox="0 0 800 200" className="sparkline">
            <polyline
              points={historicalData
                .map((d, i) => `${i * 6.67},${200 - (d.rssi + 100) * 2}`)
                .join(' ')}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
            />
          </svg>
          <div className="chart-stats">
            <span>Min: {Math.min(...historicalData.map(d => d.rssi)).toFixed(1)}</span>
            <span>Actual: {antenna.rssi.toFixed(1)}</span>
            <span>Max: {Math.max(...historicalData.map(d => d.rssi)).toFixed(1)}</span>
          </div>
        </div>

        <div className="mini-chart">
          <h4>Throughput (Mbps)</h4>
          <svg viewBox="0 0 800 200" className="sparkline">
            <polyline
              points={historicalData
                .map((d, i) => `${i * 6.67},${200 - d.throughput * 2}`)
                .join(' ')}
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
            />
          </svg>
          <div className="chart-stats">
            <span>Min: {Math.min(...historicalData.map(d => d.throughput)).toFixed(1)}</span>
            <span>Actual: {antenna.throughput.toFixed(1)}</span>
            <span>Max: {Math.max(...historicalData.map(d => d.throughput)).toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MetricsChart
