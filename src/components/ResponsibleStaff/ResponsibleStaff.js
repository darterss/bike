import BackButton from "../BackButton";
import {connect} from "react-redux";
import {useEffect} from "react";
import {getEmployees} from "../../redux/actions";
import {Link} from "react-router-dom";
import {deleteOfficer, getAllOfficers} from "../../API/apiRequests";
function ResponsibleStaff(props) {
    useEffect(() => {
        getAllOfficers(props.getEmployees)
    }, [])
    function handleClick(e, id) {
        deleteOfficer(id, props.getEmployees)
    }
    return (
        <>
            <h2>Ответственные сотрудники</h2>
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
            { (props.employees.length) ? props.employees.map( (emp) => (
                       <tr key={emp._id}>
                           <td><Link to={emp._id}>{emp.email}</Link></td>
                           <td>{emp.firstName}</td>
                           <td>{emp.lastName}</td>
                           <td>{emp.approved ? 'Да' : 'Нет'}</td>
                           <td>
                               <button onClick={(e) => handleClick(e, emp._id)} >удалить</button>
                           </td>
                       </tr>
            )) : null}
                </tbody>
            </table>
            <BackButton />
        </>
    )
}
const mapStateToProps = state => ({
    token: state.app.token,
    employees: state.posts.employees
})
const mapDispatchToProps = {
    getEmployees
}
export default connect (mapStateToProps, mapDispatchToProps)(ResponsibleStaff)