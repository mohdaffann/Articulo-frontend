import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../components/PostCard";
import axios from "../axiosInstance.js";
import FollowerLIst from "../components/FollowerLIst";
import useFollowUser from "../customHooks/Follow/useFollowUser";
import authStore from "../store/authStore";
import useFollowStore from "../store/useFollowStore.js";
import useUnfollowUser from "../customHooks/Follow/useUnfollowUser.js";
import useGetFollowers from "../customHooks/Follow/useGetFollowers.js";
import FollowingLIst from "../components/FollowingList.jsx";
import useGetFollowing from "../customHooks/Follow/useGetFollowing.js";
import { ChevronDown } from "lucide-react";

function UserProfile() {
    const user = authStore((state) => state.user)
    const checkAuth = authStore((s) => s.checkAuth)

    const { userName } = useParams();
    const [tab, setTab] = useState('publications')
    const [isViewOpen, setViewOpen] = useState(false)
    const [layoutType, setLayoutType] = useState('grid');

    const fetchProfile = async () => {
        const response = await axios.get(`/v1/profile/${userName}`)
        return response.data
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['profile', userName],
        queryFn: fetchProfile,
        staleTime: 15 * 60 * 1000
    })
    console.log('data in userProfile', data);


    const userId = data?.user?._id;
    const followingList = useFollowStore((s) => s.followingList)
    const isFollowing = useFollowStore((state) => state.isFollowing(userId))
    console.log('isFollowing', isFollowing);
    console.log('following list in zus store', followingList);
    const { data: followersList, isPending, isError: followersError } = useGetFollowers(userId)
    console.log('data inside followersList jsx', followersList);
    const { data: followingLst } = useGetFollowing(userId)


    const { mutate: follow, isPending: isFollowPending } = useFollowUser(userId, user)
    const { mutate: unfollow, isPending: isUnfollowPending } = useUnfollowUser(userId, user)


    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error : {error.message}</div>
    }



    return (
        <div className="flex items-center justify-center w-full flex-col mt-20">

            <div className="flex items-center space-x-2 mb-6">
                <img src={data?.user?.profile} className=" w-10 h-10 rounded-[20px] object-cover" />
                <span className="font-semibold text-4xl">{data.user?.userName}</span>
                {
                    data?.user?.userName !== user?.userName ? (
                        <button className="px-2 py-1 rounded-sm border-2 text-sm transition duration-200  text-gray-700 border-gray-700
                    hover:bg-gray-700 hover:text-gray-100 cursor-pointer
                    "
                            onClick={() => {
                                if (isFollowing) {
                                    unfollow()
                                } else {
                                    follow()
                                }
                            }}
                            disabled={!user || isFollowPending || isUnfollowPending}>
                            {(isFollowPending || isUnfollowPending)
                                ? isFollowing ? 'unfollowing' : 'following'
                                : isFollowing ? 'Unfollow' : 'Follow'
                            }
                        </button>
                    ) : null
                }

            </div>
            <div className="flex items-center space-x-3 justify-center">
                <div className="flex bg-gray-900  space-x-0">
                    <button onClick={() => setTab('publications')} className={`px-2.5 py-1 bg-gray-50 ${tab !== 'publications' ? 'hover:bg-gray-200 transition duration-300 ease-in-out' : ''} 
                    ${tab === 'publications' ? "bg-gray-700 text-white " : ""}   cursor-pointer`}>Publications</button>
                    <button onClick={() => setTab('followers')} className={`px-2.5 py-1 bg-gray-50 ${tab !== 'followers' ? 'hover:bg-gray-200  transition duration-300 ease-in-out' : ''} 
                    ${tab === 'followers' ? "bg-gray-700 text-white" : ""}   cursor-pointer`}>Followers</button>
                    <button onClick={() => setTab('following')} className={`px-2.5 py-1 bg-gray-50 ${tab !== 'following' ? 'hover:bg-gray-200  transition duration-300 ease-in-out' : ''} 
                    ${tab === 'following' ? "bg-gray-700 text-white" : ""}   cursor-pointer`}>Following</button>
                </div>
                <div className="relative">
                    <button className="px-2 py-1.5 cursor-pointer bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-200 flex items-center  justify-center"
                        onClick={() => setViewOpen(!isViewOpen)}
                    >
                        <span className="font-medium text-gray-700">view:{layoutType}</span>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isViewOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isViewOpen && (
                        <div className="absolute top-full left-0 mt-1 w-full  bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                            <button className="cursor-pointer w-full px-4 py-3 text-left text-gray-700  border-b border-gray-100"
                                onClick={() => {
                                    setLayoutType('grid')
                                    setViewOpen(false)
                                }}
                            >
                                grid
                            </button>
                            <button className="cursor-pointer w-full px-4 py-3 text-left text-gray-700  border-b border-gray-100"
                                onClick={() => {
                                    setLayoutType('flex')
                                    setViewOpen(false)
                                }}
                            >
                                flex
                            </button>

                        </div>
                    )}
                </div>
            </div>



            <div className="max-w-5xl w-full mx-auto px-5 py-5 my-10 min-h-[300px]">

                {tab === "publications" && (
                    <div className={layoutType === 'grid' ? 'grid gap-4 md:grid-cols-3 sm:grid-cols-1 ' : 'space-y-5 '}>
                        {data?.blogs?.length > 0 ? (
                            data.blogs.map((post) => (
                                <Link to={`/posts/${post._id}`} key={post._id} state={{ fromUserProfile: true }}>
                                    <PostCard post={post} layoutType={'grid'} />
                                </Link>
                            ))
                        ) : (
                            <h1>No Publications</h1>
                        )}
                    </div>
                )}
                {tab === "followers" && (

                    <FollowerLIst followersList={followersList} LoginedUser={user} />

                )}
                {tab === "following" && (
                    <FollowingLIst followingList={followingLst} LoginedUser={user} />
                )}
            </div>
        </div>

    )

}

export default UserProfile;
