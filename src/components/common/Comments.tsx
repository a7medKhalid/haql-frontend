import Card from './Card'

export const Comments = () => {
    return (
        <Card className="mt-5">
            <Card.CardHeader>التعليقات</Card.CardHeader>
            <Comment username="اسم المستخدم" comment="تعليق المستخدم" />
            <Comment username="اسم المستخدم" comment="تعليق المستخدم" />
            <Comment username="اسم المستخدم" comment="تعليق المستخدم" />
            <Comment username="اسم المستخدم" comment="تعليق المستخدم" />
        </Card>
    )
}
const Comment = ({ username, comment }) => {
    return (
        <Card.CardItem>
            <div className="flex  rtl">
                <div className="w-16 ml-5">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                </div>
                <div>
                    <div className="text-sm  text-primary-text font-bold">
                        {username}
                    </div>

                    <div className="text-sm text-primary-text opacity-50 mt-2 line-clamp-3 hover:line-clamp-none ">
                        {comment}
                    </div>
                </div>
            </div>
        </Card.CardItem>
    )
}
