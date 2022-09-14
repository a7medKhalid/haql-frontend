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
import { ChevronDoubleIcon } from '../../../../../components/common/HeroIcons'
import AnimatedSideBar from '../../../../../components/common/AnimatedSideBar'
import { FetchingCard } from '../../../../../components/common/FetchingCard'
import useSWR from 'swr'
import { fetcher } from '../../../../../lib/fetcher'
import { useRouter } from 'next/router'
import useSubmit from '../../../../../hooks/useSubmit'
import { LOCALE_WORDS } from '../../../../../lib/generalHelpers'

export async function getServerSideProps(context) {
    const { username, projectID, contribution_id } = context.params
    // Fetch data from external API
    const { data, errors } = await getData(
        `/api/contributions/${contribution_id}`,
    )
    if (!data || errors) {
        return {
            notFound: true,
        }
    }
    // Pass data to the page via props
    return { props: { data, errors, username, projectID, contribution_id } }
}
export default function Contribution({ data, contribution_id }) {
    const router = useRouter()
    const details = {
        projectID: router.query.projectID,
        title: data?.title,
        description: data?.description,
        contributor: { ...data?.contributor },
        link: data?.link,
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
                                <DeleteContribution id={details.id} />
                                <div className="flex items-center rtl">
                                    {/* <div className="w-10 h-10 rounded-full bg-gray-300 ml-3"></div> */}
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
                        <Comments model="contributions" />
                        <AddComment model="contributions" />
                    </div>
                    <div className="col-span-1">
                        <Card>
                            <Card.CardHeader>تفاصيل المساهمة</Card.CardHeader>
                            <CardItem>
                                <ProjectDetailItem
                                    title={'الحالة'}
                                    value={LOCALE_WORDS.ar[details.status]}
                                />
                            </CardItem>
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
                            {details.status != 'accepted' && (
                                <AcceptContributionButton details={details} />
                            )}
                            {details.status == 'accepted' && (
                                <ArchiveContributionButton details={details} />
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </ProjectLayout>
    )
}

const AcceptContributionButton = ({ details }) => {
    const { send, errors, response, loading } = useSubmit()
    const router = useRouter()
    const acceptContribution = () => {
        send({
            payload: {
                contribution_id: details.id,
                status: 'accepted',
            },
            method: 'put',
            url: '/api/contributions',
            onSuccess: a => {
                router.push(
                    `/${router.query.username}/project/${details.projectID}`,
                )
            },
        })
    }
    if (details.status === 'accepted') return null
    const { data, error } = useSWR(
        `/api/permissions?model=contribution&model_id=${details.id}&permission=update`,
        fetcher,
    )
    if (!data) {
        return null
    }
    if (data?.message === false) {
        return null
    }
    return (
        <CardItem>
            <AnimatedSideBar
                trigger={
                    <Button>
                        <ChevronDoubleIcon classname="mr-2 w-5 h-5" />
                        قبول المساهمة
                    </Button>
                }>
                <div>
                    <Card.CardHeader>
                        <div className="text-2xl bold">
                            قبول المساهمة في المستودع
                        </div>
                        <div className="mt-4 text-primary-text/80">
                            هل تريد إضافة المساهمة كخانة جديدة في المستودع، أم
                            تريد استبدالها بمساهمة سابقة (لن يتم حذف المساهمة
                            وستبقى موجودة في المساهمات، لكن ستختفي من المستودع)
                        </div>
                        <Button
                            className="mt-4 text-xs py-3 "
                            onClick={acceptContribution}>
                            قبول وإضافة جديدة
                        </Button>
                    </Card.CardHeader>
                    <div className="px-5">
                        <AcceptedContributions details={details} />
                    </div>
                </div>
            </AnimatedSideBar>
        </CardItem>
    )
}
const AcceptedContributions = ({ details }) => {
    const { send, errors, response, loading } = useSubmit()
    const router = useRouter()
    const { data, error } = useSWR(
        `/api/projects/${router.query.projectID}/contributions?status=accepted`,
        fetcher,
    )
    if (error) {
        return null
    }
    const acceptContribution = () => {
        send({
            payload: {
                contribution_id: details.id,
                status: 'accepted',
            },
            method: 'put',
            url: '/api/contributions',
            onSuccess: a => {
                router.push(
                    `/${router.query.username}/project/${details.projectID}`,
                )
            },
        })
    }
    const acceptAndReplace = replacedID => {
        send({
            payload: {
                contribution_id: replacedID,
                status: 'archived',
            },
            method: 'put',
            url: '/api/contributions',
        })
        acceptContribution()
    }
    return (
        <FetchingCard data={data} error={error}>
            <div className="text-lg bold mt-4">أو الإستبدال بــ</div>
            <Card className="mt-4">
                {data?.data?.map(contribution => (
                    <Card.CardItem key={contribution.id}>
                        <div className="flex items-center text-xs justify-between w-full">
                            <div className="flex items-center justify-between">
                                <Button
                                    className="text-xs py-1 px-3 "
                                    onClick={() =>
                                        acceptAndReplace(contribution.id)
                                    }>
                                    استبدال
                                </Button>
                                <div className="text-primary-text text border-r border-neutral-300  px-5 ">
                                    {`#${contribution.id}`}
                                </div>
                                <div className="flex items-center text-primary-text text border-r border-neutral-300  px-5">
                                    <div className=" ">{`${contribution.contributor.name}/${contribution.contributor.username}`}</div>
                                    {/* <div className="w-7 h-7 rounded-full bg-gray-300 ml-3"></div> */}
                                </div>
                            </div>
                            <div className="text-primary-text text-lg">
                                {contribution.title}
                            </div>
                        </div>
                    </Card.CardItem>
                ))}
            </Card>
        </FetchingCard>
    )
}

const ArchiveContributionButton = ({ details }) => {
    const { send, errors, response, loading } = useSubmit()
    const router = useRouter()
    const { data, error } = useSWR(
        `/api/permissions?model=contribution&model_id=${details.id}&permission=update`,
        fetcher,
    )
    if (details.status !== 'accepted') return null
    if (!data) {
        return null
    }
    if (data?.message === false) {
        return null
    }

    const archieveContribution = () => {
        send({
            payload: {
                contribution_id: details.id,
                status: 'archived',
            },
            method: 'put',
            url: '/api/contributions',
            onSuccess: a => {
                router.push(
                    `/${router.query.username}/project/${details.projectID}`,
                )
            },
        })
    }

    return (
        <CardItem>
            <AnimatedSideBar
                trigger={
                    <Button>
                        <ChevronDoubleIcon classname="mr-2 w-5 h-5" />
                        أرشفة المساهمة
                    </Button>
                }>
                <div>
                    <Card.CardHeader>
                        <div className="text-2xl bold">
                            هل تريد أرشفة المساهمة
                        </div>
                        <div className="mt-4 text-primary-text/80">
                            في حال أرشفة المساهمة سيتم إخفائها من المستودع ولكن
                            ستبقى في خانة المساهمات
                        </div>
                        <Button
                            className="mt-4 text-xs py-3 "
                            onClick={archieveContribution}>
                            أرشفة المساهمة
                        </Button>
                    </Card.CardHeader>
                </div>
            </AnimatedSideBar>
        </CardItem>
    )
}

const DeleteContribution = ({ id }) => {
    const router = useRouter()
    const { send } = useSubmit()
    const { data, error } = useSWR(
        `/api/permissions?model=contribution&model_id=${id}&permission=delete`,
        fetcher,
    )
    const deleteContribution = () => {
        send({
            payload: {
                contribution_id: id,
            },
            method: 'delete',
            url: `/api/contributions?contribution_id=${id}`,
            onSuccess: a => {
                router.push(
                    '/[username]/project/[projectID]/contributions',
                    `/${router.query.username}/project/${router.query.projectID}/contributions`,
                )
            },
        })
    }

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
                    حذف المساهمة
                </Button>
            }>
            <div>
                <Card.CardHeader>
                    <div className="text-2xl bold">
                        هل أنت متأكد من حذف المساهمة
                    </div>

                    <Button
                        className="mt-4 text-xs py-3 bg-red-500 border-b-red-700 hover:bg-red-600"
                        onClick={deleteContribution}>
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
        <div className="flex flex-col items-end">
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
