import { MinusCircle, PlusCircle } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
function About() {
    const [ind, setInd] = useState(null);
    const accPanel = [
        {
            question: "What's the best feature of the app?",
            answer: `I would say the "FOLLOW" feature and its implementation. Its achieved through react query and had to create a lot of logic around it. I handled showing "following" on the user whom the logined user follows wherever the user I'm following appeared. Loaded zustand upon login with setting up a followingList array store to store users whom the logined user follows. Handling of optimistic update of removal of a user from following list upon an 'UNFOLLOW' only if the logined user is the owner of profile.`
        },
        {
            question: "How did you implement post recommendation feature?",
            answer: `This contains three phases: The Latest, The recommended and The popular posts. Latest and Popular posts are designed via .sort prototype of Arrays by sorting by most comments then by latest date posted.`
        },
        {
            question: "What was the Tech Stack used?",
            answer: `I've used React, Zustand, React Query's mutations and optimistic updates and Query stales, Node, MOngoDb.`
        },
        {
            question: "What was the intermediate level integrations in the App?",
            answer: `I've used Cloudinary services for profile of User and Image uploads of EditorJS while writing Articles. EditorJs with lists, code, image uploads and much more..`
        }
    ];
    const openAcc = (index) => {
        setInd(ind === index ? null : index);
    }

    return (
        <div className="max-w-2xl mx-auto p-4 mt-12 flex flex-col items-center justify-center">
            <h1 className="font-bold text-black text-5xl border-b border-gray-200 mb-3">FAQ panel</h1>
            {accPanel.map((item, index) => (
                <div key={index} className="border-b mb-4 border-gray-200 pb-4 ">
                    <button className="flex cursor-pointer justify-between items-center w-full text-left font-medium text-lg focus:outline-none"
                        onClick={() => openAcc(index)}
                    >
                        {item.question}
                        <span className="transform transition-transform duration-200">
                            {ind === index ? <PlusCircle /> : <MinusCircle />}
                        </span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${ind === index ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                        <div className="text-gray-600 pt-2">
                            {item.answer}
                        </div>
                    </div>

                </div>
            ))}
        </div>
    )




}

export default About;
