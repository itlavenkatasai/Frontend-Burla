import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dropdown } from 'primereact/dropdown'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Toast } from 'primereact/toast';
import { convertToRequiredDateFormat } from '../../utils/utils'


const Attendance = () => {
    const toast = useRef(null);
    const [data, setData] = useState([])
    const [date, setDate] = useState(new Date());
    const [dateError, setDateError] = useState("");
    const statuses = [
        { name: "Present", code: 1 },
        { name: "Absent", code: 2 },
        { name: "HalfDay", code: 3 }
    ]
    const handleStatusChange = (rowData, value) => {
        const updateData = data.map((item) => item === rowData ? { ...item, employeeStatus: value.code, attendanceDate: convertToRequiredDateFormat(date) } : item);
        setData(updateData);
    }
    const getStatusColor = (status) => {
        if (status === 1) return "bg-green-400";
        if (status === 2) return "bg-red-400";
        if (status === 3) return "bg-green-200"; // Default color for Half Day or null
    };
    const actionTemplate = (rowData) => { 
        // console.log("rowdata",rowData);
        return (
            <>

                <div>
                    <Dropdown
                        value={statuses.find((o) => o.code === rowData.employeeStatus)}
                        onChange={e => handleStatusChange(rowData, e.value)}
                        options={statuses}
                        optionLabel='name'
                        placeholder='Select Status'
                        className={`w-full md:w-14rem border border-black shadow-lg font-bold ${getStatusColor(rowData.employeeStatus)}`}
                    />
                </div>
            </>
        )
    }
    const getEmployeesData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/employees", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            const updateResponse = response?.data?.data.map((o) => ({
                employeeId: o.employeeId,
                employeeName: o.employeeName,
                employeeStatus: o.employeeStatus
            }))
            console.log("updateResponse :: ", updateResponse, response.data?.data);
            setData(updateResponse || []);
        } catch (error) {
            const backendError = error.response.data.message;
            toast.current && toast.current.show({
                severity: 'error',
                detail: backendError,
                life: 3000,
                position: 'top-right',
                className: 'custom-toast' // Applies the custom CSS
            });
        }
    }
    const handleAttendanceSubmit = async () => {
        // console.log("data", data);
        if (!date) {
            return setDateError("Date field is valid please enter date");
        }
        try {
            const parsedDate = convertToRequiredDateFormat(date);
            console.log("date :: ", parsedDate);
            const updateData = data.map((o) => 
                !(o.employeeStatus) ? { ...o, employeeStatus: 2, attendanceDate: parsedDate } : o
            )
            console.log("updateData : ", updateData);
            await axios.post("http://localhost:3000/employees/attendance",
                { attendanceData: updateData },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`
                    }
                });
            // setDate("");
            setDateError("");
        } catch (error) {
            const backendError = error?.response?.data?.message;
            toast.current && toast.current.show({
                severity: 'error',
                detail: backendError,
                life: 3000,
                position: 'top-right',
                className: 'custom-toast' // Applies the custom CSS
            });
        }
    }
    const fetchAttendanceData = async () => {
        console.log(date);
        if (date) {
            try {
                const response = await axios.post("http://localhost:3000/employees/attendanceGetByDate",
                    {date: convertToRequiredDateFormat(date)},
                     {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`
                    }
                });
                console.log("attendance resp:: ",response?.data?.data);
                if ((response?.data?.data || []).length === 0) {
                    getEmployeesData();
                } else {
                    const formattedData = (response?.data?.data || []).map((o) => ({
                        employeeName: o.employeeName,
                        employeeId: o.employeeId,
                        employeeStatus: parseInt(o.employeeStatus)
                    }))
                    setData(formattedData);
                }
            } catch (error) {
                const backendError = error.response?.data?.message || "An error occurred";
                toast.current && toast.current.show({
                    severity: 'error',
                    detail: backendError,
                    life: 3000,
                    position: 'top-right',
                    className: 'custom-toast'
                });
            }
        }
    };
    
    useEffect(() => {
        fetchAttendanceData(); // Call the async function within the effect
    }, [date]);
    
    return (
        <div className="table-container mt-5 flex flex-col items-center space-y-4 max-w-lg mx-auto">
            <Toast ref={toast} className="custom-toast" />
            <div className="w-full">
                <Calendar
                    id="buttondisplay"
                    value={date}
                    onChange={(e) => {
                        console.log("date :: ", e.value)
                        setDate(e.value)
                    }}
                    showIcon
                    className="border border-gray-300 rounded-md drop-shadow-lg w-full bg-sky-500 py-3 px-4 text-lg"
                    placeholder="Select Date"
                />
                {dateError && <p className='text-red-500 pt-1 font-bold'>{dateError}</p>}
            </div>

            <div className="w-full">
                <DataTable
                    value={data}
                    className="p-datatable w-full">
                    <Column field='employeeId' header="EmployeeId" />
                    <Column field="employeeName" header="Employee Name" />
                    <Column field="employeeStatus" body={actionTemplate} header="Employee Status" />
                </DataTable>
            </div>

            <div className="w-full flex justify-center">
                <Button label="Submit" className="bg-sky-500 text-white w-full py-3 rounded-md"
                    onClick={handleAttendanceSubmit}
                />
            </div>
        </div>


    )
}

export default Attendance
