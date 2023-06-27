import {connect} from "react-redux";
import './ReportTheft.css'
import BackButton from "../BackButton";
import {createCase, getAllOfficers} from "../../API/apiRequests";
import {useEffect} from "react";
import {setEmployees} from "../../redux/actions";
function ReportTheft(props) {
    useEffect(() => {
        getAllOfficers(props.setEmployees)
    }, [])
    function handleSubmit(e){
        e.preventDefault()
        const employee = props.authorized && props.employees.find(emp => (emp.email === e.target.officer.value)) // объект работника из state
        const theft = {
            'ownerFullName': e.target.ownerFullName.value,
            'licenseNumber': e.target.licenseNumber.value,
            'type': e.target.typeOfBike.value,
            'color': e.target.colorOfBike.value,
            'date': e.target.dateOfTheft.value,
            'description': e.target.description.value,
            'officer': employee._id
        }
        createCase(theft)
    }

    return (
        <>
            <h1>Сообщение о краже</h1>
            <form className={'form'} onSubmit={handleSubmit}>
                <label>
                    <input name={'licenseNumber'} className={'form_input'} type={'number'} required={true} autoFocus={true} />
                    Номер лицензии *
                </label>
                <label>
                    <input name={'ownerFullName'} className={'form_input'} type={'text'} required={true} />
                    ФИО клиента *
                </label>
                <label>
                    <select name={'typeOfBike'} className={'form_select'} required={true}>
                        <option>general</option>
                        <option>sport</option>
                    </select>
                    Тип велосипеда *
                </label>
                <label>
                    <input name={'colorOfBike'} className={'form_input'} type={'text'}/>
                    Цвет велосипеда
                </label>
                <label>
                    <input name={'dateOfTheft'} className={'form_input'} type={'datetime-local'}/>
                    Дата кражи
                </label>
                <label>
                    <input name={'description'} className={'form_input'} type={'text'}/>
                    Дополнительный комментарий
                </label>
                {props.authorized &&
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
                }
                <button type={'submit'}>Сообщить</button>
            </form>
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