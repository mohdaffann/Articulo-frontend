import { create } from "zustand";
const useFollowStore = create((set, get) => ({
    followingList: [],
    setFollowingList: (list) => set({ followingList: list }),
    addFollower: (userId) => {
        set((state) => {
            if (state.followingList.includes(userId)) {
                return state;
            }
            return {
                followingList: [...state.followingList, userId]
            }

        });
    },
    removeFollower: (userId) => {
        set((state) => ({
            followingList: state.followingList.filter((id) => id !== userId)
        }));
    },

    isFollowing: (userId) => {
        return get().followingList.includes(userId)
    }

}));
export default useFollowStore;