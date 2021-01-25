const data = require('../data/gamesList');


export function getGames() {
    return new Promise((res) => {
        setTimeout(() => res(data), 300)
    })
}