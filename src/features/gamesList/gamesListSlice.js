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
        filter: '',
        checkedCategoriesGameIds: [],
        status: 'idle'
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        checkCategories: (state, action) => {
        }
    },
    extraReducers: {
        [fetchGamesList.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchGamesList.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.categories = action.payload.categories;
            state.games = action.payload.categories.find(category => category.nameKey === "All games").games.map(({id, top}) => ({
                ...action.payload.games.find(game => game.id === id),
                top
            }));
            state.checkedCategoriesGameIds = state.games.map(({id}) => id);

        },
        [fetchGamesList.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message
        }
    }
});

export const {setFilter, checkCategories} = gamesListSlice.actions;

export const selectCategories = state => state.gamesList.categories.filter(cat => cat.nameKey !== "All games").map(({nameKey}) => nameKey);

// For every activeGame combining Game object with 'top' property
export const selectActiveGames = state => {
    const {games, filter, checkedCategoriesGameIds} = state.gamesList;
    return games.filter(({id, name}) => name.toLowerCase().includes(filter) && checkedCategoriesGameIds.includes(id))
};


export const selectStatus = state => state.gamesList.status;


export default gamesListSlice.reducer;
