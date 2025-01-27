import { useRef, useState } from "react";
import { checkAndValidateEmployeeForm } from "../../utils/Validate.js";
import axios from "axios";
import { Toast } from "primereact/toast";

export const EmployeeForm = ({

    setShowEmployeeForm,
    getDataFromBackend,
    employeeFields,
    setEmployeeFields,
    defaultEmployeeFields,
    isId,
    setIsId
}) => {

    const toast = useRef(null);
    const [loading, setLoading] = useState(false);
    const env = 'PROD';
    const publicMongoUrl = env === 'PROD' ? 'https://backend-burla.onrender.com' : 'http://localhost:3000';


    const handleSubmit = async () => {
        console.log("updating...")
        setLoading(true);
        let tempFields = [...employeeFields];
        let errors = false;

        tempFields = tempFields.map((o) => {
            const errorVal = checkAndValidateEmployeeForm(o.filedKey, o.fieldValue);
            if (errorVal) errors = true;
            return {
                ...o,
                fieldError: errorVal
            };
        });
        // console.log(errors, tempFields)

        if (errors) {
            setLoading(false);
            return setEmployeeFields(tempFields);
        }
        if (!isId) {
            try {
                const formData = employeeFields.reduce((acc, field) => {
                    acc[field.filedKey] = field.fieldValue;
                    return acc;
                }, {})
                const response = await axios.post(`${publicMongoUrl}/employee`, formData, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                console.log("api success : ", response)
                setLoading(false);
                setShowEmployeeForm(false);
                setEmployeeFields(defaultEmployeeFields);
                getDataFromBackend();
            } catch (error) {
                setLoading(false);
                const backendError = error?.response?.data?.message || "Internal Server Error";
                console.log("error", backendError, error);
                toast.current && toast.current.show({
                    severity: 'error',
                    detail: backendError,
                    life: 3000,
                    position: 'top-right',
                    className: 'custom-toast' // Applies the custom CSS
                });

            }
        } else {
            try {
                const formData = employeeFields.reduce((acc, field) => {
                    acc[field.filedKey] = field.fieldValue;
                    return acc;
                }, {})
                const response = await axios.patch(`${publicMongoUrl}/employee/${isId}`, formData, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                console.log("api success : ", response)
                setLoading(false);
                setIsId(null);
                setShowEmployeeForm(false);
                setEmployeeFields(defaultEmployeeFields);
                getDataFromBackend();
            } catch (error) {
                setLoading(false);
                const backendError = error?.response?.data?.message || "Internal Server Error";
                console.log("error", backendError, error);
                toast.current && toast.current.show({
                    severity: 'error',
                    detail: backendError,
                    life: 3000,
                    position: 'top-right',
                    className: 'custom-toast' // Applies the custom CSS
                });

            }
        }
    };

    return (
        <>
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                </div>
            )}
            <div className="p-8 bg-gray-100 rounded-lg shadow-md max-w-lg mx-auto">
                <Toast ref={toast} className="custom-toast" />
                <form onSubmit={(e) => e.preventDefault()}>
                    {employeeFields.map((o, index) => (
                        <div key={o.fieldLabel} className="mb-6">
                            {/* Label */}
                            <div className="flex items-center">
                                <label className="w-40 font-semibold text-gray-700 mr-4 text-left">
                                    {o.fieldLabel}:
                                </label>
                                {/* Input Field */}
                                <input
                                    type={o.fieldInputType}
                                    value={o.fieldValue}
                                    onChange={(e) => {
                                        // console.log("****** ", e.target.value);
                                        const tempFields = [...employeeFields];
                                        tempFields[index].fieldValue = e.target.value;
                                        setEmployeeFields(tempFields);
                                    }}
                                    placeholder={o.fieldPlaceHolder}
                                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {/* Error Message */}
                            {o.fieldError && <p className="text-red-500 mt-1 ml-44">{o.fieldError}</p>}
                        </div>
                    ))}

                    <div className="flex justify-center space-x-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition"
                            onClick={handleSubmit}
                        >
                            {isId ? "Update" : "Submit"}
                        </button>
                        <button
                            type="reset"
                            className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 transition"
                            onClick={() => setEmployeeFields(defaultEmployeeFields)}
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>

        </>
    );
};
