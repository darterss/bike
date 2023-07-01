import './Logout.css'
import { connect } from "react-redux";
import { setAuthorized } from "../../redux/actions";
import {useNavigate} from "react-router-dom";

function Logout (props) {
    const navigate = useNavigate()
    const userName = localStorage.getItem('userName')
    function handleClick () {
        props.setAuthorized(false);
        localStorage.removeItem('Auth')
        navigate('/')
    }
    return(
        <div className={'logout_wrapper'}>
            <p>{userName}</p>
            <button onClick={handleClick}>Выйти</button>
        </div>
    )
}
const mapDispatchToProps = {
    setAuthorized
}
export default connect(null, mapDispatchToProps)(Logout)