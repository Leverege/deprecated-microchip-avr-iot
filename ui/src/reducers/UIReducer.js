import { ANIMATION_COMPLETE, TOGGLE_MODAL, TOGGLE_CONFIG_DOWNLOADED } from '../actions/UIActions'
import { GET_DEVICE_DATA_ERROR } from '../actions/DeviceActions';

const initialState = {
  animationQueue: [
    { element: 'line', length: 500 }, 
    { element: 'wifi', length: 500 }, 
    { element: 'line', length: 700}, 
    { element: 'iot', length: 500},
    { element: 'line', length: 900},
    { element: 'firebase', length: 3000},
    { element: 'done', length: 0}
    ],
  currentAnimation: { element: 'device', length: 0 },
  animationComplete: {
    device: false,
    wifi: false,
    iot: false,
    firebase: false
  },
  showModal: false,
  modalType: 'graduate',
  lineLength: 0,
  configDownloaded: false
}

export default function UIReducer ( state = initialState, action ) {
  switch ( action.type ) {
    case ANIMATION_COMPLETE: {
      if ( state.currentAnimation.element === action.animationType && state.currentAnimation.element !== 'done' ) {
        // check currentAnimation.element === action.animationType to prevent multiple calls from same animation causing queue to run ahead
        const newAnimation = state.animationQueue[0];
        const newQueue = state.animationQueue.slice(1);
        const prevAnimation = state.currentAnimation;
        let lineLength = state.lineLength
        if ( newAnimation && newAnimation.element === 'line' ) {
          lineLength = lineLength += 1;
        }
        return { 
          ...state, 
          animationQueue: newQueue,
          currentAnimation: newAnimation,
          animationComplete: {
            ...state.animationComplete,
            [prevAnimation.element]: true
          },
          lineLength: lineLength
        };        
      }
      else return state
    }

    case TOGGLE_MODAL: {
      return { ...state, showModal: !state.showModal, modalType: action.modalType || 'graduate' }
    }

    case TOGGLE_CONFIG_DOWNLOADED: {
      return { ...state, configDownloaded: !state.configDownloaded }
    }

    case GET_DEVICE_DATA_ERROR: {
      const animationQueue = [
        { element: 'line', length: 700}, 
        { element: 'iot', length: 500},
        { element: 'line', length: 900},
        { element: 'firebase', length: 3000},
        { element: 'done', length: 0}
      ];
      const currentAnimation = { element: 'wifi', length: 500 };
      const animationComplete = {
        device: true,
        wifi: false,
        iot: false,
        firebase: false
      };
      const lineLength = 1;
      return { ...state, animationQueue, currentAnimation, animationComplete, lineLength }
    }

    default:
      return state;
  }
}