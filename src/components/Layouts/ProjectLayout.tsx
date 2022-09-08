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
import { projectDataType } from '../common/types'
import AppLayout, { getRouteName } from './AppLayout'

interface props {
    children: any
    projectData?: projectDataType
}
export default function ProjectLayout({ children, projectData }: props) {
    const router = useRouter()

    return (
        <AppLayout
            variant="default"
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <a
                            href={`/${router.query.username}/project/${router.query.projectID}/info`}
                            target="_blank"
                            className="text-primary hover:underline cursor-pointer text-sm">
                            صفحة مشاركة
                        </a>
                    </div>
                </div>
            }
            subHeader={
                <div className="flex items-center overflow-x-auto">
                    <TabLink
                        href={`/${router.query.username}/project/${router.query.projectID}`}>
                        <div className="flex items-center ml-2">
                            <DocumentTextIcon />
                        </div>
                        المستودع
                    </TabLink>
                    <TabLink
                        href={`/${router.query.username}/project/${router.query.projectID}/issues`}>
                        <div className="flex items-center ml-2">
                            <Newspaper />
                        </div>
                        القضايا
                    </TabLink>
                    <TabLink
                        href={`/${router.query.username}/project/${router.query.projectID}/contributions`}>
                        <div className="flex items-center ml-2">
                            <SaveAs />
                        </div>
                        المساهمات
                    </TabLink>
                    <TabLink
                        href={`/${router.query.username}/project/${router.query.projectID}/tasks`}>
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
