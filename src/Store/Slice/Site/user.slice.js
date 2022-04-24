import { createSlice } from '@reduxjs/toolkit'

import { apiCallBegan } from '../../../Action/api.action'

const slice = createSlice({
  name: 'siteUser',
  initialState: { error: '' },
  reducers: {
    userLoggedIn: (user, action) => {
      user.error = ''
      localStorage.setItem('authToken', action.payload.data.token)
      window.location.reload()
    },
    userLoginFailed: (user, action) => {
      user.error = action.payload.error
      localStorage.clear()
    },
    userLoggedOut: user => {
      user.error = ''
      localStorage.removeItem('authToken')
      window.location.reload()
    },
  },
})

export const { userLoggedIn, userLoginFailed, userLoggedOut } = slice.actions
export default slice.reducer

export const userLogin = (email, password) =>
  apiCallBegan({
    url: '/users/login',
    method: 'post',
    data: { email, password },
    onSuccess: userLoggedIn.type,
    onError: userLoginFailed.type,
  })
