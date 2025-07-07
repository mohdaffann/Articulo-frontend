import axios from "../../axiosInstance.js";
import useFollowStore from "../../store/useFollowStore";
import { useQueryClient, useMutation } from "@tanstack/react-query";
const unfollow = (userId) => {
    return axios.delete(`/v1/unfollow/${userId}`, { withCredentials: true })
}

const useUnfollowUser = (userId, currentUser) => {
    const queryClient = useQueryClient();
    const removeFollower = useFollowStore((s) => s.removeFollower)
    return useMutation({
        mutationFn: () => unfollow(userId),
        onMutate: () => {
            const prevData = {
                followersList: queryClient.getQueryData(['followers', userId]),
                followingLIst: queryClient.getQueryData(['following', currentUser._id])
            }
            queryClient.setQueryData(['followers', userId], (oldData) => {
                return {
                    ...oldData,
                    followerList: oldData.followerList.filter((f) => f.follower._id !== currentUser._id)
                }
            })
            return prevData;
        },
        onError: (error, v, context) => {
            console.log('error in unfollowing user:', userId);
            queryClient.setQueryData(['followers', userId], context.followersList)

        },
        onSuccess: (data, v, context) => {
            removeFollower(userId);
            queryClient.invalidateQueries({
                predicate: (queries) => {
                    const [key, id] = queries.queryKey;
                    return (
                        (key === 'followers' && id === userId) ||
                        (key === 'following' && id === currentUser._id)
                    )
                }
            })
        }
    })
}
export default useUnfollowUser;