import {START_REQUEST_LOADING} from "./action";

export const startRequestLoading = payload  => {
  return {
    type: START_REQUEST_LOADING,
    payload,
  }
}