import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { animationComplete } from '../../actions/UIActions'
import { deviceManager } from '../../actions/DeviceActions'
import StatusIndicator from '../StatusIndicator/StatusIndicator'

import './StatusStrip.less'

class StatusStrip extends React.Component {

  componentDidUpdate() {
    // stagger line animation between indicator animations
    const { currentAnimation, dispatch } = this.props
    if ( currentAnimation.element === 'line' ) {
      setTimeout( () => dispatch( animationComplete( 'line' ) ), currentAnimation.length )  
    }    
  }

  render() {    
    const { deviceConnected, connectedToFirebase, establishingFirebaseConnection, 
            lineLength } = this.props
    const deviceSpecified = !!deviceManager.device
    const deviceLive = deviceConnected && deviceSpecified
    let lineFillLength
    if ( lineLength === 3 ) {
      lineFillLength = 'three'
    } else if ( lineLength === 2 ) {
      lineFillLength = 'two'
    } else if ( lineLength === 1 ) {
      lineFillLength = 'one'
    }

    return (      
      <div className="status-strip">
        <div className="line">
          <div className="white" />
          <div className={classnames( 'blue', lineFillLength )} />
        </div>
        <StatusIndicator statusType="device" animation="ping" connected={deviceLive} />
        <StatusIndicator 
          statusType="wifi" 
          hold={!!establishingFirebaseConnection}
          animation={establishingFirebaseConnection ? 'heartbeat' : 'ping'} 
          connected={connectedToFirebase} />
        <StatusIndicator statusType="iot" animation="ping" connected={connectedToFirebase} />
        <StatusIndicator statusType="firebase" animation="heartbeat" connected={connectedToFirebase} />
      </div>
    )
  }
}

const mapStateToProps = state => ( {
  deviceConnected : state.DeviceReducer.deviceConnected,
  connectedToFirebase : state.DeviceReducer.connectedToFirebase,
  establishingFirebaseConnection : state.DeviceReducer.establishingFirebaseConnection,
  animationQueue : state.UIReducer.animationQueue,
  lineLength : state.UIReducer.lineLength,
  currentAnimation : state.UIReducer.currentAnimation
} )

export default connect( mapStateToProps )( StatusStrip )
