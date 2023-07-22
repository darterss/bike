import logo from "../../assets/logo.svg";
import {Link} from "react-router-dom";
import Authorisation from "../Authorisation/Authorisation";
import Logout from "../Logout/Logout";
import {connect} from "react-redux";

function Header (props) {
    return (
        <header className={'header'}>
            <img alt={'logo'} src={logo} className={'logo'}/>
            <Link to={'/'}><span>Главная</span></Link>
            {props.authorized && <Link to={'/list_of_thefts'}><span>Сообщения о кражах</span></Link>}
            {props.authorized && <Link to="report_theft"><span>Сообщить о краже</span></Link>}
            {props.authorized && <Link to={'/responsible_staff'}><span>Ответственные сотрудники</span></Link>}
            {!props.authorized && <Authorisation/>}
            {props.authorized && <Logout/>}
        </header>
    )
}
function mapStateToProps(state) {
    return {
        authorized: state.app.authorized
    }
}

export default connect(mapStateToProps)(Header)