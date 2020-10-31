import {CHANGE_MODAL_DATA} from "./action";

export const changeModalData = (payload) => {
  return {
    type: CHANGE_MODAL_DATA,
    payload,
  }
}
