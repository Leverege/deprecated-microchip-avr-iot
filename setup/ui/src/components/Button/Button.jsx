import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Button.less';

/**
 * Returns clickable object that looks like a button
 * @param {object} props 
 * @param {string} props.text required, sets button text
 * @param {string} props.href target location for default (<a href>) and link buttons
 * @param {function} props.onClick specifies action for button buttons
 * @param {string} props.color color scheme (named in css)
 * @param {object} props.style override styles
 * @param {string} props.type specifies buttong type (default is vanilla <a href>; 'link' for reach-router Link, 'button' for button button.)
 * @param {string} props.id
 */
export default function Button( props ) {
  const { text, color, href, style, type, onClick, id, className } = props;
  const colorClass = `btn--${color}`;

  if ( type === 'button' ) {
    return (
      <button 
        id={id} 
        className={`btn ${colorClass} ${className}`} 
        style={style} 
        onClick={() => onClick()}>
        {text}
      </button>
    )
  }

  if ( type === 'link' ) {
    // react router links
    return (
      <Link to={href} className={`btn ${colorClass} ${className}`} style={style}>{text}</Link>
    )
  }

  return (
    <a id={id} href={href} target="_blank" className={`btn ${colorClass} ${className}`} style={style}>{text}</a>
  )

}

Button.defaultProps = {
  href : '#',
  color : 'red',
  style : {},
  type : '',
  onClick : () => null,
  id : ''
}

Button.propTypes = {
  text : PropTypes.string.isRequired,
  href : PropTypes.string,
  color : PropTypes.string,
  style : PropTypes.object,
  type : PropTypes.string,
  onClick : PropTypes.func,
  id : PropTypes.string
};
