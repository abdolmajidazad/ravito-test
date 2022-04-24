import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from '../../../Action/api.action'
const slice = createSlice({
    name: 'siteSearch',
    initialState: {
        status:null,
        error: '',
        data: {},
        dataBar: {},
        statusText:null
    },
    reducers: {
        searchSuccess: (state, action) => {
            const { status, statusText, data } = action.payload;
            state.status = status;
            state.statusText = statusText;
            state.data = data;
            state.error = ''

        },
        searchFailed: (state, action) => {
            const { status, error } = action.payload;
            state.status = status;
            state.error = error;
            state.statusText = ''

        },

    },
})

export const {
    searchSuccess, searchFailed
} = slice.actions;
export default slice.reducer;

export const Search = (data, type='text') => apiCallBegan({
    url: '/ws/search/'+type,
    method: 'post',
    data:data,
    onSuccess: searchSuccess.type,
    onError: searchFailed.type,
});


