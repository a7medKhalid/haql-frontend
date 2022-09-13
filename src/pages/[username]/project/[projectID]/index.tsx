import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import useSWR from 'swr'
import Button from '../../../../components/Button'
import AnimatedSideBar from '../../../../components/common/AnimatedSideBar'
import Card, { CardItem } from '../../../../components/common/Card'
import { FetchingCard } from '../../../../components/common/FetchingCard'
import { ChevronDoubleIcon } from '../../../../components/common/HeroIcons'
import AppLayout from '../../../../components/Layouts/AppLayout'
import ProjectLayout from '../../../../components/Layouts/ProjectLayout'
import CreateContributionsForm from '../../../../components/page_components/user/projects/contributions/CreateContributionsForm'
import useSubmit from '../../../../hooks/useSubmit'
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

    return (
        <ProjectLayout projectData={data}>
            <div className="grid grid-cols-4 gap-5">
                <Card className="col-span-12 lg:col-span-3 order-1 lg:order-0">
                    <ProjectAcceptedContributions
                        data={data}
                        projectID={projectInfo.id}
                    />
                </Card>

                <Card className="col-span-12 lg:col-span-1 lg:order-1">
                    <ProjectDetails projectInfo={projectInfo} />
                </Card>
            </div>
        </ProjectLayout>
    )
}

const ProjectAcceptedContributions = ({ data, projectID }) => {
    const router = useRouter()
    return (
        <>
            <Card.CardHeader className="py-0 pt-3 pb-3 lg:flex items-center justify-between">
                <RepositeryQuickAdd projectID={projectID} />
                <div className="opacity-70">المساهمات المعتمدة</div>
            </Card.CardHeader>
            {data?.data?.map(contribution => (
                <Link
                    href={`/${router.query.username}/project/${router.query.projectID}/contributions/${contribution.id}`}>
                    <div>
                        <Card.CardItem
                            key={contribution.id}
                            className="hover:bg-neutral-200 cursor-pointer transition duration-150 ease-out">
                            <ContributionItem
                                username={`${contribution.contributor.name}/${contribution.contributor.username}`}
                                contribution_id={contribution.id}
                                name={contribution.title}
                            />
                        </Card.CardItem>
                    </div>
                </Link>
            ))}
        </>
    )
}

const ProjectDetails = ({ projectInfo }) => {
    const router = useRouter()

    return (
        <>
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
        </>
    )
}

export const ContributionItem = ({ username, contribution_id, name }) => {
    return (
        <div className="flex items-center text-xs justify-between w-full ">
            <div className="lg:flex items-center justify-between">
                <div className="text-primary-text text border-r border-neutral-300  px-5 ">
                    {`#${contribution_id}`}
                </div>
                <div className="flex items-center  text-primary-text text border-r border-neutral-300  px-5">
                    <div className=" ">{username}</div>
                    {/* <div className="w-7 h-7 rounded-full bg-gray-300 ml-3"></div> */}
                </div>
            </div>
            <div className="text-primary-text text-xs lg:text-lg">{name}</div>
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

const RepositeryQuickAdd = ({ projectID }) => {
    const [success, setSuccess] = useState(false)
    const router = useRouter()
    const { send } = useSubmit()
    const { data, error } = useSWR(
        `/api/permissions?model=project&model_id=${projectID}&permission=update`,
        fetcher,
    )
    const addContribution = async formState => {
        await send({
            payload: formState,
            url: '/api/contributions',
            onSuccess: a => {
                send({
                    payload: {
                        contribution_id: a.id,
                        status: 'accepted',
                    },
                    method: 'put',
                    url: '/api/contributions',
                    onSuccess: a => {
                        setSuccess(true)
                        setTimeout(() => {
                            setSuccess(false)
                        }, 5000)
                        router.replace(router.asPath)
                    },
                })
            },
        })
    }

    if (!data) {
        return <div className="py-5"></div>
    }
    if (data?.message === false) {
        return <div className="py-5"></div>
    }
    return (
        <AnimatedSideBar
            trigger={
                <Button className="py-1 mb-2 lg:mb-0 lg:py-2 text-xs ">
                    <ChevronDoubleIcon classname="mr-2 w-5 h-5" />
                    إضافة سريعة
                </Button>
            }>
            <div>
                <Card.CardHeader>
                    {success === true && (
                        <div className="bg-green-200 border border-green-300 text-green-700 text-center py-4 px-5 w-full rounded mb-7">
                            تم إضافة المساهمة بنجاح
                        </div>
                    )}
                    <div className="text-2xl bold">إضافة سريعة</div>
                    <div className="mt-4 text-primary-text/80">
                        هنا سيتم إضافة مساهمة وسيتم إعتمادها بشكل مباشر، دون
                        الحاجة الى الذهاب الى صفحة المساهمات ثم الإعتماد
                    </div>
                    <div className="mt-4 text-primary-text/80 bold">
                        ملاحظة: في حال اعتماد المساهمة، لن تستطيع حذفها او
                        تعديلها، ولكن يمكن أرشفتها
                    </div>
                </Card.CardHeader>
                <div className="px-5">
                    <CreateContributionsForm
                        customFormSubmit={addContribution}
                    />
                </div>
            </div>
        </AnimatedSideBar>
    )
}
