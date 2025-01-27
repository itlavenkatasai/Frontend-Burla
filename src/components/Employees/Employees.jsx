import React, { useRef, useState, useEffect } from "react";
import { Button } from 'primereact/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Dialog } from "primereact/dialog";
import { EmployeeForm } from "./EmployeeForm";
import { Toast } from "primereact/toast";
import axios from "axios";
import './employee.css'
import { convertToRequiredDateFormat } from "../../utils/utils";
import { PUBLIC_MONGO_URL } from "../../constants";

const Employees = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [showEmployeeForm, setShowEmployeeForm] = useState(false);
    const toast = useRef(null);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const defaultEmployeeFields = [

        {
            filedKey: 'employeeName',
            fieldLabel: 'Name',
            fieldPlaceHolder: 'Enter employee name',
            fieldType: 'input',
            fieldValue: '',
            fieldInputType: 'text',
            fieldError: ''
        },
        {
            filedKey: 'employeePhoneNumber',
            fieldLabel: 'Phone Number',
            fieldPlaceHolder: 'Enter employee phone number',
            fieldType: 'input',
            fieldValue: '',
            fieldInputType: 'number',
            fieldError: ''
        },
        {
            filedKey: 'employeeDOB',
            fieldLabel: 'Date Of Birth',
            fieldPlaceHolder: 'Enter employee date of birth',
            fieldType: 'input',
            fieldValue: '',
            fieldInputType: 'date',
            fieldError: ''
        },
        {
            filedKey: 'employeeJoiningDate',
            fieldLabel: 'employee JoiningDate',
            fieldPlaceHolder: 'Enter employe joining date',
            fieldType: 'input',
            fieldValue: new Date().toISOString().split("T")[0],
            fieldInputType: 'date',
            fieldError: ''
        },
        {
            filedKey: 'employeeLocation',
            fieldLabel: 'Location',
            fieldPlaceHolder: 'Enter employee location',
            fieldType: 'input',
            fieldValue: '',
            fieldInputType: 'text',
            fieldError: ''
        },
        {
            filedKey: 'employeeAadhar',
            fieldLabel: 'Aadhar Number',
            fieldPlaceHolder: 'Enter employee aadhar number',
            fieldType: 'input',
            fieldValue: '',
            fieldInputType: 'number',
            fieldError: ''
        },
        {
            filedKey: 'employeeWagePerDay',
            fieldLabel: 'Wage Per Day',
            fieldPlaceHolder: 'Enter employee wage per day',
            fieldType: 'input',
            fieldValue: '',
            fieldInputType: 'number',
            fieldError: ''
        },
    ];
    const [employeeFields, setEmployeeFields] = useState(defaultEmployeeFields);
    const [isId, setIsId] = useState(null);
    const [searchText, setSearchText] = useState(null);
    const [showClearButton, setShowClearButton] = useState(false);
    
    const getDataFromBackend = async () => {
        try {
            const response = await axios.get(`${PUBLIC_MONGO_URL}/employees`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            setData(response?.data?.data || []);
            // console.log(response);
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
    const handleDelete = async () => {
        try {

            await axios.delete(`${PUBLIC_MONGO_URL}/employee/${selectedEmployeeId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            getDataFromBackend();
            setSelectedEmployeeId("");
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
    useEffect(() => {
        getDataFromBackend();
        // eslint-disable-next-line
    }, []);
    const handleSearch = async () => {
        try {
            const response = await axios.get(`${PUBLIC_MONGO_URL}/employee/search/${searchText}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            console.log(response.data.data);
            setData(response.data.data);
            setShowClearButton(true);
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
    const handleDeleteButton = (id) => {
        setDeleteDialog(true);
        setSelectedEmployeeId(id);
    }
    const actionsTemplate = (rowData) => {
        return (
            <div className="flex space-x-2 justify-center">
                <button className="bg-green-400 text-black font-bold px-3 py-2 rounded-md hover:bg-green-500 transition" onClick={() => {
                    console.log("rowData :: ", rowData)
                    let tempFields = [...defaultEmployeeFields];
                    tempFields = tempFields.map((o) => ({
                        ...o,
                        fieldValue: ['employeeJoiningDate', 'employeeDOB'].includes(o.filedKey) ? convertToRequiredDateFormat(rowData[o.filedKey]) : rowData[o.filedKey]
                    }))
                    console.log(tempFields);
                    setIsId(rowData._id);
                    setEmployeeFields(tempFields);
                    setShowEmployeeForm(true);

                }}>
                    Update
                </button>
                <button className="bg-red-400 text-black font-bold px-3 py-2 rounded-md hover:bg-red-500 transition"
                    onClick={() => {
                        // if (window.confirm("Are you sure you want to delete this item?")) {
                        //     handleDelete(rowData._id);
                        // }
                        handleDeleteButton(rowData._id);
                    }}
                >
                    Delete
                </button>
            </div>
        );
    };
    return (
        <div className="pt-5 px-4 w-full">
            <Toast ref={toast} className="custom-toast" />
            <div className="flex sm:flex-row justify-between sm:space-x-3 space-y-3 sm:space-y-0">

                {/* Back Button with Left Arrow Icon */}
                <button
                    className="flex items-center bg-red-400 font-bold py-3 px-10 rounded-lg focus:outline-none hover:bg-white border border-black transition"
                    onClick={() => navigate('/home')}
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="text-black mr-2 text-2xl" /> {/* Left arrow icon */}
                    Back
                </button>

                {/* Search Box Container with Icon */}
                <div className="flex sm:flex-row space-x-3">
                    <div className="relative w-full sm:w-auto flex items-center">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                className="text-red-500 text-xl"
                            />
                        </span>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Trigger search on Enter key
                            className="border border-black pl-10 pr-3 py-2 w-full sm:w-80 rounded-lg focus:outline-black bg-gray-200 placeholder:text-black text-xl"
                        />
                    </div>

                    {/* Add Employee Button */}
                    <button
                        className="bg-red-400 font-bold py-3 px-5 rounded-lg focus:outline-none hover:bg-white border border-black transition w-full sm:w-auto"
                        onClick={() => {
                            setShowEmployeeForm(true);
                            setIsId(null)
                        }}
                    >
                        <FontAwesomeIcon icon={faPlus} className="text-xl" />
                        ADD EMPLOYEE
                    </button>
                </div>
            </div>
            <div className="table-container mx-auto mt-5 w-full text-center ">
                <DataTable
                    value={data}
                    className="p-datatable w-full "
                    responsiveLayout="scroll"
                    autoLayout
                    paginator                     // Enables pagination
                    rows={5}                      // Default number of rows per page
                    rowsPerPageOptions={[5, 10, 20]}
                    paginatorTemplate={{ layout: 'PrevPageLink CurrentPageReport NextPageLink' }}

                >
                    <Column field="employeeName" header="Employee Name" headerStyle={{ textAlign: 'center' }} />
                    <Column field="employeePhoneNumber" header="Phone Number" headerStyle={{ textAlign: 'center' }} />
                    {/* <Column field="employeeDOB" header="Date of Birth" headerStyle={{ textAlign: 'center' }} /> */}
                    <Column field="employeeLocation" header="Location" headerStyle={{ textAlign: 'center' }} />
                    {/* <Column field="employeeAadhar" header="Aadhar" headerStyle={{ textAlign: 'center' }} /> */}
                    <Column field="employeeWagePerDay" header="Wage Per Day" headerStyle={{ textAlign: 'center' }} />
                    <Column body={actionsTemplate} header="Actions" headerStyle={{ textAlign: 'center' }} />
                </DataTable>
            </div>
            <div className="flex justify-end mt-2">
                {showClearButton && (
                    <button
                        className="bg-fuchsia-400 font-bold py-3 px-5 rounded-lg focus:outline-none hover:bg-white border border-black transition w-full sm:w-auto"
                        onClick={() => {
                            getDataFromBackend();
                            setSearchText("");
                            setShowClearButton(false);
                        }}
                    >
                        ClearFilter
                    </button>
                )}
            </div>
            <Dialog
                header={isId ? "Update Employee" : "Employee Form"}
                visible={showEmployeeForm}
                onHide={() => {
                    if (!showEmployeeForm) return;
                    setShowEmployeeForm(false);
                    setEmployeeFields(defaultEmployeeFields);
                }}
                closable={true}>
                <EmployeeForm
                    showEmployeeForm={showEmployeeForm}
                    setShowEmployeeForm={setShowEmployeeForm}
                    getDataFromBackend={getDataFromBackend}
                    employeeFields={employeeFields}
                    setEmployeeFields={setEmployeeFields}
                    defaultEmployeeFields={defaultEmployeeFields}
                    isId={isId}
                    setIsId={setIsId}
                />
            </Dialog>
            <Dialog
                header="Are You Delete Employee"
                visible={deleteDialog}
                onHide={() => setDeleteDialog(false)}
                closable={true}
            >
                <div className='shadow-2xl p-4 border border-red-600 rounded-lg'>

                    <p>Are you sure you want to delete employee?</p>
                    <div className="flex justify-end mt-4 space-x-2">
                        <Button
                            label="Cancel"
                            className="p-button-text p-button-danger bg-yellow-200 px-2 py-2"
                            onClick={() => setDeleteDialog(false)} // Close dialog without action

                        />
                        <Button
                            label="Submit"
                            className="p-button-primary bg-yellow-200 px-2 py-2"
                            onClick={() => {
                                handleDelete();
                                setDeleteDialog(false);
                            }} // Call the API
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default Employees;
