import React from 'react'
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory'
import { parseToPrecision, normalizeDomain } from '../../utils/utils'

export function NumericalGraph( props ) {
  const { deviceData, dataType } = props

  function toString( y ) { return `${y}` }
  function toNull() { return '' }

  const dataVals = [] // array of values for dataset, used to normalize domain
  const yDomain = normalizeDomain( dataVals, 1 ) // rounds y-axis labels to one decimal place

  // create array of objects with just relevant datapoint and time
  const formattedData = deviceData.map( ( datapoint ) => {
    dataVals.push( datapoint[dataType] )
    return { time : new Date( datapoint.time ), [dataType] : parseToPrecision( datapoint[dataType], 4 ) }
  } )

  return (
    <VictoryChart padding={{ top : 0, left : 50, bottom : 55, right : 25 }}>
      <VictoryAxis label="Time (s)" tickFormat={toNull} />
      <VictoryAxis 
        dependentAxis 
        domain={{ y : yDomain }}
        tickFormat={toString} />
      <VictoryLine 
        data={formattedData} 
        x="time"
        y={dataType}
        style={{ data : { stroke : '#4285F4' } }}
        interpolation="monotoneX" />
    </VictoryChart>
  )
}
