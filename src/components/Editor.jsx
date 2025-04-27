import React, { useEffect, useRef } from "react";
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import List from "@editorjs/list";
import '../components/editorjs.css'
function Editor() {
    const editorInstance = useRef(null);
    const editorCont = useRef(null);
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
                    }
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

}

export default Editor;






