import React, {useState} from 'react'
import RegisterModal from './RegisterModal'
import Cover from "../../assets/registerPage.avif"
import VerifyRegister from './VerifyRegister';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export default function Register() {
  const [isFormFillUpComplete, setFormFillUpComplete] = useState(false)
  const handleFormFillUpComplete = () => {
    setFormFillUpComplete(true);
  };

  return (
    <>
    <Navbar/>
    <div className="max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="w-full relative ">
        <img className="absolute inset-0 object-cover w-full h-full" src={Cover} alt="Background Image" />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-75"></div>
            <div className="flex flex-col items-start justify-center h-screen p-12 relative z-10">
                <p className="text-4xl text-white ">Where Every Voice Matters!</p>
                <p className="text-4xl text-white">Chat 24/7, Bringing 360° Inclusivity to Your Conversations</p>
            </div>
        </div>
        <div className="w-full">
          {
            isFormFillUpComplete ?
            (
              <VerifyRegister/>
            ):
            (
              <RegisterModal onFormFillUpComplete = {handleFormFillUpComplete}/>
            )
          }
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}
