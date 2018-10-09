import React from 'react'
import { connect } from 'react-redux'
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import WelcomePane from '../WelcomePane/WelcomePane'
import WirelessConfig from '../WirelessConfig/WirelessConfig'
import GraphSection from '../GraphSection/GraphSection'
import WhatsNext from './WhatsNext'
import Overview from './Overview'
import { 
  setDeviceSn, 
  getFirebaseData, 
  getDeviceDataError,
  MAX_DATA_AGE,
} from '../../actions/DeviceActions'

import './Main.less'

class Main extends React.Component {
  componentDidMount() {
    const UID = this.props.match.params.uid
    this.props.dispatch( setDeviceSn( UID ) )
    this.props.dispatch( getFirebaseData( UID ) )
    this.tick(); // start the timeout timer
  }

  componentWillUnmount() { 
    clearTimeout( this.timer ) 
  }

  tick = () => {
    // dispatch data connection error & stop countdown if data age exceeds max
    const estServerTime = this.props.offset ? new Date().getTime() + this.props.offset : Date.now()
    const nextSecond = 1000 - ( estServerTime % 1000 )
    this.timer = setTimeout( this.tick, nextSecond );
    const timeExceeded = ( estServerTime - this.props.lastUpdate ) / 1000 > MAX_DATA_AGE;
    if ( this.props.connectedToFirebase && timeExceeded ) {
      this.props.dispatch( getDeviceDataError() );
    }
  }
  
  renderSecondaryContent() {
    if ( !this.props.establishingFirebaseConnection && this.props.deviceConnected && !!this.props.deviceSN ) {
      if ( this.props.connectedToFirebase ) {
        // all systems go - render graphs & marketing info
        return [ ( <GraphSection key="graphsection" /> ), ( <Overview key="overviewsection" /> ), ( <WhatsNext key="whatsnextsection" /> ) ]
      } 
      // failed to get fresh data from firebase - request manual wifi info
      return <WirelessConfig />
    }
    return null // linter demands a return
  }

  render() {
    return (
      <main className="main">
        <WelcomePane minimal />
        <SlideDown className="my-dropdown-slidedown">
          { this.renderSecondaryContent() }
        </SlideDown>
      </main>
    )
  }

}

const mapStateToProps = state => ( {
  deviceSN : state.DeviceReducer.deviceSN,
  deviceConnected : state.DeviceReducer.deviceConnected,
  establishingFirebaseConnection : state.DeviceReducer.establishingFirebaseConnection,
  connectedToFirebase : state.DeviceReducer.connectedToFirebase,
  lastUpdate : state.DeviceReducer.lastUpdate,
  offset : state.DeviceReducer.offset
} )

export default connect( mapStateToProps )( Main )
