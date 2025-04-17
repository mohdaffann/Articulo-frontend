import { create } from "zustand";
import axios from "axios"
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
            return { success: true }
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
            try {
                const response = await axios.get('/v1/auth/im', { withCredentials: true })
                if (!response) return set({ user: null })
                set({ user: response.data.user, isAuthLoading: false })

            } catch (error) {
                set({ user: null, isAuthLoading: false })
            }


        }

    }
)

)

export default authStore