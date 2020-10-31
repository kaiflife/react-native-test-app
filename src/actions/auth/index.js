import axios from 'axios';
import {authUrl, registrationUrl} from "../../constants/api";
import {CHANGE_AUTH_DATA} from "./action";

export const authRequest = () => (dispatch, getState) => {
  const { email, password } = getState().auth;
  try {
    return axios.post(authUrl, {email, password})
      .catch(e => {
        dispatch({type: CHANGE_AUTH_DATA, payload: {error: e.response.data.message}});
      });
  } catch (e) {
    console.error('error axios', e.message);
  }
}

export const registrationRequest = () => (dispatch, getState) => {
  const { email, password, firstName, lastName } = getState().auth;
  const fullName = `${firstName} ${lastName}`;
  try {
    return axios.post(registrationUrl, {email, password, fullName})
      .catch(e => {
        dispatch({type: CHANGE_AUTH_DATA, payload: {error: e.response.data.message}});
      });
  } catch (e) {
    console.error('error axios', e.message);
  }
}