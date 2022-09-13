import React from 'react'
import { getData } from '../../../../../lib/getData'
import AppLayout from '../../../../../components/Layouts/AppLayout'
import ProjectLayout from '../../../../../components/Layouts/ProjectLayout'
import { Contributions } from '../../../../../components/page_components/user/projects/contributions/Contributions'
import { Contributers } from '../../../../../components/page_components/user/projects/contributions/Contributers'
import { Card, CardItem } from '../../../../../components/common/Card'
import { Comments } from '../../../../../components/common/Comments'
import { AddComment } from '../../../../../components/common/AddComment'
import Link from 'next/link'
import Label from '../../../../../components/Label'
import useSWR from 'swr'
import { fetcher } from '../../../../../lib/fetcher'
import { FetchingCard } from '../../../../../components/common/FetchingCard'
import axios from '../../../../../lib/axios'
import useSubmit from '../../../../../hooks/useSubmit'
import { useRouter } from 'next/router'
import { LOCALE_WORDS } from '../../../../../lib/generalHelpers'
import AnimatedSideBar from '../../../../../components/common/AnimatedSideBar'
import Button from '../../../../../components/Button'
import { ChevronDoubleIcon } from '../../../../../components/common/HeroIcons'

export async function getServerSideProps(context) {
    const { issue_id } = context.params
    // Fetch data from external API
    const { data, errors } = await getData(`/api/issues/${issue_id}`)

    // Pass data to the page via props
    return { props: { data, errors } }
}
export default function Issue({ data }) {
    const details = {
        title: data?.title,
        description: data?.description,
        issuer: { ...data?.user },
        id: data?.id,
        createdAt: data?.created_at,
        status: data?.status,
    }

    return (
        <ProjectLayout>
            <div>
                <div className="lg:grid grid-cols-4 gap-5">
                    <div className="col-span-3 pb-10">
                        <Card>
                            <Card.CardHeader className=" flex items-center justify-between">
                                <DeleteIssue id={details.id} />
                                <div className="flex items-center rtl">
                                    {/* <div className="w-10 h-10 rounded-full bg-gray-300 ml-3"></div> */}
                                    <Link
                                        href={`/${details.issuer.issuername}`}>
                                        <a
                                            href=""
                                            className="text-primary  hover:underline cursor-pointer">
                                            {details?.issuer.name +
                                                '/' +
                                                details?.issuer.username}
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
                        <Comments model="issues" />
                        <AddComment model="issues" />
                    </div>
                    <div className="col-span-1">
                        <CardDetails details={details} />
                    </div>
                </div>
            </div>
        </ProjectLayout>
    )
}

const CardDetails = ({ details }) => {
    return (
        <Card>
            <Card.CardHeader>تفاصيل القضية</Card.CardHeader>
            <CardItem>
                <ProjectDetailItem
                    title={'الحالة'}
                    value={LOCALE_WORDS.ar[details.status]}
                />
            </CardItem>
            <CardItem>
                <ProjectDetailItem
                    title={'رقم القضية'}
                    value={`#${details.id}`}
                />
            </CardItem>
            <CardItem>
                <ProjectDetailItem
                    title={'التاريخ'}
                    value={details.createdAt}
                />
            </CardItem>
            <IssueStatus id={details.id} />
        </Card>
    )
}

const IssueStatus = ({ id }) => {
    const { send, errors, response, loading } = useSubmit()
    const router = useRouter()

    const { data, error } = useSWR(
        `/api/permissions?model=issue&model_id=${id}&permission=update`,
        fetcher,
    )
    if (!data) {
        return null
    }
    if (data?.message === false) {
        return null
    }
    const changeStatus = e => {
        send({
            payload: {
                status: e.target.value,
                issue_id: id,
            },
            method: 'put',
            url: '/api/issues/',
            onSuccess: a => {
                const refreshData = () => {
                    router.replace(router.asPath)
                }
                refreshData()
            },
        })
    }

    return (
        <CardItem>
            <div>
                <div className="text-primary-text font-bold mb-2">
                    حالة القضية
                </div>
                <select
                    onChange={changeStatus}
                    className="outline-none border border-neutral-300 rounded-lg rtl text-primary-text/80 text-sm focus:border-accent focus:ring focus:ring-accent">
                    <option>-- تغيير الحالة--</option>
                    <option value={'open'}>مفتوحة</option>
                    <option value={'closed'}>مغلقة</option>
                </select>
            </div>
        </CardItem>
    )
}

const DeleteIssue = ({ id }) => {
    const deleteIssue = () => {}
    const { data, error } = useSWR(
        `/api/permissions?model=issue&model_id=${id}&permission=delete`,
        fetcher,
    )
    if (!data) {
        return <div></div>
    }
    if (data?.message === false) {
        return <div></div>
    }
    return (
        <AnimatedSideBar
            trigger={
                <Button className="py-2 text-xs bg-red-500 border-b-red-700 hover:bg-red-600">
                    <ChevronDoubleIcon classname="mr-2 w-5 h-5" />
                    حذف القضية
                </Button>
            }>
            <div>
                <Card.CardHeader>
                    <div className="text-2xl bold">
                        هل أنت متأكد من حذف القضية
                    </div>

                    <Button
                        className="mt-4 text-xs py-3 bg-red-500 border-b-red-700 hover:bg-red-600"
                        onClick={deleteIssue}>
                        نعم، متأكد
                    </Button>
                </Card.CardHeader>
            </div>
        </AnimatedSideBar>
    )
}
const ProjectDetailSpecialties = ({ specialties }) => {
    return (
        <div className="flex flex-col">
            <div className="text-primary-text font-bold ">التخصصات</div>
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
            <div className="text-primary-text font-bold ">{title}</div>
            <div className="text-primary-text opacity-50 rtl mt-2">{value}</div>
        </div>
    )
}
