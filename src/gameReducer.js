const MOVE_TILE = 'MOVE_TILE';
const SHUFFLE_GAME = 'SHUFFLE_GAME';
const initialState = {
            // initial state of game board
            tiles: [
                1, 2, 3,
                4, 5, 6,
                7, 8, ''
            ],
            win: false
        };
export default function gameReducer(state=initialState,action){
  switch(action.type){
    case SHUFFLE_GAME:
        const tiles=shuffle([].concat(state.tiles));
        return Object.assign({},state,{tiles,win:false});
    case MOVE_TILE:
        const win=checkBoard(action.tiles);
        const newState = Object.assign({},state,{tiles:[].concat(action.tiles)});
        if(win){
            return Object.assign({},state,{win});
        }
      return newState;
    default:
      return state;
  }
}

function checkBoard(tiles) {
        for (var i = 0; i < tiles.length - 1; i++) {
            if (tiles[i] !== i + 1) return false;
        }

        return true;
    }
function shuffle(array) {

        // switches first two tiles
        function switchTiles(array) {
            var i = 0;

            // find the first two tiles in a row
            while (!array[i] || !array[i + 1]) i++;

            // store tile value
            var tile = array[i];
            // switche values
            array[i] = array[i + 1];
            array[i + 1] = tile;

            return array;
        }
        // counts inversions
        function countInversions(array) {
            // make array of inversions
            var invArray = array.map(function (num, i) {
                var inversions = 0;
                for (var j = i + 1; j < array.length; j++) {
                    if (array[j] && array[j] < num) {
                        inversions += 1;
                    }
                }
                return inversions;
            });
            // return sum of inversions array
            return invArray.reduce(function (a, b) {
                return a + b;
            });
        }

        // fischer-yates shuffle algorithm
        function fischerYates(array) {
            var counter = array.length, temp, index;

            // While there are elements in the array
            while (counter > 0) {
                // Pick a random index
                index = Math.floor(Math.random() * counter);
                // Decrease counter by 1
                counter--;
                // And swap the last element with it
                temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }

            return array;
        }

        // Fischer-Yates shuffle
        array = fischerYates(array);

        // check for even number of inversions
        if (countInversions(array) % 2 !== 0) {
            // switch two tiles if odd
            array = switchTiles(array);
        }

        return array;
    }