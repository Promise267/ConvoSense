import React, { useState } from 'react';
import {Link} from "react-router-dom"
import {ToastContainer, toast} from 'react-toastify';
import {useDispatch} from "react-redux"
import {addCredentials} from "../../redux/verification/credentialSlice"
import PasswordIndicator from "../Indicators/PasswordStrengthIndicator"
import ConfirmPasswordIndicator from '../Indicators/ConfirmPasswordIndicator';
import FieldIndicators from "../Indicators/FieldIndicators"
import ConveSenseImage from "../../assets/convoSense.png"
import DatePicker from "react-datepicker"
import PhoneInput from "react-phone-input-2";
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-input-2/lib/bootstrap.css'
import "react-datepicker/dist/react-datepicker.css";

export default function RegisterModal(props) {

    const dispatch = useDispatch();

    const [creds, setCreds] = useState({
        firstName : "",
        lastName : "",
        gender : "",
        email : "",
        password : "",
        confirmPassword : "",
    })

    const [dialCode, setDialCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateofbirth, setDateofbirth] = useState(null)
    const [isChecked, setChecked] = useState(false)
    const [showIndicator, setShowIndicator] = useState(false)

    const handleChange = (e) => {
        e.preventDefault();
        const {name, checked, value } = e.target
            setCreds((prevValue)=>{
                return{
                    ...prevValue,
                    [name]: value

                }
            })
        }

    const handleContinue = (e) => {
        e.preventDefault()
        if(
            creds.firstName !== "" &&
            creds.lastName !== "" &&
            dateofbirth !== null &&
            phoneNumber !== "" &&
            creds.gender !== "" &&
            creds.email !== "" &&
            creds.password !== "" &
            creds.confirmPassword !== "" &&
            isChecked == true
            ){
                const serializableDate = dateofbirth instanceof Date ? dateofbirth.getTime() : null;
                dispatch(
                    addCredentials({
                        firstName : creds.firstName,
                        lastName : creds.lastName,
                        gender : creds.gender,
                        email : creds.email,
                        password : creds.password,
                        confirmPassword : creds.confirmPassword,
                        dialCode : dialCode,
                        phoneNumber : phoneNumber,
                        dateofbirth : serializableDate,
                        isChecked : isChecked
                    }
                    ))
                setShowIndicator(false);
                props.onFormFillUpComplete()
            }
        else{
            setShowIndicator(true)
            toast.warn('Please enter the fields');
        }
    }



    return (
    <>
    <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
    />
    <div className="mx-auto md:h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 h-screen">
            <div className="w-full bg-white rounded-lg sm:max-w-xl xl:p-0 shadow-lg">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl text-center font-sans leading-tight tracking-tight text-gray-500 md:text-2xl">
                        Create an account
                    </h1>

                    <form className="space-y-2" onSubmit={handleContinue}>
                        <div className="flex flex-row">
                            <div>
                                <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                className="appearance-none rounded w-full py-3 px-4 mr-2 text-gray-700 leading-tight hover:shadow-lg transition duration-300 focus:outline-none"
                                placeholder="First Name"
                                value={creds.firstName}
                                onChange={handleChange}
                                required=""
                                />
                                {showIndicator && <FieldIndicators text={creds.firstName} />}
                            </div>
                            <div>
                                <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                className="appearance-none rounded w-full py-3 px-4 mr-2 text-gray-700 leading-tight hover:shadow-lg transition duration-300 focus:outline-none"
                                placeholder="Last Name"
                                value={creds.lastName}
                                onChange={handleChange}
                                required=""/>
                                {showIndicator && <FieldIndicators text={creds.lastName} />}
                            </div>
                        </div>

                        <div className="flex flex-row">
                            <div>
                                <DatePicker
                                    className="appearance-none rounded borderw-full py-6 px-4 mr-2 text-gray-700 leading-tight hover:shadow-lg transition duration-300 focus:outline-none"
                                    dateFormat="MM/dd/yyyy"
                                    name="dateofbirth"
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    maxDate={new Date()}
                                    dropdownMode="select"
                                    placeholderText="Date of Birth"
                                    selected={dateofbirth}
                                    onChange={date=>setDateofbirth(date)}
                                />
                                    
                            </div>
                            <div>
                                <PhoneInput
                                    country={'us'}
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    inputProps={{
                                        name: 'phone',
                                        required: true,
                                    }}
                                    value={phoneNumber}
                                    onChange={(value, country, event, formattedValue) => {
                                        setDialCode(country.dialCode)
                                        const extractedPhoneNumber = formattedValue.replace(value?.dialCode, '');
                                        setPhoneNumber(extractedPhoneNumber);
                                    }}
                                />
                                {showIndicator && <FieldIndicators text={phoneNumber} />}
                            </div>
                        </div>

                        <div>
                            <select
                                name="gender"
                                className="appearance-none rounded w-full py-3 px-4 mr-2 text-gray-700 leading-tight hover:shadow-lg transition duration-300 focus:outline-none"
                                id="gender"
                                onChange={handleChange}
                                value={creds.gender}
                                >
                                <option value="" disabled>Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {showIndicator && <FieldIndicators text={creds.gender} />}
                        </div>

                        <div>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="appearance-none rounded w-full py-3 px-4 mr-2 text-gray-700 leading-tight hover:shadow-lg transition duration-300 focus:outline-none"
                                placeholder="name@company.com"
                                value={creds.email}
                                onChange={handleChange}
                                required=""/>
                        </div>
                        {showIndicator && <FieldIndicators text={creds.email} />}

                        <div>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="appearance-none rounded w-full py-3 px-4 mr-2 text-gray-700 leading-tight hover:shadow-lg transition duration-300 focus:outline-none"
                                placeholder="*******"
                                value={creds.password}
                                onChange={handleChange}
                            />
                            {showIndicator && <FieldIndicators text={creds.password} />}
                            <PasswordIndicator password={creds.password}/>
                        </div>

                        <div>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                className="appearance-none rounded w-full py-3 px-4 mr-2 text-gray-700 leading-tight hover:shadow-lg transition duration-300 focus:outline-none"
                                value={creds.confirmPassword}
                                placeholder="*******"
                                onChange={handleChange}
                                required=""/>
                                {showIndicator && <FieldIndicators text={creds.confirmPassword} />}
                                <ConfirmPasswordIndicator password={creds.password} confirmPassword={creds.confirmPassword}/>
                        </div>

                        <div>
                            <div className="flex">
                                <div>
                                    <input
                                        id="terms"
                                        name = "terms"
                                        aria-describedby="terms"
                                        type="checkbox"
                                        checked = {isChecked}
                                        onChange={(e) => {
                                            setChecked(e.target.checked)
                                        }}
                                        className="ml-2 w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                        required=""/>
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms"className="font-lighttext-gray-500 dark:text-gray-900">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                </div>
                            </div>
                            {showIndicator && <FieldIndicators text={creds.email}/>}

                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold py-2 px-4 rounded hover:opacity-75 hover:shadow-lg transition  duration-300 ease-in-out"
                        >
                            Continue
                        </button>

                        <p className="text-sm font-light text-gray-500">
                            Already have an account? <Link className="font-medium text-primary-600 hover:underline" to = "/login">Login</Link>
                        </p>

                        <div className="flex flex-row items-center justify-center">
                            <img className="w-8 h-8 mr-2" src={ConveSenseImage} alt="logo"/>
                            <div className="font-mono text-2xl text-gray-500">
                                ConvoSense
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
