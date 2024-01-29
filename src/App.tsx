import Square from "./Components/Square"
import ScoreBoard from "./Components/ScoreBoard";
import ScoreCard from "./Components/ScoreCard";

import { ImCross } from "react-icons/im";
import { PiCircleLight } from "react-icons/pi";

import useLogic, { Turn } from "./Components/hooks/useLogic";
import create from "./Components/services/http-service";
import { useEffect } from "react";
import { CanceledError } from "axios";


function App() {


  const { winner,
    squares,
    turn,
    history,
    arrow,
    winnderHistory,
    onClickBoard,
    onClickHistory,
    resetGame,
    nextGame,
    whoIsCross,
    isBedRockTurn, 
    setIsBedRockTurn} = useLogic();

    useEffect(() => {

      function convertTo2DArray(arr: any[], columns: number) {
        const result = [];
      
        for (let i = 0; i < arr.length; i += columns) {
          result.push(arr.slice(i, i + columns));
        }
      
        return result;
      }
      if(isBedRockTurn){
        const httpService = create();

        const currentBoard = convertTo2DArray(squares, 3)

        const {request, cancel} = httpService.get(currentBoard)

        request
          .then((res) => {
            console.log(res);
            setIsBedRockTurn(false);
          })
          .catch((err) => {
            if (err instanceof CanceledError) return;
            console.log(err);
          }
        )


        return () => cancel();

      }      
      }, [isBedRockTurn]);
    
    console.log(isBedRockTurn)

  // if(isBedRockTurn){

  //   const httpService = create();

  //   console.log("Bedrock Played, Human turn");

  //   setIsBedRockTurn(false);
  // }

  const returnSymbol = (turn: Turn) => {
    if (winner && turn === 'cross') return <p>Winner <PiCircleLight /></p>
    if (winner && turn === 'circle') return <p>Winner <ImCross /></p>
    if (turn === 'cross') return <ImCross />
    if (turn === 'circle') return <PiCircleLight />
  };
  console.log(whoIsCross)

  return (
    <>
      <div className="d-flex m-5  justify-content-center">
        <h1>Tic-Tac-Toe</h1>
        <footer>Against Bedrock</footer>
      </div>

      <div className="game d-flex flex-column">
        <div className="score container ">
          <div className="d-flex flex-column">

            <div className="d-flex justify-content-center">
              <ScoreCard winnderHistory={winnderHistory} />
            </div>
            <div className="container resetButton">
              <ScoreBoard isBedRockTurn={isBedRockTurn} arrow={arrow} nextGame={nextGame} resetGame={resetGame} onClick={onClickHistory} history={history}></ScoreBoard>
            </div>
          </div>
        </div>
        <div className="board container border p-5">
        <div className="d-flex justify-content-center">
          <h3 className="text-muted"><ImCross/> Plays First</h3>
        </div>
          <div className="d-flex justify-content-center m-5">
            <button className="btn btn-outline-dark" btn-border-width='0' disabled>Current Turn:</button>
            <button className="btn btn-outline-dark" disabled>{returnSymbol(turn)}</button>
          </div>
          <div className="d-flex justify-content-center">
            <Square onClick={() => onClickBoard(0)} square={squares[0]} />
            <Square onClick={() => onClickBoard(1)} square={squares[1]} />
            <Square onClick={() => onClickBoard(2)} square={squares[2]} />
          </div>
          <div className="d-flex justify-content-center">
            <Square onClick={() => onClickBoard(3)} square={squares[3]} />
            <Square onClick={() => onClickBoard(4)} square={squares[4]} />
            <Square onClick={() => onClickBoard(5)} square={squares[5]} />
          </div>
          <div className="d-flex justify-content-center">
            <Square onClick={() => onClickBoard(6)} square={squares[6]} />
            <Square onClick={() => onClickBoard(7)} square={squares[7]} />
            <Square onClick={() => onClickBoard(8)} square={squares[8]} />
          </div>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <h3 className="text-muted">
            You are: <PiCircleLight/>
          </h3>
        </div>
      </div>
    </>
  )
}

export default App;