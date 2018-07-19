/**
 * Class representing a writer for writing data sent from AVR-IoT device to Firebase. 
 */
class FirebaseWriter {
  /**
   * Create a writer
   * @param {object} config The Firebase admin config from the Firebase Admin Node.js SDK
   * @param {object} config.admin Firebase apiKeys, autoDomains, databaseURL, projectId, storageBucket, and messagingSenderId
   */

  constructor ( config ) {
    this.admin = config.admin;
  }

  record( msg, hdr ) {
    // expecting msg to be JSON structured like so:
    // {
    //  time: Date.now(),
    //  [dataType1]: [dataType1 value],
    //  ...
    //  [dataTypeN]: [dataTypeN value] 
    // }

    // strip 'd' char added by IoT core from deviceId
    const deviceId = hdr.deviceId.slice(1); 

    // create ref locally for atomic push of two paths
    const ref = this.admin.database().ref( '/avr-iot/' );
    const newMsgRef = ref.push();
    const newMsgKey = newMsgRef.key; 
    const updatedDeviceData = {}; 

    // path to record device data 
    updatedDeviceData[`data/${deviceId}/${newMsgKey}`] = msg; 

    // path to track when device was last updated
    updatedDeviceData[`lastUpdated/${deviceId}`] = msg.time; 
    
    // send update to Firebase
    return ref.update(updatedDeviceData)
      .then( r => {
        console.log( 'wrote device data to firebase for device:', deviceId )
        return null // linting requires return on .then()
      })
      .catch( x => { 
        console.log( 'error writing device to firebase', x)
        throw x
      })
  }
}

module.exports = FirebaseWriter