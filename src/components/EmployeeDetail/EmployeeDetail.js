import {connect} from "react-redux";
import BackButton from "../BackButton";
import {useNavigate, useParams} from "react-router-dom";
import {changeOfficerData, getOfficer} from "../../API/apiRequests";
import {setEmployee} from "../../redux/actions";
import {useEffect} from "react";
import {Form, Input, Label} from "../styled-components/styled-components";
import {validatePassword} from "../../services/validators";

function EmployeeDetail(props){
    const { id } = useParams()
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
        if (e.target.password.value !== '') {
            if (!validatePassword(e)) return
            user = {...user, password: e.target.password.value}
        }
        changeOfficerData(id, user, navigate)
    }

    if (!props.employee.email) return (
        <div>Загрузка...</div>
    )

    return(
        <>
            <h1>Информация о сотруднике</h1>
            <Form onSubmit={handleSubmit}>
                <Label>
                    <Input name={'email'} type={'email'}
                           defaultValue={props.employee.email} disabled={true}/>
                    e-mail
                </Label>
                <Label>
                    <Input name={'clientId'} type={'text'}
                           defaultValue={'08b81fe0-6aa8-4033-ac59-83d011f1aa37'} disabled={true} />
                    ClientId
                </Label>
                <Label>
                    <Input name={'password'} type={'password'}
                           placeholder={'от 3 до 12 символов'}/>
                    Пароль (введите для изменения)
                </Label>
                <Label>
                    <Input name={'firstName'} type={'text'} defaultValue={props.employee.firstName}/>
                    Имя
                </Label>
                <Label>
                    <Input name={'lastName'} type={'text'} defaultValue={props.employee.lastName}/>
                    Фамилия
                </Label>
                <Label>
                    <Input name={'approved'} type={'checkbox'}
                           defaultChecked={props.employee.approved}/>
                    Одобрен
                </Label>
                <button type={'submit'}>Внести изменения</button>
            </Form>
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