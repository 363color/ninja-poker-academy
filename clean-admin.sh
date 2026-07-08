#!/bin/bash
# Limpieza del panel admin — profesional para el equipo
# Ejecutar desde la raíz del proyecto

set -e
echo "🔧 Limpiando panel admin..."

# =============================================
# 1. BeforeDashboard — reemplazar por bienvenida NPA
# =============================================
cat > src/components/BeforeDashboard/index.tsx << 'ENDOFFILE'
import React from 'react'
import './index.scss'

const BeforeDashboard: React.FC = () => {
  return (
    <div className="npa-dashboard">
      <div className="npa-dashboard-header">
        <div className="npa-dashboard-brand">
          <span className="npa-dashboard-dot" />
          <span className="npa-dashboard-title">Ninja Poker Academy</span>
        </div>
        <span className="npa-dashboard-subtitle">Panel de gestión de contenido</span>
      </div>
      <div className="npa-dashboard-cards">
        <a href="/admin/collections/videos" className="npa-dash-card">
          <span className="npa-dash-icon">🎬</span>
          <div>
            <strong>Videos</strong>
            <span>Revisar clases, nivel y categorías</span>
          </div>
        </a>
        <a href="/admin/collections/posts" className="npa-dash-card">
          <span className="npa-dash-icon">📝</span>
          <div>
            <strong>Artículos</strong>
            <span>Estrategia, borradores y publicación</span>
          </div>
        </a>
        <a href="/admin/collections/categories" className="npa-dash-card">
          <span className="npa-dash-icon">📂</span>
          <div>
            <strong>Categorías</strong>
            <span>Preflop, postflop, mental game...</span>
          </div>
        </a>
        <a href="/admin/collections/subscribers" className="npa-dash-card">
          <span className="npa-dash-icon">📧</span>
          <div>
            <strong>Suscriptores</strong>
            <span>Emails de la newsletter</span>
          </div>
        </a>
      </div>
    </div>
  )
}

export default BeforeDashboard
ENDOFFILE

echo "✅ 1/3: BeforeDashboard profesional"

# =============================================
# 2. Estilos del dashboard
# =============================================
cat > src/components/BeforeDashboard/index.scss << 'ENDOFFILE'
.npa-dashboard {
  margin-bottom: 24px;
}

.npa-dashboard-header {
  background: #0D0D0D;
  border-radius: 10px;
  padding: 24px 28px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.npa-dashboard-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.npa-dashboard-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #CC1A1A;
  animation: npa-pulse 2.5s ease-in-out infinite;
}

@keyframes npa-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.npa-dashboard-title {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.2px;
}

.npa-dashboard-subtitle {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
}

.npa-dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.npa-dash-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  background: var(--theme-elevation-50, #f9f9f7);
  border: 1px solid var(--theme-elevation-100, #eee);
  border-radius: 8px;
  text-decoration: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  color: inherit;
}

.npa-dash-card:hover {
  border-color: #CC1A1A;
  box-shadow: 0 2px 12px rgba(204, 26, 26, 0.08);
}

.npa-dash-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.npa-dash-card strong {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
}

.npa-dash-card span {
  font-size: 12px;
  color: var(--theme-elevation-400, #888);
}
ENDOFFILE

echo "✅ 2/3: Estilos dashboard"

# =============================================
# 3. Eliminar SeedButton (no se necesita)
# =============================================
rm -f src/components/BeforeDashboard/SeedButton.tsx
rm -f src/components/BeforeDashboard/SeedButton/index.tsx

echo "✅ 3/3: SeedButton eliminado"
echo ""
echo "🎉 Panel admin limpio y profesional"
