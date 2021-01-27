export default function getGames() {
   return  fetch('./gamesList.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then((resp) => resp.json());
}
