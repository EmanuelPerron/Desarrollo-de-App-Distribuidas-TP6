# AntenaWatch 3G

Plataforma de monitoreo en tiempo real de antenas de red móvil 3G.

## Características

### Vista NOC (Administrador)
- **Mapa de Antenas**: Visualización en cuadrícula con codificación de colores por estado
- **Panel de Alertas**: Lista cronológica de eventos clasificados por severidad
- **KPIs Globales**: RSSI promedio, tráfico total, temperatura promedio, disponibilidad
- **Gestión de Incidencias**: Marcar alertas como "en atención" o "resuelta"

### Vista de Campo (Ingeniero)
- **Ficha Técnica**: Identificador, nombre, ubicación, tecnología, uptime
- **Métricas Individuales**: RSSI, tráfico, temperatura, voltaje
- **Gráficas Históricas**: Líneas de tiempo de últimas 24h (RSSI y throughput)
- **Historial de Eventos**: Últimos 10 eventos de la antena

## Capacidades del Sistema
- **Simulación de Datos**: Datos aleatorios realistas actualizados cada 5 segundos
- **Alertas Automáticas**: Se activan cuando se superan umbrales (T>55°C, RSSI<-80dBm)
- **Dos Roles de Usuario**: Administrador NOC e Ingeniero de Campo
- **Interfaz Responsiva**: Funciona en desktop, tablet y móvil

## Instalación

\`\`\`bash
npm install
npm run dev
\`\`\`

## Build para Producción

\`\`\`bash
npm run build
npm run preview
\`\`\`

## Despliegue en Vercel

Ya está configurado. Solo necesita:

\`\`\`bash
vercel --prod
\`\`\`

## Tecnología

- React 18 + TypeScript
- Vite
- CSS personalizado
- Datos simulados en tiempo real
