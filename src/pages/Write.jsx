import React, { useRef, useState } from "react";
import Editor from "../components/Editor.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Write() {
    const navigate = useNavigate();
    const editorjsRef = useRef(null);
    const [required, setRequired] = useState('');
    const handleSubmit = async () => {
        try {
            const savedData = await editorjsRef.current.save();
            const titleBlock = savedData.blocks.find((item) =>
                item.type === 'header' &&
                item.data && item.data.text.trim() !== ''
            );
            const hasDesc = savedData.blocks.some((item) =>
                item.type === 'paragraph' &&
                item.data && item.data.text.trim() !== ''
            );
            if (!titleBlock || !hasDesc) {
                setRequired("Both Title and Description are strictly required");
                return setTimeout(() => setRequired(""), 3000);

            }
            console.log('Editorjs saved :', savedData);
            const title = titleBlock.data.text;
            const description = savedData;

            const res = await axios.post('/v1/blog', {
                title,
                description
            },
                { withCredentials: true });

            if (res && res.data) {
                console.log('blog posted successfully ', res.data);
                return navigate('/posts');
            }



        } catch (error) {
            return console.log('error in Publishing', error);

        }

    }
    return (
        <div className="min-h-screen w-full flex justify-center px-2 sm:px-4">
            <div className="w-full max-w-3xl p-4 sm:p-6">
                <Editor ref={editorjsRef} />
                <div className="flex justify-end mt-1">
                    <button className="rounded-md px-2 py-1 transition-all text-white duration-300 ease-in-out bg-green-600 hover:bg-green-700 "
                        onClick={handleSubmit}
                    >Publish</button>
                </div>
                {required && (
                    <p className="text-red-600 mt-2 transition-opacity duration-500">{required}</p>
                )}
            </div>


        </div>
    )
}

export default Write;
