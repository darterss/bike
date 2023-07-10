import BackButton from "../BackButton";
import {setCases} from "../../redux/actions";
import {connect} from "react-redux";
import {deleteCase, getAllCases} from "../../API/apiRequests";
import {useEffect} from "react";
import {Link} from "react-router-dom";

function ListOfThefts(props) {
    useEffect(() => {
        getAllCases().then(props.setCases)
    }, [])

    function handleClick(e, id) {
        deleteCase(id, props.setCases)
    }

    if (!props.cases.length) return (
        <div>Загрузка...</div>
    )

    return (
        <>
            <h1>Сообщения о кражах</h1>
            <h4>нажмите на номер лицензии для редактирования данных</h4>
            <table>
                <thead>
                <tr>
                    <th>Номер лицензии</th>
                    <th>ФИО арендатора</th>
                    <th>Тип велосипеда</th>
                    <th>Дата кражи</th>
                </tr>
                </thead>
                <tbody>
                { (props.cases.length) ? props.cases.map( (specCase) => (
                    <tr key={specCase._id}>
                        <td><Link to={specCase._id}>{specCase.licenseNumber}</Link></td>
                        <td>{specCase.ownerFullName}</td>
                        <td>{specCase.type}</td>
                        <td>{specCase.date ? specCase.date.substring(0,10) : null}</td>
                        <td>
                            <button onClick={(e) => handleClick(e, specCase._id)} >удалить</button>
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
    cases: state.posts.cases
})

const mapDispatchToProps = {
    setCases
}

export default connect (mapStateToProps, mapDispatchToProps)(ListOfThefts)