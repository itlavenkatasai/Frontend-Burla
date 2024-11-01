import { useState } from "react";
import LogoBurla from "../images/LogoBurla.jpeg";
import { Link } from "react-router-dom";
import BgBurla from "../images/BgBurla.jpg";
import { checkAndValidateRegisterForm } from "../utils/Validate";
const Register = () => {
    const [registerFields, setRegisterFields] = useState([
        {
            fieldKey: 'firstName',
            fieldLabel: 'First Name',
            fieldType: 'input',
            fieldValue: '',
            fieldInputType: 'text',
            fieldError : ''
        },
        {
            fieldKey: 'lastName',
            fieldLabel: 'Last Name',
            fieldType: 'input',
            fieldValue: '',
            fieldInputType: 'text',
            fieldError : ''
        },
        {
            fieldKey: 'email',
            fieldLabel: 'Email',
            fieldType: 'input',
            fieldValue: '',
            fieldInputType: 'text',
            fieldError : ''
        },
        {
            fieldKey: 'phoneNumber',
            fieldLabel: 'Phone Number',
            fieldType: 'input',
            fieldValue: '',
            fieldInputType: 'text',
            fieldError : ''
        },
        {
            fieldKey: 'password',
            fieldLabel: 'Password',
            fieldType: 'input',
            fieldValue: '',
            fieldInputType: 'password',
            fieldError : ''
        },
        {
            fieldKey: 'confirmPwd',
            fieldLabel: 'Confirm Password',
            fieldType: 'input',
            fieldValue: '',
            fieldInputType: 'password',
            fieldError : '',
            dependentKey : 'password'
        }
    ]);
    const handleSubmit = () => {
        let tempRegisterFields = [...registerFields];
        let errors = false;
        tempRegisterFields = tempRegisterFields.map((o,index)=>{
            const dependentValue = o?.dependentKey ? tempRegisterFields.find((d)=>d.fieldKey === o.dependentKey)?.fieldValue : '';
            const errorVal = checkAndValidateRegisterForm(o.fieldKey,o.fieldValue,dependentValue );
            if(errorVal) errors = true;
            return {
                ...o,
                fieldError : errorVal
            }
        });
        console.log()
        if(errors){
            setRegisterFields(tempRegisterFields);
        }
    }
    return (
        <>
            <div className="flex h-screen bg-cover bg-center p-14 overflow-hidden"
                style={{ backgroundImage: `url(${BgBurla})` }}>
                <div className="flex w-full rounded-xl shadow-pink-600 overflow-hidden">
                    <div className="w-5/12  h-full flex items-center justify-center shadow-xl">
                        <img src={LogoBurla} alt="description" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-7/12 bg-white h-full pt-6 px-10">
                        <p className="text-4xl font-extrabold">Register</p>
                        <form onSubmit={(e)=>e.preventDefault()}>
                            <div className="flex mt-5 flex-wrap gap-3 justify-between">
                                {registerFields.map((o, index) => (
                                    <div key={index} className="flex flex-col space-y-1 mt-2 w-[48%]"> {/* 48% width to align two per row */}
                                        <label className="text-xl font-medium">{o.fieldLabel}</label>
                                        {
                                            o.fieldType === 'input' ?
                                            
                                            <div>
                                                <input
                                                type={o.fieldInputType}
                                                className="border py-3 px-6 bg-gray-100 shadow-2xl w-full rounded-md"
                                                value={o.fieldValue}
                                                onChange={(e) => {
                                                    console.log(e.target.value);
                                                    let tempFields = [...registerFields];
                                                    tempFields[index].fieldValue = e.target.value;
                                                    setRegisterFields(tempFields);
                                                }}
                                            /> 
                                            {o.fieldError ? <p className="text-red-600">{o.fieldError}</p> : <></>}
                                            </div>
                                            : <></>
                                        }

                                    </div>
                                ))}
                            </div>
                            <div className="flex">
                                <button className="bg-blue-600 rounded-lg mt-5 px-6 py-3 text-white font-bold shadow-lg" onClick={handleSubmit}>Register</button>
                            </div>
                        </form>
                        <p className="mt-5">Already have an account?
                            <Link to='/login' className="text-blue-600 underline font-semibold"> Log in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}   
export default Register;