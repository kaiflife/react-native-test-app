import { AUTH_REQUEST } from "./action";
import axios from 'axios';

export const authRequest = (payload) => (dispatch) => {
  console.log(payload);
  console.log(dispatch);
}