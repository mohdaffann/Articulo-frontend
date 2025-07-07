import React, { useState, useEffect } from "react";
import axios from "../axiosInstance.js";

export const useFetchId = (id) => {
    const [blog, setBlog] = useState(null)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log("Fetching blog by ID:", id);

        axios.get(`/v1/blog/${id}`)
            .then(res => {
                setBlog(res.data.blogById);


                setLoading(false);
            }
            )
            .catch(error => {
                console.log('error in fetching by id', error);
                setLoading(false);
            });
        console.log(blog);


    }, [])
    return { blog, loading }
};
