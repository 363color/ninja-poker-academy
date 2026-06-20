import React from 'react'

const StyleGuideNavLink: React.FC = () => {
  return (
    <a
      href="/style-guide"
      target="_blank"
      rel="noopener noreferrer"
      className="nav__link"
      style={{ marginTop: '0.5rem' }}
    >
      <span className="nav__link-label">Style Guide ↗</span>
    </a>
  )
}

export default StyleGuideNavLink
