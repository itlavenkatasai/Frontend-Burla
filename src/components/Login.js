import {
    useRef, useState
} from 'react';
import LogoBurla from '../images/LogoBurla.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import BgBurla from '../images/BgBurla.jpg';
import { checkAndValidateLoginForm } from '../utils/Validate';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { PUBLIC_MONGO_URL } from '../constants';

const Login = () => {
    const defaultLoginFields = [
        {
            fieldKey: 'phoneNumber',
            fieldLabel: 'PhoneNumber',
            fieldType: 'input',
            fieldValue: '',
            fieldInputType: 'number',
            fieldError: ''
        },
        {
            fieldKey: 'password',
            fieldLabel: 'Password',
            fieldType: 'input',
            fieldValue: '',
            fieldInputType: 'password',
            fieldError: ''
        }
    ];
    const [loginFields, setLoginFields] = useState(defaultLoginFields);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useRef(null);
    const handleSubmit = async () => {
        // setLoading(true);
        let tempLoginFields = [...loginFields];
        let errors = false;
        tempLoginFields = tempLoginFields.map((o, index) => {
            const errValue = checkAndValidateLoginForm(o.fieldKey, o.fieldValue);
            if (errValue) errors = true;
            return {
                ...o,
                fieldError: errValue
            }
        });
        if (errors) {
            setLoading(false);
            return setLoginFields(tempLoginFields);
        }
        try {
            const formData = loginFields.reduce((acc, field) => {
                acc[field.fieldKey] = field.fieldValue;
                return acc;
            }, {});
            const response = await axios.post(`${PUBLIC_MONGO_URL}/login`, formData);
            console.log(response.data);
            const token = response.data.token;
            localStorage.setItem("authToken", token);
            setLoginFields(defaultLoginFields);
            // navigate('/home');
            setLoading(false); // Stop loading after delay
            navigate('/home');

        } catch (error) {
            const backendError = error.response.data.message;
            console.log("backendError", backendError);

            toast.current && toast.current.show({
                severity: 'error',
                detail: backendError,
                life: 3000,
                position: 'top-right',
                className: 'custom-toast' // Applies the custom CSS
            });
            setLoading(false);
        }
    }


    return (
        <>
        {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
            </div>
        )}
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-10"
             style={{ backgroundImage: `url(${BgBurla})` }}>
            <Toast ref={toast} className="custom-toast" />
            <div className="flex flex-col sm:flex-row w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-rose-300 to-gray-400">
                <div className="sm:w-7/12 w-full h-48 sm:h-full flex items-center justify-center shadow-xl">
                    <img src={LogoBurla} alt="description" className="w-full h-full object-cover" />
                </div>
                <div className="sm:w-5/12 w-full bg-white h-auto pt-10 px-6 sm:pt-24 sm:pl-20 overflow-y-auto">
                    <p className="text-4xl font-extrabold">Login</p>
                    <form onSubmit={(e) => e.preventDefault()}>
                        {loginFields.map((o, index) => (
                            <div key={index} className="flex flex-col space-y-2 mt-5">
                                <label className="text-lg font-medium">{o.fieldLabel}</label>
                                {o.fieldType === 'input' ? (
                                    <div>
                                        <input
                                            type={o.fieldInputType}
                                            value={o.fieldValue}
                                            onChange={(e) => {
                                                const tempFields = [...loginFields];
                                                tempFields[index].fieldValue = e.target.value;
                                                setLoginFields(tempFields);
                                            }}
                                            className="border border-gray-300 rounded-md py-3 px-2 bg-gray-100 shadow-lg w-full max-w-md"
                                        />
                                        {o.fieldError ? <p className="text-red-500">{o.fieldError}</p> : null}
                                    </div>
                                ) : null}
                            </div>
                        ))}
                        <div>
                            <button
                                className="bg-blue-600 rounded-lg mt-5 px-6 py-3 text-white font-bold"
                                onClick={handleSubmit}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <p className="mt-5">
                        Don't have an account yet? Please{' '}
                        <Link to="/register" className="text-blue-600 underline font-semibold">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </>
    
    )
}
export default Login;