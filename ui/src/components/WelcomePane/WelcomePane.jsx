import React from 'react';
import { connect } from 'react-redux';
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import StatusStrip from '../StatusStrip/StatusStrip';
import CollapsibleSection from '../CollapsibleSection/CollapsibleSection';
import WelcomeInset from '../WelcomeInset/WelcomeInset'

import './WelcomePane.less';

class WelcomePane extends React.Component {
  render() {
    const { hideInset, connectedToFirebase } = this.props;
    const inset = !hideInset ? <WelcomeInset connected={false} /> : ''
    return (
      <main className={connectedToFirebase ? 'welcome compact' : 'welcome'}>
        <div className="welcome-wrapper">
          <div className={connectedToFirebase ? 'welcome-content compact' : 'welcome-content'}>
            <div className={!hideInset ? 'welcome-left' : 'welcome-full'}>
              <h2 className="welcome-main-title">AVR-IoT Sensor Node</h2>
              <h3 className="welcome-secondary-header">Get Your Things on the Internet in 30 seconds flat with AVR-IoT!</h3>
              <p className="welcome-info-para">There are many ways to get your embedded applications connected, but Microchip and Google have partnered to offer you the simplest and most effective way to give your <a target="_blank" href="http://www.microchip.com/design-centers/internet-of-things" className="welcome-external-link">Things the power of the Internet.</a></p>
              <SlideDown transitionOnAppear={false} closed={connectedToFirebase} >
                <CollapsibleSection title="PIC &amp; AVR">
                  <p className="welcome-info-para">Microchip PIC and AVR are the two most popular microcontrollers architectures. They are used by developers worldwide to create millions of applications that make all things around you <a href="https://www.microchip.com/design-centers/8-bit" target="_blank" className="welcome-external-link">smart</a>.</p>
                </CollapsibleSection>
                <CollapsibleSection title="GOOGLE IoT Core Cloud">
                  <p className="welcome-info-para">Google IoT Core Cloud is a fully managed service that allows you to easily and securely connect, manage, and ingest data from millions of globally dispersed devices. <a href="https://cloud.google.com/iot-core/" target="_blank" className="welcome-external-link">Cloud IoT Core</a>, in combination with other services on Google Cloud IoT platform, provides a complete solution for collecting, processing, analyzing, and visualizing IoT data in real time to support improved operational efficiency.</p>
                </CollapsibleSection>
              </SlideDown>
            </div>
            {inset}
          </div>      
          <StatusStrip />
        </div>
      </main>
    )
  }
}

const mapStateToProps = state => ( {
  deviceSN : state.DeviceReducer.deviceSN,
  connectedToFirebase : state.DeviceReducer.connectedToFirebase
} );

export default connect( mapStateToProps )( WelcomePane )
