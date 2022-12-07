import React, { useReducer} from 'react';
import Board from './Board';
import {calculateWinner} from "../../helpers";

const initialState = {
    board : Array(9).fill(null),
    xIsNext: true
}

// immutable
const gameReducer = (state, action) =>{
    switch (action.type) {
        case 'CLICK':{
            const {board, xIsNext} = state;
            const {index, winner} = action.payload;
            if(winner || board[index]) return state;
            const nextState = JSON.parse(JSON.stringify(state));
            nextState.board[index] = xIsNext ? "X" : "O";
            nextState.xIsNext = !xIsNext;
            return nextState;
        }

        case 'RESET':{
            const nextState = JSON.parse(JSON.stringify(state));
            nextState.board =  Array(9).fill(null);
            nextState.xIsNext = true;
            return nextState;
        }
        default:
            console.log('error');
            break;
    }
    return state;
}


const Game = () => {
    // const [board, setBoard] = useState(Array(9).fill(null));
    // const [isXNext, setisXNext] = useState(true);
    const[state, dispatch] = useReducer(gameReducer, initialState);
    const winner = calculateWinner(state.board);

    const handleClick = (index)=>{
        // const copyBoard = [...state.board];
        // if(winner || copyBoard[index]) return;
        dispatch({
            type: 'CLICK',
            payload:{
                index,
                winner
            }
        })
        // copyBoard[index] = isXNext? "X": "O";
        // setBoard(copyBoard);
        // setisXNext(!isXNext);
    }

    const handleReset = () =>{
        // setBoard(Array(9).fill(null));
        // setisXNext(true);
        dispatch({
            type: "RESET"
        })
    }

    return (
        <div>
            <Board cells={state.board} onClick={handleClick}></Board>
            {winner && <div className='game-winner'>
                {`Winner is ${winner}`}
            </div>}
            <div>
                <button onClick={handleReset} className="game-reset">Reset Game</button>
            </div>
        </div>
    );
};

export default Game;