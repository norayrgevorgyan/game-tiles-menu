import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getGames} from "../../services/gamesLoader";
import {STATUS_FAILED, STATUS_IDLE, STATUS_LOADING, STATUS_SUCCEEDED} from "../../app/consts";

export const fetchGamesList = createAsyncThunk('games/loadGames', async () => {
    return await getGames();
});

export const gamesListSlice = createSlice({
    name: 'gamesList',
    initialState: {
        games: [],
        categories: [],
        filter: '',
        checkedCategoriesGameIds: [],
        status: STATUS_IDLE
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        checkCategories: (state, action) => {
            let newGameIds = [];
            action.payload.forEach(categoryName => {
                newGameIds = [...newGameIds,
                    ...state.categories.find(({nameKey}) => nameKey === categoryName).games.map(({id}) => id)]
            });
            state.checkedCategoriesGameIds = newGameIds;
        },
        changeFavouriteStatus: (state, action) => {
            const idGameToModify = state.games.findIndex(({id}) => id === action.payload);
            if (idGameToModify > -1)
                state.games[idGameToModify].favourite = !state.games[idGameToModify].favourite;
        }
    },
    extraReducers: {
        [fetchGamesList.pending]: (state, action) => {
            state.status = STATUS_LOADING
        },
        [fetchGamesList.fulfilled]: (state, action) => {
            state.status = STATUS_SUCCEEDED;
            state.categories = action.payload.categories;
            state.games = action.payload.categories.find(category => category.nameKey === "All games").games.map(({id, top}) => ({
                ...action.payload.games.find(game => game.id === id),
                top
            }));
            state.checkedCategoriesGameIds = state.games.map(({id}) => id);

        },
        [fetchGamesList.rejected]: (state, action) => {
            state.status = STATUS_FAILED;
            state.error = action.error.message
        }
    }
});

export const {setFilter, checkCategories, changeFavouriteStatus} = gamesListSlice.actions;

export const selectCategories = state => state.gamesList.categories.filter(cat => cat.nameKey !== "All games").map(({nameKey}) => nameKey);

// For every activeGame combining Game object with 'top' property
export const selectActiveGames = state => {
    const {games, filter, checkedCategoriesGameIds} = state.gamesList;
    return games.filter(({id, name}) => name.toLowerCase().includes(filter) && checkedCategoriesGameIds.includes(id))
};

export const selectFavouritesCount = state => state.gamesList.games.filter(({favourite}) => favourite).length;

export const selectStatus = state => state.gamesList.status;


export default gamesListSlice.reducer;
