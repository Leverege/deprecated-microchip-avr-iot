import Firebase from 'firebase'
import { Config } from '../Config'

export const { FIREBASE_BASE_URL, FIREBASE_CONFIG } = Config
export const MAX_DATA_AGE = 15 // age in seconds after which data is considered stale
export const MAX_DATA_POINTS = 20 // max number of data points to retrieve from firebase and graph
export const firebase = Firebase.initializeApp( FIREBASE_CONFIG )

export const GET_DEVICE_DATA_SUCCESS = 'GET_DEVICE_DATA_SUCCESS'
export const getDeviceDataSuccess = data => ( {
  type : GET_DEVICE_DATA_SUCCESS,
  data
} )

export const GET_DEVICE_DATA_ERROR = 'GET_DEVICE_DATA_ERROR'
export const getDeviceDataError = () => ( {
  type : GET_DEVICE_DATA_ERROR
} )

/**
 * returns difference between firebase's server time and client time in +/- ms
 */
export function getFirebaseOffset() {
  return firebase.database().ref( '/.info/serverTimeOffset' )
    .once( 'value' )
    .then( data => data.val() )
    .catch( ( e ) => { 
      console.log( 'error getting time from firebase' ) 
      return 0
    } )
}
export const SET_TIME_OFFSET = 'SET_TIME_OFFSET'
export const setTimeOffset = offset => ( {
  type : SET_TIME_OFFSET,
  offset
} )

async function attemptFireBaseConnection( deviceId, dispatch ) {
  const offset = await getFirebaseOffset()
  dispatch( setTimeOffset( offset ) )
  firebase.database().ref( `${FIREBASE_BASE_URL}/${deviceId}` )
    .limitToLast( 1 )
    .on( 'value', ( snap ) => {
      // check that data exists and is fresh
      if ( !snap.val() || isStale( snap.val(), offset, MAX_DATA_AGE ) ) {
        dispatch( getDeviceDataError() )
      } else {                
        dispatch( getDeviceDataSuccess( snap.val() ) )
      }
    } )
}

function getMostRecent( snapVal ) {
  const snapArray = Object.keys( snapVal );
  const lastIndex = snapArray.length - 1;
  const lastKey = snapArray[lastIndex];
  return snapVal[lastKey];
}

function isStale( snapVal, offset, maxAge ) {
  const mostRecent = getMostRecent( snapVal );
  const estServerTime = new Date().getTime() + offset
  const dataAge = Math.floor( ( estServerTime - mostRecent.time ) / 1000 ) // age of data in seconds
  return dataAge > maxAge
}

export const SET_DEVICE_SN = 'SET_DEVICE_SN';
export const setDeviceSn = sn => ( {
  type : SET_DEVICE_SN,
  sn
} ); 

export const GET_DEVICE_DATA_REQUEST = 'GET_DEVICE_DATA_REQUEST';
export const getDeviceDataRequest = () => ( {
  type : GET_DEVICE_DATA_REQUEST
} )

export const getFirebaseData = deviceId => ( dispatch ) => {
  dispatch( getDeviceDataRequest() )
  // wait for 2 seconds to give device a chance to report data
  setTimeout( () => attemptFireBaseConnection( deviceId, dispatch ), 2000 )
}
