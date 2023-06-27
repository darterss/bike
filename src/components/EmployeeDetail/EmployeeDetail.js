import {setEmployees} from "../../redux/actions";
import {connect} from "react-redux";
import BackButton from "../BackButton";
import {useNavigate, useParams} from "react-router-dom";
import {changeOfficerData} from "../../API/apiRequests";

function EmployeeDetail(props){
    const {id} = useParams()
    const indexOfEmployee = props.employees.findIndex((item) => item._id === id) // поиск индекса работника в state
    const employee = props.employees[indexOfEmployee]
    const navigate = useNavigate()

    function handleSubmit (e) {
        e.preventDefault()
        let user = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            approved: e.target.approved.checked
        }
        if (e.target.password.value !== '')  user = {...user, password: e.target.password.value}
        changeOfficerData(id, user, navigate)
    }
    return(
        <>
            <form className={'form'} onSubmit={handleSubmit}>
                <label>
                    <input name={'email'} className={'form_input'} type={'email'}
                           defaultValue={employee.email} disabled={true}/>
                    e-mail
                </label>
                <label>
                    <input name={'password'} className={'form_input'} type={'password'}
                           placeholder={'от 3 до 12 символов'}/>
                    Пароль (введите для изменения)
                </label>
                <label>
                    <input name={'firstName'} className={'form_input'} type={'text'} defaultValue={employee.firstName}/>
                    Имя
                </label>
                <label>
                    <input name={'lastName'} className={'form_input'} type={'text'} defaultValue={employee.lastName}/>
                    Фамилия
                </label>
                <label>
                    <input name={'approved'} className={'form_input'} type={'checkbox'}
                           defaultChecked={employee.approved}/>
                    Одобрен
                </label>
                <button type={'submit'}>Внести изменения</button>
            </form>
            <BackButton/></>
    )
}

const mapStateToProps = state => ({
    employees: state.posts.employees
})
const mapDispatchToProps = {
    setEmployees
}
export default connect (mapStateToProps, mapDispatchToProps)(EmployeeDetail)