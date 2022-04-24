import { createSlice } from '@reduxjs/toolkit'

import { apiCallBegan } from '../../../Action/api.action'

const slice = createSlice({
    name: 'siteStart',
    initialState: {
        status:null,
        error: '',
        data: {},
        dataBar: {},
        statusText:null
    },
    reducers: {
        startSuccess: (state, action) => {
            const { status, statusText, data } = action.payload;
            state.status = status;
            state.statusText = statusText;
            state.data = data;
            state.error = ''

        },
        startFailed: (state, action) => {
            const { status, error } = action.payload;
            state.status = status;
            state.error = error;
            state.statusText = ''

        },
        startBarSuccess: (state, action) => {
            const { status, statusText, data } = action.payload;
            state.status = status;
            state.statusText = statusText;
            state.dataBar = data;
            state.error = ''

        },
        startBarFailed: (state, action) => {
            const { status, error } = action.payload;
            state.status = status;
            state.error = error;
            state.statusText = ''

        },


    },
})

export const {
    startSuccess, startFailed,
    startBarSuccess, startBarFailed,
} = slice.actions;
export default slice.reducer;

export const start = (data) => apiCallBegan({
    url: '/ws/start',
    method: 'post',
    data:data,
    onSuccess: startSuccess.type,
    onError: startFailed.type,
});
export const startBar = (data) => apiCallBegan({
    url: '/ws/start',
    method: 'post',
    data:data,
    onSuccess: startBarSuccess.type,
    onError: startBarFailed.type,
});

