import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMessage, faBell, faImage, faGear, faPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import {NavLink, useNavigate} from 'react-router-dom';
import ConveSenseImage from "../../assets/convoSense.png"


export default function Sidebar() {
    const initialState = [
        { icon: faMessage, clicked: false, path: "messages" },
        { icon: faUser, clicked: false, path: "profile" },
        { icon: faBell, clicked: false, path: "notifications" },
        { icon : faPlus, clicked : false, path : "addfriend"}
    ];

    const [icons, setIcons] = useState(initialState);
    const navigate = useNavigate();

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

    const handleLogout = () => {

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
