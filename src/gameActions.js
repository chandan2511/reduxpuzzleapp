export function moveTile(tiles) {
  return {type: 'MOVE_TILE',tiles};
}
export function shuffleGame() {
  return {type: 'SHUFFLE_GAME'};
}