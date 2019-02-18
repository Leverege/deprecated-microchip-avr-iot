import React from 'react';
import PropTypes from 'prop-types';
import './FooterLinks.less';

export default function FooterLinks (props) {
  return (
    <div className='footer-links'>
      <h3 className='footer-links-header'> { props.header }</h3>
      <ul className='footer-links-list'>
        { props.children }
      </ul>
    </div>
  )
}

FooterLinks.propTypes = {
  header: PropTypes.string.isRequired
};
  