import React from 'react';
import PropTypes from 'prop-types';

import './TileInset.less';

export default function TileInset ( props ) {
	const { children, title, className, id } = props;

	return (
		<div id={id ? id : ''} className={`tile ${className}`}>
			{ title ? <h4 className='title'>{title}</h4> : '' }
			{ children }
		</div>
	)
}

TileInset.propTypes = {
	title: PropTypes.string,
	className: PropTypes.string
}