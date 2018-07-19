import React from 'react';
import { connect } from 'react-redux';
import FooterLinks from '../FooterLinks/FooterLinks';
import ContentWrapper from '../ContentWrapper/ContentWrapper';
import { toggleModal } from '../../actions/UIActions';
import './Footer.less';

class Footer extends React.Component {
  handleUnavailable = () => {
    this.props.dispatch( toggleModal('unavailable') )
  }
  render() {
    return (
      <footer className="site-footer">
        <ContentWrapper className="site-footer-content">
          <FooterLinks header="Downloads">
            <li><a href="#" onClick={this.handleUnavailable}>Main Example Image</a></li>
            <li><a href="#" onClick={this.handleUnavailable}>Additional Images and Sensors</a></li>
          </FooterLinks>
          <FooterLinks header="Documentation">
            <li><a href="#" onClick={this.handleUnavailable}>AVR-IOT User Guide</a></li>
            <li><a href="#" onClick={this.handleUnavailable}>BOM</a></li>
            <li><a href="#" onClick={this.handleUnavailable}>Schematic and Gerbers (complete)</a></li>
          </FooterLinks>
          <FooterLinks header="Rapid Development Tools">
            <li><a href="https://microchip.com/start" target="_blank">AVR START</a></li>
            <li><a href="https://microchip.com/mcc" target="_blank">MPLAB Code Configurator</a></li>
            <li><a href="#" onClick={this.handleUnavailable}>White Papers</a></li>
            <li><a href="#" onClick={this.handleUnavailable}>Books</a></li>
          </FooterLinks>
          <FooterLinks header="Videos">
            <li><a href="#" onClick={this.handleUnavailable}>MCHP 1 Minute</a></li>
            <li><a href="#" onClick={this.handleUnavailable}>GOOGLE Quicklabs</a></li>
          </FooterLinks>
          <FooterLinks header="Other IOT Solutions &amp; Architecture">
            <li><a href="http://www.microchip.com/design-centers/wireless-connectivity/low-power-wide-area-networks" target="_blank">LoRa Solutions</a></li>
            <li><a href="#" onClick={this.handleUnavailable}>SECURE BLE</a></li>
            <li><a href="#" onClick={this.handleUnavailable}>Arduino IoT</a></li>
            <li><a href="#" onClick={this.handleUnavailable}>PIC-IOT.com</a></li>
            <li><a href="#" onClick={this.handleUnavailable}>XPRESS</a></li>
            <li><a href="http://www.microchip.com/design-centers/wireless-connectivity/embedded-wi-fi/get-started-with-atwinc1500-xstk" target="_blank">32-BIT solutions</a></li>
            <li><a href="#" onClick={this.handleUnavailable}>SIP solutions</a></li>
          </FooterLinks>
        </ContentWrapper>
      </footer>
    )

  }
}

export default connect()(Footer)
