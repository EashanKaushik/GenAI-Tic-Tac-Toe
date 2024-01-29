import { ImCross } from "react-icons/im";
import { PiCircleLight } from "react-icons/pi";
import { Players } from "../hooks/useLogic";
interface Props {
    winnderHistory: Players[]
}

function ScoreCard({winnderHistory}: Props) {

    const countInstance = (winnderHistory: Players[], instance: Players): number => {

        let count = 0;

        winnderHistory.forEach(str => {
        if (str === instance) {
            count++;
        }
        });

        return count
    }
        
  return (
    <div>
        <button type="button" className="btn btn-light">
            <ImCross size={30} /> <span className="badge bg-success">{countInstance(winnderHistory, 'cross')}</span>
        </button>
        <button type="button" className="btn btn-light">
            <PiCircleLight size={30}/> <span className="badge bg-success">{countInstance(winnderHistory, 'circle')}</span>
        </button>
    </div>
  )
}

export default ScoreCard