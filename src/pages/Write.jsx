import React from "react";
import Editor from "../components/Editor.jsx";

function Write() {
    return (
        <div className="min-h-screen w-full flex justify-center px-2 sm:px-4">
            <div className="w-full max-w-3xl p-4 sm:p-6">
                <Editor />
                <div className="flex justify-end mt-1">
                    <button className="rounded-md px-2 py-1 transition-all text-white duration-300 ease-in-out bg-green-600 hover:bg-green-700 ">Publish</button>
                </div>
            </div>


        </div>
    )
}

export default Write;
