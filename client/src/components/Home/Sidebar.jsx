import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMessage, faBell, faImage, faGear, faPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import {NavLink, useNavigate} from 'react-router-dom';
import ConveSenseImage from "../../assets/convoSense.png"
import Cookie from "js-cookie"
import axios from "axios"
import { useDispatch } from "react-redux"

export default function Sidebar() {
    const initialState = [
        { icon: faMessage, clicked: false, path: "messages" },
        { icon: faUser, clicked: false, path: "profile" },
        { icon: faBell, clicked: false, path: "notifications" },
        { icon : faPlus, clicked : false, path : "addfriend"}
    ];

    const [icons, setIcons] = useState(initialState);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const selectedIconIndex = localStorage.getItem('selectedIconIndex');
        if (selectedIconIndex) {
            const newIcons = icons.map((icon, index) => ({
                ...icon,
                clicked: index === parseInt(selectedIconIndex)
            }));
            setIcons(newIcons);
        }
    }, []);

    const handleIconClick = (index) => {
        const newIcons = icons.map((icon, i) => ({
            ...icon,
            clicked: i === index
        }));
        setIcons(newIcons);
        localStorage.setItem('selectedIconIndex', index);
    };

    function deleteCookie() {
        // retrieve all cookies
        var Cookies = document.cookie.split(';');
        // set past expiry to all cookies
        for (var i = 0; i < Cookies.length; i++) {
        document.cookie = Cookies[i] + "=; expires="+ new Date(0).toUTCString();
        }
      }

    const handleLogout = async() => {
        try {
            const result = await axios.delete("http://localhost:5000/deleteToken")
            if(result){
                deleteCookie();
                // console.log(result.data.redirect);
                // persistor.purge(['credential'], ['chatWindow']);
                // persistor.persist()
                navigate(`${result.data.redirect}`);
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <div className="flex flex-col h-screen justify-between px-4">
                <div className="first space-y-10">
                    
                    {icons.map((item, index) => (
                        <div key={index} className={`flex flex-row m-3 mt-10 cursor-pointer`} onClick={() => handleIconClick(index)}>
                            <NavLink to={item.path}>
                                <FontAwesomeIcon icon={item.icon} bounce={item.clicked} size='xl' style={{ color: item.clicked ? "#f97316" : "#9ca3af", animationIterationCount: 1 }} />
                            </NavLink>
                        </div>
                    ))}
                </div>
                <div className='second pt-10'>
                    <div className="m-3 mb-10 cursor-pointer">
                        <button onClick={handleLogout}>
                            <FontAwesomeIcon icon={faRightFromBracket} size='xl' style={{ color: "#9ca3af", }} />
                        </button>
                    </div>
                    <div className="m-3 mb-10 cursor-pointer">
                        <img className="w-9 h-10" src={ConveSenseImage} alt="logo"/>
                    </div>
                    
                </div>
            </div>
        </>
    )
}
