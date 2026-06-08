import React, { useState, useEffect } from 'react'
import { Antenna, Alert } from './types'
import { generateAntennas, simulateAntennasUpdate, generateAlerts } from './utils/dataSimulation'
import NOCView from './components/NOCView'
import FieldView from './components/FieldView'
import './components/App.css'

function App() {
  const [userRole, setUserRole] = useState<'admin' | 'field'>('admin')
  const [antennas, setAntennas] = useState<Antenna[]>(generateAntennas())
  const [alerts, setAlerts] = useState<Alert[]>(generateAlerts(antennas))
  const [selectedAntenna, setSelectedAntenna] = useState<string | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setAntennas(prev => {
        const updated = simulateAntennasUpdate(prev)
        setAlerts(generateAlerts(updated))
        return updated
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>AntenaWatch 3G</h1>
          <p>Monitoreo en Tiempo Real de Antenas de Red Móvil</p>
        </div>
        <div className="role-switcher">
          <button
            className={`role-btn ${userRole === 'admin' ? 'active' : ''}`}
            onClick={() => {
              setUserRole('admin')
              setSelectedAntenna(null)
            }}
          >
            Vista NOC (Admin)
          </button>
          <button
            className={`role-btn ${userRole === 'field' ? 'active' : ''}`}
            onClick={() => setUserRole('field')}
          >
            Vista Campo (Ingeniero)
          </button>
        </div>
      </header>

      <main className="app-main">
        {userRole === 'admin' ? (
          <NOCView
            antennas={antennas}
            alerts={alerts}
            onSelectAntenna={setSelectedAntenna}
            onAlertStatusChange={(alertId: string, status: any) => {
              setAlerts(prev =>
                prev.map(a => (a.id === alertId ? { ...a, status } : a))
              )
            }}
          />
        ) : (
          <FieldView
            antennas={antennas}
            alerts={alerts}
            selectedAntennaId={selectedAntenna}
            onSelectAntenna={setSelectedAntenna}
          />
        )}
      </main>
    </div>
  )
}

export default App
