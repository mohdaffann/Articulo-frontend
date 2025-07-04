import { Settings2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Dropdown({ userName, Id, handleLogout }) {
    const [open, setIsOpen] = useState(false)
    return (
        <div className="flex flex-row">
            <button onClick={() => setIsOpen(!open)} className="flex cursor-pointer text-gray-700">Account <Settings2 className="w-5 h-5" /></button>
            {open &&
                <div className="absolute mt-6 left-0 w-full  md:right-0 md:left-auto md:w-48 bg-white rounded-md shadow-lg z-50 flex flex-col items-start">
                    <Link to={`/profile/${userName}`} onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0">Profile</Link>
                    <Link to={`/settings`} onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-1"> Settings</Link>
                    <button type="button" onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer" role="menuitem" tabIndex="-1" id="menu-item-2">Logout</button>

                </div>

            }


        </div>

    )
}

export default Dropdown;
