import React from 'react';
import PropTypes from 'prop-types';

import './InfoSection.less';

export default function InfoSection (props) {
	const { title, children, className } = props;
	return (
		<section className={`info-section ${className}`}>
			<h3 className='info-section-header'>{title}</h3>
			{ children }
		</section>
	)
}

InfoSection.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string
};
