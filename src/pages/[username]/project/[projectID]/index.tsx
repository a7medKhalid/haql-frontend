import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'
import Card, { CardItem } from '../../../../components/common/Card'
import { FetchingCard } from '../../../../components/common/FetchingCard'
import AppLayout from '../../../../components/Layouts/AppLayout'
import ProjectLayout from '../../../../components/Layouts/ProjectLayout'
import axios from '../../../../lib/axios'
import { fetcher } from '../../../../lib/fetcher'
import { getData } from '../../../../lib/getData'

export async function getServerSideProps(context) {
    const { username, projectID } = context.params

    // Fetch data from external API
    const { data, errors } = await getData(
        `/api/projects/${projectID}/contributions?status=accepted`,
    )
    const { data: projectInfo } = await getData(`/api/projects/${projectID}`)

    // Pass data to the page via props
    return { props: { data, errors, projectInfo } }
}
export default function projectName({
    data,
    errors,
    username,
    projectID,
    projectInfo,
}) {
    const router = useRouter()
    console.log({ projectInfo })

    return (
        <ProjectLayout projectData={data}>
            <div className="grid grid-cols-4 gap-5">
                <Card className="col-span-12 lg:col-span-3">
                    <Card.CardHeader>
                        <div className="opacity-70">
                            دمج #12 إضافة الشعار، بواسطة فيصل حداد
                        </div>
                    </Card.CardHeader>
                    {data?.data?.map(contribution => (
                        <Card.CardItem key={contribution.id}>
                            <ContributionItem
                                username={`${contribution.contributor.name}/${contribution.contributor.username}`}
                                contribution_id={contribution.id}
                                name={contribution.title}
                            />
                        </Card.CardItem>
                    ))}
                </Card>

                <Card className="col-span-12 lg:col-span-1">
                    <Card.CardHeader>
                        <div className="opacity-70">معلومات المشروع</div>
                    </Card.CardHeader>
                    <CardItem>
                        <ProjectDetailItem
                            title={'اسم المشروع'}
                            value={projectInfo?.name}
                        />
                    </CardItem>
                    <CardItem>
                        <ProjectDetailItem
                            title={'وصف المشروع'}
                            value={projectInfo?.description}
                        />
                    </CardItem>
                    <CardItem>
                        <ProjectDetailItem
                            title={'صاحب المشروع'}
                            value={router.query.username}
                        />
                    </CardItem>
                    <CardItem>
                        <ProjectDetailItem
                            title={'تاريخ الإنشاء'}
                            value={projectInfo?.created_at}
                        />
                    </CardItem>
                    <CardItem>
                        <a
                            href={`/${router.query.username}/project/${router.query.projectID}/info`}
                            target="_blank"
                            className="text-primary hover:underline cursor-pointer text-sm">
                            صفحة مشاركة
                        </a>
                    </CardItem>
                </Card>
            </div>
        </ProjectLayout>
    )
}

export const ContributionItem = ({ username, contribution_id, name }) => {
    return (
        <div className="flex items-center text-xs justify-between w-full">
            <div className="flex items-center justify-between">
                <div className="text-primary-text text border-r border-neutral-300  px-5 ">
                    {`#${contribution_id}`}
                </div>
                <div className="flex items-center text-primary-text text border-r border-neutral-300  px-5">
                    <div className=" ">{username}</div>
                    <div className="w-7 h-7 rounded-full bg-gray-300 ml-3"></div>
                </div>
            </div>
            <div className="text-primary-text text-lg">{name}</div>
        </div>
    )
}

const ProjectDetailItem = ({ title, value }) => {
    return (
        <div className="flex flex-col">
            <div className="text-primary-text font-bold ">{title}</div>
            <div className="text-primary-text opacity-50 rtl mt-2">{value}</div>
        </div>
    )
}
