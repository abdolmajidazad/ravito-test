import {configureStore} from '@reduxjs/toolkit';
import reducer from './Reducer'
import api from "../Action/api";
export const store =
    configureStore({
        reducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(api),
    });
