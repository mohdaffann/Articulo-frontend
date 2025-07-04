import React, { useState } from "react";
import PostCard from "../components/PostCard";
import axios from "axios";
import { Link } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import EditorLoader from "../components/EditorLoader";
import SearchBlog from "../components/SearchBlog";
import { ChevronDown, ChevronRight, CircleChevronDownIcon } from "lucide-react";
function Posts() {
    const [layoutType, setLayoutType] = useState('grid');
    const [sort, setSort] = useState('Tech');
    const [isOpen, setOpen] = useState(false);
    const [isCatOpen, setCatOpen] = useState(false)
    const [isViewOpen, setViewOpen] = useState(false)
    const response = useQuery(
        {
            queryKey: ['posts'],
            queryFn: async () => {
                return await axios.get('v1/blog')
            },
            staleTime: 6 * 60 * 1000
        }
    )

    if (response.isLoading) {
        return (

            <div className="flex flex-row lg:flex-row max-w-5xl mx-auto px-5 py-5 my-10">

                <div className="w-full lg:w-2/3 space-y-6">
                    {
                        [...Array(7)].map((_, ind) => (
                            <EditorLoader key={ind} />
                        ))
                    }
                </div>

            </div>

        )
    }
    if (response.isError) {
        return <div>{Error}</div>
    }


    return (


        <div className=" max-w-5xl mx-auto px-5 py-5 my-10 min-h-[300px]">


            <div className="flex items-center justify-evenly mb-4 w-full">
                <SearchBlog />
                <div className="relative">
                    <button className="cursor-pointer px-2 py-1.5 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-200 flex items-center  justify-center"
                        onClick={() => setViewOpen(!isViewOpen)}
                    >
                        <span className="font-medium text-gray-700">view:{layoutType}</span>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isViewOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isViewOpen && (
                        <div className="absolute top-full left-0 mt-1 w-full  bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                            <button className="cursor-pointer w-full px-4 py-3 text-left text-gray-700  border-b border-gray-100"
                                onClick={() => {
                                    setLayoutType('grid')
                                    setViewOpen(false)
                                }}
                            >
                                grid
                            </button>
                            <button className="cursor-pointer w-full px-4 py-3 text-left text-gray-700  border-b border-gray-100"
                                onClick={() => {
                                    setLayoutType('flex')
                                    setViewOpen(false)
                                }}
                            >
                                flex
                            </button>

                        </div>
                    )}
                </div>
                <div className="relative ">
                    <button className="cursor-pointer px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-200 flex items-center  justify-center"
                        onClick={() => setOpen(!isOpen)}
                    >
                        <span className="font-medium text-gray-700">Sort:{sort}</span>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                        <div className="absolute top-full left-0 mt-1 w-full  bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">

                            <button
                                className={` cursor-pointer w-full px-4 py-3 text-left text-gray-700  border-b border-gray-100 ${isCatOpen ? `bg-orange-400` : ''}`}
                                onClick={() => setCatOpen(!isCatOpen)}
                            >Category</button>
                            {isCatOpen && (
                                <div className="bg-gray-50 border-t border-gray-200">
                                    <div className="grid grid-cols-2  p-0">
                                        <button className="cursor-pointer px-2 py-2  text-sm text-gray-600 text-left"
                                            onClick={() => {
                                                setSort('Sports')
                                                setOpen(false)
                                            }}
                                        >
                                            Sports
                                        </button>
                                        <button className="cursor-pointer px-2 py-2 text-sm text-gray-600 text-left"
                                            onClick={() => {
                                                setSort('Music')
                                                setOpen(false)
                                            }}
                                        >
                                            Music
                                        </button>
                                        <button className="cursor-pointer px-2 py-2 text-sm text-gray-600 text-left" onClick={() => {
                                            setSort('News')
                                            setOpen(false)
                                        }}>
                                            News
                                        </button>
                                        <button className="cursor-pointer px-2 py-2 text-sm text-gray-600 text-left" onClick={() => {
                                            setSort('Tech')
                                            setOpen(false)
                                        }}>
                                            Tech
                                        </button>
                                        <button className="cursor-pointer px-2 py-2 text-sm text-gray-600 text-left" onClick={() => {
                                            setSort('Others')
                                            setOpen(false)
                                        }}>
                                            Others
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

            </div>

            <div className={layoutType === 'grid' ? 'grid gap-4 md:grid-cols-3 sm:grid-cols-1' : 'space-y-5'}>
                {response?.data?.data.blogs.filter((item, ind) => (
                    item.category === sort
                )).map((item, ind) => (
                    <Link to={`/posts/${item._id}`}>
                        <PostCard post={item} layoutType={layoutType} key={ind} />
                    </Link>

                ))}
                {
                    response?.data?.data?.blogs.filter(item => item.category === sort).length === 0 && (
                        <div className="col-span-full text-gray-500 text-center py-8">
                            No posts found in this category
                        </div>
                    )
                }
            </div>



        </div>



    )
}

export default Posts;
