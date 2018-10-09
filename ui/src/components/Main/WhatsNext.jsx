import React from 'react'
import InfoSection from '../InfoSection/InfoSection'
import TileDemo from '../TileDemo/TileDemo'
import Button from '../Button/Button'
import hosdemo from '../../images/hospital-ui-demo.png'
import wmdemo from '../../images/wm-demo.png'
import sirendemo from '../../images/siren-demo.png'

export default class WhatsNext extends React.Component {

  render() {
    return (
      <InfoSection className="next" title="Explore Leverege's Use Cases">
        <div className="next-wrapper">
          <TileDemo 
            image={hosdemo} 
            title="Medical Asset Tracking" 
            category="Asset Tracking"
            url="https://www.leverege.com/usecases/hospital-equipment-tracking" />
          <TileDemo 
            image={wmdemo} 
            title="Waste Collection" 
            category="Smart City" 
            url="https://www.leverege.com/usecases/waste-management-solution" />
          <TileDemo 
            image={sirendemo} 
            title="Siren Fleet Management" 
            category="Vehicle &amp; Transportation" 
            url="https://www.leverege.com/usecases/marine-fleet-management-solution" />
        </div>
        <div className="button-wrapper">
          <Button 
            text="View All Demos"
            color="blue-inverted"
            href="https://www.leverege.com/live-demos" />
        </div>
      </InfoSection>
    )
  }
}
