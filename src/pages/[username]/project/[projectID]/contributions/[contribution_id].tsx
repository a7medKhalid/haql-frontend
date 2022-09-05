import React from 'react'
import { getData } from '../../../../../lib/getData'
import AppLayout from '../../../../../components/Layouts/AppLayout'
import ProjectLayout from '../../../../../components/Layouts/ProjectLayout'
import { Contributions } from '../../../../../components/page_components/user/projects/contributions/Contributions'
import { Contributers } from '../../../../../components/page_components/user/projects/contributions/Contributers'
import { Card, CardItem } from '../../../../../components/common/Card'
import Button from '../../../../../components/Button'
import { AddComment } from '../../../../../components/common/AddComment'
import { Comments } from '../../../../../components/common/Comments'
import Link from 'next/link'

export async function getServerSideProps(context) {
    const { username, projectID, contribution_id } = context.params
    // Fetch data from external API
    const { data, errors } = await getData(
        `/api/contributions/${contribution_id}`,
    )

    // Pass data to the page via props
    return { props: { data, errors, username, projectID, contribution_id } }
}
export default function Contribution({ data, contribution_id }) {
    const details = {
        title: data?.title,
        description: data?.description,
        contributor: { ...data?.contributor },
        link: data?.link,
        id: data?.id,
        createdAt: data?.created_at,
        status: data?.status,
    }

    return (
        <ProjectLayout projectData={data}>
            <div>
                <div className="lg:grid grid-cols-4 gap-5">
                    <div className="col-span-3 pb-10">
                        <Card>
                            <Card.CardHeader className="py-0 pt-3 pb-3">
                                <div className="flex items-center rtl">
                                    <div className="w-10 h-10 rounded-full bg-gray-300 ml-3"></div>
                                    <Link
                                        href={`/${details.contributor.username}`}>
                                        <a
                                            href=""
                                            className="text-primary  hover:underline cursor-pointer">
                                            {details?.contributor.name +
                                                '/' +
                                                details?.contributor.username}
                                        </a>
                                    </Link>
                                </div>
                            </Card.CardHeader>
                            <div className="p-5">
                                <div className="bold text-lg text-primary-text">
                                    {details.title}
                                </div>
                                <div className=" mt-3 text-primary-text">
                                    {details.description}
                                </div>
                            </div>
                        </Card>
                        <Comments />
                        <AddComment />
                    </div>
                    <div className="col-span-1">
                        <Card>
                            <Card.CardHeader>تفاصيل المساهمة</Card.CardHeader>
                            <CardItem>
                                <ProjectDetailItem
                                    title={'رقم المساهمة'}
                                    value={'#' + details?.id}
                                />
                            </CardItem>
                            <CardItem>
                                <ProjectDetailItem
                                    title={'التاريخ'}
                                    value={details.createdAt}
                                />
                            </CardItem>
                            <CardItem>
                                <ProjectDetailItem
                                    title={'الرابط'}
                                    value={details.link}
                                />
                            </CardItem>
                        </Card>
                    </div>
                </div>
            </div>
        </ProjectLayout>
    )
}

const ProjectDetailSpecialties = ({ specialties }) => {
    return (
        <div className="flex flex-col">
            <div className="text-primary-text font-bold hover:underline cursor-pointer">
                التخصصات
            </div>
            <div className="flex items-center justify-end mt-2">
                {specialties.map((specialty, index) => (
                    <ProjectDetailSpecialtiesItem title={specialty} />
                ))}
            </div>
        </div>
    )
}
const ProjectDetailSpecialtiesItem = ({ title }) => {
    return (
        <div className="border border-neutral-300 rounded text-center px-2 py-1 ml-2 ">
            {title}
        </div>
    )
}

const ProjectDetailItem = ({ title, value }) => {
    return (
        <div className="flex flex-col">
            <div className="text-primary-text font-bold hover:underline cursor-pointer">
                {title}
            </div>
            {title == 'الرابط' ? (
                <a
                    href={value}
                    target="_blank"
                    className="text-primary cursor-pointer hover:underline rtl mt-2">
                    {value}
                </a>
            ) : (
                <div className="text-primary-text opacity-50 rtl mt-2">
                    {value}
                </div>
            )}
        </div>
    )
}
