import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchId } from '../customHooks/useFetchId.js'
function BlogDetail() {

    const { id } = useParams();
    console.log('format of useParams', useParams());
    const { blog, loading } = useFetchId(id);


    return (
        <div className="w-full flex max-w-7xl items-center">
            {loading ? <p>Loading...</p> :
                <div className="flex ">{blog?.title}</div>
            }
        </div>
    )

}

export default BlogDetail;
