import React, {useState} from 'react'
import axios from 'axios';
import ConveSenseImage from "../../assets/convoSense.png"
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import FieldIndicators from '../Indicators/FieldIndicators';
import { useNavigate } from 'react-router-dom';
import { addToken } from "../../redux/authentication/authenticationSlice"
import 'react-toastify/dist/ReactToastify.css';
export default function VerifyRegister() {
  
  const getCredentials = useSelector(state => state.credential)
  const [code, setCode] = useState('');
  const [showIndicator, setShowIndicator] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendCode(e);
  }

  const handleSendCode = async(e) =>{
    e.preventDefault();
    const url = `${import.meta.env.VITE_BACKEND_URI}` + "/verifyCode"
    await axios.post(url, {code, phoneNumber : getCredentials.phoneNumber}).then((result) => {
      if(result){
        handleCodeSuccess();
      }
    }).catch((err) => {
      if (err.response && err.response.status === 409) {
          toast.info(`${err.response.data.message}`);
      } else if(err.response && err.response.status === 403) {
          toast.info(`${err.response.data.message}`);
      }
    });
  }

  const handleCodeSuccess = async(e) => {
    const url = `${import.meta.env.VITE_BACKEND_URI}` + "/auth/postUser"
    await axios.post(url, {
      firstName: getCredentials.firstName,
      lastName: getCredentials.lastName,
      gender: getCredentials.gender,
      email: getCredentials.email,
      password: getCredentials.password,
      dialCode: getCredentials.dialCode,
      phoneNumber: getCredentials.phoneNumber,
      dateofbirth: getCredentials.dateofbirth
    }).then((result) => {
      if(result){
        handleGetToken();
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleGetToken = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URI}/sendToken`;
    try {
        const result = await axios.post(url, { phoneNumber:getCredentials.phoneNumber }, { withCredentials: true });
        if (result) {
            dispatch(addToken(
                { token : result.data.accessToken }));
            navigate(result.data.redirect);
        }
    } catch (err) {
        console.error(err);
    }
};

  const handleCodeResend = (e) => {
    e.preventDefault();
    handleSendCode();
    toast.info(`Code sent to the Phone Number ${getCredentials.dialCode + getCredentials.phoneNumber}`)
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
                        Verify Your Account
                    </h1>
                    <div>
                      <p className="text-xs text-center">An OTP has been sent to the Phone Number {`${getCredentials.dialCode + getCredentials.phoneNumber}`}</p>
                    </div>
                    <form className="space-y-2" onSubmit={handleSubmit}>
                        <div>
                            <input
                            type="text"
                            name="code"
                            id="code"
                            className="appearance-none rounded w-full py-3 px-4 mr-2 text-gray-700 leading-tight hover:shadow-lg transition duration-300 focus:outline-none text-center"
                            placeholder="Enter the OTP"
                            value={code}
                            onChange={(e)=>{setCode(e.target.value)}}
                            required=""
                            />
                        </div>
                        <div className="text-center">
                          {showIndicator && <FieldIndicators text={code}/>}
                        </div>
                        <div>
                          <button
                              type="submit"
                              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold py-2 px-4 rounded hover:opacity-75 hover:shadow-lg transition  duration-300 ease-in-out"
                          >
                              Verify
                          </button>
                        </div>
                        <div>
                          <p className="text-xs text-center text-gray-700">Didn't get the code? <button className="text-blue-500 underline" onClick={handleCodeResend}>Send again</button> </p>
                        </div>
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
