import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { fetcher } from '../../../../../lib/fetcher'
import { Card, CardItem } from '../../../../common/Card'
import { FetchingCard } from '../../../../common/FetchingCard'

export const Contributers = () => {
    const router = useRouter()
    const { data, error } = useSWR(
        `/api/projects/${router.query.projectID}/contributors`,
        fetcher,
    )

    return (
        <FetchingCard data={data} error={error}>
            <Card>
                <Card.CardHeader>المساهمين</Card.CardHeader>
                {data?.data?.map(contributor => (
                    <ContributerCard
                        name={contributor.name + '/' + contributor.username}
                        contributionsCount={contributor.contributionsCount}
                        avatar={''}
                    />
                ))}
            </Card>
        </FetchingCard>
    )
}

export const ContributerCard = ({ name, contributionsCount, avatar }) => {
    const pluralize = (word, count) => {
        const letters = word.split('')
        if (count == 1) {
            letters[letters.length] = 'ة'
            return letters.join('')
        }
        if (count == 2) {
            letters[letters.length] = 'تين'
            return letters.join('')
        }
        if (count > 10) {
            letters[letters.length] = 'ة'
            return `${count} ${letters.join('')}`
        }
        letters[letters.length] = 'ات'
        return `${count} ${letters.join('')}`
    }

    return (
        <CardItem>
            <div className="flex flex-col">
                <Link href={`/${name.split('/')[1]}`}>
                    <div className="text-primary font-bold hover:underline cursor-pointer">
                        {name}
                    </div>
                </Link>

                <div className="text-primary-text opacity-50 rtl">
                    {pluralize('مساهم', contributionsCount)}
                </div>
            </div>
            {/* <div className="w-10 h-10 rounded-full bg-gray-300 ml-3"></div> */}
        </CardItem>
    )
}
