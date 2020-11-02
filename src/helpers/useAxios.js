import axios from 'axios';
import {refreshTokenUrl} from "../constants/api";
import { _setStoreData, _clearStoreData } from "./storage";
import {changeAuthData} from "../actions/auth";
const JWT_EXPIRED = 'jwt expired';
const INVALID_TOKEN = 'invalid token';

const makeHeaders = ({token, multipartConfig}) => {
  let headers = {};
  if(token) {
    headers.Authorization = `Bearer ${token}`;
    if(multipartConfig) {
      headers['Content-Type'] = 'multipart/form-data';
    }
  }
  return {headers: {
      Accept: 'application/json',
      ...headers,
    }};
};

export const postAxios = async ({url, body, token, multipartConfig}) => {
  return axios.post(url, body, makeHeaders({token, multipartConfig}));
};

export const getAxios = ({url, params, token}) => {
  const newParams = {params} || {};
  const newHeaders = makeHeaders({token});
  const config = {
    ...newParams,
    ...newHeaders
  };
  return axios.get(url, config);
};

export const putAxios = ({url, body, token}) => {
  return axios.put(url, body, makeHeaders({token}))
};

export const deleteAxios = ({url, params, token}) => {
  const data = params || {};
  const authParams = token && {
    ...makeHeaders({token}),
    ...data
  };
  return axios.delete(url, authParams)
};

const makeRefreshToken = ({token, refreshToken}) => {
  const body = {refreshToken};
  const url = refreshTokenUrl;
  return postAxios({url, body, token}).then(response => response.data, reject => reject);
}

let tokenRefreshPromise = null;

const useAxios = async ({url, params, body, method, multipartConfig, token, refreshToken, dispatch}) => {
  try {
    if (tokenRefreshPromise) {
      await tokenRefreshPromise;
    }
    return await axiosFunctions[method]({url, params, body, token, multipartConfig});
  } catch (error) {
    const updateToken = async () => {
      const tokenResponse = await makeRefreshToken({token, refreshToken});
      const errorResponse = tokenResponse.response;
      if(errorResponse && !errorResponse.data){
        throw tokenResponse;
      }
      const errorMessage = tokenResponse.response.data.message;
      if(errorMessage === INVALID_TOKEN || errorMessage === JWT_EXPIRED) {
        dispatch(changeAuthData({
          token: null, refreshToken: null
        }));
        await _clearStoreData();
        return;
      }
      await _setStoreData('tokens', {
        token: tokenResponse.token,
        refreshToken: tokenResponse.refreshToken
      });
      dispatch(changeAuthData({
        token: tokenResponse.token, refreshToken: tokenResponse.refreshToken
      }));
      return tokenResponse.token;
    }
    if(error && error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      const isJWTInvalid = errorMessage === INVALID_TOKEN;

      if(isJWTInvalid) {
        await dispatch(changeAuthData({
          token: null, refreshToken: null
        }));
        await _clearStoreData();
        return;
      }

      const isJWTExpired = errorMessage === JWT_EXPIRED;
      if(!isJWTExpired){
        throw error;
      }
    }
    if(!tokenRefreshPromise){
      tokenRefreshPromise = updateToken();
    }
    const newToken = await tokenRefreshPromise;
    tokenRefreshPromise = null;
    return await axiosFunctions[method]({url, params, body, token: newToken, multipartConfig});
  }
}

export const anyAxios = (props) => (dispatch, getState) => {
  const {token, refreshToken} = getState().authReducer;
  return useAxios({...props, token, refreshToken, dispatch });
}
const axiosFunctions = {
  get: getAxios,
  put: putAxios,
  delete: deleteAxios,
  post: postAxios,
}