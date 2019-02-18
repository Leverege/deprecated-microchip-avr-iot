import React from 'react';
import PropTypes from 'prop-types';

import './InfoSection.less';

export default function InfoSection( props ) {
  const { title, children, className, id } = props;
  return (
    <div className="info-section-wrapper">
      <section id={id} className={`info-section ${className}`}>
        <h3 className="info-section-header">{title}</h3>
        { children }
      </section>
    </div>
  )
}

InfoSection.propTypes = {
  title : PropTypes.string.isRequired,
};
