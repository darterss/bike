import {useNavigate} from "react-router-dom";

export default function BackButton() {
const location = useNavigate()
return(
    <button onClick={() => location(-1)}>Вернуться</button>
)
}