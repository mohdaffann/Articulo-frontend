import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchBlog from "../components/SearchBlog";
import axios from "axios";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import EditorLoader from "../components/EditorLoader";
import { ChevronDown } from 'lucide-react';
import UserSection from "../components/UserSection";
function Home() {
    const [sort, setSort] = useState('recommended');
    const [isViewOpen, setViewOpen] = useState(false)
    const [layoutType, setLayoutType] = useState('grid');
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
    const recommended = ['6851aaf70bf8497d5870515c', '6852d1e672d34997feed0272']
    return (
        <div className="max-w-7xl mx-auto px-5 py-5 my-10 min-h-[300px]">

            <div className=" flex flex-col lg:flex-row gap-8">
                <div className="flex-1 lg:w-4/5">
                    <div className="flex items-center justify-evenly mb-4 w-full">
                        <SearchBlog />
                        <div className="relative">
                            <button className="px-2 py-1.5 cursor-pointer bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-200 flex items-center  justify-center"
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
                    </div>

                    <div className=" flex items-center justify-start pl-6 space-x-3 mb-2.5 ">
                        <button className={`px-1.5 cursor-pointer py-1 rounded-md bg-gray-300 text-gray-700 text-[18px] ${sort === 'recommended' ? 'bg-gray-950 text-white' : null}`}
                            onClick={() => setSort('recommended')}
                        >Recommended</button>
                        <button className={`px-1.5 cursor-pointer py-1 rounded-md bg-gray-300 text-gray-700 text-[18px] ${sort === 'popular' ? 'bg-gray-950 text-white' : null}`}
                            onClick={() => { setSort('popular') }}
                        >Popular</button>
                        <button className={`px-1.5 cursor-pointer py-1 rounded-md bg-gray-300 text-gray-700 text-[18px] ${sort === 'latest' ? 'bg-gray-950 text-white' : null}`} onClick={() => setSort('latest')}>Latest</button>
                    </div>


                    <div className={layoutType === 'grid' ? 'grid gap-4 md:grid-cols-3 sm:grid-cols-1 ' : 'space-y-5 '}>
                        {response.data?.data?.blogs.filter((item) => {
                            if (sort === 'recommended') {
                                return recommended.includes(item?._id)
                            }
                            return true;
                        }).sort((a, b) => {
                            if (sort === 'popular') {
                                return b.commentCount - a.commentCount
                            }
                            else if (sort === 'latest') {
                                return new Date(b.createdAt) - new Date(a.createdAt)
                            }

                        })
                            .map((item, ind) => (
                                <Link key={ind} to={`/posts/${item._id}`}>
                                    <PostCard layoutType={layoutType} post={item} key={item._id} />
                                </Link>
                            ))}
                    </div>
                </div>
                <div className="lg:w-1/5">
                    <div className="sticky top-1/5 ">
                        <UserSection />
                    </div>
                </div>
            </div>


        </div>

    )
}

export default Home;
