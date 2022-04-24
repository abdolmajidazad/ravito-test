import {createSlice} from '@reduxjs/toolkit'

import {apiCallBegan} from '../../../Action/api.action'

const slice = createSlice({
    name: 'siteCategory',
    initialState: {
        status: null,
        error: '',
        data: {},
        dataBar: {},
        statusText: null
    },
    reducers: {
        CategorySuccess: (state, action) => {
            const {status, statusText, data} = action.payload;
            state.status = status;
            state.statusText = statusText;
            state.data = data;
            state.error = ''

        },
        CategoryFailed: (state, action) => {
            const {status, error} = action.payload;
            state.status = status;
            state.error = error;
            state.statusText = ''

        }


    },
})

export const {
    CategorySuccess, CategoryFailed,
} = slice.actions;
export default slice.reducer;

export const CategoryWs = (data, type = 'clip') => apiCallBegan({
    url: '/ws/category/' + type,
    method: 'post',
    data: data,
    onSuccess: CategorySuccess.type,
    onError: CategoryFailed.type,
});


