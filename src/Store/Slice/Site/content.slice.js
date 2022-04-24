import {createSlice} from '@reduxjs/toolkit'
import {apiCallBegan} from '../../../Action/api.action'
import {GetAssetUrl} from "../../../Action/Setting";

const initialState = {
    status: null,
    error: '',
    data: {},
    dataBar: {},
    statusText: null,
    loading: false
};
const slice = createSlice({
    name: 'siteContent',
    initialState: initialState,
    reducers: {
        resetState: (state) => {
            state = {
                ...initialState
            }
        },
        fetchSuccess: (state, action) => {
            const {status, statusText, data} = action.payload;
            state.status = status;
            state.statusText = statusText;
            state.data = data;
            state.error = ''

        },
        fetchFailed: (state, action) => {
            const {status, error} = action.payload;
            state.status = status;
            state.error = error;
            state.statusText = ''

        },

    },
})

export const {
    fetchSuccess, fetchFailed, resetState
} = slice.actions;
export default slice.reducer;

export const Fetch = (data) => apiCallBegan({
    url: '/ws/content/fetch',
    method: 'post',
    data: data,
    onSuccess: fetchSuccess.type,
    onError: fetchFailed.type,
});


