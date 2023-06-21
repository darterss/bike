import "./Authorisation.css";
import {connect} from "react-redux";
import {setAuthorized} from "../../redux/actions";
import {Link} from "react-router-dom";
import {signIn} from "../../API/apiRequests";

function Authorisation(props){
    function handleSubmit(e) {
        e.preventDefault()
        const user = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        signIn(props.setAuthorized, user)
    }

    return(
        <form className={'authorisation_form'} onSubmit={handleSubmit}>
            <input name={'email'} className={'authorisation_input'} placeholder={'имя пользователя'} type={"text"}/>
            <input name={'password'} className={'authorisation_input'} placeholder={'пароль'} type={"password"}/>
            <button type={'submit'}>Войти</button>
            <Link to={'/registration'}>Регистрация</Link>
        </form>
    )
}
const mapDispatchToProps = {
    setAuthorized
}
export default connect(null, mapDispatchToProps)(Authorisation)