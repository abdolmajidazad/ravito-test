import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from '../../../Action/api.action'
const slice = createSlice({
    name: 'siteDownload',
    initialState: {
        status:null,
        error: '',
        data: {},
        dataBar: {},
        statusText:null
    },
    reducers: {
        streamSuccess: (state, action) => {
            const { status, statusText, data } = action.payload;
            state.status = status;
            state.statusText = statusText;
            state.data = data;
            state.error = ''

        },
        streamFailed: (state, action) => {
            const { status, error } = action.payload;
            state.status = status;
            state.error = error;
            state.statusText = ''

        },

    },
})

export const {
    streamSuccess, streamFailed
} = slice.actions;
export default slice.reducer;

export const Stream = (data) => apiCallBegan({
    url: '/ws/download/movie/stream',
    method: 'post',
    data:data,
    onSuccess: streamSuccess.type,
    onError: streamFailed.type,
});


