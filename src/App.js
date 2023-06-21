import './App.css';
import logo from './assets/logo.svg'
import Authorisation from "./components/Authorisation/Authorisation";
import Logout from "./components/Logout/Logout";
import { connect } from 'react-redux'
import {Link, Route, Routes, useLocation} from "react-router-dom";
import ReportTheft from "./components/ReportTheft/ReportTheft";
import Registration from "./components/Registration/Registration";
import Home from "./components/Home/Home";
import ListOfThefts from "./components/ListOfTheft/ListOfThefts";
import ResponsibleStaff from "./components/ResponsibleStaff/ResponsibleStaff";
import EmployeeDetail from "./components/EmployeeDetail/EmployeeDetail";
function App(props) {
    const location = useLocation();
    return (
        <div className="App">
            <header className={'header'}>
                <img alt={'logo'} src={logo} className={'logo'}/>
                {!props.authorized && <Link to={'/'}><h2>Сервис проката велосипедов</h2></Link>}
                {props.authorized && <Link to={'/list_of_thefts'}><h3>Сообщения о кражах</h3></Link>}
                {props.authorized && <Link to={'/responsible_staff'}><h3>Ответственные сотрудники</h3></Link>}
                {!props.authorized && <Authorisation/>}
                {props.authorized && <Logout/>}
            </header>
            <main className={'main'}>
                <hr />
                <Routes>
                    <Route path='' element={<Home/>}/>
                    <Route path={'/report_theft'} element={<ReportTheft/>}/>
                    <Route path={'/registration'} element={<Registration/>}/>
                    <Route path={'/list_of_thefts'} element={<ListOfThefts/>}/>
                    <Route path={'/responsible_staff'} element={<ResponsibleStaff/>}/>
                    <Route path={location.pathname} element={
                        <EmployeeDetail id={location.pathname.substring(19)}/>
                    }/>
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