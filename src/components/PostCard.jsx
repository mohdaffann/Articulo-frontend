import React, { useEffect, useState } from "react";
import { Heart as Like, LucideMessageCircle as Cmt, UserCircle2Icon } from 'lucide-react';
function PostCard({ post, layoutType }) {

    const imageBlock = post?.description?.blocks?.find((item) => (
        item.type === 'image'
    ))

    const ImageUrl = imageBlock?.data?.file?.url || 'https://steptodown.com/istock-downloader/images/steptodown.com623202.jpg';
    const paraBlock = post?.description?.blocks?.find((item) => (
        item.type === 'paragraph'
    ));

    const paragraph = paraBlock?.data?.text;




    return (
        <>
            {layoutType === 'flex' ? (
                <div className="  cursor-pointer flex flex-row md:flex-row bg-white   overflow-hidden border-b-2 border-b-gray-100">

                    <div className="flex-1 p-4 md:p-6 flex-row">

                        <div className="flex items-center mb-2 md:mb-4">
                            <img
                                src={post.user.profile}
                                alt={<UserCircle2Icon />}
                                className="w-8 h-8 md:w-10 md:h-10 object-cover mr-2 md:mr-3"
                            />
                            <span className="font-medium text-gray-800 text-sm md:text-base">{post.user.userName}</span>
                        </div>


                        <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">{post.title}</h2>


                        <div className="text-sm mb-3 line-clamp-2 md:text-base text-gray-600 md:mb-6 md:line-clamp-2">{paragraph}</div>


                        <div className="flex  items-center space-x-4 text-gray-500">
                            <span className="flex items-center">
                                <Cmt className="w-4 h-4 mr-1" />
                                {post.commentCount}
                            </span>
                            <span>
                                {post.createdAt.toString().substring(0, 10)}
                            </span>
                        </div>

                    </div>
                    <div className="w-[130px] md:w-48 lg:w-64 h-auto overflow-hidden flex-shrink-0 flex items-center justify-center">
                        <img
                            src={ImageUrl}
                            className="h-auto w-full object-cover "
                        />
                    </div>


                </div>
            ) : (
                <div className="cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 w-full max-w-md mx-auto">


                    <div className="w-full h-40 md:h-40 sm:h-auto overflow-hidden">
                        <img
                            src={ImageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>


                    <div className="p-2 md:p-2">


                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 line-clamp-2">
                            {post.title}
                        </h2>


                        <div className="text-gray-600 text-sm md:text-base mb-4 line-clamp-2">
                            {paragraph}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">


                            <div className="flex items-center">
                                <img
                                    src={post.user.profile}
                                    alt={post.user.userName}
                                    className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover mr-2"
                                />
                                <span className="font-medium text-gray-800 text-sm md:text-base">
                                    {post.user.userName}
                                </span>
                            </div>


                            <div className="flex items-center space-x-3 text-gray-500 text-sm">

                                <span className="flex items-center">
                                    <Cmt className="w-4 h-4 mr-1" />
                                    {post.commentCount}
                                </span>
                                <span>
                                    {post.createdAt.toString().substring(0, 10)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>


    )


}

export default PostCard;
