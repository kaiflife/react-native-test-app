export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_REQUEST_FAILED = 'AUTH_REQUEST_FAILED';
export const CHANGE_AUTH_DATA = 'CHANGE_AUTH_DATA';
export const CLEAR_AUTH_DATA = 'CLEAR_AUTH_DATA';


export const changeAuthData = payload => {
  return {
    type: CHANGE_AUTH_DATA,
    payload,
  }
}