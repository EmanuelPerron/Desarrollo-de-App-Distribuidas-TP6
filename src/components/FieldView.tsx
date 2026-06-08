import React, { useMemo, useState } from 'react'
import { Antenna, Alert, HistoricalData } from '../types'
import { generateHistoricalData } from '../utils/dataSimulation'
import TechnicalCard from './TechnicalCard'
import MetricsChart from './MetricsChart'
import EventHistory from './EventHistory'
import './FieldView.css'

interface FieldViewProps {
  antennas: Antenna[]
  alerts: Alert[]
  selectedAntennaId: string | null
  onSelectAntenna: (id: string) => void
}

function FieldView({
  antennas,
  alerts,
  selectedAntennaId,
  onSelectAntenna
}: FieldViewProps) {
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>(generateHistoricalData())

  const selectedAntenna = useMemo(() => {
    return antennas.find(a => a.id === selectedAntennaId) || antennas[0]
  }, [antennas, selectedAntennaId])

  const antennaAlerts = useMemo(() => {
    return alerts.filter(a => a.antennaId === selectedAntenna.id)
  }, [alerts, selectedAntenna.id])

  return (
    <div className="field-view">
      <div className="antenna-selector">
        <h2>Seleccionar Antena</h2>
        <div className="antenna-list">
          {antennas.map(antenna => (
            <button
              key={antenna.id}
              className={`antenna-option ${selectedAntenna.id === antenna.id ? 'active' : ''}`}
              onClick={() => onSelectAntenna(antenna.id)}
            >
              <span className={`status-dot ${antenna.status}`}></span>
              {antenna.id} - {antenna.name}
            </button>
          ))}
        </div>
      </div>

      <div className="antenna-details">
        <TechnicalCard antenna={selectedAntenna} />
        <MetricsChart antenna={selectedAntenna} historicalData={historicalData} />
        <EventHistory events={antennaAlerts} />
      </div>
    </div>
  )
}

export default FieldView
