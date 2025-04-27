import React from "react";
import Editor from "../components/Editor.jsx";

function Write() {
    return (
        <div className="min-h-screen w-full flex justify-center px-2 sm:px-4">
            <div className="w-full max-w-3xl p-4 sm:p-6">
                <Editor />
            </div>


        </div>
    )
}

export default Write;
