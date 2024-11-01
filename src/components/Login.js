import { useState } from 'react';
import LogoBurla from '../images/LogoBurla.jpeg';
import { Link } from 'react-router-dom';
import BgBurla from '../images/BgBurla.jpg';
import {checkAndValidateLoginForm} from '../utils/Validate';
const Login = () => {
    const [loginFields, setLoginFields] = useState([
        {
            fieldKey: 'phoneNumber',
            fieldLabel: 'PhoneNumber',
            fieldType: 'input',
            fieldValue: '',
            fieldInputType: 'number',
            fieldError : ''
        },
        {
            fieldKey: 'password',
            fieldLabel: 'Password',
            fieldType: 'input',
            fieldValue: '',
            fieldInputType: 'password',
            fieldError : ''
        }
    ]);
    
    const handleSubmit = () => {
        let tempLoginFields = [...loginFields];
        let errors = false;
        tempLoginFields = tempLoginFields.map((o,index) => {
            const errValue = checkAndValidateLoginForm(o.fieldKey, o.fieldValue);
            if (errValue) errors = true;
            return {
                ...o,
                fieldError: errValue
            }
        });
        if (errors) {
            return setLoginFields(tempLoginFields);
        }
    }
    
    
    return (
        <>
            <div className="flex h-screen bg-cover bg-center p-20 overflow-hidden"
                style={{ backgroundImage: `url(${BgBurla})` }} >
                <div className="flex w-full rounded-xl  overflow-hidden shadow-2xl bg-gradient-to-br from-rose-300 to-gray-400">
                    <div className="w-7/12  h-full flex items-center justify-center shadow-xl">
                        <img src={LogoBurla} alt="description" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-5/12 bg-white h-full pt-24 pl-20">
                        <p className="text-4xl font-extrabold">Login</p>
                        <form onSubmit={(e) => e.preventDefault()}>
                            {
                                loginFields.map((o, index) => (
                                    <div key={index} className="flex flex-col space-y-2 mt-5"> {/* Added flex-col and spacing */}
                                        <label className="text-lg font-medium">{o.fieldLabel}</label>
                                        {
                                            o.fieldType === 'input' ? (
                                                <div>
                                                    <input
                                                        type={o.fieldInputType}
                                                        value={o.fieldValue}
                                                        onChange={(e) => {
                                                            const tempFields = [...loginFields];
                                                            tempFields[index].fieldValue = e.target.value;
                                                            setLoginFields(tempFields);
                                                        }}
                                                        className="border border-gray-300 rounded-md py-3 px-2 bg-gray-100 shadow-lg w-2/3" // Tailwind classes for styling
                                                    />
                                                    { o.fieldError ? <p className='text-red-500'>{ o.fieldError }</p> : <></>}
                                                </div>
                                            ) : null
                                        }
                                    </div>
                                ))
                            }
                            <div>
                                <button className='bg-blue-600 rounded-lg mt-5 px-6 py-3 text-white font-bold' onClick={handleSubmit}>Login</button>
                            </div>
                        </form>
                        <p className='mt-5'>Don't have an account yet? Please  
                            <Link to='/register' className='text-blue-600 underline font-semibold'>  Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;