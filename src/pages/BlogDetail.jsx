import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchId } from '../customHooks/useFetchId.js'
import { FullBlogRenderer } from "../components/fullBlogRenderer.jsx";
import { UserCircle2 as User } from 'lucide-react';
import EditorLoader from "../components/EditorLoader.jsx";
import CommentSection from "../components/CommentSection.jsx";
function BlogDetail() {

    const { id } = useParams();
    const { blog, loading } = useFetchId(id);
    console.log('blog', blog);

    return (
        <div className="w-full flex flex-col justify-center items-center  px-4 sm:px-6 mt-12">

            <div className="w-full max-w-[720px] flex flex-col mb-6 items-center justify-start">
                {loading ? <EditorLoader /> :
                    <>
                        <div className="flex flex-row items-center justify-start w-full mb-4 gap-2">
                            <img src={blog?.user?.profile} alt={<User />} className="w-10 h-10 rounded-b-full object-cover" />

                            <div className="flex flex-col">
                                <div className="flex gap-2 items-center">
                                    <p className="text-lg font-semibold text-gray-900 font-serif">{blog.user?.userName}</p>
                                    <span className="text-sm text-gray-500">4 min read</span>
                                    <span className="text-sm text-gray-500"> . {blog.createdAt.substring(0, 10)}</span>
                                    <button className="px-2 py-1 rounded-sm border-2 text-sm transition duration-200  text-gray-700 border-gray-700
                                    hover:bg-gray-700 hover:text-gray-100 cursor-pointer
                                    ">Follow</button>
                                </div>



                            </div>


                        </div>
                        <FullBlogRenderer blocks={blog.description?.blocks} />
                    </>

                }
            </div>
            <div className="w-full max-w-[720px] flex flex-col ">
                <CommentSection blogId={id} />
            </div>
        </div>

    )

}

export default BlogDetail;
