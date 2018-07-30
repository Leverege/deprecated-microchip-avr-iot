import React from 'react'
import Button from '../Button/Button'

import './WelcomeInset.less'

export default class WelcomeInset extends React.Component {
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
    MktoForms2.loadForm("//app-sj14.marketo.com", "931-UDE-464", 1520, function (form){MktoForms2.lightbox(form).show();});
  }

  render() {
    const { connected } = this.props;
    let bottom;
    if ( connected ) {
      bottom = (
        <div className="welcome-right-bottom">
          <img src="../../images/curiosity-drive.png"/>
        </div>
      )
    } else {
      bottom = (
        <div className="welcome-right-bottom">
          <h4 className="welcome-right-secondary-header">Don’t have an AVR-IoT Board?</h4>
          <Button className="welcome-right-button" text="Pre Order" type="button" onClick={this.handleShowEmail}/>
        </div>
      )
    }
    return (
      <div className="welcome-right">
        <form id="mktoForm_1520"/>
        <h3 className="welcome-right-title">{ !connected ? 'If You Already Have an AVR-IoT Board:' : 'To get started with your AVR-IoT Board:' }</h3>
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
  }
}