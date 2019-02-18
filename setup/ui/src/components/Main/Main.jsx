import React from 'react'
import { connect } from 'react-redux'
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import { FoldingCube } from 'better-react-spinkit'
import WelcomePane from '../WelcomePane/WelcomePane'
import WirelessConfig from '../WirelessConfig/WirelessConfig'
import GraphSection from '../GraphSection/GraphSection'
import InfoSection from '../InfoSection/InfoSection'
import WhatsNext from './WhatsNext'
import Overview from './Overview'
import { 
  getFirebaseData, 
  getDeviceDataError,
  deviceManager,
} from '../../actions/DeviceActions'

import './Main.less'

class Main extends React.Component {
  componentDidMount() {
    const { match : { params : { uid : UID } }, dispatch } = this.props
    deviceManager.setDevice( UID )
    dispatch( getFirebaseData( UID ) )
    this.tick() // start the timeout timer
  }

  componentWillUnmount() { 
    clearTimeout( this.timer ) 
  }

  tick = () => {
    // dispatch data connection error & stop countdown if data age exceeds max
    const { lastUpdate, connectedToFirebase, dispatch } = this.props
    const estServerTime = deviceManager.offset ? new Date().getTime() + deviceManager.offset : Date.now()
    const nextSecond = 1000 - ( estServerTime % 1000 )
    this.timer = setTimeout( this.tick, nextSecond );
    const timeExceeded = ( estServerTime - lastUpdate ) / 1000 > deviceManager.maxDataAge
    if ( connectedToFirebase && timeExceeded ) {
      dispatch( getDeviceDataError() );
    }
  }
  
  render() {
    const { establishingFirebaseConnection : tryingToConnect, deviceConnected } = this.props
    const connected = deviceConnected && deviceManager.device

    let main
    if ( tryingToConnect ) {
      main = (
        <InfoSection 
          title="" 
          className="connecting">
          <FoldingCube size={20} color="#4285F4" />
          <h3 className="message">Checking device connectivity</h3>
        </InfoSection>
      )
    } else if ( connected ) {
      main = <GraphSection />
    } else {
      main = <WirelessConfig />
    }

    return (
      <main className="main">
        <WelcomePane minimal />
        {main}
        <SlideDown closed={tryingToConnect || !connected}>
          <Overview key="overviewsection" />
          <WhatsNext key="whatsnextsection" />
        </SlideDown>  
      </main>
    )
  }

}

const mapStateToProps = state => ( {
  deviceConnected : state.DeviceReducer.deviceConnected,
  establishingFirebaseConnection : state.DeviceReducer.establishingFirebaseConnection,
  connectedToFirebase : state.DeviceReducer.connectedToFirebase,
  lastUpdate : state.DeviceReducer.lastUpdate,
} )

export default connect( mapStateToProps )( Main )
