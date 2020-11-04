import {boardsUrl} from "../../constants/api";
import {BOARDS_REQUEST_FAILED, CHANGE_BOARDS_DATA} from "./action";
import { anyAxios } from "../../helpers/useAxios";

export const changeBoardsData = (payload) => {
  return {
    type: CHANGE_BOARDS_DATA,
    payload,
  }
}

export const getBoardsRequest = () => (dispatch, getState) => {
  const boardsType = getState().boardsReducer.boardsType;
  const url = `${boardsUrl}?boardsType=${boardsType}`
  try {
    return dispatch(anyAxios({method: 'get', url}))
      .then(res => {
        dispatch(changeBoardsData(res.data))
      })
      .catch(e => {
        return dispatch({type: BOARDS_REQUEST_FAILED, payload: {error: e.response.data.message}})
      });
  } catch (e) {
    console.error('error axios', e.message);
  }
}

export const createBoardRequest = () => (dispatch, getState) => {
  const title = getState().modalReducer.modalInputsInfo[0].value;
  try {
    return dispatch(anyAxios({method: 'post', url: boardsUrl, body: { title }}))
      .then(() => 'success')
      .catch(e => dispatch({type: BOARDS_REQUEST_FAILED, payload: {error: e.response.data.message}}))
  } catch (e) {
    console.error('error axios', e.message);
  }
}

export const deleteBoardRequest = (payload) => (dispatch) => {
  try {
    return dispatch(anyAxios({method: 'delete', url: boardsUrl, body: payload}))
      .catch(e => dispatch({type: BOARDS_REQUEST_FAILED, payload: {error: e.response.data.message}}))
  } catch (e) {
    console.error('error axios', e.message);
  }
}

export const updateBoardRequest = (payload) => (dispatch) => {
  try {
    return dispatch(anyAxios({method: 'put', url: boardsUrl, body: payload}))
      .catch(e => dispatch({type: BOARDS_REQUEST_FAILED, payload: {error: e.response.data.message}}))
  } catch (e) {
    console.error('error axios', e.message);
  }
}