import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { animationComplete } from '../../actions/UIActions';
import deviceConnected from '../../images/device-connected.svg';
import devicePending from '../../images/device-pending.svg';
import firebaseConnected from '../../images/firebase-connected.svg';
import firebasePending from '../../images/firebase-pending.svg';
import iotCoreConnected from '../../images/iot-core-connected.svg';
import iotCorePending from '../../images/iot-core-pending.svg';
import wifiConnected from '../../images/wifi-connected.svg';
import wifiPending from '../../images/wifi-pending.svg';
import checkMark from '../../images/connected-check.svg';
import './StatusIndicator.less'

export class StatusIndicator extends React.Component {
  // statusType prop -- required string, which indicator to display 
  // connected prop -- bool, whether indicator should be blue or not 
  // animation prop -- string, type of animation for indicator (e.g. ping or heartbeat) 
  // hold prop -- bool, if false, next item in animation queue will automatically trigger when indicator animation completes

  componentDidUpdate() {
    // wait until connection animation completes, and then queue next
    const { hold, connected, statusType, currentAnimation } = this.props;
    if ( !hold && connected && ( statusType === currentAnimation.element) ) {
      setTimeout( () => this.props.dispatch( animationComplete( statusType ) ), currentAnimation.length )  
    }    
  }
  
  render () {

    const { connected, statusType, currentAnimation, animationCompleteObj, animation, hold } = this.props;
    const animate = hold || (connected && ( currentAnimation.element === statusType ) ) // triggers animation if indicator is holding or it's connected and the current queue item
    const animationComplete = connected && animationCompleteObj[statusType]

    const status = {
      device: ( animationComplete ) ? deviceConnected : devicePending,
      firebase: ( animationComplete ) ? firebaseConnected : firebasePending,
      iot: ( animationComplete ) ? iotCoreConnected : iotCorePending,
      wifi: ( animationComplete ) ? wifiConnected : wifiPending
    }
    
    let animationElement;
    let circleElements = ['firebase', 'wifi']
    if ( circleElements.includes( statusType ) ) {
      animationElement = <div className={ `circle ${ animate || ( animationComplete && animation !== 'heartbeat' ) ? animation : '' }` }/>
    } else if ( statusType === 'iot' ) {
      animationElement = (
        <div className={ `hexagon-wrapper ${ animate || ( animationComplete && animation !== 'heartbeat' ) ? animation : '' }`}>
          <div className='hexagon'/>
        </div>
      )
    }


    return (
      <div className={ `indicator ${ statusType } ${ animationComplete ? 'connected' : '' }` }>
        { animationElement }        
        <img className={ `icon` } src={status[statusType]} alt='' />    
        <img className={ `check ${ animationComplete ? '' : 'hidden' }` } alt='' src={checkMark}/>
      </div>  
    )
  }
}

const mapStateToProps = state => ({
  currentAnimation: state.UIReducer.currentAnimation,
  animationCompleteObj: state.UIReducer.animationComplete
})

export default connect(mapStateToProps)(StatusIndicator)

StatusIndicator.propTypes = {
  statusType: PropTypes.string.isRequired,
  connected: PropTypes.bool,
  animation: PropTypes.string,
  hold: PropTypes.bool
};
