import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { fetcher } from '../../../../lib/fetcher'
import { getData } from '../../../../lib/getData'
import Card from '../../../common/Card'
import { FetchingCard } from '../../../common/FetchingCard'
import Pagination from '../../../common/Pagination'

export const UserProjects = () => {
    const router = useRouter()

    const { data, error } = useSWR(
        `/api/users/${router.query.username}/projects?page=${
            router.query.page || 1
        }`,
        fetcher,
    )

    if (error) {
        router.replace('/500')
    }
    return (
        <>
            <Card>
                <Card.CardHeader>المشاريع</Card.CardHeader>
                <div>
                    <FetchingCard
                        data={data}
                        error={error}
                        empty={
                            <div className="text-center py-4">
                                لا يوجد مشاريع
                            </div>
                        }>
                        {data?.data?.length > 0 && (
                            <>
                                {data?.data?.map((item, index) => (
                                    <UserProjectsItem
                                        key={item.id}
                                        title={item.name}
                                        id={item.id}
                                        username={router.query.username}
                                        description={item.description}
                                    />
                                ))}
                            </>
                        )}
                    </FetchingCard>
                </div>
            </Card>
        </>
    )
}

const UserProjectsItem = ({ title, description, username, id }) => {
    return (
        <Card.CardItem>
            <div className="flex flex-col w-full">
                <Link href={`/${username}/project/${id}`}>
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
