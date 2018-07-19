import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Button.less';

export default function Button(props) {
  // text prop - required string, sets button text
  // href prop - optional string, specifies location for link buttons,
  // onClick prop - optional func, specifies action for button buttons,
  // color prop - optional string, specifies color scheme
  // style prop - optional object, overrides styles
  // type prop - optional string, specifies 'link' or 'button' button.
  // id - optional string

  const { text, color, href, style, type, onClick, id, className } = props;
  const colorClass = `btn--${color ? color : 'red'}`;

  if ( type === 'button' ) {
    return (
      <button id={id} className={`btn ${colorClass} ${className}`} style={style} onClick={() => onClick()}>{text}</button>
    )
  }

  if ( type === 'link' ) {
    // react router links
    return (
      <Link to={href} className={`btn ${colorClass} ${className}`} style={style}>{text}</Link>
    )
  }

  return (
    <a id={id} href={href} className={`btn ${colorClass} ${className}`} style={style}>{text}</a>
  )

}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string
};
