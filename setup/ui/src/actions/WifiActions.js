import { openSaveFileDialog } from '../utils/utils'

export const MAX_SSID_LENGTH = 20

export function downloadWifiConfig( ssid, pw, networkType ) {
  const body = `CMD:SEND_UART=wifi ${ssid},${pw},${networkType}\n\n`

  openSaveFileDialog( body, 'WIFI.CFG' )

  // const element = document.createElement( 'a' )
  // element.setAttribute( 'href', `data:application/octet-stream;charset=utf-8,${encodeURIComponent( body )}` )
  // element.setAttribute( 'download', 'WIFI.CFG' )

  // element.style.display = 'none'
  // document.body.appendChild( element )

  // element.click();

  // document.body.removeChild( element )
}

export const VALIDATE_AND_SET_FIELD = 'VALIDATE_AND_SET_FIELD';
export const validateAndSetField = fieldData => ( {
  type : VALIDATE_AND_SET_FIELD,
  fieldData
} )

export const TOGGLE_PW_VIS = 'TOGGLE_PW_VIS';
export const togglePwVis = () => ( {
  type : TOGGLE_PW_VIS
} )

export const NETWORK_TYPE_CHANGE = 'NETWORK_TYPE_CHANGE'
export const networkTypeChange = val => ( {
  type : NETWORK_TYPE_CHANGE,
  val
} )

export const SET_WIFI_FORM_ERROR = 'SET_WIFI_FORM_ERROR';
export const setWifiFormError = err => ( {
  type : SET_WIFI_FORM_ERROR,
  err
} )
