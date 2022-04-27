import { createSlice } from '@reduxjs/toolkit'

import { apiCallBegan } from '../../../Action/api.action'
const  initialState = {
    status:null,
    error: '',
    data: {},
    statusText:null,
    pageSize:25
};
const slice = createSlice({
    name: 'siteList',
    initialState: initialState,

    reducers: {
        resetState:(state)=>{
            state.status = initialState.status;
            state.statusText = initialState.statusText;
            state.data = initialState.data;
            state.error = initialState.error;
            state.pageSize = initialState.pageSize;
        },
        listSuccess: (state, action) => {
            const { status, statusText, data } = action.payload;
            console.log("data listSuccess", data)
            state.status = status;
            state.statusText = statusText;
            state.data = data;
            state.error = ''

        },
        listFailed: (state, action) => {
            const { status, error } = action.payload;
            state.status = status;
            state.error = error;
            state.statusText = ''

        },



    },
});

export const {
    resetState,
    listSuccess,listFailed
} = slice.actions;
export default slice.reducer;

export const List = (data) => apiCallBegan({
    url: '/ws/list',
    method: 'post',
    data:data,
    onSuccess: listSuccess.type,
    onError: listFailed.type,
});

