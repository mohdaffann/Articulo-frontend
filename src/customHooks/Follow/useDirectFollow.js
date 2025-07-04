import axios from "axios";
import useFollowStore from "../../store/useFollowStore";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const follow = async (userId) => {
    return await axios.post(`/v1/follow/${userId}`, {}, { withCredentials: true })
}

const useDirectFollow = (userId, currentUser) => {
    return useMutation({
        mutationFn: () => follow(userId),
        onMutate: () => {
            const prevStoreData = useFollowStore.getState().followingList;
            useFollowStore.getState().addFollower(userId);
            return { prevStoreData };
        },
        onError: (error, variables, context) => {
            console.log('error in direct follow', error);

            useFollowStore.getState.setFollowingList(context.prevStoreData);

        },
        onSuccess: () => {
            console.log('followed successfully');

        }
    })
}
export default useDirectFollow;