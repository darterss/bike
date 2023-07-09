import BackButton from "../BackButton";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import {signUp} from "../../API/apiRequests";
import {Form, Input, Label} from "../styled-components/styled-components";

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
            <Form onSubmit={handleSubmit}>
                <Label>
                    <Input name={'email'} type={'email'} required={true} autoFocus={true} />
                    e-mail  *
                </Label>
                <Label>
                    <Input name={'password'} type={'password'} required={true}
                           placeholder={'от 3 до 12 символов'}/>
                    Пароль  *
                </Label>
                <Label>
                    <Input name={'firstName'} className={'form_input'} type={'text'} />
                    Имя
                </Label>
                <Label>
                    <Input name={'lastName'} className={'form_input'} type={'text'}/>
                    Фамилия
                </Label>
                <Label>
                    <Input name={'clientId'} className={'form_input'} type={'text'}
                           defaultValue={'08b81fe0-6aa8-4033-ac59-83d011f1aa37'} disabled={true} />
                    ClientId
                </Label>
                <button type={'submit'}>Зарегистрироваться</button>
            </Form>
            <BackButton />
        </>
    )
}
const mapStateToProps = state => ({
    employees: state.posts.employees
})
export default connect(mapStateToProps)(Registration)