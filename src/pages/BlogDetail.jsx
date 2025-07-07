import React, { useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useFetchId } from '../customHooks/useFetchId.js'
import { FullBlogRenderer } from "../components/FullBlogRenderer.jsx";
import { UserCircle2 as User } from 'lucide-react';
import EditorLoader from "../components/EditorLoader.jsx";
import CommentSection from "../components/CommentSection.jsx";
import { ArrowLeftIcon } from 'lucide-react';
import authStore from "../store/authStore.js";
import { useQuery } from "@tanstack/react-query";
import axios from "../axiosInstance.js";
import useDirectFollow from "../customHooks/Follow/useDirectFollow.js";
import useDirectUnfollow from "../customHooks/Follow/useDirectUnfollow.js";
import useFollowStore from "../store/useFollowStore.js";
import Spinner from "../components/Spinner.jsx";
function BlogDetail() {
    const user = authStore((state) => state.user)
    const nav = useNavigate();
    const location = useLocation().state?.fromUserProfile;
    const handleBack = (e) => {
        e.preventDefault();
        if (location) {
            return nav(-1)
        }
        else {
            return nav('/home')
        }
    }

    const { id } = useParams();
    const { data: blog, isError, isLoading } = useQuery({
        queryKey: ['blog', id],
        queryFn: async () => {
            const data = await axios.get(`/v1/blog/${id}`);
            return data?.data?.blogById;
        }
    })

    console.log(blog);
    const userId = blog?.user?._id;
    const followingList = useFollowStore((s) => s.followingList)
    const isFollowing = followingList.includes(userId);
    const { mutate: follow, isPending: isFollowPending } = useDirectFollow(userId, user)
    const { mutate: unfollow, isPending: isUnfollowPending } = useDirectUnfollow(userId, null, null)



    return (
        <div className="w-full flex flex-col justify-center items-center  px-4 sm:px-6 mt-20">
            {location && (

                <button onClick={handleBack} className=" flex mr-[600px] mb-6 items-center-safe space-x-0.5 justify-center px-2 py-1 rounded-full transition duration-300 ease-in-out bg-gray-100 
                 text-gray-800 hover:bg-gray-300 cursor-pointer"><ArrowLeftIcon className="" />Back to Profile</button>

            )}

            {isError && <div>Error fetching Try Again!!</div>}


            <div className="w-full max-w-[720px] flex flex-col pb-14 border-b border-b-gray-400 items-center justify-start">
                {isLoading ? <EditorLoader /> :
                    <>

                        <div className="flex flex-row items-center justify-start w-full mb-4 gap-2">
                            <Link to={`/profile/${blog?.user?.userName}`}>


                                <div className="flex flex-row items-center">
                                    <img src={blog?.user?.profile} alt={<User />} className="w-10 h-10 rounded-full object-cover mr-1" />
                                    <p className="text-lg font-semibold text-gray-900 font-serif">{blog.user?.userName}</p>
                                </div>
                            </Link>
                            {
                                user ? (blog.user._id !== user?._id ? (
                                    <button className="ml-1.5 px-2 py-1 rounded-sm border-2 text-sm transition duration-200  text-gray-700 border-gray-700
                                    hover:bg-gray-700 hover:text-gray-100 cursor-pointer
                                    " onClick={() => {
                                            if (isFollowing) {
                                                unfollow()
                                            } else {
                                                follow()
                                            }
                                        }} >{
                                            isFollowPending || isUnfollowPending ? (<Spinner />)
                                                : (isFollowing ? 'Unfollow' : 'follow')
                                        }</button>
                                ) : null)
                                    : (<button className="ml-1.5 px-2 py-1 rounded-sm border-2 text-sm transition duration-200  text-gray-700 border-gray-700
                                    hover:bg-gray-700 hover:text-gray-100 cursor-not-allowed
                                    " disabled={true} >Follow</button>)
                            }

                            <div className="flex gap-2 items-center ml-auto">


                                <span className="text-sm text-gray-500">4 min read</span>
                                <span className="text-sm text-gray-500"> . {blog.createdAt.substring(0, 10)}</span>

                            </div>


                        </div>
                        <div className="flex mr-auto mb-2">
                            <span className="mr-1.5">Category :</span>
                            <button
                                className={`px-1.5 flex py-0.5 ${blog?.category === 'Sports' ? `bg-blue-200` : blog?.category === 'Music' ? 'bg-pink-300' : blog?.category === 'News' ? 'bg-green-300' : blog?.category === 'Tech' ? 'bg-orange-300' : 'bg-gray-300'}
                         rounded-md 
                         `}  >{blog?.category}</button>
                        </div>


                        <FullBlogRenderer blocks={blog.description?.blocks} />
                    </>

                }
            </div>
            <div className="w-full max-w-[720px] flex flex-col mt-8">
                <CommentSection blogId={id} commentCount={blog?.commentCount} />
            </div>
        </div>

    )

}

export default BlogDetail;
