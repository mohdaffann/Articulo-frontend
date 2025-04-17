import axios from "axios";
import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import authStore from "../store/authStore";
const Login = () => {
    const [error, setError] = useState('')
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm();
    const { login, checkAuth } = authStore();
    const onSubmit = async (data) => {
        const { email, password } = data;
        setError('')
        try {
            const res = await login(email, password);
            console.log(res);

            if (!res?.success) return setError(res.data.message)
        } catch (error) {
            console.log(error);

            setError('Something went wrong! Try again')
        }
    }
    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <p className="text-gray-500 mt-1 mb-6 text-center">
                    Enter your email & Password
                </p>

                <form className="space-y-4 " onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            {...register(`email`, { required: `email is required` })}
                            placeholder="m@example.com"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <a href="#" className="text-sm text-gray-500 hover:underline">
                                Forgot your password?
                            </a>
                        </div>
                        <input
                            {...register(`password`, { required: `password is requuired` })}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>

                    {error && <p className="text-red-500 text-sm mt-2 ">{error}</p>}

                    <button
                        type="button"
                        className="w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
                    >
                        Login with Google
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Don't have an account?{' '}
                    <a href="#" className="underline hover:text-black">
                        Sign up
                    </a>
                </p>
            </div>
        </div>

    )
}


export default Login;


