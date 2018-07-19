import { 
  VALIDATE_AND_SET_FIELD,
  TOGGLE_PW_VIS,
  NETWORK_TYPE_CHANGE,
  SET_WIFI_FORM_ERROR 
} from '../actions/WifiActions';

const initialState = {
  wifiForm: {
    ssid: '',
    pw: '',
    networkType: '1',
    hidePw: true,
    error: null
  }
}

export default function WifiReducer ( state = initialState, action ) {
  switch ( action.type ) {
    case VALIDATE_AND_SET_FIELD: {
      const { field, value } = action.fieldData;
      let error = null;
      if ( value.length > 15 ) {
        error = { field: field, 'msg': `${ field === 'ssid' ? 'SSID' : 'Password' } must be less than 16 characters` }
      }
      if ( error || ( state.error && state.error.field === field ) ) {
        return { ...state, wifiForm: { ...state.wifiForm, [field]: value, error } }
      } else {
        return { ...state, wifiForm: { ...state.wifiForm, [field]: value } }
      }
    }

    case TOGGLE_PW_VIS: {
      console.log('reducer says: pw vis toggle')
      return { ...state, wifiForm: { ...state.wifiForm, hidePw: !state.wifiForm.hidePw } }
    }

    case NETWORK_TYPE_CHANGE: {
      return { ...state, wifiForm: { ...state.wifiForm, networkType: action.val } }
    }

    case SET_WIFI_FORM_ERROR: {
      return { ...state, wifiForm: { ...state.wifiForm, error: action.err } }
    }

    default:
      return state
  }
}