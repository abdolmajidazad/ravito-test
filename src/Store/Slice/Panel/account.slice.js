import {createSlice} from '@reduxjs/toolkit'

import {apiCallBegan} from '../../../Action/api.action'

const initialState = {
    error: '',
    data: {},
    userData: {},
    loading: false
};
const slice = createSlice({
    name: 'panelAccount',
    initialState,
    reducers: {
        resetState: (state) => {
            state.data = initialState.data;
            state.error = '';
            state.loading = false;
        },
        startLoading: (state) => {
            state.loading = true

        },
        accountSuccess: (state, action) => {
            const {data = {}} = action.payload;
            state.data = data;
            state.userData = data?.userName ? data : {};
            state.error = '';
            state.loading = false;
        },
        accountFailed: (state, action) => {
            state.error = action.payload.error
            state.loading = false;
        },
        UserDataSuccess: (state, action) => {
            const {data = {}} = action.payload;
            state.userData = data?.account || {};
            state.error = '';
            state.loading = false;
        },
        UserDataFailed: (state, action) => {
            state.error = action.payload.error
            state.loading = false;
        },

    },
})

export const {accountSuccess, accountFailed, startLoading, UserDataSuccess, UserDataFailed} = slice.actions;
export default slice.reducer

export const ReqOTP = (data) => apiCallBegan({
    url: '/ws/account/reqOTP',
    method: 'post',
    data: data,
    onSuccess: accountSuccess.type,
    onError: accountFailed.type,
});
export const Sign = (data) => apiCallBegan({
    url: '/ws/account/sign',
    method: 'post',
    data: data,
    onSuccess: accountSuccess.type,
    onError: accountFailed.type,
});
export const UserData = (data) => apiCallBegan({
    url: '/ws/account/userData',
    method: 'post',
    data: data,
    onSuccess: UserDataSuccess.type,
    onError: UserDataFailed.type,
});
export const SignOut = (data) => apiCallBegan({
    url: '/ws/account/signout',
    method: 'post',
    data: data,
    onSuccess: UserDataSuccess.type,
    onError: UserDataFailed.type,
});

