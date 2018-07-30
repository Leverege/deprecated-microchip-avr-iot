import React from 'react';
import { connect } from 'react-redux';
import Button from '../Button/Button';
import InfoSection from '../InfoSection/InfoSection';
import TileInset from '../TileInset/TileInset';
import WifiForm from '../WifiForm/WifiForm';
import ContentWrapper from '../ContentWrapper/ContentWrapper';
import { toggleConfigDownloaded } from '../../actions/UIActions';
import { getFirebaseData } from '../../actions/DeviceActions';

import './WirelessConfig.less'

export class WirelessConfig extends React.Component {
  constructor ( props ) {
    super ( props );
    this.state = {    }
  }

  componentDidMount() {
    document.getElementById('setup-video').play()
  }

  componentDidUpdate = () => {
    if (this.props.configDownloaded) {
      setTimeout( document.getElementById('connectedVideo').play(), 500 )
    }
  }

  handleRetryClick = () => {
    this.props.dispatch( toggleConfigDownloaded() )
  }

  handleConfirmConnection = () => {
    this.props.dispatch( getFirebaseData( this.props.deviceSN ) )
  }

  render() {
    const { configDownloaded } = this.props;
    const buttonStyle = {
      padding: '8px 26px'
    };

    let inset;
    if ( configDownloaded ) {
      inset = (
        <div>
          <p className='wireless-config-instructions'>Download (or drag and drop) your wifi.config file onto your device. If WiFi connection is successful, you should see your blue LED light up on the device.</p>
          <div className='wireless-config-connected-video'>
            <video loop autoplay muted id="connectedVideo">
              <source src="https://storage.googleapis.com/avr-iot-media/avr-iot_wifi_connected.mp4"/>
            </video>
          </div>
          <p className='wireless-config-instructions'>Once you see a steady blue light, click Confirm to attempt to make a connection. Click Retry to enter your Wifi information and generate a new config file.</p>
          <div className="wireless-config-buttons">
            <Button className='wireless-config-btn' text={'Retry'} type='button' onClick={ this.handleRetryClick } color={'gray'}/>
            <Button className='wireless-config-btn' text={'Confirm'} type='button' onClick={ this.handleConfirmConnection } />
          </div>
        </div>
      )
    } else {
      inset = <WifiForm/>
    }

    return (
      <InfoSection className='wireless-config' title='Wireless Network Connection'>
        <header className='wireless-config-alert'>
            <p className='wireless-config-alert-text'>We couldn't retrieve recent data from your device. To connect to a network automatically, ensure the device is plugged in.</p>
        </header>
        <div className='wireless-config-wrapper'>
          <TileInset id='mobile-warning' title="Mobile users">
            <p>To configure your device's WiFi, visit this site from a laptop or PC. Mobile configuration is not currently supported.</p>
          </TileInset>
          <TileInset className="wireless-config-tile wireless-config-left" title="Wireless Network Login">
            { inset }
          </TileInset>
          <div className="wireless-config-tile wireless-config-right">
            <h4 className="wireless-config-instruction-header">Setup Instructions</h4>
            <div className="wireless-config-instructions">
              <video id="setup-video" controls loop>
                <source src="https://storage.googleapis.com/avr-iot-media/setup.mp4" type="video/mp4"/>
              </video>
            </div>
          </div>
        </div>
        <ContentWrapper className='wireless-config-guide-wrapper'>
          <h4>Wifi Troubleshooting Guide</h4>
          <ul className="wireless-config-guide">
            <li>Guide for <a href="#">Mac Users</a></li>
            <li>Guide for <a href="#">PC Users</a></li>
          </ul>
          <Button href='/help' text='Get Help' className='wireless-config-help flat' color='blue'/>
        </ContentWrapper>
      </InfoSection>
    )
  }
}

const mapStateToProps = state => ({
  configDownloaded: state.UIReducer.configDownloaded,
  deviceSN: state.DeviceReducer.deviceSN
})

export default connect(mapStateToProps)(WirelessConfig)
