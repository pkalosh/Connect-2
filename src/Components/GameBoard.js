import React, { useEffect } from "react";
import { useState } from "react";
import GameCircle from "./GameCircle";
import '../Game.css';
import Header from "./Header";
import Footer from "./Footer";
import { isDraw, isWinner, getComputerMove} from "./helper";
import { GAME_STATE_DRAW } from "./Constants";
import { GAME_STATE_IDLE } from "./Constants";
import { GAME_STATE_PLAYING } from "./Constants";
import { GAME_STATE_WIN } from "./Constants";
import { NO_CIRCLE } from "./Constants";
import { NO_PLAYER } from "./Constants";
import { PLAYER_1 } from "./Constants";
import { PLAYER_2 } from "./Constants";


const GameBoard = () => {
    const [gameBoard, setgameBoard] = useState(Array(16).fill(NO_PLAYER));
    const [currentPlayer, setcurrentPlayer] = useState(PLAYER_1);
    const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
    const [winPlayer, setWinPlayer] = useState();

    console.log(gameBoard);

    useEffect(() =>{
        initGame();
    },[])

    const initGame = () => {
        console.log("Init Game")
        setgameBoard(Array(16).fill(NO_PLAYER));
        setcurrentPlayer(PLAYER_1);
        setGameState(GAME_STATE_PLAYING)
    }

    const initBoard = () =>{
        const circles = [];
        for (let i = 0; i<NO_CIRCLE; i++){
            circles.push(renderCircle(i));
        }
        return circles;
    }

    const suggestMove = () => {
        circleClicked(getComputerMove(gameBoard));
    }

    const circleClicked = (id)=> {
        // debugger;
        console.log('circle clicked:' + id);
        if (gameBoard[id] !== NO_PLAYER) return;
        if (gameState !== GAME_STATE_PLAYING) return;
        
        if (isWinner(gameBoard, id, currentPlayer)) {
            // console.log("WINNER");
            setGameState(GAME_STATE_WIN)
            setWinPlayer(currentPlayer)
        }

        if (isDraw(gameBoard, id, currentPlayer)) {
            // console.log("WINNER");
            setGameState(GAME_STATE_DRAW)
            setWinPlayer(NO_PLAYER)
        }     
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
        <>
            <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer}/>
            <div className="gameBoard">
                {initBoard()}

            
            </div>
            <Footer onSuggestClick={suggestMove} onNewGameClick={initGame}/>
        </>

    )
}

export default GameBoard;