import React from 'react'
import { Alert } from '../types'
import './AlertPanel.css'

interface AlertPanelProps {
  alerts: Alert[]
  onStatusChange: (alertId: string, status: 'active' | 'acknowledged' | 'resolved') => void
}

function AlertPanel({ alerts, onStatusChange }: AlertPanelProps) {
  const sortedAlerts = [...alerts].sort((a, b) => {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
    return severityOrder[a.severity] - severityOrder[b.severity]
  })

  return (
    <div className="alert-panel">
      {sortedAlerts.length === 0 ? (
        <div className="no-alerts">
          <p>✓ Sin alertas activas</p>
        </div>
      ) : (
        <div className="alerts-list">
          {sortedAlerts.map(alert => (
            <div key={alert.id} className={`alert-item severity-${alert.severity}`}>
              <div className="alert-header">
                <span className="alert-antenna">{alert.antennaName}</span>
                <span className={`alert-severity ${alert.severity}`}>{alert.severity.toUpperCase()}</span>
              </div>
              <div className="alert-message">{alert.message}</div>
              <div className="alert-footer">
                <span className="alert-time">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                <select
                  value={alert.status}
                  onChange={(e) => onStatusChange(alert.id, e.target.value as any)}
                  className="alert-status-select"
                >
                  <option value="active">Activa</option>
                  <option value="acknowledged">En Atención</option>
                  <option value="resolved">Resuelta</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AlertPanel
