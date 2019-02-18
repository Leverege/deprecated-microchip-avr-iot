import React from 'react'

import './TileDemo.less'

export default function TileDemo( props ) {
  const { image, title, category, url } = props

  return (
    <a href={url} target="_blank" className="demo-tile">
      <div className="demo-tile-image" style={{ backgroundImage : `url(${image})` }} />
      <div className="demo-tile-text">
        <h4>{category}</h4>
        <h3>{title}</h3>
      </div>
    </a>
  )
}