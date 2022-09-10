import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'
import { useAuth } from '../../hooks/useAuth'
import useSubmit from '../../hooks/useSubmit'
import { fetcher } from '../../lib/fetcher'
import Button from '../Button'
import Card from './Card'
import { FetchingCard } from './FetchingCard'
import { ReplyIcon } from './HeroIcons'
import TextArea from './TextArea'

export const Comments = ({ model }) => {
    const router = useRouter()
    var modelIDType
    const { user } = useAuth({})
    if (model == 'contributions') {
        modelIDType = router.query?.contribution_id
    } else if (model == 'issues') {
        modelIDType = router.query?.issue_id
    }

    const { data, error } = useSWR(
        `/api/${model}/${modelIDType}/comments`,
        fetcher,
    )

    if (data?.comments?.data?.length < 1) return null
    return (
        <FetchingCard data={data} error={error}>
            <Card className="mt-5 border-b-0">
                <Card.CardHeader>التعليقات</Card.CardHeader>
                {data?.comments?.data?.length > 0 ? (
                    data?.comments?.data?.map(comment => (
                        <Comment
                            authUser={user}
                            key={comment.id}
                            id={comment.id}
                            username={comment.user.username}
                            createdAt={comment.created_at}
                            comment={comment.body}
                        />
                    ))
                ) : (
                    <Card.CardItem>
                        <div className="text-center text-primary-text/80 ">
                            لا يوجد تعليقات
                        </div>
                    </Card.CardItem>
                )}
            </Card>
        </FetchingCard>
    )
}
const Comment = ({ id, username, comment, createdAt, authUser }) => {
    const { send } = useSubmit()
    const [replay, setReplay] = useState({
        show: false,
        title: 'noTitle',
        body: '',
        commented_id: id,
        commentedType: 'comment',
        status: '',
    })

    const sendReply = e => {
        e.preventDefault()

        send({
            url: `/api/comments`,
            method: 'post',
            payload: replay,
            onSuccess: () => {
                setReplay({ ...replay, show: false, body: '', status: 'sent' })
                setTimeout(() => {
                    setReplay({ ...replay, show: false, body: '', status: '' })
                }, 3000)
            },
        })
    }

    return (
        <Card.CardItem className="hover:bg-neutral-200 cursor-pointer transition duration-150 ease-out w-full">
            <Link
                href={{
                    pathname: `/${username}/comment/${id}`,
                }}>
                <div className="w-full">
                    {replay?.status === 'sent' && (
                        <div className="text-green-500 text-xs rtl">
                            تم إرسال الرد 👍
                        </div>
                    )}
                    <div className="flex  rtl ">
                        <div className="w-16 ml-5">
                            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                        </div>
                        <div className=" w-full">
                            <div className="text-sm  text-primary-text font-bold">
                                {username}
                            </div>

                            <div className="text-sm text-primary-text opacity-70 mt-2 line-clamp-3 hover:line-clamp-none ">
                                {comment}
                            </div>
                            {/* {replay.show == true && (
                        <div className="w-full ">
                            <form onSubmit={sendReply}>
                                <TextArea
                                    name="ads"
                                    onChange={e =>
                                        setReplay({
                                            ...replay,
                                            body: e.target.value,
                                        })
                                    }
                                    value={replay.body}
                                    className=""
                                />
                                <Button className="text-xs mt-2 mb-1 py-2">
                                    إرسال الرد
                                </Button>
                            </form>
                        </div>
                    )} */}

                            <div className="flex items-center text-xs text-primary-text opacity-70 mt-2 ">
                                {/* {authUser?.username != null &&
                            replay.show == false && (
                                <div
                                    onClick={() =>
                                        setReplay({ ...replay, show: true })
                                    }
                                    className=" hover:text-primary cursor-pointer hover:underline border-l border-neutral-300 pl-1">
                                    الرد
                                </div>
                            )}{' '} */}
                                {/* {authUser?.username != null && replay.show == true && (
                            <div
                                onClick={() =>
                                    setReplay({ ...replay, show: false })
                                }
                                className=" cursor-pointer hover:underline border-l border-neutral-300 pl-1">
                                إخفاء الرد
                            </div>
                        )} */}
                                {authUser?.username == username &&
                                replay.show == false ? (
                                    <DeleteComment id={id} />
                                ) : null}
                                <div className="pr-1">{createdAt}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </Card.CardItem>
    )
}

const DeleteComment = ({ id }) => {
    //    const { data, error } = useSWR(
    //        `/api/permissions?model=contribution&model_id=${id}&permission=delete`,
    //        fetcher,
    //    )
    //    if (!data) {
    //        return null
    //    }
    //    if (data?.message === false) {
    //        return null
    //    }
    const { send, errors, response, loading } = useSubmit()
    const router = useRouter()
    const deleteComment = () => {
        send({
            payload: {
                comment_id: id,
            },
            method: 'delete',
            url: `/api/comments?comment_id=${id}`,
            onSuccess: a => {
                router.reload()
            },
        })
    }
    return (
        <div
            onClick={deleteComment}
            className=" hover:text-red-500 cursor-pointer hover:underline border-l  border-neutral-300 pl-1 z-50">
            حذف
        </div>
    )
}
