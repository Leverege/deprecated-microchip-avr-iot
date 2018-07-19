import React from 'react';
import './ContentWrapper.less';

export default function ContentWrapper (props) {
  return (
    <div className={ `content-wrapper ${props.className}` }>{ props.children } </div>
  )
}