import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import EditorjsList from '@editorjs/list';
import ImageTool from '@editorjs/image';
import editorjsCodecup from '@calumk/editorjs-codecup';
import '../components/editorjs.css';
import axios from '../axiosInstance.js';
const Editor = forwardRef((props, ref) => {

    const editorInstance = useRef(null);
    const editorCont = useRef(null);
    useImperativeHandle(ref, () => ({
        async save() {
            return await editorInstance?.current?.save();
        }
    }
    ));
    useEffect(() => {
        if (!editorInstance.current && editorCont.current) {
            editorInstance.current = new EditorJS({
                holder: editorCont.current,
                autofocus: true,
                tools: {
                    header: {
                        class: Header,
                        config: {
                            placeholder: "Title...",
                            levels: [1],
                            defaultLevel: 1,
                        }
                    },
                    paragraph: {
                        class: Paragraph,
                        inlineToolbar: true,
                    },
                    list: {
                        class: EditorjsList,
                        inlineToolbar: true,
                        config: {
                            defaultStyle: 'unordered'
                        }
                    },
                    image: {
                        class: ImageTool,
                        config: {
                            uploader: {
                                async uploadByFile(file) {
                                    const formData = new FormData();
                                    formData.append('file', file);
                                    const res = await axios.post('v1/editorjs-image-upload', formData,
                                        {
                                            withCredentials: true,
                                            headers: {
                                                'Content-Type': 'multipart/form-data'
                                            }
                                        }
                                    );
                                    return res.data;
                                }
                            }
                        }
                    },
                    code: editorjsCodecup,

                },
                data: {
                    blocks: [
                        {
                            type: "header",
                            data: {
                                text: "",
                                level: 1,
                                placeholder: "Title..."
                            }
                        }
                    ]
                }

            })
        }
        return () => {
            if (editorInstance.current) {
                editorInstance.current.destroy();
                editorInstance.current = null;
            }
        }
    }, [])
    return (
        <div ref={editorCont} className="w-full" ></div>
    )

})



export default Editor;






