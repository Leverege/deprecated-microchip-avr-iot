import Firebase from 'firebase'
import { Config } from '../Config'
import DeviceManager from '../utils/DeviceManager'

export const { FIREBASE_BASE_URL, FIREBASE_CONFIG } = Config
export const MAX_DATA_POINTS = 20 // max number of data points to retrieve from firebase and graph
export const deviceManager = new DeviceManager( {
  Firebase,
  firebaseConfig : FIREBASE_CONFIG,
  maxDataAge : 15, // age in seconds after which data is considered stale
  firebaseUrl : FIREBASE_BASE_URL
} )

export const GET_DEVICE_DATA_SUCCESS = 'GET_DEVICE_DATA_SUCCESS'
export const getDeviceDataSuccess = data => ( {
  type : GET_DEVICE_DATA_SUCCESS,
  data,
  offset : deviceManager.offset
} )

export const GET_DEVICE_DATA_ERROR = 'GET_DEVICE_DATA_ERROR'
export const getDeviceDataError = () => ( { type : GET_DEVICE_DATA_ERROR } )


export const GET_DEVICE_DATA_REQUEST = 'GET_DEVICE_DATA_REQUEST';
export const getDeviceDataRequest = ( ) => ( { type : GET_DEVICE_DATA_REQUEST } )

export const getFirebaseData = ( ) => ( dispatch ) => {
  dispatch( getDeviceDataRequest() )
  function recordData( snap ) {
    const val = snap.val()
    if ( !val || deviceManager.isStale( val ) ) {
      dispatch( getDeviceDataError() )
    } else {
      dispatch( getDeviceDataSuccess( val ) )
    }
  }
  // wait for 2 seconds to give device a chance to report data
  setTimeout( ( ) => {
    deviceManager.connectToFirebase( recordData ) 
  }, 2000 )
}

export const UPDATE_DEVICE_REQUEST = 'UPDATE_DEVICE_REQUEST'
export const updateDeviceRequest = () => ( { type : UPDATE_DEVICE_REQUEST } )

export const UPDATE_DEVICE_SUCCESS = 'UPDATE_DEVICE_SUCCESS'
export const updateDeviceSuccess = () => ( { type : UPDATE_DEVICE_SUCCESS } )

export const UPDATE_DEVICE_ERROR = 'UPDATE_DEVICE_ERROR'
export const updateDeviceError = () => ( { type : UPDATE_DEVICE_ERROR } )

export const sendDeviceConfig = msg => ( dispatch ) => {
  dispatch( updateDeviceRequest() )
  deviceManager.sendDeviceConfig( msg )
    .then( () => dispatch( updateDeviceSuccess() ) )
    .catch( () => dispatch( updateDeviceError() ) )
}
