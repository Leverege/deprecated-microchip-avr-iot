function formatTime ( dateString ) {
  const date = new Date( dateString );
  return date
}

function parseToPrecision ( num, precision ) {
  // returns float parsed to specified precision
  return parseFloat( parseFloat( num ).toPrecision( precision ) )
}

function normalizeDomain( dataArray, minDistance ) {
  // find min and max and returns rounded min tick and max tick to display
  const max = Math.max.apply(null, dataArray);
  const min = Math.min.apply(null, dataArray);
  return [Math.floor( min - minDistance), Math.ceil( max + minDistance )]
}

module.exports = {
  parseToPrecision,
  normalizeDomain
}