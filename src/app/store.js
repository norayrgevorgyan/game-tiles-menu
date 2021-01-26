import {configureStore} from '@reduxjs/toolkit';

import gamesListReducer from "../features/gamesList/gamesListSlice";

export default configureStore({
    reducer: {
        gamesList: gamesListReducer,
    },
});
