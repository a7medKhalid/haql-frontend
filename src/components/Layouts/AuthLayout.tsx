import React from 'react'

import authBanner from '../../assets/images/authBanner.png'
import seefLogo from '../../assets/svg/seef-logo.svg'
import Image from 'next/image'
export default function AuthLayout({ children }) {
    return (
        <div className="lg:grid lg:grid-cols-5 bg-gray-50">
            <div className="lg:col-span-3 h-[50vh]  lg:h-screen overflow-hidden relative">
                <Image
                    src={authBanner}
                    className="brightness-50 object-cover"
                    layout="fill"
                />
                <div className="absolute bottom-8 right-24 text-center pl-24 lg:text-right">
                    <div className="text-5xl lg:text-8xl text-white font-bold ">
                        ..حقل
                    </div>
                    <div className="text-2xl lg:text-4xl text-white mt-8 mb-5 lg:mb-28">
                        هنا بذور الأوقاف الرقمية
                    </div>
                    <div className=" flex flex-col items-center lg:items-end justify-center text-center">
                        <Image
                            src={seefLogo}
                            layout="fixed"
                            width={120}
                            className="mt-28 block "
                        />
                        <div className="bold text-accent mt-5 text-center text-xs lg:text-md opacity-50">
                            السيف <br /> للخدمات التقنية
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-2 mt-10 lg:mt-0 flex items-center justify-center pb-20 lg:pb-0">
                {children}
            </div>
        </div>
    )
}
