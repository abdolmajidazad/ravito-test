import {createSlice} from '@reduxjs/toolkit'
import {apiCallBegan} from '../../../Action/api.action'

const initialState = {
    status: null,
    error: '',
    data: {},
    dataBar: {},
    statusText: null,
    loading: false
};
const slice = createSlice({
    name: 'siteStart',
    initialState: initialState,

    reducers: {
        resetState: (state) => {
            state.status = initialState.status;
            state.statusText = initialState.statusText;
            state.data = initialState.data;
            state.error = initialState.error;
            state.loading = initialState.loading;
        },
        listStart: (state) => {
            state.loading = true;
        },
        startSuccess: (state, action) => {

            const {status, statusText, data} = action.payload;
            if (data.title)
                document.title = data.title;
            state.status = status;
            state.statusText = statusText;
            state.data = data;
            state.loading = false;
            state.error = ''

        },
        startFailed: (state, action) => {
            const {status, error} = action.payload;
            state.status = status;
            state.error = error;
            state.loading = false;
            state.statusText = ''

        },
        startBarSuccess: (state, action) => {
            const {status, statusText, data} = action.payload;
            state.status = status;
            state.statusText = statusText;
            state.dataBar = data;
            state.loading = false;
            state.error = ''

        },
        startBarFailed: (state, action) => {
            const {status, error} = action.payload;
            state.status = status;
            state.error = error;
            state.loading = false;
            state.statusText = ''

        },


    },
});

export const {
    startSuccess, startFailed,
    startBarSuccess, startBarFailed, resetState, listStart
} = slice.actions;
export default slice.reducer;

export const start = (data) => apiCallBegan({
    url: '/ws/start',
    method: 'post',
    data: data,
    onSuccess: startSuccess.type,
    onError: startFailed.type,
});
export const startBar = (data) => apiCallBegan({
    url: '/ws/start',
    method: 'post',
    data: data,
    onSuccess: startBarSuccess.type,
    onError: startBarFailed.type,
});



