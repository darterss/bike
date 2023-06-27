import './App.css';
import logo from './assets/logo.svg'
import Authorisation from "./components/Authorisation/Authorisation";
import Logout from "./components/Logout/Logout";
import { connect } from 'react-redux'
import {Link, Route, Routes} from "react-router-dom";
import ReportTheft from "./components/ReportTheft/ReportTheft";
import Registration from "./components/Registration/Registration";
import Home from "./components/Home/Home";
import ListOfThefts from "./components/ListOfTheft/ListOfThefts";
import ResponsibleStaff from "./components/ResponsibleStaff/ResponsibleStaff";
import EmployeeDetail from "./components/EmployeeDetail/EmployeeDetail";
import TheftDetail from "./components/TheftDetail/TheftDetail";
function App(props) {
    return (
        <div className="App">
            <header className={'header'}>
                <img alt={'logo'} src={logo} className={'logo'}/>
                {!props.authorized && <Link to={'/'}><h2>Сервис проката велосипедов</h2></Link>}
                {props.authorized && <Link to={'/list_of_thefts'}><h4>Сообщения о кражах</h4></Link>}
                {props.authorized && <Link to="report_theft"><h4>Сообщить о краже</h4></Link>}
                {props.authorized && <Link to={'/responsible_staff'}><h4>Ответственные сотрудники</h4></Link>}
                {!props.authorized && <Authorisation/>}
                {props.authorized && <Logout/>}
            </header>
            <main className={'main'}>
                <hr />
                <Routes>
                    <Route path='' element={<Home/>}/>
                    <Route path={'/report_theft'} element={<ReportTheft />}/>
                    <Route path={'/registration'} element={<Registration />}/>
                    <Route path={'/responsible_staff/'}>
                        <Route index element={<ResponsibleStaff />} />
                        <Route path={":id"} element={<EmployeeDetail />} />
                    </Route>
                    <Route path={'/list_of_thefts/'}>
                        <Route index element={<ListOfThefts />} />
                        <Route path={":id"} element={<TheftDetail />} />
                    </Route>

                </Routes>

            </main>
            <footer className={'footer'}>
                <a href={'mailto: darters@mail.ru'}>email: darters@mail.ru</a>
            </footer>
        </div>
    );
}
function mapStateToProps(state) {
    return {
        authorized: state.app.authorized
    }
}
export default connect(mapStateToProps)(App)