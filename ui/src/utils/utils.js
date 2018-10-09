
function getTimeOffset() {
  fetch( 'http://worldclockapi.com/api/json/utc/now' )
    .then( console.log )
}

function formatTime( dateString ) {
  const date = new Date( dateString );
  return date
}

function parseToPrecision( num, precision ) {
  // returns float parsed to specified precision
  return parseFloat( parseFloat( num ).toPrecision( precision ) )
}

function normalizeDomain( dataArray, minDistance ) {
  // find min and max and returns rounded min tick and max tick to display
  const max = Math.max.apply( null, dataArray );
  const min = Math.min.apply( null, dataArray );
  return [ Math.floor( min - minDistance ), Math.ceil( max + minDistance ) ]
}

function openSaveFileDialog( data, filename, mimetype ) {

  if ( !data ) return

  const blob = data.constructor !== Blob
    ? new Blob( [ data ], { type : mimetype || 'application/octet-stream' } )
    : data

  if ( navigator.msSaveBlob ) {
    navigator.msSaveBlob( blob, filename );
    return
  }

  const lnk = document.createElement( 'a' ),
    url = window.URL

  const objectURL = url.createObjectURL( blob )

  if ( mimetype ) {
    lnk.type = mimetype;
  }

  lnk.download = filename || 'download';
  lnk.href = objectURL
  lnk.dispatchEvent( new MouseEvent( 'click' ) );
  setTimeout( url.revokeObjectURL.bind( url, objectURL ) );

}

module.exports = {
  parseToPrecision,
  normalizeDomain,
  getTimeOffset,
  openSaveFileDialog
}
