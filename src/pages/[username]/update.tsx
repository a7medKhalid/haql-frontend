import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Button from '../../components/Button'
import Input from '../../components/Input'
import InputError from '../../components/InputError'
import Label from '../../components/Label'
import AppLayout from '../../components/Layouts/AppLayout'
import CreateLayout from '../../components/Layouts/CreateLayout'
import { useAuth } from '../../hooks/useAuth'
import useSubmit from '../../hooks/useSubmit'
import { getData } from '../../lib/getData'
export async function getServerSideProps(context) {
    const { username, projectName } = context.params
    // Fetch data from external API
    const { data, errors } = await getData(`/api/users/${username}`)

    // Pass data to the page via props
    return { props: { data, errors } }
}
export default function update({ data }) {
    const router = useRouter()

    const { register, user } = useAuth({
        middleware: 'auth',
        // redirectIfAuthenticated: '/dashboard',
    })
    useEffect(() => {
        if (data.username !== router.query.username) {
            router.push('/login')
        }
    }, [user])

    const { send, errors, response, loading } = useSubmit()

    const [formState, setFormState] = useState<any>({
        name: data?.name,
        username: data?.username,
        email: data?.email,
        bio: data?.bio,
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
            payload: formState,
            url: '/api/users',
            method: 'put',
            onSuccess: a => {
                router.push('/[username]', `/${router.query.username}`)
            },
        })
    }

    return (
        <AppLayout>
            <CreateLayout>
                <CreateLayout.Form>
                    <div className="text-4xl mb-10">تعديل الحساب</div>
                    <form onSubmit={submitForm}>
                        <div className="mt-7">
                            <Label>الإسم</Label>
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
                            <InputError
                                messages={errors.name}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-7">
                            <Label>الإيميل</Label>
                            <Input
                                id="email"
                                type="text"
                                value={formState.email}
                                className="block mt-1 w-full"
                                required
                                disabled
                                autoFocus
                                autoComplete="off"
                            />
                        </div>
                        <div className="mt-7">
                            <Label>اسم المستخدم</Label>
                            <Input
                                id="username"
                                type="text"
                                value={formState.username}
                                className="block mt-1 w-full"
                                onChange={onChange}
                                required
                                autoFocus
                                autoComplete="off"
                            />

                            <InputError
                                messages={errors.username}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-7">
                            <Label>نبذة</Label>
                            <div className="relative">
                                <textarea
                                    id="bio"
                                    value={formState?.bio ?? ''}
                                    className="block mt-1 w-full
                                    px-4 py-5 text-accent placeholder-accent text-right rounded-lg border-2  border-slate-200 bg-neutral-100  focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50
                                    "
                                    onChange={onChange}
                                    rows={5}
                                    required
                                    maxLength={255}
                                    autoComplete="off"></textarea>
                                <div className="absolute bottom-2 left-1 text-xs opacity-50">
                                    {formState.bio?.length}/255
                                </div>
                            </div>

                            <InputError
                                messages={errors.bio}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-7">
                            <Button className={''} loading={loading}>
                                تعديل الحساب
                            </Button>
                        </div>
                    </form>
                </CreateLayout.Form>
            </CreateLayout>
        </AppLayout>
    )
}
