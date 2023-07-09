import {setEmployees} from "../../redux/actions";
import {connect} from "react-redux";
import BackButton from "../BackButton";
import {useNavigate, useParams} from "react-router-dom";
import {changeCaseData, getAllOfficers, getCase} from "../../API/apiRequests";
import {useEffect, useRef, useState} from "react";
import {validateName} from "../../functions";
import {Form, Input, Label, Select} from "../styled-components/styled-components";

function TheftDetail(props){
    const { id } = useParams()
    const [specCase, setSpecCase] = useState(null)
    const navigate = useNavigate()
    const ref = useRef()
    const [disable, setDisable] = useState(null)

    useEffect(() => {
        getCase(id).then(setSpecCase)
        getAllOfficers().then(props.setEmployees)
    }, [id])

    if (!specCase) return (
        <div>Загрузка...</div>
    )

    if (specCase  && disable === null) setDisable(specCase.status !== 'done')

    function handleChange(e) {
        if (e.target.value !== 'done') ref.current.value = ''
        setDisable(e.target.value !== 'done');
    }
    function handleSubmit(e) {
        e.preventDefault()
        if (!validateName(e)) return
        const employee = props.employees.find(emp => (emp._id === e.target.officer.value)) // объект работника из redux state
        let editedCase = {
            status: e.target.status.value,
            licenseNumber: e.target.licenseNumber.value,
            type: e.target.typeOfBike.value,
            ownerFullName: e.target.ownerFullName.value,
            color: e.target.colorOfBike.value,
            date: e.target.dateOfTheft.value,
            officer: employee._id,
            description: e.target.description.value,
            resolution: (e.target.status.value === 'done') ? e.target.resolution.value : ' '
        }
        changeCaseData(id, editedCase, navigate)
    }
    return(
        <>
            <h1>Информация по краже</h1>
            <Form onSubmit={handleSubmit}>
                <Label>
                    <Select name={'status'} required={true}
                           defaultValue={specCase.status} onChange={handleChange}>
                        <option value={'new'}>new</option>
                        <option value={'in_progress'}>in progress</option>
                        <option value={'done'}>done</option>
                    </Select>
                    Статус *
                </Label>
                <Label>
                    <Input name={'licenseNumber'} type={'number'} required={true}
                           defaultValue={specCase.licenseNumber}/>
                    Номер лицензии *
                </Label>
                <Label>
                    <Select name={'typeOfBike'} required={true}
                            defaultValue={specCase.type}>
                        <option>general</option>
                        <option>sport</option>
                    </Select>
                    Тип велосипеда *
                </Label>
                <Label>
                    <Input name={'ownerFullName'} type={'text'} required={true}
                           defaultValue={specCase.ownerFullName} />
                    ФИО клиента *
                </Label>
                <Label>
                    <Input name={'clientId'} type={'text'}
                           defaultValue={specCase.clientId}
                    disabled={true} />
                    ClientId
                </Label>
                <Label>
                    <Input name={'createdAt'} type={'text'}
                           defaultValue={specCase.createdAt.substring(0,10)} disabled={true} />
                    Дата создания сообщения
                </Label>
                <Label>
                    <Input name={'updatedAt'} type={'text'}
                           defaultValue={specCase.updatedAt ? specCase.updatedAt.substring(0,10) : null}
                           disabled={true} />
                    Дата обновления сообщения
                </Label>
                <Label>
                    <Input name={'colorOfBike'} type={'text'}
                           defaultValue={specCase.color}/>
                    Цвет велосипеда
                </Label>
                <Label>
                    <Input name={'dateOfTheft'} type={'date'}
                           defaultValue={specCase.date ? specCase.date.substring(0,10) : null}/>
                    Дата кражи
                </Label>
                <Label>
                    <Input name={'description'} type={'text'}
                           defaultValue={specCase.description} />
                    Дополнительный комментарий
                </Label>
                <Label>
                    <Select name={'officer'} defaultValue={specCase.officer}>
                        {props.employees.map(emp => {
                            if (emp.approved) return (
                                <option value={emp._id} key={emp._id}>{emp.email}</option>
                            )
                        })}
                    </Select>
                    Ответственный сотрудник
                </Label>
                <Label>
                    <Input name={'resolution'} type={'text'}
                           defaultValue={specCase.resolution} disabled={disable} required={!disable} ref={ref}/>
                    Завершающий комментарий
                </Label>
                <button type={'submit'}>Внести изменения</button>
            </Form>
            <BackButton/></>
    )
}
const mapStateToProps = state => ({
    employees: state.posts.employees
})
const mapDispatchToProps = {
    setEmployees
}
export default connect (mapStateToProps, mapDispatchToProps)(TheftDetail)
