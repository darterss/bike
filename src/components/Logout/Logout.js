import { connect } from "react-redux";
import { setAuthorized } from "../../redux/actions";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import auth from "../../services/auth";

const Div = styled.div`
      width: 30%;
      display: flex;
      flex-direction: column;
      align-items: center;
    `

function Logout (props) {
    const navigate = useNavigate()

    function handleClick () {
        props.setAuthorized(false);
        auth.logout()
        navigate('/')
    }

    return(
        <Div>
            <p>{auth.getUserName()}</p>
            <button onClick={handleClick}>Выйти</button>
        </Div>
    )
}

const mapDispatchToProps = {
    setAuthorized
}

export default connect(null, mapDispatchToProps)(Logout)