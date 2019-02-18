import { combineReducers } from 'redux';
import DeviceReducer from './DeviceReducer';
import UIReducer from './UIReducer';
import WifiReducer from './WifiReducer';

export default combineReducers({
  DeviceReducer,
  UIReducer,
  WifiReducer
});
