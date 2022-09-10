import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { fetcher } from '../../../../../lib/fetcher'
import { Card, CardItem } from '../../../../common/Card'
import { FetchingCard } from '../../../../common/FetchingCard'

export const TrendingIssues = () => {
    const router = useRouter()

    const { data, error } = useSWR(
        `/api/projects/${router.query.projectID}/issues/trending`,
        fetcher,
    )

    return (
        <FetchingCard data={data} error={error}>
            <Card>
                <Card.CardHeader>أبرز القضايا</Card.CardHeader>
                {data?.data?.map(issue => (
                    <IssueCard
                        key={issue.id}
                        id={issue.id}
                        name={issue.title}
                        commentsCount={issue.comments_count}
                    />
                ))}
            </Card>
        </FetchingCard>
    )
}

export const IssueCard = ({ id, name, commentsCount }) => {
    const router = useRouter()
    const pluralize = (word, count) => {
        const letters = word.split('')
        if (count == 1) {
            return letters.join('')
        }
        if (count == 2) {
            letters[letters.length] = 'ان'
            return letters.join('')
        }
        letters[letters.length] = 'ات'
        return `${count} ${letters.join('')}`
    }

    return (
        <CardItem>
            <div className="flex flex-col">
                <Link
                    href={`/${router.query.username}/project/${router.query.projectID}/issues/${id}`}>
                    <div className="text-primary font-bold hover:underline cursor-pointer">
                        {name}
                    </div>
                </Link>
                <div className="text-primary-text opacity-50 rtl">
                    {pluralize('تعليق', commentsCount)}
                </div>
            </div>
        </CardItem>
    )
}
