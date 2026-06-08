import React from 'react'
import { Antenna, Alert } from '../types'
import AntennaGrid from './AntennaGrid'
import AlertPanel from './AlertPanel'
import KPIPanel from './KPIPanel'
import './NOCView.css'

interface NOCViewProps {
  antennas: Antenna[]
  alerts: Alert[]
  onSelectAntenna: (id: string) => void
  onAlertStatusChange: (alertId: string, status: 'active' | 'acknowledged' | 'resolved') => void
}

function NOCView({
  antennas,
  alerts,
  onSelectAntenna,
  onAlertStatusChange
}: NOCViewProps) {
  return (
    <div className="noc-view">
      <KPIPanel antennas={antennas} />
      
      <div className="noc-content">
        <div className="noc-left">
          <h2>Mapa de Antenas</h2>
          <AntennaGrid antennas={antennas} onSelectAntenna={onSelectAntenna} />
        </div>
        
        <div className="noc-right">
          <h2>Panel de Alertas</h2>
          <AlertPanel 
            alerts={alerts}
            onStatusChange={onAlertStatusChange}
          />
        </div>
      </div>
    </div>
  )
}

export default NOCView
