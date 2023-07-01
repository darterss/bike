import BackButton from "../BackButton";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import {signUp} from "../../API/apiRequests";

function Registration(props) {
    const navigate = useNavigate()
    function handleSubmit (e) {
        e.preventDefault()
        let sameEmail = false;
        props.employees.forEach(emp => {
            if (emp.email.toLowerCase() === e.target.email.value.toLowerCase()) sameEmail = true // валидация на повторение поля email
        })
        const newEmployee = {
            email: e.target.email.value,
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            password: e.target.password.value,
            clientId: '08b81fe0-6aa8-4033-ac59-83d011f1aa37'
        }
        if (!sameEmail) signUp(newEmployee, navigate)
        else alert('Пользователь с таким email уже существует')
    }
    return (
        <>
            <h1>Регистрация</h1>
            <form className={'form'} onSubmit={handleSubmit}>
                <label>
                    <input name={'email'} className={'form_input'} type={'email'} required={true} autoFocus={true} />
                    e-mail  *
                </label>
                <label>
                    <input name={'password'} className={'form_input'} type={'password'} required={true}
                           placeholder={'от 3 до 12 символов'}/>
                    Пароль  *
                </label>
                <label>
                    <input name={'firstName'} className={'form_input'} type={'text'} />
                    Имя
                </label>
                <label>
                    <input name={'lastName'} className={'form_input'} type={'text'}/>
                    Фамилия
                </label>
                <label>
                    <input name={'clientId'} className={'form_input'} type={'text'}
                           defaultValue={'08b81fe0-6aa8-4033-ac59-83d011f1aa37'} disabled={true} />
                    ClientId
                </label>
                <button type={'submit'}>Зарегистрироваться</button>
            </form>
            <BackButton />
        </>
    )
}
const mapStateToProps = state => ({
    employees: state.posts.employees
})
export default connect(mapStateToProps)(Registration)