import {createSlice} from '@reduxjs/toolkit'
import {apiCallBegan} from '../../../Action/api.action'

const initialState = {
    status: null,
    error: '',
    data: {},
    statusText: null,
    pageSize: 25,
    loading: false,
};
const slice = createSlice({
    name: 'siteList',
    initialState: initialState,

    reducers: {
        resetState: (state) => {
            state.status = initialState.status;
            state.statusText = initialState.statusText;
            state.data = initialState.data;
            state.error = initialState.error;
            state.pageSize = initialState.pageSize;
            state.loading = initialState.loading;

        },
        listStart: (state) => {
            state.loading = true;
            // state.data = initialState.data;

        },
        listSuccess: (state, action) => {
            const {status, statusText, data} = action.payload;
            if (data.listName)
                document.title = data.listName;
            state.status = status;
            state.statusText = statusText;
            state.data = data;
            state.error = '';
            state.loading = false;

        },
        listFailed: (state, action) => {
            const {status, error} = action.payload;
            state.status = status;
            state.error = error;
            state.statusText = '';
            state.loading = false;

        },


    },
});

export const {
    resetState,
    listSuccess, listFailed,
    listStart
} = slice.actions;
export default slice.reducer;

export const List = (data) => apiCallBegan({
    url: '/ws/list',
    method: 'post',
    data: data,
    onSuccess: listSuccess.type,
    onError: listFailed.type,
});

