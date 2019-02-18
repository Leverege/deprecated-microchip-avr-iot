import React from 'react';
import PropTypes from 'prop-types';
import '../RadioButton/RadioButton.less';

export default class RadioButton extends React.Component {
  // onClick -- func, what RadioButton should do with val when clicked;
  // val -- string or number, the value RadioButton does something with when clicked;
  // selected -- bool, whether the button should show selected style or not
  // text -- string, what the div should display next to the button
  // id -- string (required), unique identifier for checkbox
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  handleKeyPress = e => {
    if ( e.keyCode === 13 && document.activeElement.id === this.props.id ) {
      this.props.onClick( this.props.val )
    }
  }

  render () {
    const { selected, text, onClick, val, id } = this.props;

    return (
      <div id={id} tabIndex='0' onClick={ () => onClick(val) } className={`radio-button radio-button-${ selected ? 'on' : 'off'}`}>
        <div className={`radio-button-circle radio-button-circle-${ selected ? 'on' : 'off'}`}/>
        <p className='radio-button-text'>{text}</p>
      </div>
    )
  }
}

RadioButton.propTypes = {
  selected: PropTypes.bool,
  text: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string.isRequired,
  val: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] )
};