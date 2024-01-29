import { Button } from 'react-bootstrap';
import { FaArrowRight } from "react-icons/fa";
import { Turn } from '../hooks/useLogic';

interface Props {
  history: [Turn, number][];
  onClick: (turn: Turn, boardIndex: number) => void;
  resetGame: () => void;
  nextGame: () => void;
  arrow: boolean[],
  isBedRockTurn: boolean
}

function ScoreBoard({ history, onClick, resetGame, nextGame, arrow, isBedRockTurn}: Props) {
  return (
    <>
    <div className="d-flex m-2 justify-content-end">
      <Button variant="success mx-2" onClick={() => nextGame()}>Next Game</Button>
      <Button variant="danger" onClick={() => resetGame()}>Reset</Button>
    </div>
    <div className="d-flex m-2 flex-row ">
      {history.map((value, index) => {
        const [turn, boardIndex] = value;
        // return <div key={index}>{turn}: {boardIndex}</div>;
        return (
        <>
          <div key={index}>
              <Button onClick={() => onClick(turn, boardIndex)} variant='outline-warning' value={boardIndex}>{isBedRockTurn ? "Bedrock" : "Human"}: {turn}</Button>
              {arrow[index] && <FaArrowRight size={50} color='orange'/>}
          </div>
        </>
        )

      })}
    </div>

    </>
  );
}

export default ScoreBoard;
