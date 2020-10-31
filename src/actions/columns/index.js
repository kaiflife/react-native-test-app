import axios from 'axios';
import {authUrl} from "../../constants/api";
import {GET_COLUMNS_FAILED} from "./action";

export const getColumnsRequest = () => (dispatch) => {
  try {
    return axios.get(authUrl)
      .catch(e => {
        dispatch({type: GET_COLUMNS_FAILED, payload: {error: e.response.data.message}});
      });
  } catch (e) {
    console.error('error axios', e.message);
  }
}