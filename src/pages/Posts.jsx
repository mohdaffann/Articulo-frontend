import React from "react";
import PostCard from "../components/PostCard";
import axios from "axios";
import { Link } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import EditorLoader from "../components/EditorLoader";
function Posts() {

    const response = useQuery(
        {
            queryKey: ['posts'],
            queryFn: async () => {
                return await axios.get('v1/blog')
            },
            staleTime: 6 * 60 * 1000
        }
    )

    if (response.isLoading) {
        return (

            <div className="flex flex-row lg:flex-row max-w-5xl mx-auto px-5 py-5 my-10">

                <div className="w-full lg:w-2/3 space-y-6">
                    {
                        [...Array(7)].map((_, ind) => (
                            <EditorLoader key={ind} />
                        ))
                    }
                </div>

            </div>

        )
    }
    if (response.isError) {
        return <div>{Error}</div>
    }


    return (
        <div className="flex flex-row lg:flex-row max-w-5xl mx-auto px-5 py-5 my-10">
            {/* leftt posts display*/}
            <div className="w-full lg:w-2/3 space-y-6">
                {response?.data?.data?.blogs.map((post, index) => (
                    <Link to={`/posts/${post._id}`} key={post._id} >
                        <PostCard post={post} />
                    </Link>

                ))}
            </div>

        </div>
    )
}

export default Posts;
