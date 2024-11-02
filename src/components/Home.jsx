import React, { useState } from "react";
import './home.css';
import TopBar from "./TopBar";
import EmployeesIcon from '../images/employees-icon.png'
import AttendanceIcon from '../images/attendance.png'
import PaySlipIcon from '../images/payslip.png'
import ReportsIcon from '../images/reports.png'

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
            moduleKey: 'paySlip',
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
    return (
        <div className="home-container">
            <TopBar appColour={appColour} />
            <div className="colors-set">
                {
                    colors.map((o) => {
                        return (
                            <div key={o} className={`each-color-set ${o}`} onClick={() => setAppColour(o)}>

                            </div>
                        )
                    })
                }
            </div>
            <div className="home-modules">
                {
                    modules.map((o) => {
                        return (
                            <div className={`each-module ${appColour}`} key={o.moduleKey}>
                                <img src={o.moduleIcon} alt={o.moduleName} />
                                <h2>{o.moduleName}</h2>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;