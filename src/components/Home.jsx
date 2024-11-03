import React, { useState } from "react";
import './home.css';
import TopBar from "./TopBar";
import EmployeesIcon from '../images/employees-icon.png'
import AttendanceIcon from '../images/attendance.png'
import PaySlipIcon from '../images/payslip.png'
import ReportsIcon from '../images/reports.png'
import { Routes, Route, useNavigate} from 'react-router-dom';
import Employees from "./Employees/Employees";
import Attendance from "./Attendance/Attendance";
import PaySlip from "./PaySlip/PaySlip";
import Reports from "./Reports/Reports";

const Home = (props) => {
    const modules = [
        {
            moduleName: 'Employees',
            moduleKey: 'employees',
            moduleIcon: EmployeesIcon
        },
        {
            moduleName: 'Attendance',
            moduleKey: 'attendance',
            moduleIcon: AttendanceIcon
        },
        {
            moduleName: 'Pay-Slip',
            moduleKey: 'payslip',
            moduleIcon: PaySlipIcon
        },
        {
            moduleName: 'Reports',
            moduleKey: 'reports',
            moduleIcon: ReportsIcon
        }
    ]
    const colors = [
        "cambridge-color",
        "azure-color",
        "bayern-blue",
        "brown",
        "carolina-blue",
        "maroon",
        "colour-green"
    ]
    const [appColour, setAppColour] = useState('cambridge-color');
    const navigate = useNavigate();

    const ModuleComponent = () => {
        return (
            <div className="home-modules">
                {
                    modules.map((o) => {
                        return (
                            <div className={`each-module ${appColour}`} key={o.moduleKey} onClick={() => {
                                navigate(o.moduleKey)
                            }}>
                                <img src={o.moduleIcon} alt={o.moduleName} />
                                <h2>{o.moduleName}</h2>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div className="home-container">
            <TopBar appColour={appColour} colors={colors} setAppColour={setAppColour}/>
            <Routes>
                <Route 
                    path="/"
                    element={ <ModuleComponent /> }
                />
                <Route 
                    path="employees"
                    element={ <Employees /> }
                />
                <Route 
                    path="attendance"
                    element={ <Attendance /> }
                />
                <Route 
                    path="payslip"
                    element={ <PaySlip /> }
                />
                <Route 
                    path="reports"
                    element={ <Reports /> }
                />
            </Routes>
        </div>
    )
}

export default Home;