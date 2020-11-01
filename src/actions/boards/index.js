import axios from 'axios';
import {boardsUrl} from "../../constants/api";
import {BOARDS_REQUEST_FAILED, CHANGE_BOARDS_DATA} from "./action";

const changeBoardsData = (payload) => {
  return {
    type: CHANGE_BOARDS_DATA,
    payload,
  }
}

export const getBoardsRequest = () => (dispatch) => {
  try {
    return axios.get(boardsUrl)
      .then(res => dispatch(changeBoardsData(res.data)))
      .catch(e => dispatch({type: BOARDS_REQUEST_FAILED, payload: {error: e.response.data.message}}));
  } catch (e) {
    console.error('error axios', e.message);
  }
}

export const createBoardRequest = (payload) => (dispatch) => {
  try {
    return axios.post(boardsUrl, payload)
      .catch(e => dispatch({type: BOARDS_REQUEST_FAILED, payload: {error: e.response.data.message}}))
  } catch (e) {
    console.error('error axios', e.message);
  }
}

export const deleteBoardRequest = (payload) => (dispatch) => {
  try {
    return axios.delete(boardsUrl, payload)
      .catch(e => dispatch({type: BOARDS_REQUEST_FAILED, payload: {error: e.response.data.message}}))
  } catch (e) {
    console.error('error axios', e.message);
  }
}

export const updateBoardRequest = (payload) => (dispatch) => {
  try {
    return axios.put(boardsUrl, payload)
      .catch(e => dispatch({type: BOARDS_REQUEST_FAILED, payload: {error: e.response.data.message}}))
  } catch (e) {
    console.error('error axios', e.message);
  }
}