import React, { useRef, useState, lazy, Suspense, useEffect } from "react";
import axios from "axios";
import EditorLoader from "../components/EditorLoader.jsx";
import authStore from "../store/authStore.js";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { XCircleIcon, XIcon } from "lucide-react";
const Editor = lazy(() => import('../components/Editor.jsx'));
function Write() {
    const queryClient = useQueryClient();
    const user = authStore((s) => s.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/home')
        }
    }, [user, navigate])
    const editorjsRef = useRef(null);
    const [required, setRequired] = useState('');
    const [category, setCategory] = useState(null);
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
                description,
                category: category || 'Others'
            },
                { withCredentials: true });

            if (res && res.data) {
                console.log('blog posted successfully ', res.data);
                queryClient.invalidateQueries({
                    queryKey: ['posts'],
                    exact: true
                })
                return navigate('/posts');
            }



        } catch (error) {
            return console.log('error in Publishing', error);


        }

    }
    return (
        <div className="min-h-screen w-full flex justify-center px-2 sm:px-4">
            <div className="w-full max-w-3xl p-4 sm:p-6">

                <Suspense fallback={<EditorLoader />}>
                    <div className="flex items-center space-x-3.5 mt-11">
                        <button className="px-1.5 py-0.5 cursor-pointer bg-blue-200 rounded-md" onClick={() => setCategory('Sports')}>Sports</button>
                        <button className="px-1.5 py-0.5 cursor-pointer bg-pink-300 rounded-md" onClick={() => setCategory('Music')}>Music</button>
                        <button className="px-1.5 py-0.5 cursor-pointer bg-green-300 rounded-md" onClick={() => setCategory('News')}>News</button>
                        <button className="px-1.5 py-0.5 cursor-pointer bg-orange-300 rounded-md" onClick={() => setCategory('Tech')}>Tech</button>

                    </div>
                    <div className="mt-2.5">
                        {category &&
                            <div className="flex space-x-1.5">
                                <span>Category : </span>
                                <button
                                    className={`px-1.5 flex py-0.5 ${category === 'Sports' ? `bg-blue-200` : category === 'Music' ? 'bg-pink-300' : category === 'News' ? 'bg-green-300' : category === 'Tech' ? 'bg-orange-300' : null}
                         rounded-md 
                         `} onClick={() => setCategory(null)} ><span className="pr-0.5">{category}</span><XCircleIcon className="w-4" /></button>
                            </div>


                        }
                    </div>
                    <Editor ref={editorjsRef} />
                </Suspense>

                <div className="flex justify-end mt-1">
                    <button className="cursor-pointer rounded-md px-2 py-1 transition-all text-white duration-300 ease-in-out bg-green-600 hover:bg-green-700 "
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
