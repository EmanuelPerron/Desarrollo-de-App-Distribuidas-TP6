import React from 'react'
import { Antenna } from '../types'
import './AntennaGrid.css'

interface AntennaGridProps {
  antennas: Antenna[]
  onSelectAntenna: (id: string) => void
}

function AntennaGrid({ antennas, onSelectAntenna }: AntennaGridProps) {
  return (
    <div className="antenna-grid">
      {antennas.map(antenna => (
        <div
          key={antenna.id}
          className={`antenna-item ${antenna.status}`}
          onClick={() => onSelectAntenna(antenna.id)}
          title={`${antenna.name} - ${antenna.status}`}
        >
          <div className="antenna-id">{antenna.id}</div>
          <div className="antenna-status-indicator"></div>
          <div className="antenna-info">
            <div className="antenna-rssi">{antenna.rssi.toFixed(0)} dBm</div>
            <div className="antenna-temp">{antenna.temperature.toFixed(1)}°C</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AntennaGrid
