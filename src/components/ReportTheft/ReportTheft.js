import {useSelector} from "react-redux";
import './ReportTheft.css'
import BackButton from "../BackButton";
export default function ReportTheft() {
    const authorized = useSelector(st => st.app.authorized)
    function handleSubmit(e){
        e.preventDefault()
    }
    return (
        <>
            <h1>Сообщение о краже</h1>
            <form className={'form'} onSubmit={handleSubmit}>
                <label>
                    <input className={'form_input'} type={'number'} required={true} autoFocus={true} />
                    Номер лицензии *
                </label>
                <label>
                    <input className={'form_input'} type={'text'} required={true} />
                    ФИО клиента *
                </label>
                <label>
                    <input className={'form_input'} type={'text'} required={true}/>
                    Тип велосипеда *
                </label>
                <label>
                    <input className={'form_input'} type={'text'}/>
                    Цвет велосипеда
                </label>
                <label>
                    <input className={'form_input'} type={'datetime-local'}/>
                    Дата кражи
                </label>
                <label>
                    <input className={'form_input'} type={'text'}/>
                    Дополнительная информация
                </label>
                {authorized &&
                    <label>
                        <input className={'form_input'} type={'text'}/>
                        Ответственный сотрудник
                    </label>
                }
                <button type={'submit'}>Сообщить</button>
            </form>
            <BackButton />
        </>
    )
}