import "./Authorisation.css";
import {connect} from "react-redux";
import {setAuthorized} from "../../redux/actions";
import {Link} from "react-router-dom";

function Authorisation(props){
    function handleSubmit(e){
        e.preventDefault()
        props.setAuthorized(true)
    }
    return(
        <form className={'authorisation_form'} onSubmit={handleSubmit}>
            <input className={'authorisation_input'} placeholder={'имя пользователя'} type={"text"}/>
            <input className={'authorisation_input'} placeholder={'пароль'} type={"password"}/>
            <button type={'submit'}>Войти</button>
            <Link to={'registration'}>Регистрация</Link>
        </form>
    )
}
const mapDispatchToProps = {
    setAuthorized
}
export default connect(null, mapDispatchToProps)(Authorisation)