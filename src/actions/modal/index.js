import {CHANGE_MODAL_DATA, CLOSE_MODAL, OPEN_ERROR_MODAL} from "./action";

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

export const closeModal = () => ({type: CLOSE_MODAL});