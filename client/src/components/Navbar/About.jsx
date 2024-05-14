import React from 'react'
import Navbar from './Navbar'
import Footer from '../Footer/Footer'
import AboutWelcome from "../../assets/aboutWelcome.jpg"
import AboutExpress from "../../assets/aboutExpress.jpg"
import AboutBuild from "../../assets/aboutBuild.jpg"
import AboutJoin from "../../assets/aboutJoin.jpg"


export default function About() {
  return (
    <>
    <div>
      <Navbar/>
      <div className="max-w-screen-xl mx-auto">

        <div class="flex flex-col lg:flex-row items-center mb-4 text-justify p-12">
          <div class="flex flex-col items-center w-1/2">
            <img src={AboutWelcome} className="rounded-2xl w-10/12" />
          </div>
          <div class="flex flex-col w-1/2 text-2xl font-light">
            <p>Welcome to our innovative chat application that redefines how you communicate online! Our MERN stack chat app with gesture-to-text translation support is designed to make your conversations more expressive and engaging. Imagine chatting with your friends, family, or colleagues using not just text, but also gestures that are instantly translated into text. This unique feature allows you to express yourself in a whole new way, adding depth and emotion to your messages.</p>
          </div>
        </div>

        <div class="flex flex-row-reverse items-center mb-4 text-justify p-12">
          <div class="flex flex-col items-end justify-center  w-1/2">
            <img src={AboutExpress} className="rounded-2xl w-10/12" />
          </div>
          <div class="flex flex-col w-1/2 text-2xl font-light">
            <p>Express yourself like never before with our app's unique feature. Whether you're sharing a funny story, expressing your emotions, or simply chatting with friends, our gesture-to-text translation adds a new dimension to your conversations. With a simple gesture, you can convey complex thoughts and feelings, making your messages more meaningful and impactful. Say goodbye to misunderstandings and misinterpretations - with our app, your message is always clear.</p>
          </div>
        </div>

        <div class="flex flex-row items-center mb-4 text-justify p-12">
          <div class="flex flex-col items-start w-1/2">
          <img src={AboutBuild} className="rounded-2xl w-10/12" />
          </div>
          <div class="flex flex-col w-1/2 text-2xl font-light">
            <p>Powered by cutting-edge technology, our app ensures a smooth and seamless chatting experience. Our MERN stack architecture provides a solid foundation for our app, ensuring reliability and scalability. The user-friendly interface and intuitive design make connecting with others a breeze. Whether you're a tech enthusiast or just looking for a fun way to chat, our app is perfect for users of all levels.</p>
          </div>
        </div>

        <div class="flex flex-row-reverse items-center mb-4 text-justify p-12">
            <img src={AboutJoin} className="rounded-2xl w-5/12" />
          <div class="flex flex-col items-start w-1/2">
          </div>
          <div class="flex flex-col w-1/2 text-2xl font-light">
            <p>Join us and experience the future of communication. Try our MERN stack chat app with gesture-to-text translation support today and discover a whole new way to chat online! Connect with friends, express yourself with gestures, and enjoy a more immersive chatting experience. With our app, the possibilities are endless.</p>
          </div>
        </div>

      </div>
      <Footer/>
    </div>
    </>
  )
}
