import React, { Component } from 'react';
import './App.css';
import * as gameActions from './gameActions';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

export class App extends Component {
    constructor(props,context) {
        super(props,context);
        this.restartGame = this.restartGame.bind(this);
        this.tileClick = this.tileClick.bind(this);
    }
    componentWillMount(){
        this.props.actions.shuffleGame();
    }
   
    restartGame() {
        this.props.actions.shuffleGame();
    }
    tileClick(tileEl, position, status) {
        var tiles = this.props.tiles, move;
        // Possible moves
        // [up,right,down,left]
        // 9 = out of bounds
        var moves = [
            [null, 1, 3, null], [null, 2, 4, 0], [null, null, 5, 1],
            [0, 4, 6, null], [1, 5, 7, 3], [2, null, 8, 4],
            [3, 7, null, null], [4, 8, null, 6], [5, null, null, 7]
        ];

        function animateTiles(i, move) {
            var directions = ['up', 'right', 'down', 'left'];
            var moveToEl = document.querySelector('.tile:nth-child(' + (move + 1) + ')');
            var direction = directions[i];
            tileEl.classList.add('move-' + direction);
            // this is all a little hackish.
            // css/js are used together to create the illusion of moving blocks
            setTimeout(function () {
                moveToEl.classList.add('highlight');
                tileEl.classList.remove('move-' + direction);
                // time horribly linked with css transition
                setTimeout(function () {
                    moveToEl.classList.remove('highlight');
                }, 400);
            }, 200);
        }

        // called after tile is fully moved
        // sets new state
        function afterAnimate() {
            tiles[position] = '';
            tiles[move] = status;
            this.props.actions.moveTile(tiles);
        };

        // return if they've already won
        if (this.props.win) return;
        // check possible moves
        for (var i = 0; i < moves[position].length; i++) {
            move = moves[position][i];
            // if an adjacent tile is empty
            if (typeof move === 'number' && !tiles[move]) {
                animateTiles(i, move);
                setTimeout(afterAnimate.bind(this), 200);
                break;
            }
        }
    }
    render() {
        return (
            <div>
                <div id="game-board">
                    {this.props.tiles.map(function (tile, position) {
                        return (<Tile tileClass={tile ? 'tile' : 'tile no-tile'} status={tile} key={position} tileClick={(event) => this.tileClick(event.target, position, tile)} />);
                    }, this)}
                </div>
                <Menu
                    winClass={this.props.win ? 'button win' : 'button'}
                    status={this.props.win ? 'You won!' : 'A Sliding Puzzle.'}
                    restart={this.restartGame} />
            </div>
        );
    }
    
}
function mapStateToProps(state) {
  return { 
            tiles: state.tiles,
            win: state.win
         };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(gameActions, dispatch) };
}
function Tile(props) {
    return <div className={props.tileClass} onClick={props.tileClick}>{props.status}</div>;
}

function Menu(props) {
    return (
        <div id="menu">
            <h3 id="subtitle">{props.status}</h3>
            <a className={props.winClass} onClick={props.restart}>Restart</a>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);