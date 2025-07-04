import axios from "axios";
import useFollowStore from "../../store/useFollowStore.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";




const addFollow = async (userID) => {
    return axios.post(`/v1/follow/${userID}`, {}, { withCredentials: true });
}

const useFollowUser = (userID, currentUser) => {
    const addFollower = useFollowStore(state => state.addFollower)
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => addFollow(userID),
        onMutate: () => {
            addFollower(userID);
            const prevData = {
                followersList: queryClient.getQueryData(['followers', userID]),
                followingLIst: queryClient.getQueryData(['following', currentUser._id])
            }
            console.log('existing data of followers list', prevData.followersList);


            queryClient.setQueryData(['followers', userID], (oldData) => {
                console.log('old data', oldData);

                const addFollower = {
                    follower: {
                        userName: currentUser.userName,
                        profile: currentUser.profile
                    }
                }
                console.log('add follower', addFollower);

                return {
                    ...oldData,
                    followerList: [...oldData.followerList, addFollower]

                }
            })
            return prevData;
        },
        onError: (error, variables, context) => {
            console.log('error in following', error);

            console.log('error in following');
            queryClient.setQueryData(['following', currentUser._id], context.followingLIst)
            queryClient.setQueryData(['followers', userID], context.followersList)

        },
        onSuccess: (data, variables, context) => {

            addFollower(userID);
            queryClient.invalidateQueries({
                predicate: (query) => {
                    const [key, id] = query.queryKey
                    return (
                        (key === 'followers' && id === userID) ||
                        (key === 'following' && id === currentUser._id)
                    )
                }
            })
        }
    })

}
export default useFollowUser;

