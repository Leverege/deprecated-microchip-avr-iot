import React from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../actions/UIActions';
import TileInset from '../TileInset/TileInset';
import Button from '../Button/Button';
import './Modal.less';

/**
 * @param function onConfirm(params) {
   // what the modal does on confirm
 }
 * @param string buttonType should button be link or button
 */
export class Modal extends React.Component {

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  toggleModal = e => {
    this.props.dispatch( toggleModal() )
  }

  handleOverlayClick = e => {
    // fire toggleModal only if overlay itself, and not child window is clicked    
    if ( e.target.id === 'overlay' ) {
      this.toggleModal();
    }
  }

  handleKeyPress = e => {
    if ( e.keyCode === 27 ) {
      // close modal on escape press
      this.toggleModal();
    } else if ( e.keyCode === 9 ) {
      e.preventDefault();
      // keep focus on dialog buttons when tabbing
      if ( document.activeElement.id === 'modal-cancel' ) {
        document.getElementById('modal-confirm').focus();
      } else {
        document.getElementById('modal-cancel').focus();
      }
    }
  }

  renderText = (modalType) => {
    if ( modalType === 'graduate' ) {
      return <p>Are you sure you want to remove this device from the Sandbox? You will not be able undo this action or access this device in the Quick Start Experience.</p>
    }
    return <p>This feature is not currently available. Check back soon!</p>
  }

  render () {
    const { modalType } = this.props;
    const title = modalType === 'graduate' ? 'Remove Device from Sandbox' : 'Coming Soon';
    return (
      <section className='modal-overlay' id='overlay' onClick={ (e) => this.handleOverlayClick(e) }>
        <TileInset className='modal-dialog' title={title} >
          {this.renderText( modalType )}
          <div className='modal-buttons'>
            <button id='modal-cancel' autoFocus className='cancel' onClick={ this.toggleModal }>Cancel</button>
            { modalType === 'graduate' ? <Button id='modal-confirm' href="https://github.com/Leverege/microchip-avr-iot/" style={ { padding: '8px 28px' } } text="Graduate"/> : '' }
          </div>
        </TileInset>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  modalType: state.UIReducer.modalType
})

export default connect(mapStateToProps)(Modal)