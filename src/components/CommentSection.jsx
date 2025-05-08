import React, { useState } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

function CommentSection({ blogId }) {
    const [text, setText] = useState('');

    const getComments = useQuery({
        queryKey: ["comments", blogId],
        queryFn: async () => {
            return await axios.get(`/v1/blog/comments/${blogId}`)
        },
        staleTime: 6 * 60 * 1000
    });

    console.log(getComments);


    if (getComments.isLoading) {
        return <div>Loading...</div>
    }
    if (getComments.isError) {
        return <div>{Error}</div>
    }

    return (
        <div>
            {getComments.data?.data.comments.map((item, ind) => (
                <div key={item._id}>
                    <div className="flex flex-row items-center  justify-start">
                        <img src={item.userId.profile} className="w-6 rounded-b-sm mr-1" />
                        <span className="text-[22px] text-gray-700 ">{item.userId.userName}</span>
                    </div>
                    <div>
                        <p>{item.text}</p>
                    </div>
                </div>
            ))}
        </div>
    )

}

export default CommentSection;
