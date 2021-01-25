import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getGames} from "../../services/gamesLoader";

export const fetchGamesList = createAsyncThunk('games/loadGames', async () => {
    const response = await getGames();
    return response
});

export const gamesListSlice = createSlice({
    name: 'gamesList',
    initialState: {
        games: [],
        categories: [],
        activeGames: [],
        status: 'idle'
    },
    reducers: {
        filterGames: (state, action) => {
            state = action.payload;
        }
    },
    extraReducers: {
        [fetchGamesList.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchGamesList.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.games = action.payload.games;
            state.categories = action.payload.categories;
            let activeCategories = action.payload.categories.find(category => category.nameKey === "All games");
            state.activeGames = activeCategories.games;
        },
        [fetchGamesList.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message
        }
    }
});

export const {loadGames} = gamesListSlice.actions;

export const selectGames = state => state.gamesList.games;

// For every activeGame combining Game object with 'top' property
export const selectActiveGames = state => state.gamesList.activeGames
    .map(({id, top}) => ({...state.gamesList.games.find(game => game.id === id), top}));

export const selectStatus = state => state.gamesList.status;


export default gamesListSlice.reducer;
