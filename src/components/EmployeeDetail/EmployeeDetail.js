import {connect} from "react-redux";
import BackButton from "../BackButton";
import {useNavigate, useParams} from "react-router-dom";
import {changeOfficerData, getOfficer} from "../../API/apiRequests";
import {setEmployee} from "../../redux/actions";
import {useEffect} from "react";

function EmployeeDetail(props){
    const { id } = useParams()
    //const employee = getItemFromState(props.employees, id, 'employee')
    useEffect(() => {
        getOfficer(id, props.setEmployee)
        return () => props.setEmployee({})
    }, []
    )
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
        !!props.employee.email &&
        <>
            <h1>Информация о сотруднике</h1>
            <form className={'form'} onSubmit={handleSubmit}>
                <label>
                    <input name={'email'} className={'form_input'} type={'email'}
                           defaultValue={props.employee.email} disabled={true}/>
                    e-mail
                </label>
                <label>
                    <input name={'clientId'} className={'form_input'} type={'text'}
                           defaultValue={'08b81fe0-6aa8-4033-ac59-83d011f1aa37'} disabled={true} />
                    ClientId
                </label>
                <label>
                    <input name={'password'} className={'form_input'} type={'password'}
                           placeholder={'от 3 до 12 символов'}/>
                    Пароль (введите для изменения)
                </label>
                <label>
                    <input name={'firstName'} className={'form_input'} type={'text'} defaultValue={props.employee.firstName}/>
                    Имя
                </label>
                <label>
                    <input name={'lastName'} className={'form_input'} type={'text'} defaultValue={props.employee.lastName}/>
                    Фамилия
                </label>
                <label>
                    <input name={'approved'} className={'form_input'} type={'checkbox'}
                           defaultChecked={props.employee.approved}/>
                    Одобрен
                </label>
                <button type={'submit'}>Внести изменения</button>
            </form>
            <BackButton/>
        </>
    )
}

const mapStateToProps = state => ({
    employee: state.posts.employee
})
const mapDispatchToProps = {
    setEmployee
}
export default connect (mapStateToProps, mapDispatchToProps)(EmployeeDetail)