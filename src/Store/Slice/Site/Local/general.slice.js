import {createSlice} from '@reduxjs/toolkit'
const slice = createSlice({
    name: 'siteCategory',
    initialState: {
        DrawerOpen: false,
        drawerWidth : 240
    },
    reducers: {
        DrawerChangeStatus: (state, action) => {
            console.log("state, action", state.DrawerOpen, action)
            state.DrawerOpen = !state.DrawerOpen;

        }

    },
});

export const {
    DrawerChangeStatus
} = slice.actions;
export default slice.reducer;
