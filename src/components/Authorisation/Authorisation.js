import {connect} from "react-redux";
import {setAuthorized} from "../../redux/actions";
import {Link} from "react-router-dom";
import {signIn} from "../../API/apiRequests";
import styled from "styled-components";
const Form = styled.form`
      width: 30%;
      display: flex;
      flex-direction: column;
      align-items: center;
    `
const Input = styled.input`
      margin: 1% 0;
    `
function Authorisation(props){
    function handleSubmit(e) {
        e.preventDefault()
        const user = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        signIn(props.setAuthorized, user)
        localStorage.setItem('userName', user.email)
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Input name={'email'} placeholder={'имя пользователя'} type={"text"}
                   required={true}/>
            <Input name={'password'} placeholder={'пароль'} type={"password"}
                   required={true}/>
            <button type={'submit'}>Войти</button>
            <Link to={'/registration'}>Регистрация</Link>
        </Form>
    )
}
const mapDispatchToProps = {
    setAuthorized
}
export default connect(null, mapDispatchToProps)(Authorisation)