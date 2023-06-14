import './Logout.css'
import { connect } from "react-redux";
import { setAuthorized } from "../../redux/actions";

function Logout (props) {  //props temp
    function handleClick () {
        props.setAuthorized(false);
    }
    return(
        <div className={'logout_wrapper'}>
            <p>Username</p>
            <button onClick={handleClick}>Выйти</button>
        </div>
    )
}
const mapDispatchToProps = {
    setAuthorized
}
export default connect(null, mapDispatchToProps)(Logout)