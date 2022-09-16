import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'
import Card from '../../components/common/Card'
import { FetchingCard } from '../../components/common/FetchingCard'
import { Newspaper, SaveAs } from '../../components/common/HeroIcons'
import Pagination from '../../components/common/Pagination'
import { projectDataType } from '../../components/common/types'
import AppLayout from '../../components/Layouts/AppLayout'
import { fetcher } from '../../lib/fetcher'

export default function Projects() {
    return (
        <AppLayout>
            <div className="grid grid-cols-4 gap-5 pb-10">
                <div className="col-span-12 lg:col-span-3">
                    <LatestProjects />

                    {/* <RelatedProjects /> */}
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
            <TrendingProjects />
            {/* <UserIntrests /> */}
        </div>
    )
}

const LatestProjects = () => {
    const router = useRouter()

    const { data, error } = useSWR(
        `/api/projects?page=${router.query.page || 1}`,
        fetcher,
    )

    return (
        <Card>
            <Card.CardHeader>آخر المشاريع </Card.CardHeader>
            <FetchingCard data={data} error={error}>
                {data && (
                    <>
                        {data.data?.map((item: projectDataType, index) => (
                            <Card.CardItem key={item.id}>
                                <div>
                                    <Link
                                        href={`/${item.ownerUsername}/project/${item.id}`}>
                                        <a
                                            href=""
                                            className="text-sm text-primary font-bold">
                                            {item.name}
                                        </a>
                                    </Link>
                                    <div className="text-sm text-primary-text mt-2 opacity-50">
                                        {item.description}
                                    </div>
                                    <ProjectBriefStats
                                        contributions={item.contributionsCount}
                                        issues={item.issuesCount}
                                    />
                                </div>
                            </Card.CardItem>
                        ))}
                        <Pagination data={data} />
                    </>
                )}
            </FetchingCard>
        </Card>
    )
}

const TrendingProjects = () => {
    const { data, error } = useSWR(`/api/projects/trending`, fetcher)
    return (
        <Card>
            <Card.CardHeader>
                المشاريع الرائجة{' '}
                <span className="text-xs opacity-50 mr-2">
                    الأكثر مساهمة، تعليقات، قضايا خلال الأسبوع
                </span>
            </Card.CardHeader>
            <FetchingCard data={data} error={error}>
                {data &&
                    data.data?.map((item: projectDataType, index) => (
                        <Card.CardItem key={item.id}>
                            <div>
                                <Link
                                    href={`/${item.ownerUsername}/project/${item.id}`}>
                                    <a
                                        href=""
                                        className="text-sm text-primary font-bold">
                                        {item.name}
                                    </a>
                                </Link>
                                <div className="text-sm text-primary-text mt-2 opacity-50 line-clamp-2 hover:line-clamp-none transition-all duration-300 ease-in-out ">
                                    {item.description}
                                </div>
                                <ProjectBriefStats
                                    contributions={item.contributionsCount}
                                    issues={item.issuesCount}
                                />
                            </div>
                        </Card.CardItem>
                    ))}
            </FetchingCard>
        </Card>
    )
}

const UserIntrests = () => {
    return (
        <div className="">
            <Card>
                <Card.CardHeader>اهتماماتك، مهاراتك</Card.CardHeader>
                <Card.CardItem>البرمجة</Card.CardItem>
                <Card.CardItem>التصميم</Card.CardItem>
                <Card.CardItem>رياكت نيتف</Card.CardItem>
            </Card>
        </div>
    )
}

const ProjectBriefStats = ({ contributions, issues }) => {
    return (
        <div className="flex item-center mt-2   rtl">
            <div className="text-xs text-primary-text opacity-50 ml-4">
                <div className="flex item-center">
                    <SaveAs />
                    <span className="mr-1">مساهمات: {contributions}</span>
                </div>
            </div>
            {/* <div className="text-xs text-primary-text opacity-50 ml-4">
                <div className="flex item-center">
                    <SaveAs />
                    <span className="mr-1">تعليقات: {comments}</span>
                </div>
            </div> */}
            <div className="text-xs text-primary-text opacity-50 ml-4">
                <div className="flex item-center">
                    <Newspaper />
                    <span className="mr-1"> قضايا: {issues}</span>
                </div>
            </div>
        </div>
    )
}
