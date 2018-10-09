import React from 'react';
import { connect } from 'react-redux';
import { SlideDown } from 'react-slidedown'
import StatusStrip from '../StatusStrip/StatusStrip';
import WelcomeInset from '../WelcomeInset/WelcomeInset'

import './WelcomePane.less';

class WelcomePane extends React.Component {
  render() {
    const { minimal, firebaseAnimationComplete } = this.props;

    if ( minimal ) {
      return (
        <SlideDown transitionOnAppear={false} closed={firebaseAnimationComplete} >
          <main className="welcome compact">
            <div className="welcome-wrapper">
              <StatusStrip />
            </div>
          </main>
        </SlideDown>
      )
    }
    return (
      <main className="welcome">
        <div className="welcome-wrapper">
          <div className="welcome-content">
            <div className="welcome-full">
              <h2 className="welcome-main-title">IoT Prototyping Quick Start</h2>
              <p className="welcome-info-para">
                If you have IoT devices connected to Google Cloud, Leverege can help you transform raw data into meaningful insights. Designed for Microchip's AVR-IoT devices, our open source UI tool can display and graph data from any number of sensors in real time. Explore our resources to try this demo and see what it can do.
              </p>
            </div>
            <WelcomeInset connected={false} />
          </div>      
          <StatusStrip />
        </div>
      </main>
    )
  }
}

const mapStateToProps = state => ( {
  deviceSN : state.DeviceReducer.deviceSN,
  firebaseAnimationComplete : state.UIReducer.animationComplete.firebase
} );

export default connect( mapStateToProps )( WelcomePane )
