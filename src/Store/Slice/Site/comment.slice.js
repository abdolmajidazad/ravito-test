import {createSlice} from '@reduxjs/toolkit'

import {apiCallBegan} from '../../../Action/api.action'
const initialState = {
    status: null,
    error: '',
    data: {
        comments:[]
    },
    dataBar: {},
    statusText: null,
    loading:false,
    nextPage:false,
    pageNumber:0
};
const slice = createSlice({
    name: 'siteComment',
    initialState:initialState,
    reducers: {
        resetState:(state)=>{
            state.status = initialState.status;
            state.statusText = initialState.statusText;
            state.data = initialState.data;
            state.nextPage = false;
            state.error = '';
            state.loading = false;
            state.pageNumber = 0
        },
        changePage:(state)=>{
            state['pageNumber'] = state.pageNumber+1
        },
        listStart: (state) => {
            state.loading = true

        },
        listSuccess: (state, action) => {
            const {status, statusText, data} = action.payload;
            let newData = {...data};

            newData['comments'] = [...state.data['comments'],...newData['comments']];
            state.status = status;
            state.statusText = statusText;
            state.data = newData;
            state.nextPage = data['comments'].length===10;
            state.error = '';
            state.loading = false

        },
        listFailed: (state, action) => {
            const {status, error} = action.payload;
            state.status = status;
            state.error = error;
            state.statusText = '';
            state.loading = false;

        }


    },
});

export const {
    listSuccess, listFailed,listStart, resetState,changePage
} = slice.actions;
export default slice.reducer;

export const List = (data) => apiCallBegan({
    url: '/ws/comment/list',
    method: 'post',
    data: data,
    onStart: listStart.type,
    onSuccess: listSuccess.type,
    onError: listFailed.type,
});


