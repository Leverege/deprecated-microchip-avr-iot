import React from 'react';
import { connect } from 'react-redux';
import TileInset from '../TileInset/TileInset';
import InfoSection from '../InfoSection/InfoSection';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory';
import { ThreeBounce } from 'better-react-spinkit';
import { parseToPrecision, normalizeDomain } from '../../utils/utils';

import './GraphSection.less';

class GraphSection extends React.Component {

  renderGraphs( deviceData ) {
    // return array of graphs, with one graph for each non-time data type in device data
    const graphs = [];
    // get array of non-time keys in data
    const dataTypes = Object.keys(deviceData[0]).filter(key => key !== 'time')

    // create graph for each dataType
    dataTypes.forEach( dataType => {
      const dataVals = []; // array of values for this datapoint
      // create array of objects with just relevant datapoint and time
      const formattedData = deviceData.map( ( datapoint ) => {
        dataVals.push( datapoint[dataType] )
        return { time : new Date( datapoint.time ), [dataType] : parseToPrecision( datapoint[dataType], 4) }
      })

      const yDomain = normalizeDomain ( dataVals, 1 );

      function toString( y ) { return `${y}`}
      function toNull() { return '' }

      const graph = (
        <VictoryChart padding={{ top : 0, left : 50, bottom : 55, right : 25 }}>
          <VictoryAxis label="Time (s)" tickFormat={toNull} />
          <VictoryAxis 
            dependentAxis 
            domain={ { y: yDomain } }
            tickFormat={toString}
          />
          <VictoryLine 
            data={formattedData} 
            x="time"
            y={dataType}
            style={{ data : { stroke : '#4285F4' } }}
            interpolation="cardinal"
          />
        </VictoryChart>
      )
      graphs.push(graph)

    } )
    return graphs
  }

  render() {
    const { deviceSN, deviceData, firebaseAnimationComplete } = this.props;
    let leftChart, rightChart;
    const charts = this.renderGraphs( deviceData );

    if ( !firebaseAnimationComplete ) {
      // show loading animation while status indicators still animating
      leftChart = rightChart = <div className="graphs-loading"><ThreeBounce size={13} color="#4285F4" /></div>
    } else {
      leftChart = charts[0];
      rightChart = charts[1];
    }

    return (
      <InfoSection className="graphs" title={`Device UID: ${deviceSN}`}>	
        <div className="graphs-wrapper">
          <TileInset title="Light" className="graph graphs-left">
            { leftChart }
          </TileInset>
          <TileInset title="Temperature" className="graph graphs-right">
            { rightChart }
          </TileInset>
        </div>
      </InfoSection>
    )
  }
}

const mapStateToProps = state => ({
  deviceData : state.DeviceReducer.deviceData,
  firebaseAnimationComplete : state.UIReducer.animationComplete.firebase,
  deviceSN : state.DeviceReducer.deviceSN
})

export default connect( mapStateToProps )( GraphSection )
