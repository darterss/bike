import BackButton from "../BackButton";
import {connect} from "react-redux";
import {useEffect} from "react";
import {setEmployees} from "../../redux/actions";
import {Link} from "react-router-dom";
import {deleteOfficer, getAllOfficers} from "../../API/apiRequests";

function ResponsibleStaff(props) {
    useEffect(() => {
        getAllOfficers().then(props.setEmployees)
    }, [])

    function handleClick(e, id) {
        deleteOfficer(id, props.setEmployees)
    }

    if (!props.employees.length) return (
        <div>Загрузка...</div>
    )

    return (
        <>
            <h1>Ответственные сотрудники</h1>
            <h4>нажмите на email сотрудника для редактирования данных</h4>
            <table>
                <thead>
                <tr>
                    <th>email</th>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Одобрен</th>
                </tr>
                </thead>
                <tbody>
                {(props.employees.length) ? props.employees.map((emp) => (
                    <tr key={emp._id}>
                        <td><Link to={'/responsible_staff/' + emp._id}>{emp.email}</Link></td>
                        <td>{emp.firstName}</td>
                        <td>{emp.lastName}</td>
                        <td>{emp.approved ? 'Да' : 'Нет'}</td>
                        <td>
                            <button onClick={(e) => handleClick(e, emp._id)}>удалить</button>
                        </td>
                    </tr>
                )) : null}
                </tbody>
            </table>
            <BackButton/>
        </>
    )
}

const mapStateToProps = state => ({
    employees: state.posts.employees
})

const mapDispatchToProps = {
    setEmployees
}

export default connect (mapStateToProps, mapDispatchToProps)(ResponsibleStaff)