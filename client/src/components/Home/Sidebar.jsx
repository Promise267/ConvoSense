import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faMessage, faBell, faImage, faGear, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    const initialState = [
        { icon: faMessage, clicked: false, path: "messages" },
        { icon: faPhone, clicked: false, path: "calls" },
        { icon: faUser, clicked: false, path: "profile" },
        { icon: faBell, clicked: false, path: "notifications" },
        {icon : faPlus, clicked : false, path : "addfriend"}
    ];

    const [icons, setIcons] = useState(initialState);

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
                        <FontAwesomeIcon icon={faImage} size='xl' style={{ color: "#9ca3af", }} />
                    </div>
                    <div className="m-3 mb-10 cursor-pointer">
                        <FontAwesomeIcon icon={faGear} size='xl' style={{ color: "#9ca3af", }} />
                    </div>
                </div>
            </div>
        </>
    )
}
