import { connect } from "react-redux";
import { setAuthorized } from "../../redux/actions";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

function Logout (props) {
    const Div = styled.div`
      width: 30%;
      display: flex;
      flex-direction: column;
      align-items: center;
    `
    const navigate = useNavigate()
    const userName = localStorage.getItem('userName')
    function handleClick () {
        props.setAuthorized(false);
        localStorage.removeItem('Auth')
        navigate('/')
    }
    return(
        <Div>
            <p>{userName}</p>
            <button onClick={handleClick}>Выйти</button>
        </Div>
    )
}
const mapDispatchToProps = {
    setAuthorized
}
export default connect(null, mapDispatchToProps)(Logout)