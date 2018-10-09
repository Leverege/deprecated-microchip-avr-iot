import React from 'react'
import { connect } from 'react-redux'
import { ThreeBounce } from 'better-react-spinkit'
import { SlideDown } from 'react-slidedown'
import TileInset from '../TileInset/TileInset'
import InfoSection from '../InfoSection/InfoSection'
import { NumericalGraph } from '../graph/Graph'

import './GraphSection.less';

class GraphSection extends React.Component {

  renderGraphs( deviceData, loading ) {
    // return array of graphs, with one graph for each non-time data type in device data
    const graphs = [];
    // get array of non-time keys in data
    const dataTypes = Object.keys( deviceData[0] ).filter( key => key !== 'time' )

    // create graph for each dataType
    dataTypes.forEach( ( dataType, index ) => {
      let graphData
      const position = index % 2 === 0 ? 'left' : 'right'

      // if data not loaded, display loading animation instead of chart
      if ( loading ) {
        graphData = <div className="graphs-loading"><ThreeBounce size={13} color="#4285F4" /></div>
      } else {
        graphData = <NumericalGraph dataType={dataType} deviceData={deviceData} />
      }
      const graph = (
        <TileInset key={`${dataType}-graph-${position}`} title={dataType} className={`graph graphs-${position}`}>
          { graphData }
        </TileInset>
      )
      graphs.push( graph )

    } )
    return graphs
  }

  render() {
    const { deviceSN, deviceData, firebaseAnimationComplete, connectedToFirebase } = this.props
    const charts = this.renderGraphs( deviceData, !firebaseAnimationComplete )

    return (
      <SlideDown transitionOnAppear closed={!connectedToFirebase} >
        <InfoSection className="graphs" title={`Device UID: ${deviceSN}`}>
          <div className="graphs-wrapper">
            { charts }
          </div>
        </InfoSection>
      </SlideDown>
    )
  }
}

const mapStateToProps = state => ( {
  deviceData : state.DeviceReducer.deviceData,
  connectedToFirebase : state.DeviceReducer.connectedToFirebase,
  firebaseAnimationComplete : state.UIReducer.animationComplete.firebase,
  deviceSN : state.DeviceReducer.deviceSN
} )

export default connect( mapStateToProps )( GraphSection )
