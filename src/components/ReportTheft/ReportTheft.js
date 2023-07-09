import {connect} from "react-redux";
import BackButton from "../BackButton";
import {createCase, getAllOfficers} from "../../API/apiRequests";
import {useEffect} from "react";
import {setEmployees} from "../../redux/actions";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {validateName} from "../../functions";
function ReportTheft(props) {
    const Form = styled.form`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-left: 10%;
    `
    const Input = styled.input`
      margin: 1% 10px;
    `
    const Select = styled.select`
      margin: 1% 10px;
    `
    const Label = styled.label`
      display: flex;
      justify-content: space-around;
    `

    const navigate = useNavigate()
    useEffect(() => {
        if (props.authorized) getAllOfficers(props.setEmployees)
    }, [])
    function handleSubmit(e){
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
                    <Input name={'licenseNumber'} type={'number'} required={true} autoFocus={true} />
                    Номер лицензии *
                </Label>
                <Label>
                    <Input name={'ownerFullName'} type={'text'} required={true} />
                    ФИО клиента *
                </Label>
                <Label>
                    <Select name={'typeOfBike'} required={true}>
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
                <button type={'submit'}>Сообщить</button>
            </Form>
            <BackButton />
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