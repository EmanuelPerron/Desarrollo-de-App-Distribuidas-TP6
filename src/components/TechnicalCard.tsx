import React from 'react'
import { Antenna } from '../types'
import './TechnicalCard.css'

interface TechnicalCardProps {
  antenna: Antenna
}

function TechnicalCard({ antenna }: TechnicalCardProps) {
  return (
    <div className="technical-card">
      <h3>Ficha Técnica</h3>
      <div className="tech-grid">
        <div className="tech-item">
          <label>ID</label>
          <div className="value">{antenna.id}</div>
        </div>
        <div className="tech-item">
          <label>Nombre</label>
          <div className="value">{antenna.name}</div>
        </div>
        <div className="tech-item">
          <label>Ubicación</label>
          <div className="value">{antenna.location}</div>
        </div>
        <div className="tech-item">
          <label>Tecnología</label>
          <div className="value">{antenna.technology}</div>
        </div>
        <div className="tech-item">
          <label>Uptime</label>
          <div className="value">{antenna.uptime.toFixed(2)}%</div>
        </div>
        <div className="tech-item">
          <label>Estado</label>
          <div className={`value status-badge ${antenna.status}`}>{antenna.status.toUpperCase()}</div>
        </div>
      </div>

      <h4>Métricas Actuales</h4>
      <div className="metrics-grid">
        <div className="metric-item">
          <label>RSSI</label>
          <div className="value">{antenna.rssi.toFixed(1)} dBm</div>
        </div>
        <div className="metric-item">
          <label>Throughput</label>
          <div className="value">{antenna.throughput.toFixed(1)} Mbps</div>
        </div>
        <div className="metric-item">
          <label>Temperatura</label>
          <div className="value">{antenna.temperature.toFixed(1)} °C</div>
        </div>
        <div className="metric-item">
          <label>Voltaje</label>
          <div className="value">{antenna.voltage.toFixed(2)} V</div>
        </div>
      </div>
    </div>
  )
}

export default TechnicalCard
