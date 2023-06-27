import {setCases, setEmployees} from "../../redux/actions";
import {connect} from "react-redux";
import BackButton from "../BackButton";
import {useNavigate, useParams} from "react-router-dom";
import {changeCaseData, getAllOfficers} from "../../API/apiRequests";
import {useEffect} from "react";

function TheftDetail(props){
    const { id } = useParams()
    const indexOfCase = props.cases.findIndex((item) => item._id === id) // поиск индекса сообщения о краже в state
    const specCase = props.cases[indexOfCase]
    const navigate = useNavigate()

    useEffect(() => {
        getAllOfficers(props.setEmployees)
    }, [])

    function handleSubmit (e) {
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
            <form className={'form'} onSubmit={handleSubmit}>
                <label>
                    <input name={'status'} className={'form_input'} type={'text'} required={true}
                           defaultValue={specCase.status}/>
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
                    clientId
                </label>
                <label>
                    <input name={'createdAt'} className={'form_input'} type={'text'} defaultValue={specCase.createdAt}
                           disabled={true} />
                    Дата создания сообщения
                </label>
                <label>
                    <input name={'updatedAt'} className={'form_input'} type={'text'} defaultValue={specCase.updatedAt}
                           disabled={true} />
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
                           defaultValue={specCase.resolution} />
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
    setCases,
    setEmployees
}
export default connect (mapStateToProps, mapDispatchToProps)(TheftDetail)