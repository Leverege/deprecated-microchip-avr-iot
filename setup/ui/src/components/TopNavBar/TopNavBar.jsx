import React from 'react';
import gcloudLogo from '../../images/google-cloud-logo.svg';
import microchipLogo from '../../images/Microchip-logo.png';
import lvglogo from '../../images/lvg-logo.png'
import './TopNavBar.less';
import ContentWrapper from '../ContentWrapper/ContentWrapper';

export default function TopNavBar( props ) {
  const { showShadow } = props;

  return (
    <nav className={showShadow ? 'topnav topnav-shadow' : 'topnav'}>
      <ContentWrapper className="topnav-content">
        <a className="navLogo mainLogo" href="https://www.leverege.com" target="_blank"><img src={lvglogo} alt="Leverge" /></a>
        <a className="navLogo" href="http://www.microchip.com/" target="_blank"><img src={microchipLogo} alt="Microchip" /></a>
        <a className="navLogo" href="https://cloud.google.com/" target="_blank"><img src={gcloudLogo} alt="Google Cloud" /></a>
      </ContentWrapper>
    </nav>
  )
}
