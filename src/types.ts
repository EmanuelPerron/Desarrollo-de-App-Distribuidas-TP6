export interface Antenna {
  id: string
  name: string
  location: string
  technology: string
  status: 'active' | 'degraded' | 'critical' | 'offline'
  rssi: number
  throughput: number
  temperature: number
  voltage: number
  uptime: number
  lastUpdate: Date
}

export interface Alert {
  id: string
  antennaId: string
  antennaName: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  message: string
  timestamp: Date
  status: 'active' | 'acknowledged' | 'resolved'
}

export interface HistoricalData {
  timestamp: Date
  rssi: number
  throughput: number
}

export interface AntennaDetail {
  antenna: Antenna
  historicalData: HistoricalData[]
  recentEvents: Alert[]
}
