import React from 'react'
import { Config } from '../../Config'
import Button from '../Button/Button'

import './WelcomeInset.less'

const { DEVICE_ID } = Config
export default class WelcomeInset extends React.Component {
  render() {
    if ( DEVICE_ID ) {
      return (
        <div className="welcome-right">
          <h3 className="welcome-right-title">If You Already Have an AVR-IoT Board:</h3>
          <p>All you need to do to get started is plug in your device and click the link below</p>
          <Button
            type="link"
            className="device-button"
            text="Go to Your Device"
            href={`/device/${DEVICE_ID}`}
            color="blue" />
          <p>If you are connecting a different board, you may need to configure the IoT Core Registry name in the recordMessage Cloud Function and on your device.</p>
        </div>  
      )
    }
    return (
      <div className="welcome-right">
        <h3 className="welcome-right-title">If You Already Have an AVR-IoT Board:</h3>
        <p>All you need to do to get started is plug in your device and go to:
          <br /><br />
          <span className="device-link">{`${window.location.hostname}/device/<Your Device's UID>`}</span>
        </p>
        <p>If you are connecting a different board, you may need to configure the IoT Core Registry name in the recordMessage Cloud Function and on your device.</p>
      </div> 
    )
  }
}
