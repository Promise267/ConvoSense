import React, {useState} from 'react';
import axios from "axios"
import { addCredentials } from '../../redux/verification/credentialSlice';
import { addToken } from '../../redux/authentication/authenticationSlice';
import PhoneInput from "react-phone-input-2";
import {ToastContainer, toast} from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink, useNavigate} from 'react-router-dom';
import FieldIndicators from "../Indicators/FieldIndicators"
import 'react-toastify/dist/ReactToastify.css';


export default function LoginModal() {
    const [dialCode, setDialCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showIndicator, setShowIndicator] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getToken = useSelector(state => state.authentication)

    const handleGetToken = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URI}/sendToken`;
        try {
            const result = await axios.post(url, { phoneNumber }, { withCredentials: true });
            if (result) {
                dispatch(addToken(
                    { token : result.data.accessToken }));
                navigate(`${result.data.redirect}`);
            }
        } catch (err) {
            console.error(err);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (phoneNumber !== "" && password !== "") {
        setShowIndicator(false);
        const url = `${import.meta.env.VITE_BACKEND_URI}/auth/findUser`;
        try {
            const result = await axios.post(url, { dialCode: dialCode, phoneNumber: phoneNumber, password: password });
            dispatch(
            addCredentials({
                firstName: result.data.user.firstName,
                lastName: result.data.user.lastName,
                gender: result.data.user.gender,
                email: result.data.user.email,
                password: result.data.user.password,
                dialCode: result.data.user.dialCode,
                phoneNumber: result.data.user.phoneNumber,
                dateofbirth: result.data.user.dateofbirth
            })
            );
            // Await the dispatch operation before calling handleGetToken
            await handleGetToken();
        } catch (err) {
            toast.error(`${err.response.data.message}`);
        }
        } else {
        setShowIndicator(true);
        toast.warn("Please enter the fields");
        }
    };

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
    <div className="flex flex-col justify-center space-x-12 z-10">
    <div className="flex flex-col text-gradient text-7xl">
        <p className="font-medium m-5">Hang out</p>
        <p className="font-medium m-5 mt-[-1rem]">anytime</p>
        <p className="font-medium m-5 mt-[-1rem]">anywhere!</p>
    </div>
    <div className="flex flex-col mt-8 mb-8">
        <form action="" onSubmit={handleSubmit}>
        <PhoneInput
            country={'us'}
            name="phoneNumber"
            id="phoneNumber"
            inputProps={{
                name: 'phone',
                required: true,
            }}
            onChange={(value, country, event, formattedValue) => {
                setDialCode(`+${country.dialCode}`)
                const extractedPhoneNumber = value.slice(country.dialCode.length);
                setPhoneNumber(extractedPhoneNumber);
            }}
        />
        {showIndicator && <FieldIndicators text={phoneNumber} />}
        <input
            className="appearance-none rounded mt-4 py-3 px-4 mr-2 text-gray-700 leading-tight hover:shadow-lg transition duration-300 focus:outline-none w-5/6"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            />
        {showIndicator && <FieldIndicators text={password} />}
        <button
            className="w-5/6 mt-4  bg-orange-500 text-white font-medium py-2 px-4 rounded hover:opacity-75 hover:shadow-lg transition  duration-300 ease-in-out"
            type="submit"
            >
                Log In
            </button>
        </form>
        <hr className="mt-12 mb-12"/>
        <div className="flex flex-col space-x-4 mr-16">
        </div>
        <div>
        <p className="text-sm font-light text-gray-500">Dont have an account? <span className="font-medium text-primary-600 hover:underline"><NavLink to="/register">Register</NavLink></span></p>
        </div>
    </div>
    </div>

    </>
  )
}
