import { create } from "zustand";
import axios from "../axiosInstance.js";
import useFollowStore from "./useFollowStore.js";
const authStore = create((set) => (
    {
        user: null,
        isAuthLoading: true,
        setUser: (user) => set({ user, isAuthLoading: false }),
        login: async (email, password) => {
            const response = await axios.post('/v1/auth/login', { email, password },
                {
                    withCredentials: true
                }
            );
            console.log(response.data.currentUser)
            set({ user: response.data.currentUser, isAuthLoading: false })

            return { success: true, response }
        },
        logout: async () => {
            try {
                await axios.post('/v1/auth/logout')
                set({ user: null })


            }
            finally {
                set({ user: null })
            }
        },
        checkAuth: async () => {
            set({ isAuthLoading: true })
            try {
                const response = await axios.get('/v1/auth/im', { withCredentials: true })
                if (!response) return set({ user: null, isAuthLoading: false })
                set({ user: response.data.user, isAuthLoading: false })
                const user = response.data.user;
                try {
                    const res = await axios.get(`/v1/following/${user._id}`);
                    const followingList = res.data.followingList;
                    const followingIds = followingList.map((f) => f.following._id);
                    useFollowStore.getState().setFollowingList(followingIds);
                } catch (error) {
                    console.log('error fetching followingIds of user in checkAuth', error);

                }

            } catch (error) {
                set({ user: null, isAuthLoading: false })
            }
        },
        signup: async (formData) => {
            try {
                const response = await axios.post('/v1/auth/register', formData, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                },);
                if (response.data && response.data.currentUser) {
                    set({ user: response.data.currentUser, isAuthLoading: false })
                }
                return {
                    success: true,
                    user: response.data.currentUser
                }
            } catch (error) {
                console.log('registrationerror', error);
                return {
                    success: false,
                    error: error.response?.data?.message || 'Reg failed!'
                }

            }
        }

    }
)

)

export default authStore