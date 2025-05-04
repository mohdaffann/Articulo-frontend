import React from "react";
import { CodeRenderer } from './CodeRenderer.jsx'
export const FullBlogRenderer = ({ blocks }) => {

    return (
        <div>
            {
                blocks.map((block, ind) => {
                    switch (block.type) {
                        case 'header':
                            return <div key={ind} className="font-bold text-5xl ">{block.data.text}</div>
                        case 'image':
                            return (
                                <div className="w-full flex mt-5">
                                    <img src={block.data.file.url} key={ind} className="w-full" />
                                </div>
                            )
                        case 'paragraph':
                            return <p className="text-[#242424] mt-5 font-normal text-[20px] md:text-[20px]">{block.data.text}</p>
                        case 'code':
                            return (

                                <CodeRenderer key={ind} data={block.data} />


                            )
                        case 'list':
                            return (
                                <div>
                                    {block.data.style === 'unordered' ? (
                                        <ul className="ml-4 list-disc mt-5 text-[#242424] font-normal text-[20px]">
                                            {
                                                block.data.items.map((item, ind) => (
                                                    <li key={ind}>
                                                        {item.content}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    ) : (
                                        <ol className="ml-4 list-decimal mt-5  text-[#242424] font-normal text-[20px]">
                                            {
                                                block.data.items.map((item, ind) => (
                                                    <li key={ind} >
                                                        {item.content}
                                                    </li>
                                                ))
                                            }
                                        </ol>
                                    )}
                                </div>
                            )
                    }
                })
            }
        </div>
    )
}

