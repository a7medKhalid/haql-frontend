import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Button from '../../components/Button'
import Input from '../../components/Input'
import InputError from '../../components/InputError'
import Label from '../../components/Label'
import AppLayout from '../../components/Layouts/AppLayout'
import { useAuth } from '../../hooks/useAuth'
import useSubmit from '../../hooks/useSubmit'

export default function create() {
    const { register, user } = useAuth({
        middleware: 'auth',
        // redirectIfAuthenticated: '/dashboard',
    })
    const { send, errors, response, loading } = useSubmit()
    const router = useRouter()

    const [formState, setFormState] = useState<any>({
        name: '',
        description: '',
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

        send({
            payload: {
                name: formState.name,
                description: formState.description,
            },
            url: '/api/projects',
            onSuccess: a => {
                router.push(
                    '/[username]/project/[projectID]',
                    `/${user.username}/project/${a.id}`,
                )
            },
        })
    }

    return (
        <AppLayout>
            <div className="rtl">
                <div className="lg:grid grid-cols-4">
                    <div className="col-span-1">
                        <div className="text-4xl mb-10">اضافة مشروع</div>
                        <form onSubmit={submitForm}>
                            <div className="mt-7">
                                <Label>اسم المشروع</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={formState.name}
                                    className="block mt-1 w-full"
                                    onChange={onChange}
                                    required
                                    autoFocus
                                    autoComplete="off"
                                />
                                {/* <InputError
                                    messages={errors.name}
                                    className="mt-2"
                                /> */}
                            </div>
                            <div className="mt-7">
                                <Label>وصف المشروع</Label>
                                <textarea
                                    id="description"
                                    value={formState.description}
                                    className="block mt-1 w-full
                                    px-4 py-5 text-accent placeholder-accent text-right rounded-lg border-2  border-slate-200 bg-neutral-100  focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50
                                    "
                                    onChange={onChange}
                                    rows={5}
                                    required
                                    autoComplete="off"></textarea>

                                {/* <InputError
                                    messages={errors.description}
                                    className="mt-2"
                                /> */}
                            </div>
                            <div className="mt-7">
                                <Label>رخصة المشروع</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    value={'رخصة وقف'}
                                    className="block mt-1 w-full cursor-not-allowed
                                    
                                    "
                                    onChange={onChange}
                                    disabled
                                />
                                <div className="mt-1 text-xs text-gray-300">
                                    حاليا لا يمكن إضافة مشروع إلا
                                    <a
                                        href="#"
                                        className="text-primary mr-1 hover:underline">
                                        برخصة وقف
                                    </a>
                                </div>
                            </div>

                            <div className="mt-7">
                                <Button className={''} loading={loading}>
                                    إضافة المشروع
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
