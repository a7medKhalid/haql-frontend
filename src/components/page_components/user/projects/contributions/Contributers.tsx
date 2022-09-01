import { Card, CardItem } from '../../../../common/Card'

export const Contributers = ({ data }) => {
    return (
        <Card>
            <>
                <Card.CardHeader>المساهمين</Card.CardHeader>
                <ContributerCard
                    name="محمد عبدالله"
                    contributionsCount="3"
                    avatar={''}
                />
                <ContributerCard
                    name="محمد ماهر"
                    contributionsCount="1"
                    avatar={''}
                />
                <ContributerCard
                    name="احمد عبيد"
                    contributionsCount="2"
                    avatar={''}
                />
                <ContributerCard
                    name="احمد عبيد"
                    contributionsCount="20"
                    avatar={''}
                />
            </>
        </Card>
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
                <div className="text-primary font-bold hover:underline cursor-pointer">
                    {name}
                </div>
                <div className="text-primary-text opacity-50 rtl">
                    {pluralize('مساهم', contributionsCount)}
                </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-300 ml-3"></div>
        </CardItem>
    )
}
