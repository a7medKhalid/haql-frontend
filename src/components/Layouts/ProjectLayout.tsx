import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import AppLayout from './AppLayout'

export default function ProjectLayout({ description, children }) {
    const router = useRouter()

    return (
        <AppLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-primary-text opacity-50 mt-5 text-xs">
                            #21
                        </p>
                        <h1 className="text-3xl font-bold text-primary-text">
                            {router.query.username}\{router.query.projectName}
                        </h1>
                        <p className="text-primary-text opacity-50 mt-5">
                            {description}
                        </p>
                    </div>
                </div>
            }
            subHeader={
                <div className="flex items-center">
                    <TabLink
                        href={`/${router.query.username}/${router.query.projectName}`}>
                        المستودع
                    </TabLink>
                    <TabLink
                        href={`/${router.query.username}/${router.query.projectName}/issues`}>
                        القضايا
                    </TabLink>
                    <TabLink
                        href={`/${router.query.username}/${router.query.projectName}/contributions`}>
                        المساهمات
                    </TabLink>
                    <TabLink
                        href={`/${router.query.username}/${router.query.projectName}/tasks`}>
                        المهام
                    </TabLink>
                </div>
            }>
            <div>{children}</div>
        </AppLayout>
    )
}
const TabLink = ({ children, ...props }) => {
    const router = useRouter()
    const active = props.href == router.asPath
    return (
        <Link href={props.href} {...props}>
            <div className="flex flex-col items-center justify-center pl-12 cursor-pointer">
                <a
                    className={`inline-flex items-center text-lg  text-center  hover:opacity-100  leading-5 focus:outline-accent transition duration-150 ease-in-out ${
                        active
                            ? ' text-primary-text opacity-100 '
                            : 'border-transparent text-primary-text opacity-70 hover:text-gray-700 '
                    }`}>
                    {children}
                </a>
                {active ? (
                    <div className="bg-primary h-1 w-24 mt-6" />
                ) : (
                    <div className=" h-1 w-24 mt-6" />
                )}
            </div>
        </Link>
    )
}
