import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'
import Card from '../../components/common/Card'
import { FetchingCard } from '../../components/common/FetchingCard'
import {
    DocumentTextIcon,
    Newspaper,
    SaveAs,
} from '../../components/common/HeroIcons'
import { userType } from '../../components/common/types'
import AppLayout from '../../components/Layouts/AppLayout'
import { fetcher } from '../../lib/fetcher'

export default function Users() {
    return (
        <AppLayout>
            <div className="grid grid-cols-4 gap-5">
                <div className="col-span-12 lg:col-span-3">
                    <WrapperContainer type="" title="آخر الحسابات" />
                    {/* <LatestUsers /> */}
                </div>
                <div className="col-span-12 lg:col-span-1">
                    <SideBar />
                </div>
            </div>
        </AppLayout>
    )
}

const SideBar = () => {
    return (
        <div className="grid grid-cols-1 gap-5">
            <WrapperContainer type="most-contributors" title="الأكثر مساهمة" />
            <WrapperContainer type="most-projects" title="الأكثر مشاريعًا" />
        </div>
    )
}

const WrapperContainer = ({ type = '', title }) => {
    const { data, error } = useSWR(`/api/users/${type}`, fetcher)

    return (
        <Card>
            <Card.CardHeader>{title}</Card.CardHeader>
            <FetchingCard data={data} error={error}>
                {data &&
                    data.data?.map((item: userType, index) => (
                        <Card.CardItem>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="ml-2">
                                        <UserCard
                                            bio={item?.bio}
                                            username={item?.username}
                                            contributions={
                                                item?.contributionsCount
                                            }
                                            projects={item?.projectsCount}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card.CardItem>
                    ))}
            </FetchingCard>
        </Card>
    )
}

const ProjectBriefStats = ({ contributions, projects }) => {
    return (
        <div className="flex item-center mt-2   rtl">
            <div className="text-xs text-primary-text opacity-50 ml-4">
                <div className="flex item-center">
                    <SaveAs />
                    <span className="mr-1">مساهمات: {contributions}</span>
                </div>
            </div>

            <div className="text-xs text-primary-text opacity-50 ml-4">
                <div className="flex item-center">
                    <DocumentTextIcon />
                    <span className="mr-1"> المشاريع: {projects}</span>
                </div>
            </div>
        </div>
    )
}

const UserCard = ({ username, bio, contributions, projects }) => {
    return (
        <div className="flex  rtl">
            <div className="w-16 pl-5">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            </div>
            <div>
                <Link href={`/${username}`}>
                    <a className="text-sm  text-primary curosr-pointer hover:underline font-bold">
                        {username}
                    </a>
                </Link>
                <div>
                    <div className="text-sm text-primary-text opacity-50 mt-2 line-clamp-3 hover:line-clamp-none ">
                        {bio}
                    </div>
                </div>

                <ProjectBriefStats
                    contributions={contributions}
                    projects={projects}
                />
            </div>
        </div>
    )
}
