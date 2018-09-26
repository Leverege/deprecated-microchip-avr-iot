import React from 'react';
import { connect } from 'react-redux';
import Input from 'muicss/lib/react/input';
import RadioButton from '../RadioButton/RadioButton';
import Button from '../Button/Button';
import { toggleConfigDownloaded } from '../../actions/UIActions';
import { validateAndSubmit, validateAndSetField, togglePwVis, networkTypeChange, setWifiFormError, downloadWifiConfig, MAX_SSID_LENGTH } from '../../actions/WifiActions';
import './WifiForm.less';

export class WifiForm extends React.Component {

  handleWifiSubmit = () => {
    const { ssid, pw, networkType } = this.props.form;
    if ( !ssid ) {
      this.props.dispatch( setWifiFormError( { field : 'ssid', msg : 'SSID is required' } ) )
    } else if ( !pw && networkType !== '1' ) {
      this.props.dispatch( setWifiFormError( { field : 'pw', msg : 'Password is required' } ) )
    } else if ( ssid.length > MAX_SSID_LENGTH ) {
      this.props.dispatch( setWifiFormError( { field : 'ssid', msg : `SSID must be less than ${MAX_SSID_LENGTH + 1} characters` } ) )
    } else if ( pw.length > MAX_SSID_LENGTH ) {
      this.props.dispatch( setWifiFormError( { field : 'pw', msg : `Password must be less than ${MAX_SSID_LENGTH + 1} characters` } ) )
    } else {
      // valid form, submit
      this.props.dispatch( toggleConfigDownloaded() )
      downloadWifiConfig( ssid, pw, networkType );  
    }   
  }

  handleTogglePwVis = () => {
    this.props.dispatch( togglePwVis() )
  }

  handleSSIDChange = (value) => {
    this.props.dispatch( validateAndSetField( { value, field : 'ssid' } ) )
  }

  handlePwChange = (value) => {
    this.props.dispatch( validateAndSetField( { value, field : 'pw' } ) )
  }

  handleNetworkTypeChange = (value) => {
    this.props.dispatch( networkTypeChange( value ) )
  }

  render() {
    const { hidePw, ssid, pw, networkType, error } = this.props.form;

    const errorMsg = error ? <h4 className="error">{ error.msg }</h4> : '';

    const buttonStyle = {
      padding : '8px 26px'
    };

    const pwSection = ( 
      <div className="pw-group">
        <Input placeholder="Network Password" invalid={error && error.field === 'pw'} required value={pw} onChange={e => this.handlePwChange( e.target.value )} type={hidePw ? 'password' : 'text'} />
        <button id="toggle-pw-vis" onClick={() => this.handleTogglePwVis()}>{ hidePw ? 'Show password' : 'Hide password' }</button>
      </div>
    )

    return (
      <div className="wifi-form">
        { errorMsg }
        <Input required invalid={error && error.field === 'ssid'} placeholder="Wireless Network Name" value={ssid} onChange={e => this.handleSSIDChange( e.target.value )} />
        <p><em>Your WiFi information is not transmitted anywhere&mdash;the config file is generated in your browser.</em></p>
        <fieldset>
          <legend className="wifi-form-label">
          Network Type
          </legend>
          <RadioButton id="radio-open" text="Open" selected={networkType === '1'} val="1" onClick={this.handleNetworkTypeChange} />
          <RadioButton id="radio-wpa" text="WPA/WPA2" selected={networkType === '2'} val="2" onClick={this.handleNetworkTypeChange} />
          <RadioButton id="radio-wep" text="WEP" selected={networkType === '3'} val="3" onClick={this.handleNetworkTypeChange} />
        </fieldset>
        { networkType !== '1' ? pwSection : '' }
        <div className="wifi-form-buttons">
          <Button style={buttonStyle} text="Download Configuration" type="button" onClick={this.handleWifiSubmit} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ( {
  configDownloaded : state.UIReducer.configDownloaded,
  form : state.WifiReducer.wifiForm
} )

export default connect( mapStateToProps )( WifiForm )

