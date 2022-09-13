import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { LOCALE_WORDS } from '../../../../../lib/generalHelpers'
import { Card, CardItem } from '../../../../common/Card'
import Pagination from '../../../../common/Pagination'
export const Issues = ({ data }) => {
    const router = useRouter()

    return (
        <Card>
            <Card.CardHeader>
                <div className="flex items-center justify-between">
                    <Link
                        href={`/${router.query.username}/project/${router.query.projectID}/issues/create`}>
                        <a
                            className="
                            text-primary hover:underline cursor-pointer
                            ">
                            إضافة قضية
                        </a>
                    </Link>
                    <div className="text-primary-text">القضايا</div>
                </div>
            </Card.CardHeader>
            {data.data?.length > 0 ? (
                <>
                    {data?.data?.map((item, index) => (
                        <CardItem key={item.id}>
                            <IssueItem
                                name={item?.title}
                                id={item?.id}
                                status={item?.status}
                                info={
                                    <>
                                        <IssueInfoItem info={`#${item.id}`} />
                                        <Link href={`/${item.user.username}`}>
                                            <a className="hover:underline">
                                                <IssueInfoItem
                                                    info={`${item.user.username}/${item.user.name}`}
                                                />
                                            </a>
                                        </Link>
                                        <IssueInfoItem
                                            info={item?.created_at}
                                        />
                                    </>
                                }
                            />
                        </CardItem>
                    ))}
                    <Pagination data={data} />
                </>
            ) : (
                <div className="text-center text-gray-500 py-5">
                    لا توجد قضايا
                </div>
            )}
        </Card>
    )
}
export const IssueItem = ({ name, info, status, id }) => {
    const router = useRouter()

    return (
        <div className="flex items-center justify-between w-full rtl">
            <div className="flex items-center">
                {/* <div className="w-10 h-10 rounded-full bg-gray-300"></div> */}
                <div className="flex flex-col mr-3">
                    <Link
                        href={`/${router.query.username}/project/${router.query.projectID}/issues/${id}`}>
                        <a className='className="text-sm text-primary hover:underline cursor-pointer font-bold"'>
                            {name}
                        </a>
                    </Link>
                    <div className="flex items-center text-xs flex-wrap text-gray-500 mt-2">
                        {info}
                    </div>
                </div>
            </div>
            <div className="flex items-center">
                <div className="flex flex-col items-end">
                    <div className="text-sm font-bold  text-left">
                        {LOCALE_WORDS.ar[status]}
                    </div>
                    <div className="text-xs text-gray-500">الحالة</div>
                </div>
            </div>
        </div>
    )
}

export const IssueInfoItem = ({ info }) => {
    return <div className="text-xs text-gray-500 ml-2">{info}</div>
}
