import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import authStore from "../store/authStore";
import { useForm } from "react-hook-form";
import { UserRoundIcon, XSquareIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
function UpdateUser() {
  const nav = useNavigate();
  const user = authStore((s) => s.user)
  const logout = authStore((s) => s.logout)
  const isAuthLoading = authStore((s) => s.isAuthLoading)
  const fileRef = useRef(null);

  const [serverError, setServerError] = useState(null);

  const [imageText, setImageText] = useState(null);
  const { register, handleSubmit, formState: { errors, isSubmitting, dirtyFields }, setValue } = useForm({
    defaultValues: {
      userName: '',
      email: '',
      profile: null
    }
  });





  useEffect(() => {
    if (user) {
      setValue('userName', user.userName);
      setValue('email', user.email);
      setValue('profile', user.profile);
    }
    if (!isAuthLoading && !user) {
      nav('/login')
    }
  }, [user, nav, isAuthLoading]);

  if (isAuthLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null;
  }


  const onSubmit = async (data) => {


    setServerError(null);
    const form = new FormData();
    const fKeys = ['userName', 'email', 'profile'];

    fKeys.forEach((key) => {
      if (dirtyFields[key]) {
        if (key === 'profile') {
          if (data.profile) {
            console.log('profile data:', data.profile[0]);

            form.append('profile', data.profile[0])
          }
        }
        else {
          form.append(key, data[key])
        }
      }
    })

    console.log('form data', form);
    console.log('dirty fields', dirtyFields);


    try {
      await axios.patch('/v1/auth/updateDetails', form, { withCredentials: true })
      logout();
      nav('/login')
    } catch (error) {
      const message = error.response.data.message;
      setServerError(message);
    }


  }
  const fileTrigger = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fileRef.current?.click();
  }
  const handleImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageText(file.name);
      setValue('profile', e.target.files)
    } else {
      setImageText(null);
    }
  }
  const clearImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImageText(null);
    setValue('profile', null);
    if (fileRef.current) {
      fileRef.current.value = '';
    }
  }





  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <h1 className="text-4xl font-bold">UPDATE USER</h1>
          <div className="flex flex-col">
            <span>Username</span>
            <input type="text"  {...register('userName')}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />

          </div>

          <div className="flex-col flex">
            <span>Email</span>
            <input type="text"  {...register('email', { pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'invalid email' } })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div >
            <label >Profile</label>
            <div className="flex items-center mt-0.5">
              {
                !imageText ? (
                  user?.profile ? (
                    <img src={user.profile} className="w-6 h-6 object-cover rounded" />
                  ) : <span>No Profile</span>
                )
                  : (

                    <div className="flex mr-3">
                      <span className="mr-1.5">File Selected : {imageText}</span>
                      <button className="w-[12px] cursor-pointer" onClick={clearImage}>
                        <XSquareIcon className="w-auto" />
                      </button>
                    </div>
                  )
              }
              <button onClick={fileTrigger} type="button" className="text-white bg-gray-800 px-3 py-1 rounded border-2 transition duration-150 focus:outline-none border-gray-800 hover:text-gray-800 hover:bg-white cursor-pointer">Add Profile</button>
              <input type="file" accept="image/*" {...register('profile', { onChange: handleImg })} ref={fileRef} className="hidden" />

            </div>

          </div>



          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update'}
          </button>
          {serverError && (
            <span className="text-red-600 text-2xl ">{serverError}</span>
          )}
        </form>
      </div>
    </div>


  )

}

export default UpdateUser;
