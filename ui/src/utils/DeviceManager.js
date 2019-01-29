/**
 * manages device's connection to firebase
 */
export default class DeviceManager {
  constructor( opts ) {
    this.FirebaseController = opts.Firebase
    this.firebaseConfig = opts.firebaseConfig
    this.device = opts.device || null
    this.maxDataAge = opts.maxDataAge
    this.offset = opts.offset || 0
    this.firebaseUrl = opts.firebaseUrl
    this.offsetSet = !!opts.offset
    this.firebaseInitialized = false    
  }
  
  start = async ( ) => {
    this.firebase = this.FirebaseController.initializeApp( this.firebaseConfig )
    this.updateDevice = this.firebase.functions().httpsCallable( 'updateDevice' )
    this.firebaseInitialized = true
  }

  setDevice = ( uid ) => { this.device = uid }

  getFirebaseOffset = async () => {
    // get time difference between client and server
    try {
      const offsetData = await this.firebase.database().ref( '/.info/serverTimeOffset' ).once( 'value' )
      const offset = offsetData.val()
      this.offset = offset
      this.offsetSet = true
      return offset
    } catch ( e ) {
      return 0
    }
  }

  sendDeviceConfig = ( msg ) => {
    return this.updateDevice( { deviceId : this.device, msg } )
  }

  connectToFirebase = async ( cb ) => {
    // initialize firebase
    if ( !this.firebaseInitialized ) {
      this.start()
    }
    
    // sync client and server
    if ( !this.offsetSet ) {
      await this.getFirebaseOffset()
    }

    if ( !this.device ) return

    // get latest update from device
    this.firebase.database()
      .ref( `${this.firebaseUrl}/${this.device}` )
      .limitToLast( 1 )
      .on( 'value', cb )
  }

  isStale( snapVal ) {
    const snapArray = Object.keys( snapVal )
    const lastKey = snapArray[snapArray.length - 1]
    const mostRecent = snapVal[lastKey]
    const estServerTime = new Date().getTime() + this.offset
    const dataAge = Math.floor( ( estServerTime - mostRecent.time ) / 1000 ) // age of data in seconds
    return dataAge > this.maxDataAge
  }
}
