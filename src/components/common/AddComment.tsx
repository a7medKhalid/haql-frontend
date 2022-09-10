import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import useSubmit from '../../hooks/useSubmit'
import Button from '../Button'
import Card from './Card'

export const AddComment = ({ model }) => {
    const [formState, setFormState] = useState<any>({
        title: 'noTitle',
        body: '',
        commentedType: '',
        commented_id: '',
    })
    const router = useRouter()
    var modelIDType

    if (model == 'contributions') {
        modelIDType = router.query?.contribution_id
    } else if (model == 'issues') {
        modelIDType = router.query?.issue_id
    }

    const { user } = useAuth({})
    const { send, errors, response, loading } = useSubmit()
    if (!user) return null

    const onChange = event => {
        // update form state
        setFormState({
            ...formState,
            [event.target.id]: event.target.value,
        })
    }
    const submitForm = event => {
        event.preventDefault()

        send({
            payload: {
                ...formState,
                body: formState.body,
                commentedType: model.slice(0, -1),
                commented_id: modelIDType,
            },
            url: `/api/comments`,
            onSuccess: a => {
                setFormState({
                    ...formState,
                    body: '',
                })
                // router.replace(router.asPath)
                router.reload()
            },
        })
    }

    return (
        <Card className="mt-5">
            <Card.CardHeader>أضف تعليق</Card.CardHeader>
            <div className="p-5">
                <form onSubmit={submitForm}>
                    <div className="relative">
                        <textarea
                            id="body"
                            value={formState.body}
                            className="block mt-1 w-full
                                    px-4 py-5 text-accent placeholder-neutral-300 text-right rounded-lg border-2  border-slate-200 bg-neutral-100  focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50
                                    "
                            onChange={onChange}
                            rows={5}
                            required
                            maxLength={255}
                            autoComplete="off"></textarea>
                        <div className="absolute bottom-2 left-1 text-xs opacity-50">
                            {formState.body.length}/255
                        </div>
                    </div>
                    <Button className="mt-5 text-xs">أضف التعليق</Button>
                </form>
            </div>
        </Card>
    )
}
