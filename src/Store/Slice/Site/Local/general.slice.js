import {createSlice} from '@reduxjs/toolkit'
const slice = createSlice({
    name: 'siteCategory',
    siteError:null,
    initialState: {
        DrawerOpen: false,
        drawerWidth : 240
    },
    reducers: {
        DrawerChangeStatus: (state, action) => {
            console.log("state, action", state.DrawerOpen, action)
            state.DrawerOpen = !state.DrawerOpen;

        },
        SiteSnackbarDispatcher: (state, action) => {
            console.log("state, action", action)
            state.siteError = action.payload;

        }

    },
});

export const {
    DrawerChangeStatus,
    SiteSnackbarDispatcher
} = slice.actions;
export default slice.reducer;
