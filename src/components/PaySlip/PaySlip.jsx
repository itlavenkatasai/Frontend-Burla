import React, { useState } from "react";
import { Button } from 'primereact/button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './payslip.css'

const PaySlip = (props) => {
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const months = [
        { name: "January", code: 1 },
        { name: "Febrauary", code: 2 },
        { name: "March", code: 3 },
        { name: "April", code: 4 },
        { name: "May", code: 5 },
        { name: "June", code: 6 },
        { name: "July", code: 7 },
        { name: "August", code: 8 },
        { name: "September", code: 9 },
        { name: "October", code: 10 },
        { name: "November", code: 11 },
        { name: "December", code: 12 }
    ]
    const years = [
        { code: 2023 },
        { code: 2024 },
        { code: 2025 },
        { code: 2026 },
        { code: 2027 },
        { code: 2028 },
        { code: 2029 },
        { code: 2030 },
        { code: 2031 },
        { code: 2032 },
        { code: 2033 },
        { code: 2034 },
        { code: 2035 }
    ]
    const employeeData = [
        {
            employeeId : "EMP-1",
            employeeName : "Venkatasai",
            present : "true",
            absent : "false",
            dayWiseAmount : 1000,
            monthWiseAmount : 30000,
            givenAmount : 4000,
            leftAmount : 26000,
            presentedDays : 20,
            absentDays : 10
        }
    ]
    return (
        <div className="pt-5 px-4 w-full">
            <div className="flex sm:flex-row justify-between sm:space-x-3 space-y-3 sm:space-y-0">

                {/* Back Button with Left Arrow Icon */}
                <Button
                    className="flex items-center bg-red-400 font-bold py-1 px-4 rounded-lg focus:outline-none hover:bg-white border border-black transition"
                    onClick={() => { }}
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="text-black mr-2 text-2xl" /> {/* Left arrow icon */}
                    Back
                </Button>
                <div className="space-x-2">
                    <Dropdown
                        className="w-full md:w-64 border border-gray-600 rounded-lg bg-white px-2 py-1 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 placeholder-bold"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.value)}
                        options={months}
                        optionLabel="name"
                        placeholder="Select Month"
                        appendTo="self"
                    />
                    <Dropdown
                        className="w-full md:w-64 border border-gray-600 rounded-lg bg-white px-2 py-1 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 placeholder-bold"
                        options={years}
                        optionLabel="code"
                        placeholder="Selected year"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.value)}
                        appendTo="self"
                        
                    />
                </div>
            </div>
            <div className=" paytable-container mt-3">
                <DataTable 
                value={employeeData}
                className="payslip-table w-full"
                >
                    <Column field="employeeId" header = "EMP_ID"/>
                    <Column field="employeeName" header = "EMP_NAME"/>
                    <Column field="present" header = "PRESENT"/>
                    <Column field="absent" header = "ABSENT"/>
                    <Column field="dayWiseAmount" header = "DAYWISE-AMOUNT"/>
                    <Column field="monthWiseAmount" header = "MONTHWISE-AMOUNT"/>
                    <Column field="leftAmount" header = "LEFT-AMOUNT"/>
                    <Column field="presentedDays" header = "PRESENTED-DAYS"/>
                    <Column field="absentDays" header = "ABSENT-DAYS"/>
                    <Column field="" header = "ACTIONS"/>
                </DataTable>
            </div>
        </div>
    )
}

export default PaySlip;