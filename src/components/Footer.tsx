import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <div className=" border-t border-neutral-300 rtl py-9 px-5 mt-10 flex items-center justify-between text-primary-text/50">
            <div className="flex items-center">
                <div className="text-xs bold">حقل</div>
                <div className="flex items-center  mr-4 text-xs">
                    <Link href="/explore/projects">
                        <a className="text-primary/50 hover:text-primary hover:underline ">
                            المشاريع
                        </a>
                    </Link>
                    <Link href="/explore/users">
                        <a className="text-primary/50 hover:text-primary hover:underline mr-2">
                            الحسابات
                        </a>
                    </Link>
                </div>
            </div>
            <div>
                <div className="flex items-center text-primary-text/50 text-xs">
                    <div className="ml-2">
                        {' '}
                        تواصل معنا{' '}
                        <a
                            href="mailto:alseef@gmail.com"
                            className="text-primary/50 hover:text-primary hover:underline">
                            alseef@gmail.com{' '}
                        </a>
                    </div>
                    جميع الحقوق محفوظة © السيف
                </div>
            </div>
        </div>
    )
}
