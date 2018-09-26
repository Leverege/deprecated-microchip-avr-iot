import React from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../actions/UIActions';
import InfoSection from '../InfoSection/InfoSection';
import TileInset from '../TileInset/TileInset';
import Button from '../Button/Button';
import gcpLogo from '../../images/gcp-logo.png';

class WhatsNext extends React.Component {
  handleModal = ( type ) => {
    this.props.dispatch( toggleModal( type ) )
  }

  render() {
    return (
      <InfoSection className="next" title="What's Next">
        <div className="next-wrapper">
          <TileInset className="next-tile half next-left" title="Build Your Sensor Node">
            <p className="next-tile-text">If you like what you have seen so far, you can con now proceed to recreate the demo application from scratch using START.  You will see how easy it is to create your own sensor node or to add Cloud connectivity to any existing sensor AVR application.</p>
            <Button className="next-button" text="Build it Now!" type="button" onClick={() => this.handleModal( 'unavailable' )} />
          </TileInset>
          <TileInset className="next-tile half next-right" title="Add More Sensors">
            <p className="next-tile-text">You might have noticed that the AVR-IOT board features a mikroBUS connector. This allows you to add 450+ new sensors and actuators (Click™ boards) to the evaluation board. A large number of those sensors (100+) are already supported directly by START.</p>
            <Button className="next-button" text="Purchase Directly" type="button" onClick={() => this.handleModal( 'unavailable' )} />
          </TileInset>
          <TileInset className="next-tile full">
            <div className="next-tile-full-image">
              <div className="next-tile-full-image-wrapper">
                <img src={gcpLogo} />
              </div> 
            </div>
            <div className="next-tile-full-content">
              <h4 className="title">Graduate to the full Cloud IoT Core</h4>
              <p className="next-tile-text">To provide you with the best out of box experience, we have created a sandbox account where all the AVR-IOT sensor nodes are pre-registered and their data can be promptly visualized (on this very page). If you feel ready to graduate to the full Cloud IoT Core experience, you can disconnect your board from the sandbox and link it to your own private account.</p>
              <Button className="next-button" text="Graduate" type="button" onClick={() => this.handleModal( 'graduate' )} />
            </div>
          </TileInset>
        </div>
        <div className="next-remove-device-wrapper">
          <button className="next-remove-device" onClick={() => this.handleModal( 'graduate' )}>Remove Device from Sandbox</button>
        </div>
      </InfoSection>
    )
  }
}

export default connect()( WhatsNext )
