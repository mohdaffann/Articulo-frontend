import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getFollowing = async (userID) => {
    const response = await axios.get(`/v1/following/${userID}`, { withCredentials: true })
    return response.data
}

const useGetFollowing = (userID) => {
    return useQuery({
        queryKey: ['following', userID],
        queryFn: () => getFollowing(userID)
    })
}

export default useGetFollowing;