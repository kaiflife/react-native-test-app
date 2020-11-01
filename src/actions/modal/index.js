import {CHANGE_MODAL_DATA, OPEN_ERROR_MODAL} from "./action";

export const changeModalData = (payload) => {
  return {
    type: CHANGE_MODAL_DATA,
    payload,
  }
}

export const openErrorModal = (payload) => {
  return {
    type: OPEN_ERROR_MODAL,
    payload
  }
}