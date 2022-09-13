import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { fetcher } from '../../../../lib/fetcher'
import { getData } from '../../../../lib/getData'
import Card from '../../../common/Card'
import { FetchingCard } from '../../../common/FetchingCard'
import Pagination from '../../../common/Pagination'

export const UserContributions = () => {
    const router = useRouter()

    const { data, error } = useSWR(
        `/api/users/${router.query.username}/contributions?page=${
            router.query.page || 1
        }`,
        fetcher,
    )

    return (
        <Card>
            <Card.CardHeader>المساهمات</Card.CardHeader>
            <div>
                <FetchingCard
                    data={data}
                    error={error}
                    empty={
                        <div className="text-center py-4">لا يوجد مساهمات</div>
                    }>
                    {data?.data?.length > 0 && (
                        <>
                            {data?.data?.map((item, index) => (
                                <UserContributionsItem
                                    key={item.id}
                                    title={item.title}
                                    username={router.query.username}
                                    description={item.description}
                                />
                            ))}
                        </>
                    )}
                </FetchingCard>
            </div>
        </Card>
    )
}

const UserContributionsItem = ({ title, description, username }) => {
    return (
        <Card.CardItem>
            <div className="flex flex-col w-full">
                <Link href={`/${username}/${title}`}>
                    <a className=" font-bold text-primary hover:underline cursor-pointer">
                        {title}
                    </a>
                </Link>
                <div className="text-primary-text opacity-50 rtl mt-2">
                    {description}
                </div>
            </div>
        </Card.CardItem>
    )
}
