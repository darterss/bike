import './App.css';
import {Route, Routes} from "react-router-dom";
import ReportTheft from "./components/ReportTheft/ReportTheft";
import Registration from "./components/Registration/Registration";
import Home from "./components/Home/Home";
import ListOfThefts from "./components/ListOfTheft/ListOfThefts";
import ResponsibleStaff from "./components/ResponsibleStaff/ResponsibleStaff";
import EmployeeDetail from "./components/EmployeeDetail/EmployeeDetail";
import TheftDetail from "./components/TheftDetail/TheftDetail";
import Header from "./components/Header/Header";
export default function App() {

    return (
        <div className="app">
            <Header />
            <main className={'main'}>
                <hr/>
                <Routes>
                    <Route path='' element={<Home />}/>
                    <Route path={'/report_theft'} element={<ReportTheft />} />
                    <Route path={'/registration'} element={<Registration />} />
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
                <hr/>
                <a href={'mailto: darters@mail.ru'}>email: darters@mail.ru</a>
            </footer>
        </div>
    );
}