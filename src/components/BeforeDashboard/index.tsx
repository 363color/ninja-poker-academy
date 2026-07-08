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
