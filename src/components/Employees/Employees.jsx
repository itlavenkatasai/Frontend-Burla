import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const Employees = () => {
    const navigate = useNavigate();
    const data = [
        {
            employeeName: 'John Doe',
            employeePhoneNumber: '1234567890',
            employeeDOB: '01-01-1990',
            employeeLocation: 'New York',
            employeeAadhar: '111122223333',
            employeeWagePerDay: '$100',
        }
        // Add more data as needed
    ];
    const [showEmployeeForm,setShowEmployeeForm] = useState(false);
    const actionsTemplate = (rowData) => {
        return (
            <div className="flex space-x-2">
                <button className="bg-red-400 text-white px-3 py-2 rounded-md hover:bg-red-500 transition">
                    Update
                </button>
                <button className="bg-green-400 text-white px-3 py-2 rounded-md hover:bg-green-500 transition">
                    Delete
                </button>
            </div>
        );
    };
    return (
        <div className="pt-5 px-4 w-full">
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
                            className=" border border-black pl-10 pr-3 py-2 w-full sm:w-80 rounded-lg focus:outline-black bg-gray-200 placeholder:text-black text-xl"
                        />
                    </div>

                    {/* Add Employee Button */}
                    <button
                        className="bg-red-400 font-bold py-3 px-5 rounded-lg focus:outline-none hover:bg-white border border-black transition w-full sm:w-auto"
                    onClick={() => setShowEmployeeForm(true)}
                    >
                        <FontAwesomeIcon icon={faPlus} className="text-xl" />
                        ADD EMPLOYEE
                    </button>
                </div>
            </div>
            <div className="table-container mx-auto mt-5 w-full ">
                <DataTable
                    value={data}
                    className="p-datatable-custom-radius w-full "
                    responsiveLayout="scroll"
                    autoLayout
                    paginator                     // Enables pagination
                    rows={5}                      // Default number of rows per page
                    rowsPerPageOptions={[5, 10, 20]}
                    
                >
                    <Column field="employeeName" header="Employee Name" style={{ textAlign: 'center' }} />
                    <Column field="employeePhoneNumber" header="Phone Number" style={{ textAlign: 'center' }} />
                    <Column field="employeeDOB" header="Date of Birth" style={{ textAlign: 'center' }} />
                    <Column field="employeeLocation" header="Location" style={{ textAlign: 'center' }} />
                    <Column field="employeeAadhar" header="Aadhar" style={{ textAlign: 'center' }} />
                    <Column field="employeeWagePerDay" header="Wage Per Day" style={{ textAlign: 'center' }} />
                    <Column body={actionsTemplate} header="Actions" style={{ textAlign: 'center' }} />
                </DataTable>
            </div>
        </div>
    );
};

export default Employees;
