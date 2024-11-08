import React, { useState } from 'react';

function Card({ title, buttonTitle, description }) {

    const [onOpen, setOnOpen] = useState('')

    const onSubmit = () =>{
        if(title === "Resume"){
            setOnOpen
        }
    }


    return (
        <div className="max-w-xs p-4 bg-white rounded-3xl shadow-md transform transition-all hover:scale-105 hover:shadow-lg duration-300">
        <div className="relative bg-gradient-to-r from-purple-200 to-lavender-200 p-6 rounded-lg overflow-hidden">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
            <p className="text-gray-700 mb-4">{description}</p>
            <button className="py-2 px-6 bg-gradient-to-r from-purple-600 to-lavender-500 text-white font-semibold rounded-full hover:bg-purple-700 transition-all duration-300">
            {buttonTitle}
            </button>
        </div>
        </div>
    );
}

export default Card;
