import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'primereact/dropdown'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Toast } from 'primereact/toast';
import { convertToRequiredDateFormat } from '../../utils/utils'

import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router'

const Attendance = () => {
    const [loading, setLoading] = useState(false);
    const toast = useRef(null);
    const [data, setData] = useState([])
    const [date, setDate] = useState(new Date());
    const [submit, setSubmit] = useState(false);
    const [dateError, setDateError] = useState("");
    const navigate = useNavigate();
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
        if (!date) {
            return setDateError("Please select a valid date.");
        }
        setSubmit(true); // Show the confirmation dialog
    };

    const confirmAttendanceSubmit = async () => {
        try {
            setLoading(true);
            const parsedDate = convertToRequiredDateFormat(date);
            console.log("date :: ", parsedDate);
            const updateData = data.map((o) => 
                !(o.employeeStatus) ? { ...o, employeeStatus: 2, attendanceDate: parsedDate } : {...o, attendanceDate: parsedDate}
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
            toast.current && toast.current.show({
                severity: 'success',
                detail: "Attendance successfully submitted!",
                life: 3000,
                position: 'top-right'
            });
        } catch (error) {
            const backendError = error.response?.data?.message || "An error occurred";
            toast.current && toast.current.show({
                severity: 'error',
                detail: backendError,
                life: 3000,
                position: 'top-right'
            });
        } finally {
            setLoading(false); // Stop loading indicator
            setSubmit(false); // Hide the dialog
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
                setLoading(false);
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
                setLoading(false);
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
        <>
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                </div>
            )}

            <div className="table-container mt-5 flex flex-col items-center max-w-lg mx-auto space-y-4">
                <Toast ref={toast} className="custom-toast" />

                {/* Row for Back Button and Date Field */}
                <div className="w-full flex items-center space-x-2">
                    {/* Back Button */}
                    <button
                    className="flex items-center bg-sky-500 font-bold py-3 px-10 rounded-lg focus:outline-none hover:bg-white border border-gray-300 transition"
                    onClick={() => navigate('/home')}
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="text-black mr-2 text-2xl" /> {/* Left arrow icon */}
                    Back
                </button>

                    {/* Calendar */}
                    <Calendar
                        id="buttondisplay"
                        value={date}
                        onChange={(e) => setDate(e.value)}
                        showIcon
                        className="border border-gray-300 rounded-md drop-shadow-lg flex-1 bg-sky-500 py-3 px-4 text-lg focus:outline-none hover:bg-white"
                        placeholder="Select Date"
                    />
                </div>

                {dateError && <p className="text-red-500 pt-1 font-bold text-center">{dateError}</p>}

                {/* Row for Table */}
                <div className="w-full">
                    <DataTable value={data} className="p-datatable w-full">
                        <Column field="employeeId" header="EmployeeId" />
                        <Column field="employeeName" header="Employee Name" />
                        <Column field="employeeStatus" body={actionTemplate} header="Employee Status" />
                    </DataTable>
                </div>

                {/* Row for Submit Button */}
                <div className="w-full flex justify-center">
                    <Button
                        label="Submit"
                        className="bg-sky-500 text-black border border-gray-300 w-full py-3 rounded-md focus:outline-none hover:bg-white"
                        onClick={handleAttendanceSubmit}
                    />
                </div>
            </div>
            <Dialog
                header="Confirm Attendance Submission"
                visible={submit}
                onHide={() => setSubmit(false)} // Close the dialog without submitting
                closable={true}
            >
                <div className=' shadow-2xl p-4 border border-sky-400 rounded-lg'>

                    <p>Are you sure you want to submit the attendance?</p>
                    <div className="flex justify-end mt-4 space-x-2">
                        <Button
                            label="Cancel"
                            className="p-button-text p-button-danger bg-yellow-200 px-2 py-2"
                            onClick={() => setSubmit(false)} // Close dialog without action

                        />
                        <Button
                            label="Submit"
                            className="p-button-primary bg-yellow-200 px-2 py-2"
                            onClick={confirmAttendanceSubmit} // Call the API
                        />
                    </div>
                </div>
            </Dialog>
        </>


    )
}

export default Attendance
