import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { useAuth } from '../../../../hooks/useAuth'
import { fetcher } from '../../../../lib/fetcher'
import Button from '../../../Button'
import Card from '../../../common/Card'
import { FetchingCard } from '../../../common/FetchingCard'

export const UserInfo = () => {
    const router = useRouter()
    const { user } = useAuth({})

    const { data, error } = useSWR(
        `/api/users/${router.query.username}`,
        fetcher,
    )

    const arr = [
        { title: 'name', ar: 'الإسم' },
        { title: 'username', ar: 'اسم المستخدم' },
        { title: 'bio', ar: 'نبذة' },
    ]
    return (
        <Card>
            <Card.CardHeader>
                <div className="flex items-center justify-between">
                    <div className="bold">{router.query.username}</div>
                    {router.query.username == user?.username && (
                        <Link href={`/${router.query.username}/update`}>
                            <a className="text-primary hover:underline cursor-pointer">
                                تعديل الحساب
                            </a>
                        </Link>
                    )}
                    {/* <Button className={'text-xs py-2'}>تعديل الحساب</Button> */}
                </div>
            </Card.CardHeader>

            <div className="flex items-center justify-center py-5">
                <div className="w-44 h-44 bg-gray-300 rounded-full"></div>
            </div>
            <FetchingCard data={data} error={error}>
                {data &&
                    arr?.map((item, index) => (
                        <UserInfoItem
                            key={index}
                            title={item?.ar}
                            value={data[item?.title]}
                        />
                    ))}
            </FetchingCard>
        </Card>
    )
}

const UserInfoItem = ({ title, value }) => {
    return (
        <Card.CardItem>
            <div className="flex flex-col w-full">
                <div className="text-primary-text font-bold ">{title}</div>
                <div className="text-primary-text opacity-50 rtl mt-2">
                    {value != null ? value : `لا يوجد ${title}`}
                </div>
            </div>
        </Card.CardItem>
    )
}
