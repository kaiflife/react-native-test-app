import {boardsUrl} from "../../constants/api";
import {BOARDS_REQUEST_FAILED, CHANGE_BOARDS_DATA} from "./action";
import {anyAxios} from "../../helpers/useAxios";

const changeBoardsData = (payload) => {
  return {
    type: CHANGE_BOARDS_DATA,
    payload,
  }
}

export const getBoardsRequest = () => (dispatch) => {
  try {
    return dispatch(anyAxios({method: 'get', url: boardsUrl}))
      .then(res => dispatch(changeBoardsData(res.data)))
      .catch(e => {
        console.log(e.response);
        return dispatch({type: BOARDS_REQUEST_FAILED, payload: {error: e.response.data.message}})
      });
  } catch (e) {
    console.error('error axios', e.message);
  }
}

export const createBoardRequest = (payload) => (dispatch) => {
  try {
    return dispatch(anyAxios({type: 'post', url: boardsUrl, body: payload}))
      .catch(e => dispatch({type: BOARDS_REQUEST_FAILED, payload: {error: e.response.data.message}}))
  } catch (e) {
    console.error('error axios', e.message);
  }
}

export const deleteBoardRequest = (payload) => (dispatch) => {
  try {
    return dispatch(anyAxios({type: 'delete', url: boardsUrl, body: payload}))
      .catch(e => dispatch({type: BOARDS_REQUEST_FAILED, payload: {error: e.response.data.message}}))
  } catch (e) {
    console.error('error axios', e.message);
  }
}

export const updateBoardRequest = (payload) => (dispatch) => {
  try {
    return dispatch(anyAxios({type: 'put', url: boardsUrl, body: payload}))
      .catch(e => dispatch({type: BOARDS_REQUEST_FAILED, payload: {error: e.response.data.message}}))
  } catch (e) {
    console.error('error axios', e.message);
  }
}