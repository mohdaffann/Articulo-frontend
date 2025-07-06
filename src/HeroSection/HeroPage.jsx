import { ChevronsRight, User2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
function HeroPage() {
    return (
        <div className="w-full flex flex-col px-4 py-6 sm:px-6 md:px-8 lg:px-8 gap-6 md:gap-8   mt-5 min-h-screen">
            <div className="text-center">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl text-black font-black ">
                    Articulo
                </h1>
                <p className="text-gray-800 italic text-lg sm:text-xl lg:text-2xl mt-2">
                    "Every word matters."
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 items-center justify-center ">
                    <Link className="flex items-center px-2.5 py-1.5 rounded-[5px]  duration-200  text-gray-900 border-2 border-gray-900 transition ease-in-out hover:bg-gray-900 hover:text-white"
                        to={'/login'}
                    >
                        <User2Icon />
                        Login

                    </Link>
                    <Link className="flex items-center px-2.5 py-1.5 rounded-[5px]  duration-200 text-gray-900 border-2 border-gray-900 transition ease-in-out hover:bg-gray-900 hover:text-white"
                        to={'/home'}
                    >
                        Explore
                        <ChevronsRight />
                    </Link>
                </div>
                <div className="mt-6 mb-6 border-b-2 border-b-gray-900 max-w-[400px] mx-auto">
                    <span className="text-gray-700 font-semibold text-2xl sm:text-3xl">Features</span>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 max-w-4xl justify-center items-center md:grid-cols-2 md:gap-6  mx-auto w-full">

                <div className=" bg-white rounded-lg shadow-md transition ease-in-out cursor-pointer duration-300 hover:shadow-lg flex flex-col sm:flex-row p-4 sm:p-6 gap-4 items-center sm:items-start">
                    <img src="https://res.cloudinary.com/dfmtemqoz/image/upload/v1751209664/inks_10501275_zxcsvh.png"
                        className="object-contain h-28 w-28  shrink-0"
                    />
                    <div className="  flex flex-col gap-2  text-center sm:text-left ">
                        <div className="mb-2">
                            <span className="text-lg sm:text-xl font-semibold text-gray-800">Ink it.</span>

                        </div>
                        <span className="text-gray-700">Write personalized articles</span>
                        <span className="text-gray-700">Upload images</span>
                        <span className="text-gray-700">Write code</span>
                        <span className="text-gray-700">Choose a category</span>
                    </div>
                </div>
                <div className="  bg-white rounded-lg shadow-md transition duration-300 cursor-pointer ease-in-out hover:shadow-lg flex flex-col sm:flex-row p-4 sm:p-6 gap-4 items-center sm:items-start ">
                    <img src="https://res.cloudinary.com/dfmtemqoz/image/upload/v1751209664/follow_9238353_qffwlx.png" className="object-contain h-28 w-28  shrink-0" />
                    <div className="  flex flex-col gap-2  text-center sm:text-left">
                        <div className="mb-2">
                            <span className="text-lg sm:text-xl font-semibold text-gray-800">Follow</span>
                        </div>

                        <span className="text-gray-700">Find users</span>
                        <span className="text-gray-700">Follow users</span>
                        <span className="text-gray-700">Unfollow users</span>
                        <span className="text-gray-700">Get follow lists</span>
                    </div>
                </div>
                <div className="  bg-white rounded-lg shadow-md transition duration-300 cursor-pointer ease-in-out hover:shadow-lg flex flex-col sm:flex-row p-4 sm:p-6 gap-4 items-center sm:items-start">
                    <img src="https://res.cloudinary.com/dfmtemqoz/image/upload/v1751209664/compose_18311539_b8yefd.png" className="object-contain h-28 w-28  shrink-0" />
                    <div className=" flex flex-col gap-2  text-center sm:text-left">
                        <div className="mb-2">
                            <span className="text-lg sm:text-xl font-semibold text-gray-800">Own what you own</span>
                        </div>

                        <span className="text-gray-700">Post comments</span>
                        <span className="text-gray-700">Edit comments</span>
                        <span className="text-gray-700">Delete comments</span>
                    </div>
                </div>
                <div className=" bg-white rounded-lg shadow-md transition duration-300 cursor-pointer ease-in-out hover:shadow-lg flex flex-col sm:flex-row p-4 sm:p-6 gap-4 items-center sm:items-start">
                    <img src="https://res.cloudinary.com/dfmtemqoz/image/upload/v1751209664/filter-browser_17252861_hblrlt.png" className="object-contain h-28 w-28  shrink-0" />
                    <div className=" flex flex-col gap-2  text-center sm:text-left">
                        <div className="mb-2">
                            <span className="text-lg sm:text-xl font-semibold text-gray-800"> Pick from the Abyss</span>
                        </div>

                        <span className="text-gray-700">Search Articles</span>
                        <span className="text-gray-700">Sort by Category filters</span>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default HeroPage;
