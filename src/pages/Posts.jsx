import React from "react";
import PostCard from "../components/PostCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
function Posts() {
    const [post, setPost] = useState([])

    const fetchAll = async () => {
        try {
            const res = await axios.get('/v1/blog');
            console.log(res.data);

            setPost(res.data.blogs)
            console.log();

        } catch (error) {
            console.log('error in getting all blogs', error);

        }
    }

    useEffect(() => {
        fetchAll();
    },
        []
    );
    return (
        <div className="flex flex-row lg:flex-row max-w-5xl mx-auto px-5 py-5 my-10">
            {/* leftt posts display*/}
            <div className="w-full lg:w-2/3 space-y-6">
                {post.map((post, index) => (
                    <Link to={`/posts/${post._id}`} >
                        <PostCard key={index} post={post} />
                    </Link>

                ))}
            </div>

        </div>
    )
}

export default Posts;
