import React, { useState, useRef } from "react";
import { useForm } from 'react-hook-form';
import { XSquareIcon as Wrong } from "lucide-react"
import authStore from "../store/authStore";
import { useNavigate } from 'react-router-dom'
const Signup = () => {
    const { signup, checkAuth } = authStore();
    const navigate = useNavigate();
    const [error, setError] = useState('')
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm();
    const [selectedFileName, setSelectedFileName] = useState('');
    const fileInputref = useRef(null);
    const onSubmit = async (data) => {
        try {
            const form = new FormData();
            form.append('userName', data.userName)
            form.append('fullName', data.fullName)
            form.append('email', data.email)
            form.append('password', data.password)
            if (data.profile && data.profile.length > 0) {
                console.log('profile data:', data.profile[0]);

                form.append('profile', data.profile[0])
            }
            console.log("Form data before submission:", {
                userName: data.userName,
                fullName: data.fullName,
                email: data.email,
                profile: data.profile ? "File exists" : "No file"
            });

            const res = await signup(form)
            if (res.success) {
                checkAuth();
                navigate('/');
            }
            else {
                setError(res.error);
            }
        } catch (error) {
            setError(error.res?.data?.message || 'Registrarion failed')
        }

    }
    const fileTrigger = (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileInputref.current?.click();
    }
    const handleImage = (e) => {
        e.stopPropagation();
        const file = e.target.files[0];
        if (file) {
            setSelectedFileName(file.name)
            setValue('profile', e.target.files)
        }
        else {
            setSelectedFileName(null);
        }
    }
    const clearProfile = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedFileName('')
        setValue("profile", null);
        if (fileInputref.current) {
            fileInputref.current.value = '';
        }
    }
    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center">Join Blogman</h2>


                <form className="space-y-4 " onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            {...register(`userName`, { required: `Username  is required` })}
                            placeholder="John Doe"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        {errors.userName && <p>{errors.userName.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Fullname</label>

                        <input
                            {...register(`fullName`, { required: `Fullname is required` })}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        {errors.fullName && <p>{errors.fullName.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>

                        <input
                            {...register(`email`,
                                {
                                    required: `Fullname is requuired`, pattern:
                                    {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address'
                                    }
                                })}
                            placeholder="Jon@hotmail.com"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>

                        <input
                            {...register(`password`,
                                {
                                    required: `Fullname is requuired`,
                                    minLength: 6,
                                    message: 'Password must be atleast 6 characters'
                                })}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>
                    <div >
                        <label className="block text-sm font-medium text-gray-700">Profile</label>
                        <div className="flex items-center mt-0.5">
                            <button className="text-white bg-gray-800 px-3 py-1 rounded border-2 transition duration-150 focus:outline-none border-gray-800 hover:text-gray-800 hover:bg-white cursor-pointer"
                                onClick={fileTrigger}
                                type="button"
                            >
                                Choose File
                            </button>
                            <input type="file" accept="image/*"
                                {...register(`profile`)}
                                onChange={handleImage}
                                ref={fileInputref}
                                className="hidden"
                            />
                            {
                                selectedFileName && (
                                    <div className="mt-1">
                                        <button className="cursor-pointer w-[12px] " onClick={clearProfile}>
                                            <Wrong className="w-auto" />
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                        {
                            selectedFileName && (
                                <p className="text-sm text-gray-500 mt-0.5"> {selectedFileName} </p>
                            )
                        }

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition cursor-pointer"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Registering...' : 'Register'}
                    </button>

                    {error && <p className="text-red-500 text-sm mt-2 ">{error}</p>}


                </form>


            </div>
        </div>

    )
}


export default Signup;


