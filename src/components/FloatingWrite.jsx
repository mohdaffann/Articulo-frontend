import React from "react";
import authStore from "../store/authStore";
import { Link } from "react-router-dom";
function FloatingWrite() {
    const user = authStore((s) => s.user);
    if (!user) return null;
    return (
        <Link to={'/write'}
            className="md:hidden fixed bottom-5 right-5 p-3.5 shadow-lg bg-white rounded-full border-2 border-pink-200 hover:shadow-pink-400 hover:shadow-lg transition-all ease-in-out z-50 "
        >
            <img src="https://res.cloudinary.com/dfmtemqoz/image/upload/v1751171507/write_c5r5kv.png" className="h-8 w-8" />
        </Link>
    )
}

export default FloatingWrite;
