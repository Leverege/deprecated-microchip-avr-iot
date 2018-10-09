import React from 'react';
import { connect } from 'react-redux';
import { animationComplete } from '../../actions/UIActions';
import './StatusStrip.less';
import StatusIndicator from '../StatusIndicator/StatusIndicator';

class StatusStrip extends React.Component {

  componentDidUpdate() {
    // stagger line animation between indicator animations
    if ( this.props.currentAnimation.element === 'line' ) {
      setTimeout( () => this.props.dispatch( animationComplete( 'line' ) ), this.props.currentAnimation.length )  
    }    
  }

  render() {    
    const { deviceConnected, connectedToFirebase, establishingFirebaseConnection, 
            deviceSpecified, lineLength } = this.props;
    const deviceLive = deviceConnected && deviceSpecified;
    let lineFillLength;
    if ( lineLength === 3 ) {
      lineFillLength = 'three';
    } else if ( lineLength === 2 ) {
      lineFillLength = 'two'
    } else if ( lineLength === 1 ) {
      lineFillLength = 'one'
    }

    return (      
      <div className="status-strip">
        <div className="line">
          <div className="white" />
          <div className={`blue ${lineFillLength}`} />
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
  deviceSpecified : !!state.DeviceReducer.deviceSN,
  deviceConnected : state.DeviceReducer.deviceConnected,
  connectedToFirebase : state.DeviceReducer.connectedToFirebase,
  establishingFirebaseConnection : state.DeviceReducer.establishingFirebaseConnection,
  animationQueue : state.UIReducer.animationQueue,
  lineLength : state.UIReducer.lineLength,
  currentAnimation : state.UIReducer.currentAnimation
} );

export default connect( mapStateToProps )( StatusStrip )
