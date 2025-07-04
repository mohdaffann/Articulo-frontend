import React, { useState } from "react";
import { Copy } from 'lucide-react'
export const CodeRenderer = ({ data }) => {
    const [copy, setCopy] = useState(false)
    const lines = data.code?.split('\n');

    const copyClipboard = async () => {
        await navigator.clipboard.writeText(data.code);
        setCopy(true);
        setTimeout(() => setCopy(false), 2000);
    }
    return (
        <div className="flex w-full   mt-6 px-4 py-6 flex-col  bg-gray-100    rounded-lg ">
            <div className="flex  flex-row border-b-2 mb-1.5 border-b-gray-300 justify-between items-center px-4 py-2 bg-gray-100">
                <span className="text-pink-500  text-[18px] font-mono">
                    {data.language || 'Code'}
                </span>
                {
                    data.showCopyButton && (
                        <button onClick={copyClipboard}
                            className="flex items-center text-[18px] cursor-pointer text-green-600 transform duration-300 transition-all  hover:text-green-500">
                            <Copy className="w-[18px] mr-1" />
                            {
                                copy ? (
                                    'copied!'
                                ) : (
                                    'copy'
                                )
                            }
                        </button>
                    )
                }
            </div>
            <pre className="max-w-full overflow-x-auto md:whitespace-pre whitespace-pre-wrap">
                {
                    lines.map((item, ind) => (
                        <div key={ind} className="flex ">
                            {
                                data.showlinenumbers && (
                                    <span className="text-gray-500 mr-4 select-none text-[19px] text-right inline-block in-w-[2ch] flex-shrink-0">{ind + 1}</span>

                                )
                            }
                            <code className="flex-1 text-[15px] mb-1.5 md:break-normal break-words">
                                {item}
                            </code>
                        </div>
                    ))
                }
            </pre>

        </div>
    );
}