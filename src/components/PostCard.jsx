import React, { useEffect, useState } from "react";
import { Heart as Like, LucideMessageCircle as Cmt, UserIcon } from 'lucide-react';
function PostCard({ post }) {

    const imageBlock = post?.description?.blocks?.find((item) => (
        item.type === 'image'
    ))

    const ImageUrl = imageBlock?.data?.file?.url || 'https://steptodown.com/istock-downloader/images/steptodown.com623202.jpg';
    const paraBlock = post?.description?.blocks?.find((item) => (
        item.type === 'paragraph'
    ));

    const paragraph = paraBlock?.data?.text;




    return (

        <div className="  cursor-pointer flex flex-row md:flex-row bg-white   overflow-hidden border-b-2 border-b-gray-100">

            <div className="flex-1 p-4 md:p-6 flex-row">

                <div className="flex items-center mb-2 md:mb-4">
                    <img
                        src={post.user.profile}
                        alt={<UserIcon />}
                        className="w-8 h-8 md:w-10 md:h-10 object-cover mr-2 md:mr-3"
                    />
                    <span className="font-medium text-gray-800 text-sm md:text-base">{post.user.userName}</span>
                </div>


                <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">{post.title}</h2>


                <div className="text-sm mb-3 line-clamp-2 md:text-base text-gray-600 md:mb-6 md:line-clamp-2">{paragraph}</div>


                <div className="flex flex-row items-center justify-between w-45">
                    <span className="text-gray-600 text-sm">{post.createdAt.toString().substring(0, 10)}</span>
                    <div className="flex flex-row ">
                        <Like className="w-4 pr-0.5" />
                        <span className="text-gray-600 text-sm">{post.likes || 0}</span>
                    </div>
                    <div className="flex flex-row ">
                        <Cmt className="w-[15px] pr-0.5" />
                        <span className="text-gray-600 text-sm pt-[0.5px]">{post.comments || 0}</span>
                    </div>
                </div>

            </div>
            <div className="w-[130px] md:w-48 lg:w-64 h-auto overflow-hidden flex-shrink-0 flex items-center justify-center">
                <img
                    src={ImageUrl}
                    className="h-auto w-full object-cover "
                />
            </div>


        </div>

    )


}

export default PostCard;
