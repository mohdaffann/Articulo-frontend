import axios from "../axiosInstance.js";
import React, { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
function SearchBlog() {
    const [debounceSearch, setDebounce] = useState('');
    const [search, setSearch] = useState('');


    const { data, error, isLoading } = useQuery({
        queryKey: ['search', debounceSearch],
        queryFn: async () => {
            return await axios.get(`/v1/blog/search?q=${encodeURIComponent(debounceSearch)}`)
        },
        enabled: !!debounceSearch
    })

    useEffect(() => {
        const time = setTimeout(() => {
            setDebounce(search);
        }, 300);
        return () => clearTimeout(time)
    }, [search])


    return (

        <div>
            <input type="text" value={search} placeholder="Search" onChange={(e) => setSearch(e.target.value)} className="w-80 p-2 border rounded-md " />
            <div>
                {error && <div>Error in Search</div>}
                {isLoading && <div>Loading...</div>}
                {debounceSearch && (
                    <div className="mt-2 bg-gray-50 p-2 rounded shadow">
                        {data?.data?.blogs?.length > 0 ? (
                            data.data.blogs.map((item) => (
                                <div key={item._id} className="py-1 border-b last:border-b-0 sticky">
                                    <Link to={`/posts/${item._id}`}>
                                        {item.title}
                                    </Link>

                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500">No match found.</div>
                        )}
                    </div>
                )}
            </div>
        </div>





    )


}

export default SearchBlog;
