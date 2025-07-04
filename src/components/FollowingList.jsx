import React from "react";
import { UserCircle2 as UserIcon } from 'lucide-react'
import useFollowStore from "../store/useFollowStore.js";
import useDirectFollow from "../customHooks/Follow/useDirectFollow.js";
import useDirectUnfollow from "../customHooks/Follow/useDirectUnfollow.js";
import Spinner from "./Spinner.jsx";
import { Link } from "react-router-dom";
function FollowingCard({ following, LoginedUser }) {
    const userId = following.following._id;
    const followerId = following.follower;
    const followingList = useFollowStore((s) => s.followingList)
    const isFollowing = followingList.includes(userId);
    const LoginedUserId = LoginedUser?._id;
    const { mutate: follow, isPending: isFollowPending } = useDirectFollow(userId, LoginedUserId);
    const { mutate: unfollow, isPending: isUnfollowPending } = useDirectUnfollow(userId, followerId, LoginedUserId);



    return (
        <div key={following._id} className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-md shadow-sm">
            <div className="flex items-center space-x-3" >
                <Link to={`/profile/${following.following.userName}`} className="flex items-center space-x-3">
                    {following.following.profile ? (
                        <img src={following.following.profile} className=" object-cover rounded-full w-10 h-10 " />
                    ) : <UserIcon className=" object-cover text-gray-400 w-10 h-10 " />}
                    <span className="text-lg font-medium text-gray-800">{
                        following.following.userName
                    }</span>
                </Link>

            </div>

            {following.following._id !== LoginedUserId ? (
                <button className="px-7 py-2 rounded border-2 text-sm transition duration-200  text-gray-700 border-gray-700
                    hover:bg-gray-700 hover:text-gray-100 cursor-pointer
                    "
                    onClick={() => {
                        if (!LoginedUser || isFollowPending || isUnfollowPending) return;
                        if (isFollowing) {
                            unfollow()
                        } else {
                            follow()
                        }
                    }}
                    disabled={!LoginedUser || isFollowPending || isUnfollowPending}
                >
                    {isFollowPending || isUnfollowPending
                        ? (<Spinner />)
                        : (isFollowing ? 'Unfollow' : 'Follow')
                    }
                </button>) : null
            }


        </div>
    )

}

function FollowingLIst({ followingList, LoginedUser }) {
    return (
        <div className="flex flex-col gap-4 w-full max-w-[400px] mx-auto">
            {followingList?.followingList?.length > 0 ? (
                followingList?.followingList.map((f) => (
                    <FollowingCard key={f._id} following={f} LoginedUser={LoginedUser} />
                ))
            ) : <h2>No followings Yet</h2>}
        </div>
    )
}

export default FollowingLIst;
