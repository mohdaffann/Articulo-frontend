import axios from "axios";
import useFollowStore from "../../store/useFollowStore";
import { useMutation, QueryClient, useQueryClient } from "@tanstack/react-query";


const unfollow = (userId) => {
    return axios.delete(`/v1/unfollow/${userId}`, { withCredentials: true })
}

const useDirectUnfollow = (userId, followerId, LoginedUserId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => unfollow(userId),
        onMutate: () => {
            const prevStoreData = useFollowStore.getState().followingList;
            useFollowStore.getState().removeFollower(userId);
            let prevQueryData;
            if (followerId && LoginedUserId && followerId === LoginedUserId) {
                console.log('follower id :', followerId);
                console.log('loginedUserId: ', LoginedUserId);


                prevQueryData = queryClient.getQueryData(['following', followerId])
                queryClient.setQueryData(['following', followerId], (oldData) => {
                    return {
                        ...oldData,
                        followingList: oldData.followingList.filter((f) => f.following._id !== userId)
                    }
                })
            }

            return { prevStoreData, prevQueryData }
        },
        onError: (error, v, context) => {
            console.log('error in direct unfollow', error);
            useFollowStore.getState().followingList(context.prevStoreData);
            if (followerId === LoginedUserId) {
                queryClient.setQueryData(['following', followerId], context.prevQueryData)
            }

        },
        onSuccess: () => {
            console.log('unfollow unsuccessful');

        }
    })
}

export default useDirectUnfollow;