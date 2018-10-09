import React from 'react'
import FooterLinks from '../FooterLinks/FooterLinks'
import ContentWrapper from '../ContentWrapper/ContentWrapper'
import levlogo from '../../images/lvg-white-logo.png'

import './Footer.less'

export default function Footer( props ) {
  return (
    <footer className="site-footer">
      <ContentWrapper className="site-footer-content">
        <FooterLinks header="Services">
          <li><a href="https://www.leverege.com/getting-started-iot" target="_blank">Rapid Prototyping</a></li>
          <li><a href="https://www.leverege.com/iot-platform" target="_blank">IoT Platform</a></li>
          <li><a href="https://www.leverege.com/systems-integration" target="_blank">Systems Integration</a></li>
        </FooterLinks>
        <FooterLinks header="Videos">
          <li><a href="https://www.leverege.com/usecases/solar-farm-solution" target="_blank">Solar Farm</a></li>
          <li><a href="https://www.leverege.com/usecases/waste-management-solution" target="_blank">Waste Collection</a></li>
          <li><a href="https://www.leverege.com/usecases/hospital-equipment-tracking" target="blank">Medical Asset Tracking</a></li>
          <li><a href="https://www.leverege.com/blogpost/prototyping-indoor-tracking-system" target="blank">Indoor Asset Tracking</a></li>
        </FooterLinks>
        <FooterLinks header="Case Studies">
          <li><a href="https://www.leverege.com/casestudy/sirenmarine" target="_blank">Connected Boats</a></li>
          <li><a href="https://www.leverege.com/casestudy/manheim" target="_blank">Auction Fleet Management</a></li>
        </FooterLinks>
        <FooterLinks header="More Resources">
          <li><a href="https://www.leverege.com/iot-resources" target="blank">Blog</a></li>
          <li><a href="https://www.leverege.com/research-papers" target="blank">Research</a></li>
          <li><a href="https://www.leverege.com/videos" target="_blank">Videos</a></li>
          <li><a href="https://www.leverege.com/iot-intro-ebook" target="_blank">IoT eBook</a></li>
        </FooterLinks>
      </ContentWrapper>
      <div className="levLogo" onClick={() => window.open( 'https://www.leverege.com/', '_blank' )}>
        <h4>Powered by</h4>
        <div className="levLogo-wrapper">
          <img src={levlogo} alt="Leverege" />
        </div>
      </div>
    </footer>
  )
}
