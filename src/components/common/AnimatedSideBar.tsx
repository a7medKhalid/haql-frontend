import React, { useState } from 'react'

export default function AnimatedSideBar({ trigger, children }) {
    const [showSidebar, setShowSidebar] = useState(false)

    return (
        <>
            {showSidebar == true && (
                <button
                    className="flex text-4xl text-primary-text items-center cursor-pointer fixed right-5 top-6 z-50  "
                    onClick={() => setShowSidebar(!showSidebar)}>
                    x
                </button>
            )}
            <div onClick={() => setShowSidebar(!showSidebar)}>{trigger}</div>
            <div
                className={`top-0 right-0 w-[90vw] lg:w-[35vw] bg-white  shadow-2xl  text-primary-text fixed h-screen overflow-y-scroll z-40 rounded-l-2xl ease-out duration-150 ${
                    showSidebar ? 'translate-x-0 ' : 'translate-x-full'
                }`}>
                <div className="mt-20  text-primary-text pb-10">{children}</div>
            </div>
        </>
    )
}
