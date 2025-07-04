import React from "react";
import { UserCircle2 as UserIcon } from 'lucide-react'
import useFollowStore from "../store/useFollowStore.js";
import useDirectFollow from "../customHooks/Follow/useDirectFollow.js";
import useDirectUnfollow from "../customHooks/Follow/useDirectUnfollow.js";
import Spinner from "./Spinner.jsx";
import { Link } from "react-router-dom";
function FollowerCard({ follower, LoginedUser }) {
    const userId = follower.follower._id;
    const followingList = useFollowStore((s) => s.followingList)
    const isFollowing = followingList.includes(userId);
    const LoginedUserId = LoginedUser?._id;
    const { mutate: follow, isPending: isFollowPending } = useDirectFollow(userId, LoginedUserId);
    const { mutate: unfollow, isPending: isUnfollowPending } = useDirectUnfollow(userId);



    return (
        <div key={follower._id} className="flex w-full items-center justify-between bg-gray-50 px-4 py-3 rounded-md shadow-sm">
            <div className="flex w-full items-center space-x-3" >
                <Link to={`/profile/${follower.follower.userName}`} className="flex items-center space-x-3">
                    {follower.follower.profile ? (
                        <img src={follower.follower.profile} className=" object-cover rounded-full w-10 h-10 " />
                    ) : <UserIcon className=" object-cover text-gray-400 w-10 h-10 " />}
                    <span className="text-lg font-medium text-gray-800">{
                        follower.follower.userName
                    }</span>
                </Link>

            </div>

            {follower.follower._id !== LoginedUserId ? (
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

function FollowerLIst({ followersList, LoginedUser }) {
    return (
        <div className="flex flex-col gap-4 w-full max-w-[400px] mx-auto">
            {followersList?.followerList?.length > 0 ? (
                followersList?.followerList.map((f) => (
                    <FollowerCard key={f._id} follower={f} LoginedUser={LoginedUser} />
                ))
            ) : <h2>No FOllowers Yet</h2>}
        </div>
    )
}

export default FollowerLIst;
