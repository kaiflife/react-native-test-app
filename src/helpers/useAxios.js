import axios from 'axios';
import {refreshTokenUrl} from "../constants/api";
import { _setStoreData, _clearStoreData } from "./storage";
import {changeAuthData} from "../actions/auth/action";
const JWT_EXPIRED = 'jwt expired';
const INVALID_TOKEN = 'invalid token';

const makeHeaders = ({accessToken, multipartConfig}) => {
  let headers = {};
  if(accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
    if(multipartConfig) {
      headers['Content-Type'] = 'multipart/form-data';
    }
  }
  return {headers: {
      Accept: 'application/json',
      ...headers,
    }};
};

export const postAxios = async ({url, body, accessToken, multipartConfig}) => {
  return axios.post(url, body, makeHeaders({accessToken, multipartConfig}));
};

export const getAxios = ({url, params, accessToken}) => {
  const newParams = {params} || {};
  const newHeaders = makeHeaders({accessToken});
  const config = {
    ...newParams,
    ...newHeaders
  };
  return axios.get(url, config);
};

export const putAxios = ({url, body, accessToken}) => {
  return axios.put(url, body, makeHeaders({accessToken}))
};

export const deleteAxios = ({url, params, accessToken}) => {
  const data = params || {};
  const authParams = accessToken && {
    ...makeHeaders({accessToken}),
    ...data
  };
  return axios.delete(url, authParams)
};

const makeRefreshToken = ({accessToken, refreshToken}) => {
  const body = {refreshToken};
  const url = refreshTokenUrl;
  return postAxios({url, body, accessToken}).then(response => response.data, reject => reject);
}

let tokenRefreshPromise = null;

const useAxios = async ({url, params, body, method, multipartConfig, accessToken, refreshToken, dispatch}) => {
  try {
    if (tokenRefreshPromise) {
      await tokenRefreshPromise;
    }
    return await axiosFunctions[method]({url, params, body, accessToken, multipartConfig});
  } catch (error) {
    const updateToken = async () => {
      const tokenResponse = await makeRefreshToken({accessToken, refreshToken});
      if(tokenResponse && tokenResponse.accessToken) {
        await _setStoreData('tokens', {
          accessToken: tokenResponse.accessToken,
          refreshToken: tokenResponse.refreshToken
        });
        dispatch(changeAuthData({
          accessToken: tokenResponse.accessToken,
          refreshToken: tokenResponse.refreshToken
        }));
        return tokenResponse.accessToken;
      }
      if(tokenResponse && !tokenResponse.response){
        throw tokenResponse;
      }
      const errorMessage = tokenResponse.response.data.message;
      if(errorMessage === INVALID_TOKEN || errorMessage === JWT_EXPIRED) {
        dispatch(changeAuthData({
          accessToken: null, refreshToken: null
        }));
        await _clearStoreData();
        return;
      }
    }
    if(error && error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      const isJWTInvalid = errorMessage === INVALID_TOKEN;

      if(isJWTInvalid) {
        await dispatch(changeAuthData({
          accessToken: null, refreshToken: null
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
    return await axiosFunctions[method]({url, params, body, accessToken: newToken, multipartConfig});
  }
}

export const anyAxios = (props) => (dispatch, getState) => {
  const {accessToken, refreshToken} = getState().authReducer;
  return useAxios({...props, accessToken, refreshToken, dispatch });
}
const axiosFunctions = {
  get: getAxios,
  put: putAxios,
  delete: deleteAxios,
  post: postAxios,
}