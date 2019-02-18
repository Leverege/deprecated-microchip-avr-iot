const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Writer = require('./FirebaseWriter');

admin.initializeApp();
const writer = new Writer( {admin} )

exports.recordMessage = functions.pubsub.topic('avr-iot').onPublish((message) => {
  // Header from IoT core will look like this:
  // { 
  //  deviceId: 'd1232ACFCC3A3F76FE',
  //  deviceNumId: '2801506048952660',
  //  deviceRegistryId: 'AVR-IOT',
  //  deviceRegistryLocation: 'us-central1',
  //  projectId: 'avr-iot',
  //  subFolder: '' 
  // }

  if ( message.attributes !== null  ) {    
    try {
      const hdr = message.attributes;
      let buff = new Buffer( message.data, 'base64' );
      let msg = JSON.parse( buff.toString('utf-8') );
      const time = Date.now();
      msg = Object.assign({}, msg, { time });
    
      return writer.record( msg, hdr )
    }
    catch (err) {
      return Promise.reject( new Error('Unrecognized message format. Expecting base64 encoded JSON.') )
    }
  }
  return Promise.resolve( 'Invalid message format' )
})
