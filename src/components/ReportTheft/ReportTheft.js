import {connect} from "react-redux";
import BackButton from "../BackButton";
import {createCase, getAllOfficers} from "../../API/apiRequests";
import {useEffect} from "react";
import {setEmployees} from "../../redux/actions";
import {useNavigate} from "react-router-dom";
import {validateName} from "../../services/validators";
import {Button, Form, Input, Label, Select} from "../styled-components/styled-components";

function ReportTheft(props) {
    const navigate = useNavigate()

    useEffect(() => {
        if (props.authorized) getAllOfficers().then(props.setEmployees)
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        if (!validateName(e)) return
        const employee = props.authorized && props.employees.find(emp => (emp.email === e.target.officer.value)) // объект работника из state
        const theft = {
            'ownerFullName': e.target.ownerFullName.value,
            'licenseNumber': e.target.licenseNumber.value,
            'type': e.target.typeOfBike.value,
            'color': e.target.colorOfBike.value,
            'date': e.target.dateOfTheft.value,
            'description': e.target.description.value,
            'officer': employee._id,
            clientId: '08b81fe0-6aa8-4033-ac59-83d011f1aa37'
        }
        createCase(theft, navigate)
    }

    return (
        <>
            <h1>Сообщение о краже</h1>
            <Form onSubmit={handleSubmit}>
                <Label>
                    <Input name={'licenseNumber'} type={'number'} required autoFocus={true}/>
                    Номер лицензии *
                </Label>
                <Label>
                    <Input name={'ownerFullName'} type={'text'} required
                           title={"Только русские или латинские слова с пробелами, не менее 3 символов"}
                           pattern={"^[A-Za-zА-Яа-яЁё\\s]{3,}"}/>
                    ФИО клиента *
                </Label>
                <Label>
                    <Select name={'typeOfBike'} required>
                        <option>general</option>
                        <option>sport</option>
                    </Select>
                    Тип велосипеда *
                </Label>
                <Label>
                    <Input name={'colorOfBike'} type={'text'}/>
                    Цвет велосипеда
                </Label>
                <Label>
                    <Input name={'dateOfTheft'} type={'date'}/>
                    Дата кражи
                </Label>
                <Label>
                    <Input name={'description'} type={'text'}/>
                    Дополнительная информация
                </Label>
                {props.authorized &&
                    <Label>
                        <Select name={'officer'}>
                            {props.employees.map(emp => {
                                if (emp.approved) return (
                                    <option key={emp._id}>{emp.email}</option>
                                )
                            })}
                        </Select>
                        Ответственный сотрудник
                    </Label>
                }
                <Button type={'submit'}>Сообщить</Button>
            </Form>
            <BackButton/>
        </>
    )
}

const mapStateToProps = state => ({
    authorized: state.app.authorized,
    employees: state.posts.employees
})

const mapDispatchToProps = {
    setEmployees
}

export default connect (mapStateToProps, mapDispatchToProps)(ReportTheft)