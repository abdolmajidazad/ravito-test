import {createSlice} from '@reduxjs/toolkit'

import {apiCallBegan} from '../../../Action/api.action'

const initialState = {
    error: '',
    data: {},
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
            state.error = '';
            state.loading = false;
        },
        accountFailed: (state, action) => {
            state.error = action.payload.error
            state.loading = false;
        },

    },
})

export const {accountSuccess, accountFailed, startLoading} = slice.actions;
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

