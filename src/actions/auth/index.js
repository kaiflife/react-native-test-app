import axios from 'axios';
import {authUrl, boardsUrl, registrationUrl, usersRoute} from "../../constants/api";
import {AUTH_REQUEST_FAILED, CHANGE_AUTH_DATA, changeAuthData, CLEAR_AUTH_DATA} from "./action";
import {openErrorModal} from "../modal";
import {_setStoreData} from "../../helpers/storage";
import {anyAxios} from "../../helpers/useAxios";

export const authRequest = (payload) => (dispatch) => {
  try {
    return axios.post(authUrl, payload)
      .then(result => {
        dispatch(changeAuthData(result.data));
        _setStoreData('tokens', result.data.accessToken);
        return;
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
      .then(res => res.status)
      .catch(e => {
        dispatch({type: AUTH_REQUEST_FAILED, payload: {error: e.response.data.message}});
        return;
      });
  } catch (e) {
    console.error('error axios', e.message);
  }
}

export const getUserDataRequest = () => (dispatch, getState) => {
  try {
    return dispatch(anyAxios({method: 'get', url: usersRoute}))
      .then(res => {
        dispatch(changeAuthData(res.data));
        return res.status;
      })
      .catch(e => {
        if(typeof e === 'object' && e.response) {
          dispatch({type: AUTH_REQUEST_FAILED, payload: {error: e.response.data.message}});
        }
        return;
      });
  } catch (e) {
    console.error('error axios', e.message);
  }
}

export const updateUserDataRequest = (payload) => (dispatch) => {
  try {
    return dispatch(anyAxios({type: 'put', url: boardsUrl, body: payload}))
      .then(res => res.status)
      .catch(e => {
        dispatch({type: AUTH_REQUEST_FAILED, payload: {error: e.response.data.message}});
        return;
      });
  } catch (e) {
    console.error('error axios', e.message);
  }
}

export const logoutRequest = () => (dispatch) => {
  try {
    return dispatch(anyAxios({type: 'put', url: boardsUrl}))
      .then(res => res.status)
      .catch(e => {
        dispatch({type: AUTH_REQUEST_FAILED, payload: {error: e.response.data.message}});
        return;
      });
  } catch (e) {
    console.error('error axios', e.message);
  }
}

export const clearAuthData = () => ({type: CLEAR_AUTH_DATA});