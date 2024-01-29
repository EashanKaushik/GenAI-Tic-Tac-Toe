import { useState } from "react";



import { produce } from "immer";

export type Players = 'cross' | 'circle'
export type Turn = 'blank'| 'winner' | Players;

const useLogic = () => {    
    
    const [isBedRockTurn, setIsBedRockTurn] = useState(true);
    const playerMatch = {
        "cross": isBedRockTurn ? "Bedrock" : "Human",
        "circle": isBedRockTurn ? "Human" : "Bedrock"
    };
    const whoIsCross = playerMatch["cross"];
    // const [whoIsCross, setWhoIsCross] = useState(playerMatch["cross"])
    const [winner, setWinner] = useState(false);
    const [squares, setSquares] = useState<Turn[]>(Array(9).fill('blank'));
    const [turn, setTurn] = useState<Turn>('cross');
    const [history, setHitory] = useState<[Turn, number][]>([]);
    const [arrow, setArrow] = useState<boolean[]>([]);
    const [winnderHistory, setWinnerHistory] = useState<Players[]>([]);


    const checkWinner = (squares: Turn[]): boolean => {

        const wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2],
        ]
        var winnerFound = false;

        wins.forEach(win => {
        const [a,b,c] = win;

        if(squares[a] !== 'blank'){
            if(squares[a] === squares[b] && squares[c] === squares[b]){
            // console.log('found')
            winnerFound = true;
            }
        }
        })

        return winnerFound;
    }
    const onClickBoard = (index: number) => {

        const squaresCopy = [...squares]

        if(squares[index] !== 'blank' || winner) return

        if(turn === 'cross'){
        setTurn('circle');
        setSquares(produce((draft) => {
            draft[index] = 'cross'
        }));

        squaresCopy[index] = 'cross'
        }else {
        setTurn('cross');
        setSquares(produce((draft) => {
            draft[index] = 'circle'
        }));
        squaresCopy[index] = 'circle'
        }
        
        setHitory([...history, [turn, index]]);
        const winnerCopy = checkWinner(squaresCopy);
        if (winnerCopy && (turn === 'cross' || turn === 'circle'))
        setWinnerHistory([...winnderHistory, turn]);
        setWinner(winnerCopy);
        setArrow([...arrow, !winnerCopy]);
        setIsBedRockTurn(true);
        console.log("Human Played, Bedrock turn");


    }

    const onClickHistory = (turn: Turn, boardIndex: number) => {

        const undoMoves: number[] = [];
        var found = false;
        const newHistory: [Turn, number][]= []
        history.forEach(element => {

        const [turn, index] = element;


        if(index === boardIndex) found=true;

        if(found){
            undoMoves.push(index)
        }else{
            newHistory.push([turn, index])
        }
        
        });


        if(undoMoves.length !== 0){

        if(winner) setWinnerHistory(winnderHistory.slice(0, -1))

        if(playerMatch[turn as Players] === 'Bedrock'){
            console.log("Bedrock turn");
            setIsBedRockTurn(true);
        }else{
            setIsBedRockTurn(false);
            console.log("Human turn");

        }

        setWinner(false);

        setTurn(turn);

        let sliceWindow = -undoMoves.length;
        setArrow(arrow.slice(0, sliceWindow))

        const squaresCopy = [...squares];

        for(let i=0; i < undoMoves.length; i++){
            let index = undoMoves[i];
            squaresCopy[index] = 'blank'
        }

        setSquares(squaresCopy);
        setHitory(newHistory);
        }

    }

    const resetGame = () => {
        setWinner(false);
        setSquares(Array(9).fill('blank'));
        setTurn('cross');
        setHitory([]);
        setArrow([]);
        setWinnerHistory([]);

    }

    const nextGame = () => {
        setWinner(false);
        setSquares(Array(9).fill('blank'));
        setTurn('cross');
        setHitory([]);
        setArrow([]);
    }

    return {winner,
        squares,
        turn,
        history,
        arrow,
        setArrow,
        winnderHistory,
        onClickBoard,
        onClickHistory,
        resetGame,
        nextGame, 
        whoIsCross,
        isBedRockTurn,
        setIsBedRockTurn}
}

export default useLogic;