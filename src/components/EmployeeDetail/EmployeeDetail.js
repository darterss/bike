import BackButton from "../BackButton";
import {useNavigate, useParams} from "react-router-dom";
import {changeOfficerData, getOfficer} from "../../API/apiRequests";
import {useEffect, useState} from "react";
import {Button, Form, Input, InputCheckbox, Label} from "../styled-components/styled-components";
import {validatePassword} from "../../services/validators";

export default function EmployeeDetail(){
    const { id } = useParams()
    const [employee, setEmployee] = useState(null)

    useEffect(() => {
        getOfficer(id).then(setEmployee).catch(err => console.log(err))
        return () => setEmployee(null) // нужно ли это делать?
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

    if (!employee) return (
        <div>Загрузка...</div>
    )

    return(
        <>
            <h1>Информация о сотруднике</h1>
            <Form onSubmit={handleSubmit}>
                <Label>
                    <Input name={'email'} type={'email'}
                           defaultValue={employee.email} disabled={true}/>
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
                    <Input name={'firstName'} type={'text'} defaultValue={employee.firstName}/>
                    Имя
                </Label>
                <Label>
                    <Input name={'lastName'} type={'text'} defaultValue={employee.lastName}/>
                    Фамилия
                </Label>
                <Label>
                    <InputCheckbox name={'approved'} type={'checkbox'}
                           defaultChecked={employee.approved}/>
                    Одобрен
                </Label>
                <Button type={'submit'}>Внести изменения</Button>
            </Form>
            <BackButton/>
        </>
    )
}