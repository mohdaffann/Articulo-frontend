import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../axiosInstance.js";
import { Link } from "react-router-dom";
function UserSection() {
    const { data } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            return await axios.get('/v1/auth/get')
        }
    })
    console.log(data);

    return (
        <div className="flex  flex-col space-y-2 w-auto max-w-[300px] px-2.5 py-4 bg-gray-50 rounded-sm  ">
            <div className="flex items-center justify-center">
                <h3 className="text-2xl font-bold text-black border-b-2 border-b-gray-300">Top Users</h3>
            </div>
            {data?.data?.users && (
                data.data.users.map((item, ind) => (
                    <Link to={`/profile/${item.userName}`} className="flex  items-center space-x-2">
                        <img src={item.profile} className="w-[50px] h-[50px] object-cover rounded-full" />
                        <span className="text-2xl text-gray-800 font-medium">{item.userName}</span>
                    </Link>

                ))
            )}
        </div>
    )
}

export default UserSection;
