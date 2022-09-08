import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'
import Card from '../../../../components/common/Card'
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

    // Pass data to the page via props
    return { props: { data, errors } }
}
export default function projectName({ data, errors, username, projectID }) {
    const router = useRouter()

    return (
        <ProjectLayout projectData={data}>
            <div>
                <FetchingCard data={data} error={errors}>
                    <Card className="mt-4">
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
                </FetchingCard>
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
