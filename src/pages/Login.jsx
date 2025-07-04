import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import authStore from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const user = authStore((s) => s.user);
    const nav = useNavigate();
    useEffect(() => {
        if (user) {
            nav('/home')
        }
    }, [user, nav])
    const [error, setError] = useState('')
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm();

    const { login } = authStore();

    const onSubmit = async (data) => {
        const { email, password } = data;
        setError('')
        try {
            const res = await login(email, password);
            console.log('LOGINED DATA:', res);
            if (!res?.success) return setError(res.data.message)
            console.log('before nav...');

            nav('/home')
            console.log('nav ended');

        } catch (error) {
            console.log(error);
            if (error.response?.data?.message) {
                setError(error.response.data.message)
            }
            else {
                setError('something went wrong , Try Again!')
            }
        }
    }
    const handleDemo = () => {
        setValue('email', 'jimmyjames@gmail.com')
        setValue('password', 'SoulEsports')
    }
    return (


        <div className="flex  w-full items-center justify-center min-h-screen bg-gray-100">
            <div className=" flex flex-col w-full md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8 ">
                <div className="flex items-center flex-col w-40">
                    <button className="flex bg-black text-white whitespace-nowrap px-4 py-3  rounded-md hover:bg-gray-900 transition cursor-pointer"
                        onClick={handleDemo}
                    >
                        Try Guest Account
                    </button>
                    <p className="mt-2 text-center text-sm max-w-32 text-gray-600">
                        click to fill demo creds and Login
                    </p>
                </div>
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
                            {errors.email && <p>{errors.email.message}</p>}
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
                            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition cursor-pointer"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Logging in...' : 'Login'}
                        </button>

                        {error && <p className="text-red-500 text-sm mt-2 ">{error}</p>}

                    </form>
                    <div className="flex items-center flex-col">
                        <span className="text-center text-sm text-gray-600 mt-6">
                            Don't have an account
                        </span>
                        <Link to={'/register'} className="underline text-gray-600 hover:text-black">
                            Sign up
                        </Link>
                    </div>

                </div>
            </div>

        </div>

    )
}


export default Login;


