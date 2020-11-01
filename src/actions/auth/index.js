import axios from 'axios';
import {authUrl, registrationUrl} from "../../constants/api";
import {AUTH_REQUEST_FAILED, CHANGE_AUTH_DATA, CLEAR_AUTH_DATA} from "./action";
import {openErrorModal} from "../modal";
import {_setStoreData} from "../../helpers/storage";

export const authRequest = (payload) => (dispatch) => {
  try {
    return axios.post(authUrl, payload)
      .then(result => {
        dispatch(changeAuthData(result.data));
        _setStoreData('token', result.data.token);
      })
      .catch(e => {
        dispatch({type: AUTH_REQUEST_FAILED, payload: {error: e.response.data.message}});
        if(e.response.status === 401) {
          dispatch(openErrorModal({modalTitle: '', modalText: e.response.data.message}))
        }
        return;
      });
  } catch (e) {
    console.error('error axios', e.message);
  }
}

export const registrationRequest = (payload) => (dispatch) => {
  try {
    return axios.post(registrationUrl, payload)
      .then(res => {
        return res.status
      })
      .catch(e => {
        dispatch({type: AUTH_REQUEST_FAILED, payload: {error: e.response.data.message}});
        return;
      });
  } catch (e) {
    console.error('error axios', e.message);
  }
}

export const changeAuthData = payload => {
  return {
    type: CHANGE_AUTH_DATA,
    payload,
  }
}

export const clearAuthData = () => ({type: CLEAR_AUTH_DATA});