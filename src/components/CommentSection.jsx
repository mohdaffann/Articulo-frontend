import React, { useState } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import authStore from "../store/authStore";
import CommentPublish from "./CommentPublish";

function CommentSection({ blogId }) {

    const { user } = authStore();

    const [text, setText] = useState('');

    const getComments = useQuery({
        queryKey: ["comments", blogId],
        queryFn: async () => {
            return await axios.get(`/v1/blog/comments/${blogId}`)
        },
        staleTime: 6 * 60 * 1000
    });


    console.log('get all comments', getComments);


    if (getComments.isLoading) {
        return <div>Loading...</div>
    }
    if (getComments.isError) {
        return <div>{Error}</div>
    }

    return (
        <div className="w-full mt-4">
            <div className="mt-8 border-b border-gray-300 pb-3">
                <h2 className="text-2xl font-semibold text-gray-800 ">
                    Your Thoughts
                </h2>
                {
                    user ? (
                        <div>
                            <div className="flex items-center mb-1.5">
                                <img
                                    src={user.profile}
                                    alt="user profile"
                                    className="w-6 h-6 rounded-full mr-2 object-cover"
                                />
                                <span className="text-lg font-medium text-gray-700 mr-2">
                                    {user.userName}
                                </span>

                            </div>
                            <div>
                                <CommentPublish blogId={blogId} />
                            </div>

                        </div>
                    ) : (
                        <div>Login to Post Comment</div>
                    )
                }


            </div>


            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2 mt-7">
                Replies
            </h2>

            {getComments.data?.data?.comments.map((item) => (
                <div key={item._id} className="mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center mb-1">
                        <img
                            src={item.userId.profile}
                            alt="user profile"
                            className="w-6 h-6 rounded-full mr-2 object-cover"
                        />
                        <span className="text-lg font-medium text-gray-700 mr-2">
                            {item.userId.userName}
                        </span>
                        <span className="text-sm text-gray-500">
                            {item.createdAt.substring(0, 10)}
                        </span>
                    </div>
                    <p className="text-gray-800 ml-8">{item.text}</p>
                </div>
            ))}
        </div>

    )

}

export default CommentSection;
