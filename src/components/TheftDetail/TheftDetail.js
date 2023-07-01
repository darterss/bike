import {setEmployees} from "../../redux/actions";
import {connect} from "react-redux";
import BackButton from "../BackButton";
import {useNavigate, useParams} from "react-router-dom";
import {changeCaseData, getAllOfficers} from "../../API/apiRequests";
import {useEffect, useRef, useState} from "react";
import {getItemFromState} from "../../functions/functions";

function TheftDetail(props){
    const { id } = useParams()
    const specCase = getItemFromState(props.cases, id, 'case')
    const navigate = useNavigate()
    const [disable, setDisable] = useState(specCase.status !== 'done')
    const ref = useRef()
    useEffect(() => {
        getAllOfficers(props.setEmployees)
    }, [])
    function handleChange(e) {
        if (e.target.value !== 'done') ref.current.value = ''
        setDisable(e.target.value !== 'done');
    }
    function handleSubmit(e) {
        e.preventDefault()
        const employee = props.employees.find(emp => (emp.email === e.target.officer.value)) // объект работника из state
        let editedCase = {
            status: e.target.status.value,
            licenseNumber: e.target.licenseNumber.value,
            type: e.target.typeOfBike.value,
            ownerFullName: e.target.ownerFullName.value,
            color: e.target.colorOfBike.value,
            date: e.target.dateOfTheft.value,
            officer: employee._id,
            description: e.target.description.value,
            resolution: e.target.resolution.value
        }
        changeCaseData(id, editedCase, navigate)
    }
    return(
        <>
            <h1>Информация по краже</h1>
            <form className={'form'} onSubmit={handleSubmit}>
                <label>
                    <select name={'status'} className={'form_input'} type={'text'} required={true}
                           defaultValue={specCase.status} onChange={handleChange}>
                        <option>new</option>
                        <option value={'in_progress'}>in progress</option>
                        <option>done</option>
                    </select>
                    Статус *
                </label>
                <label>
                    <input name={'licenseNumber'} className={'form_input'} type={'text'} required={true}
                           defaultValue={specCase.licenseNumber}/>
                    Номер лицензии *
                </label>
                <label>
                    <select name={'typeOfBike'} className={'form_select'} required={true}
                            defaultValue={specCase.type}>
                        <option>general</option>
                        <option>sport</option>
                    </select>
                    Тип велосипеда *
                </label>
                <label>
                    <input name={'ownerFullName'} className={'form_input'} type={'text'} required={true}
                           defaultValue={specCase.ownerFullName} />
                    ФИО клиента *
                </label>
                <label>
                    <input name={'clientId'} className={'form_input'} type={'text'} defaultValue={specCase.clientId}
                    disabled={true} />
                    ClientId
                </label>
                <label>
                    <input name={'createdAt'} className={'form_input'} type={'text'}
                           defaultValue={specCase.createdAt.substring(0,10)} disabled={true} />
                    Дата создания сообщения
                </label>
                <label>
                    <input name={'updatedAt'} className={'form_input'} type={'text'}
                           defaultValue={specCase.updatedAt ? specCase.updatedAt.substring(0,10) : null} disabled={true} />
                    Дата обновления сообщения
                </label>
                <label>
                    <input name={'colorOfBike'} className={'form_input'} type={'text'} defaultValue={specCase.color}/>
                    Цвет велосипеда
                </label>
                <label>
                    <input name={'dateOfTheft'} className={'form_input'} type={'date'}
                           defaultValue={specCase.date ? specCase.date.substring(0,10) : null}/>
                    Дата кражи
                </label>
                <label>
                    <input name={'description'} className={'form_input'} type={'text'}
                           defaultValue={specCase.description} />
                    Дополнительный комментарий
                </label>
                <label>
                    <select name={'officer'} className={'form_select'}>
                        {props.employees.map(emp => {
                            if (emp.approved) return (
                                <option key={emp._id}>{emp.email}</option>
                            )
                        })}
                    </select>
                    Ответственный сотрудник
                </label>
                <label>
                    <input name={'resolution'} className={'form_input'} type={'text'}
                           defaultValue={specCase.resolution} disabled={disable} required={!disable} ref={ref}/>
                    Завершающий комментарий
                </label>
                <button type={'submit'}>Внести изменения</button>
            </form>
            <BackButton/></>
    )
}

const mapStateToProps = state => ({
    cases: state.posts.cases,
    employees: state.posts.employees
})
const mapDispatchToProps = {
    setEmployees
}
export default connect (mapStateToProps, mapDispatchToProps)(TheftDetail)