import { 
  MAX_DATA_POINTS,
  GET_DEVICE_DATA_SUCCESS,
  GET_DEVICE_DATA_ERROR,
  GET_DEVICE_DATA_REQUEST } from '../actions/DeviceActions';

const initialState = {
  deviceConnected : true,
  deviceData : [],
  establishingFirebaseConnection : false,
  connectedToFirebase : false,
  wifiForm : {
    ssid : '',
    pw : '',
    networkType : '1',
    hidePw : true,
    error : null
  },
  lastUpdate : '',
}

export default function DeviceReducer( state = initialState, action ) {
  switch ( action.type ) {
    case GET_DEVICE_DATA_REQUEST: {
      return { ...state, establishingFirebaseConnection : true, connectedToFirebase : false }
    }

    case GET_DEVICE_DATA_ERROR: {
      return { ...state, establishingFirebaseConnection : false, connectedToFirebase : false }
    }

    case GET_DEVICE_DATA_SUCCESS: {
      const datapoint = action.data[Object.keys( action.data )[0]]
      let updatedData = [ ...state.deviceData ];
      if ( updatedData.length >= MAX_DATA_POINTS ) {
        // slice data array so it's one below max
        updatedData = updatedData.slice( updatedData.length - ( MAX_DATA_POINTS - 1 ) )
      }
      updatedData.push( datapoint )
      return { 
        ...state, 
        deviceData : updatedData, 
        lastUpdate : Date.now() + action.offset, 
        connectedToFirebase : true, 
        establishingFirebaseConnection : false 
      }
    }

    default: 
      return state;
  }
}
