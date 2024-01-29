import { ImCross } from "react-icons/im";
import { PiCircleLight } from "react-icons/pi";
import { RiCheckboxBlankFill } from "react-icons/ri";
import { Turn } from "../hooks/useLogic";


interface Props {
    onClick: () => void;
    square: Turn;
}
function Square({onClick, square}: Props) {


    if (square === 'circle')
        return <button className="btn btn-dark"><PiCircleLight size={100} onClick={() => {onClick();}}/></button>
        
    if (square === 'cross')        
        return <button className="btn btn-dark"><ImCross size={100} onClick={() => {onClick();}}/></button>

    return <button className="btn btn-dark"><RiCheckboxBlankFill size={100} onClick={() => {onClick();}} color="white"/></button>
}

export default Square