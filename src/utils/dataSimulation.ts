import { Antenna, Alert, HistoricalData } from '../types'

export const generateAntennas = (): Antenna[] => {
  const locations = ['Centro', 'Norte', 'Sur', 'Este', 'Oeste', 'Zona Industrial']
  const antennas: Antenna[] = []
  
  for (let i = 1; i <= 12; i++) {
    antennas.push({
      id: `ANT-${String(i).padStart(3, '0')}`,
      name: `Antena ${i}`,
      location: locations[i % locations.length],
      technology: '3G',
      status: 'active',
      rssi: Math.random() * -40 - 70,
      throughput: Math.random() * 100,
      temperature: Math.random() * 20 + 30,
      voltage: Math.random() * 2 + 48,
      uptime: Math.random() * 99 + 1,
      lastUpdate: new Date()
    })
  }
  
  return antennas
}

export const simulateAntennasUpdate = (antennas: Antenna[]): Antenna[] => {
  return antennas.map(antenna => ({
    ...antenna,
    rssi: Math.random() * -40 - 70,
    throughput: Math.random() * 100,
    temperature: Math.random() * 20 + 30,
    voltage: Math.random() * 2 + 48,
    uptime: Math.min(antenna.uptime + 0.1, 99.99),
    lastUpdate: new Date(),
    status: getStatus(Math.random() * -40 - 70, Math.random() * 20 + 30)
  }))
}

export const getStatus = (rssi: number, temperature: number): 'active' | 'degraded' | 'critical' | 'offline' => {
  if (rssi > -80 || temperature > 55) return 'critical'
  if (rssi > -75 || temperature > 50) return 'degraded'
  if (Math.random() > 0.98) return 'offline'
  return 'active'
}

export const generateAlerts = (antennas: Antenna[]): Alert[] => {
  const alerts: Alert[] = []
  const severities: Array<'critical' | 'high' | 'medium' | 'low'> = ['critical', 'high', 'medium', 'low']
  
  antennas.forEach(antenna => {
    if (antenna.temperature > 55) {
      alerts.push({
        id: `ALERT-${antenna.id}-TEMP`,
        antennaId: antenna.id,
        antennaName: antenna.name,
        severity: 'critical',
        message: `Temperatura crítica: ${antenna.temperature.toFixed(1)}°C`,
        timestamp: new Date(),
        status: 'active'
      })
    }
    
    if (antenna.rssi < -80) {
      alerts.push({
        id: `ALERT-${antenna.id}-RSSI`,
        antennaId: antenna.id,
        antennaName: antenna.name,
        severity: 'high',
        message: `Señal débil: ${antenna.rssi.toFixed(1)} dBm`,
        timestamp: new Date(),
        status: 'active'
      })
    }

    if (antenna.status === 'offline') {
      alerts.push({
        id: `ALERT-${antenna.id}-OFFLINE`,
        antennaId: antenna.id,
        antennaName: antenna.name,
        severity: 'critical',
        message: `Antena fuera de servicio`,
        timestamp: new Date(),
        status: 'active'
      })
    }
  })
  
  return alerts
}

export const generateHistoricalData = (): HistoricalData[] => {
  const data: HistoricalData[] = []
  const now = new Date()
  
  for (let i = 24 * 60; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60000)
    data.push({
      timestamp,
      rssi: Math.random() * -40 - 70,
      throughput: Math.random() * 100
    })
  }
  
  return data
}
