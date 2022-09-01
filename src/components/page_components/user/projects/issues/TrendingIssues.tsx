import { Card, CardItem } from '../../../../common/Card'

export const TrendingIssues = ({ data }) => {
    return (
        <Card>
            <>
                <Card.CardHeader>أبرز القضايا</Card.CardHeader>
                <IssueCard
                    name="تصميم صفحة الهبوط"
                    commentsCount="3"
                    avatar={''}
                />
                <IssueCard
                    name="اضافة ميزة الفواصل"
                    commentsCount="1"
                    avatar={''}
                />
            </>
        </Card>
    )
}

export const IssueCard = ({ name, commentsCount, avatar }) => {
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
                <div className="text-primary font-bold hover:underline cursor-pointer">
                    {name}
                </div>
                <div className="text-primary-text opacity-50 rtl">
                    {pluralize('تعليق', commentsCount)}
                </div>
            </div>
        </CardItem>
    )
}
