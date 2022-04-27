import { createSlice } from '@reduxjs/toolkit'

import { apiCallBegan } from '../../../Action/api.action'

const slice = createSlice({
  name: 'panelUser',
  initialState: { error: '' ,data:{}},
  reducers: {
    userLoggedIn: (state, action) => {
        state.data={mammmama:3232};
        state.error = ''
    },
    userLoginFailed: (user, action) => {
      user.error = action.payload.error
      localStorage.clear()
    },

  },
})

export const { userLoggedIn, userLoginFailed } = slice.actions
export default slice.reducer

export const userLogin = (email, password) => apiCallBegan({
        url: '/ws/account/reqOTP',
        method: 'post',
        data: {
            pass: "311b7c0a5a1ed82db495b25da729f0479e92f26b",
            username: "amin_te65@yahoo.com"
        },
        onSuccess: userLoggedIn.type,
        onError: userLoginFailed.type,
    });

