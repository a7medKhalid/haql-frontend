import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useAuth } from '../../../../../hooks/useAuth'
import useSubmit from '../../../../../hooks/useSubmit'
import Button from '../../../../Button'
import TextArea from '../../../../common/TextArea'
import Input from '../../../../Input'
import InputError from '../../../../InputError'
import Label from '../../../../Label'

interface props {
    customFormSubmit?: any
}
export default function CreateContributionsForm({ customFormSubmit }: props) {
    const { register, user } = useAuth({
        middleware: 'auth',
        // redirectIfAuthenticated: '/dashboard',
    })
    const { send, errors, response, loading } = useSubmit()
    const router = useRouter()

    const [formState, setFormState] = useState<any>({
        project_id: router.query.projectID,
        title: router.query?.title ? router.query?.title : '',
        description: '',
        link: '',
    })

    const onChange = event => {
        // update form state
        setFormState({
            ...formState,
            [event.target.id]: event.target.value,
        })
    }
    const submitForm = event => {
        event.preventDefault()
        if (customFormSubmit) {
            return customFormSubmit(formState)
        }
        send({
            payload: formState,
            url: '/api/contributions',
            onSuccess: a => {
                setFormState({
                    project_id: router.query.projectID,
                    title: '',
                    description: '',
                    link: '',
                })
                router.push(
                    '/[username]/project/[projectID]/contributions/[contribution_id]',
                    `/${router.query.username}/project/${router.query.projectID}/contributions/${a.id}`,
                )
            },
        })
    }

    return (
        <div>
            <form onSubmit={submitForm}>
                <div className="mt-7">
                    <Label>العنوان</Label>
                    <Input
                        id="title"
                        type="text"
                        value={formState.title}
                        className="block mt-1 w-full"
                        onChange={onChange}
                        required
                        autoFocus
                        autoComplete="off"
                    />
                    <InputError messages={errors.title} className="mt-2" />
                </div>
                <div className="mt-7">
                    <Label>الوصف</Label>
                    <TextArea
                        name="description"
                        value={formState.description}
                        className="block mt-1 w-full
                                    px-4 py-5 text-accent placeholder-accent text-right rounded-lg border-2  border-slate-200 bg-neutral-100  focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50
                                    "
                        onChange={onChange}
                    />

                    <InputError
                        messages={errors.description}
                        className="mt-2"
                    />
                </div>
                <div className="mt-7">
                    <Label>رابط المساهمة</Label>
                    <Input
                        id="link"
                        type="text"
                        value={formState.link}
                        required
                        className="block mt-1 w-full"
                        onChange={onChange}
                        maxLength={255}
                    />
                    <div className="mt-1 text-xs text-gray-300">
                        رابط التصميم، المشروع، الفيديو، الكتاب، الخ
                    </div>
                    <InputError messages={errors.link} className="mt-2" />
                </div>

                <div className="mt-7">
                    <Button className={''} loading={loading}>
                        إضافة المساهمة
                    </Button>
                </div>
            </form>
        </div>
    )
}
