import React from "react";
import { useState } from "react";
import GameCircle from "./GameCircle";
import '../Game.css';


const NO_CIRCLE = 16;
const NO_PLAYER = 0;
const PLAYER_1 = 1;
const PLAYER_2 = 2;
const GameBoard = () => {
    const [gameBoard, setgameBoard] = useState(Array(16).fill(NO_PLAYER));
    const [currentPlayer, setcurrentPlayer] = useState(PLAYER_1);

    console.log(gameBoard);

    const initBoard = () =>{
        const circles = [];
        for (let i = 0; i<NO_CIRCLE; i++){
            circles.push(renderCircle(i));
        }
        return circles;
    }
    const circleClicked = (id)=> {
        // debugger;
        console.log('circle clicked:' + id);
        // const board = [...gameBoard];
        // board[id] = currentPlayer;
        // setgameBoard(board);
        setgameBoard(prev => {
            return prev.map((circle, pos) =>{
                if (pos === id) return currentPlayer;
                return circle;
            })
        })
        setcurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);

        console.log(gameBoard);
        console.log(currentPlayer);
    }
    const renderCircle = id => {
        return <GameCircle key={id}  id={id} className={`player_${gameBoard[id]}`} onCircleClicked= {circleClicked} />
    }
    return (
    <div className="gameBoard">
        {initBoard()}

     
    </div>)
}

export default GameBoard;