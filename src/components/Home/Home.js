import {Link} from "react-router-dom";
import {connect} from "react-redux";
import "./Home.css"

function Home (props) {

    return (
        <div>
            <h1>Сервис проката велосипедов</h1>
            {!props.authorized && <h3>Авторизируйтесь, чтобы получить информацию о кражах</h3>}
            <h3>Здесь можете оставить сообщение о краже</h3>
            <Link to="report_theft">
                <button className={'bigButton'}>Сообщить о краже</button>
            </Link>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        authorized: state.app.authorized
    }
}

export default connect(mapStateToProps)(Home)