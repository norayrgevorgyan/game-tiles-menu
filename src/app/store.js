import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import gamesListReducer from "../features/gamesList/gamesListSlice";

export default configureStore({
    reducer: {
        counter: counterReducer,
        gamesList: gamesListReducer,
    },
});
