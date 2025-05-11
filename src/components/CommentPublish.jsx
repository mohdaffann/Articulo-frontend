import { useState, useRef, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';

const CommentPublish = ({ blogId }) => {
    const queryClient = useQueryClient();
    const [isExpanded, setIsExpanded] = useState(false);
    const [comment, setComment] = useState('');
    const textareaRef = useRef(null);

    const postComment = async (content) => {
        return await axios.post(`/v1/blog/comments/${blogId}`, { text: content });

    }

    const { mutate } = useMutation({
        mutationFn: postComment,
        onMutate: async (newData) => {
            await queryClient.cancelQueries(["comments", blogId]);
            const previousCommentsData = queryClient.getQueryData(["comments", blogId]);
            queryClient.setQueryData(['comments', blogId], (oldData) => {
                console.log(oldData);

                return {


                    ...oldData.data,
                    comments: [
                        {
                            blogId: blogId,
                            text: newData,
                            createdAt: new Date().toISOString(),
                            _id: 'optimistic-update-id'

                        },
                        ...oldData.data.comments
                    ],

                }
            })
            return { previousCommentsData }
        },

        onError: (error, newData, context) => {
            console.log('error occured in onError of mutation', error.message);
            queryClient.setQueryData(['comments', blogId], context.previousCommentsData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['comments', blogId]);
        }
    })

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    }, [comment, isExpanded]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            mutate(comment);
            setComment('');
            setIsExpanded(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-gray-50 rounded-xl overflow-x-hidden">
            <form onSubmit={handleSubmit}>
                <div className={`transition-all duration-200 ease-in-out ${isExpanded ? 'mb-3' : ''}`}>
                    <textarea
                        ref={textareaRef}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onFocus={() => setIsExpanded(true)}
                        className={`w-full transition-all duration-200 ease-in-out
                            ${isExpanded ?
                                'min-h-[100px]  pb-3 pt-2 px-0' :
                                'h-10  pb-2 px-0'
                            }
                            focus:outline-none focus:border-gray-400
                            resize-none overflow-hidden
                             placeholder-gray-500 text-gray-800    font-serif text-lg`}
                        placeholder={isExpanded ? "What are your thoughts?" : "Write a comment..."}
                    />
                </div>

                {isExpanded && (
                    <div className="flex justify-end space-x-3 mt-2 hover: cursor-pointer">
                        <button
                            type="button"
                            onClick={() => {
                                setComment('');
                                setIsExpanded(false);
                            }}
                            className="px-4 py-2 text-gray-800 hover:text-gray-500 transition hover:cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!comment.trim()}
                            className={`px-4 py-2 rounded-full transition
                ${comment.trim() ?
                                    'bg-green-600 text-white hover:bg-green-700 hover:cursor-pointer' :
                                    'bg-gray-200 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            Respond
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default CommentPublish;