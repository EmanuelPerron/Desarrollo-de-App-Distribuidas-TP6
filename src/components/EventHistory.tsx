import React from 'react'
import { Alert } from '../types'
import './EventHistory.css'

interface EventHistoryProps {
  events: Alert[]
}

function EventHistory({ events }: EventHistoryProps) {
  return (
    <div className="event-history">
      <h3>Historial de Últimos 10 Eventos</h3>
      <div className="events-list">
        {events.length === 0 ? (
          <div className="no-events">Sin eventos en esta antena</div>
        ) : (
          events.slice(0, 10).map(event => (
            <div key={event.id} className={`event-item severity-${event.severity}`}>
              <div className="event-time">
                {new Date(event.timestamp).toLocaleTimeString()}
              </div>
              <div className="event-message">{event.message}</div>
              <span className={`event-status ${event.status}`}>{event.status}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default EventHistory
