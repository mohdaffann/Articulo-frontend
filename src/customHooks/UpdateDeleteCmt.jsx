import React, { useState } from "react";
import authStore from "../store/authStore";
import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Edit, Trash } from 'lucide-react'
import { toast } from 'react-hot-toast'
function UpdateDeleteCmt({ comment }) {
    const queryClient = useQueryClient();
    const { user } = authStore();
    const { _id, userId, text, blogId } = comment;
    const [newText, setNewText] = useState(text);
    const [isEditing, setIsEditing] = useState(false)

    const updateFn = async ({ _id, newText }) => {
        return await axios.patch(`/v1/comment/${_id}`, { text: newText })
    }

    const deleteFn = async (_id) => {
        return await axios.delete(`/v1/comment/${_id}`)
    }

    const { mutate: updateComment } = useMutation({
        mutationFn: updateFn,
        onMutate: async (updtData) => {
            await queryClient.cancelQueries(["comments", blogId]);
            const previousCommentsData = queryClient.getQueryData(["comments", blogId]);
            const { _id, newText } = updtData;
            queryClient.setQueryData(['comments', blogId], (oldData) => {
                console.log('old data before updation', oldData);
                return oldData.map(comment => (
                    comment._id === _id ? { ...comment, text: newText } : comment
                ))
            })
            return { previousCommentsData }
        },
        onError: (error, updtData, context) => {
            console.log('error in update comment', error);

            toast.error('Error Updating!')
            queryClient.setQueryData(['comments', blogId], context.previousCommentsData)

        },
        onSuccess: async (result, variables, context) => {
            toast.success('Update success!')
            console.log('comment in onSuccess', result);
            console.log('variable data', variables);
            await queryClient.setQueryData(['comments', blogId], (oldData) => {
                return oldData.map((item) => {
                    return item._id === variables._id ? { ...item, text: result.data.updatedComment.text } : item
                })
            })
        }

    })
    const { mutate: deleteComment } = useMutation({
        mutationFn: deleteFn,
        onMutate: async (_id) => {
            await queryClient.cancelQueries(['comments', blogId]);
            const previousCommentsData = queryClient.getQueryData(["comments", blogId]);
            const blogData = queryClient.getQueryData(["blog", blogId])
            await queryClient.setQueryData(['comments', blogId], (oldData) => {
                return oldData.filter((item) => item._id !== _id)
            })
            await queryClient.setQueryData(["blog", blogId], (oldData) => {
                return { ...oldData, commentCount: oldData.commentCount - 1 }
            })

            return { previousCommentsData, blogData }
        },
        onError: (error, _id, context) => {
            console.log('error occured while deleting the comments', error);
            toast.error('Unable to delete, Try Again!')
            queryClient.setQueryData(['comments', blogId], context.previousCommentsData)
            queryClient.setQueryData(["blog", blogId], context.blogData)
        },
        onSuccess: () => {
            toast.success('Deleted successfully!')
        }

    })
    const handleEdit = () => {
        setIsEditing(true);
    }
    const handleUpdate = (e) => {
        e.preventDefault();
        console.log('text before mutation of updtComment:', { _id, newText });
        if (text.trim() !== newText.trim() && newText.trim()) {
            updateComment({ _id, newText })
        }
        setIsEditing(false);

    }
    const handleDelete = (e) => {
        e.preventDefault();
        deleteComment(_id)
    }

    const handleCancel = () => {
        setNewText(text);
        setIsEditing(false);
    }


    if (!user || user._id !== userId._id) {
        return;
    }

    return (
        <div className=" w-full flex flex-col items-end">


            <div className="flex  space-x-2 mb-2 ">
                {!isEditing && (
                    <>
                        <button onClick={handleEdit} className="text-sm  px-2 py-1 rounded-sm flex items-center hover:cursor-pointer">
                            <Edit className="text-sky-600 mr-1" />
                            Edit</button>
                        <button className=" text-sm px-2 py-1 rounded-sm flex items-center hover:cursor-pointer" onClick={handleDelete}>
                            <Trash className="text-red-700" />
                            Delete</button>
                    </>
                )}



            </div>

            {isEditing && (
                <div className=" w-fill">
                    <textarea
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        className="w-[600px] p-2 border border-gray-300 rounded min-h-[100px]"
                        rows={3}

                    />
                    <div className="flex mt-2 space-x-2 justify-end">
                        <button onClick={handleUpdate} disabled={text?.trim() === newText?.trim() || !newText.trim()}
                            className="px-2 py-1.5  bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 ease-in-out disabled:bg-gray-300"
                        >Save</button>
                        <button className="px-2 py-1.5 bg-gray-50 text-gray-700 rounded transition duration-300 ease-in-out hover:bg-gray-100"
                            onClick={handleCancel}
                        >Cancel</button>
                    </div>
                </div>
            )}





        </div>

    )




}

export default UpdateDeleteCmt;
