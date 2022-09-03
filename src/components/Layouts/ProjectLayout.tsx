import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import {
    DocumentTextIcon,
    ExternalLink,
    Layout,
    Newspaper,
    SaveAs,
    ShareLink,
} from '../common/HeroIcons'
import { TabLink } from '../common/TabLink'
import AppLayout, { getRouteName } from './AppLayout'

export default function ProjectLayout({ description, children }) {
    const router = useRouter()
    console.log({ router })

    return (
        <AppLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center text-primary-text mt-5">
                            <ShareLink classname="" />
                            <div className="text-xs opacity-50 mr-1">
                                http://localhost:3000/{router.query.username}/
                                {router.query.projectName}
                            </div>
                        </div>

                        <p className="text-primary-text opacity-50 mt-2 text-xs">
                            #21
                        </p>
                        <Head>
                            <title>
                                {router.query.projectName}/
                                {router.query.username} -{' '}
                                {getRouteName(router.asPath)}
                            </title>
                        </Head>
                        <h1 className="text-3xl font-bold text-primary-text">
                            <Link href={`/${router.query.username}`}>
                                <span className="hover:text-primary hover:underline cursor-pointer">
                                    {router.query.username}
                                </span>
                            </Link>
                            \{router.query.projectName}
                        </h1>
                        <p className="text-primary-text opacity-50 mt-5">
                            {description}
                        </p>
                    </div>
                    <div>
                        <a
                            href={`/${router.query.username}/${router.query.projectName}/info`}
                            target="_blank"
                            className="text-primary hover:underline cursor-pointer text-sm">
                            صفحة مشاركة
                        </a>
                    </div>
                </div>
            }
            subHeader={
                <div className="flex items-center">
                    <div className="flex items-center">
                        <TabLink
                            href={`/${router.query.username}/${router.query.projectName}`}>
                            <div className="flex items-center ml-2">
                                <DocumentTextIcon />
                            </div>
                            المستودع
                        </TabLink>
                    </div>
                    <TabLink
                        href={`/${router.query.username}/${router.query.projectName}/issues`}>
                        <div className="flex items-center ml-2">
                            <Newspaper />
                        </div>
                        القضايا
                    </TabLink>
                    <TabLink
                        href={`/${router.query.username}/${router.query.projectName}/contributions`}>
                        <div className="flex items-center ml-2">
                            <SaveAs />
                        </div>
                        المساهمات
                    </TabLink>
                    <TabLink
                        href={`/${router.query.username}/${router.query.projectName}/tasks`}>
                        <div className="flex items-center ml-2">
                            <Layout />
                        </div>
                        المهام
                    </TabLink>
                </div>
            }>
            <div>{children}</div>
        </AppLayout>
    )
}
