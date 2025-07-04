import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getFollowers = async (userID) => {
    const response = await axios.get(`/v1/followers/${userID}`, { withCredentials: true });
    console.log('response of getFollowers List ', response.data);
    return response.data;
}

const useGetFollowers = (userID) => {
    return useQuery({
        queryKey: ['followers', userID],
        queryFn: () => getFollowers(userID)
    })
}

export default useGetFollowers;