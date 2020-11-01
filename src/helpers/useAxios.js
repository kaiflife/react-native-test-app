import axios from 'axios';
import {refreshTokenUrl} from "../constants/api";
import { _setStoreData, _clearStoreData } from "./storage";
import {changeAuthData} from "../actions/auth";

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

const refreshToken = ({token, refreshToken}) => {
  const body = {refreshToken};
  const url = refreshTokenUrl;
  return postAxios({url, body, token}).then(response => response.data, reject => reject);
}

let tokenRefreshPromise = null;

const useAxios = async ({dispatch, url, params, body, method, multipartConfig, tokens}) => {
  try {
    if (tokenRefreshPromise) {
      await tokenRefreshPromise;
    }
    return await axiosFunctions[method]({url, params, body, token: tokens.token, multipartConfig});
  } catch (e) {
    const updateToken = async () => {
      const tokenResponse = await refreshToken({token: tokens.token, refreshToken: tokens.refreshToken});
      if(tokenResponse.response && tokenResponse.response.data && typeof tokenResponse.response.data === 'string'){
        throw tokenResponse;
      }
      if(tokenResponse.response && tokenResponse.response.data.error.refreshToken === 'Refresh token is invalid or you are not logged in'){
        if(tokens.token){
          dispatch('logoutRequest');
        }
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
    if(e.response && e.response.data) {
      const errorData = e.response.data;
      const isJWTExpired = errorData.message === 'jwt expired';
      if(!isJWTExpired){
        throw e;
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

export const anyAxios = async ({url, params, body, method, multipartConfig}) => (dispatch, getState) => {
  const tokens = getState().authReducer.token;
  return useAxios({dispatch, url, params, body, method, multipartConfig, tokens});
}
const axiosFunctions = {
  get: getAxios,
  put: putAxios,
  delete: deleteAxios,
  post: postAxios,
}