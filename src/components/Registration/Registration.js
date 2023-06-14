import {generateID} from "../../utils/generateID";
import BackButton from "../BackButton";
import {connect} from "react-redux";
import {addEmployee} from "../../redux/actions";
import {useNavigate} from "react-router-dom";

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
            clientId: !props.employees.length ? '08b81fe0-6aa8-4033-ac59-83d011f1aa37' : e.target.clientId.value,
            approved: true //!props.employees.length
        }
        if (!sameEmail) {
            props.addEmployee(newEmployee)
            navigate(-1)
        }
    }
    return (
        <>
            <h1>Регистрация</h1>
            <form className={'form'} onSubmit={handleSubmit}>
                <label>
                    <input name={'email'} className={'form_input'} type={'email'} required={true} autoFocus={true} />
                    E-mail  *
                </label>
                <label>
                    <input name={'password'} className={'form_input'} type={'password'} required={true} />
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
                           defaultValue={generateID()} disabled={true}/>
                    Client ID
                </label>
                <button type={'submit'}>Зарегистрироваться</button>
            </form>
            <BackButton />
        </>
    )
}
const mapDispatchToProps = {
    addEmployee
}
const mapStateToProps = state => ({
    employees: state.posts.employees
})
export default connect(mapStateToProps, mapDispatchToProps)(Registration)