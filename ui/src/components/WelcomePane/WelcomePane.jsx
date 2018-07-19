import React from 'react';
import { connect } from 'react-redux';
import Button from '../Button/Button';
import StatusStrip from '../StatusStrip/StatusStrip';
import CollapsibleSection from '../CollapsibleSection/CollapsibleSection';
import EmailForm from '../EmailForm/EmailForm';

import './WelcomePane.less';

export class WelcomePane extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rightPanel: 'setup' }
  }

  componentDidMount() {
    // animate setup steps entry
    const setupSteps = document.getElementsByClassName("welcome-right-list-item")
    setTimeout(function() {
      setupSteps[0].style.opacity = "1";
    }, 1000)
    setTimeout(function() {
      setupSteps[1].style.opacity = "1";
    }, 2000)
    setTimeout(function() {
      setupSteps[2].style.opacity = "1";
    }, 3000)
    setTimeout(function() {
      const bottom = document.getElementsByClassName("welcome-right-bottom")
      bottom[0].style.opacity = "1"
    }, 4000)
  }

  handleShowEmail = () => {
    this.setState( { rightPanel: 'email' } )
  }

  handleFormSubmit = () => {
    document.getElementById('email-form').submit();
    
  }

  renderPanel = panel => {
    const { deviceSN } = this.props;
    switch(panel) {
      case 'setup':
        let bottom;
        if ( deviceSN ) {
          bottom = (
            <div className="welcome-right-bottom">
              <img src="../../images/curiosity-drive.png"/>
            </div>
          )
        } else {
          bottom = (
            <div className="welcome-right-bottom">
              <h4 className="welcome-right-secondary-header">Don’t have an AVR-IoT Board?</h4>
              <Button className="welcome-right-button" text="Pre Order Now" type="button" onClick={this.handleShowEmail}/>
            </div>
          )
        }
        return (
          <div className="welcome-right">
            <h3 className="welcome-right-title">{ !deviceSN ? 'If You Already Have an AVR-IoT Board:' : 'To get started with your AVR-IoT Board:' }</h3>
            <div className="welcome-right-list">
              <div className="welcome-right-list-item">
                <div className="welcome-right-list-item-number">1</div>
                <div className="welcome-right-list-item-text">Connect the AVR-IoT board to your laptop using a standard micro-USB cable</div>
              </div>
              <div className="welcome-right-list-item">
                <div className="welcome-right-list-item-number">2</div>
                <div className="welcome-right-list-item-text">Open the “CURIOSITY” drive</div>
              </div>
              <div className="welcome-right-list-item">
                <div className="welcome-right-list-item-number">3</div>
                <div className="welcome-right-list-item-text">Click on “CLICK-ME.HTM”</div>
              </div>
            </div>
            {bottom}
          </div>  
        )
      
      case 'email': 
        return (
          <div className="welcome-right">
            <h3 className="welcome-right-title">Register for an AVR-IoT Board</h3>
            <EmailForm>
              <Button className="welcome-right-button" type="button" onClick={this.handleFormSubmit} value="Send" text="Register"/>
            </EmailForm>
          </div>
        )
    }
  }

  render() {
    const { deviceSN } = this.props;
    const { rightPanel } = this.state;

    return (
      <main className="welcome">
        <div className="welcome-wrapper">
          <div className="welcome-content">
            <div className="welcome-left">
              <h2 className="welcome-main-title">AVR-IoT Sensor Node</h2>
              <h3 className="welcome-secondary-header">Get Your Things on the Internet in 30 seconds flat with AVR-IoT!</h3>
              <p className="welcome-info-para">There are many ways to get your embedded applications connected, but Microchip and Google have partnered to offer you the simplest and most effective way to give your <a href="http://www.microchip.com/design-centers/internet-of-things" className="welcome-external-link">Things the power of the Internet.</a></p>
              <CollapsibleSection title="PIC &amp; AVR">
                <p className="welcome-info-para">Microchip PIC and AVR are the two most popular microcontrollers architectures. They are used by developers worldwide to create millions of applications that make all things around you <a href="https://www.microchip.com/design-centers/8-bit" target="_blank" className="welcome-external-link">smart</a>.</p>
              </CollapsibleSection>
              <CollapsibleSection title="GOOGLE IoT Core Cloud">
                <p className="welcome-info-para">Google IoT Core Cloud is a fully managed service that allows you to easily and securely connect, manage, and ingest data from millions of globally dispersed devices. <a href="https://cloud.google.com/iot-core/" target="_blank" className="welcome-external-link">Cloud IoT Core</a>, in combination with other services on Google Cloud IoT platform, provides a complete solution for collecting, processing, analyzing, and visualizing IoT data in real time to support improved operational efficiency.</p>
              </CollapsibleSection>
            </div>
            {this.renderPanel(rightPanel)}
          </div>      
          <StatusStrip />
        </div>
      </main>
    )
  }
}

const mapStateToProps = state => ({
  deviceSN : state.DeviceReducer.deviceSN
});

export default connect( mapStateToProps )( WelcomePane )
