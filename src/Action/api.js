import axios from 'axios'

import {
  apiCallBegan,
  apiCallSuccess,
  apiCallFailed,
} from './api.action'
// import { userLoggedOut } from '../slice/user.slice'

const api =
  ({ dispatch }) =>
  next =>
  async action => {
    if (action.type !== apiCallBegan.type) return next(action);

    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart })

    next(action);

    try {
      // const token = localStorage.getItem('authToken');
      const response = await axios.request({
        baseURL: 'http://localhost:3000',
        url,
        method,
        data,
        headers: {
        //   Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': "*"
        },
      });

      if (method === 'get') {
        dispatch(
          apiCallSuccess({ status: response.status, data: response.data })
        )
        if (onSuccess)
          dispatch({
            type: onSuccess,
            payload: { status: response.status, data: response.data },
          })
      }

      if (method === 'post') {
        dispatch(
          apiCallSuccess({
            status: response.status,
            statusText: response.statusText,
            data: response.data,
          })
        );
        if (onSuccess)
          dispatch({
            type: onSuccess,
            payload: {
              status: response.status,
              statusText: response.statusText,
              data: response.data,
              request:data
            },
          })

        // toast.success(response.statusText)
      }

      if (method === 'patch') {
        dispatch(
          apiCallSuccess({
            status: response.status,
            statusText: response.statusText,
          })
        )
        if (onSuccess)
          dispatch({
            type: onSuccess,
            payload: {
              status: response.status,
              statusText: response.statusText,
            },
          })

        // toast.success(response.statusText)
      }

      if (method === 'delete') {
        dispatch(
          apiCallSuccess({ status: response.status, data: response.data })
        );
        if (onSuccess)
          dispatch({
            type: onSuccess,
            payload: { status: response.status, data: response.data },
          })

        // toast.success(response.statusText)
      }
    } catch (error) {
      dispatch(
        apiCallFailed({
          status: error.response.status,
          error: error.response.data.error,
        })
      );
      if (onError)
        dispatch({
          type: onError,
          payload: {
            status: error.response.status,
            error: error.response.data.error,
          },
        });

      // if (
      //   action.payload.url === '/users/login' &&
      //   error.response.status === 400
      // ) {
      //   // toast.error('Wrong credentials!')
      // }
      //
      // // toast.error(error.response.data.error)
      //
      // if (
      //   error.response.status === 401 &&
      //   error.response.data.error === 'Please authenticate.'
      // ) {
      //   // dispatch(userLoggedOut())
      // }
    }
  }

export default api
