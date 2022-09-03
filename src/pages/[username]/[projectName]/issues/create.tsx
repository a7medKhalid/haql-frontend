import { useRouter } from 'next/router'
import { useState } from 'react'
import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import InputError from '../../../../components/InputError'
import Label from '../../../../components/Label'
import CreateLayout from '../../../../components/Layouts/CreateLayout'
import ProjectLayout from '../../../../components/Layouts/ProjectLayout'
import { useAuth } from '../../../../hooks/useAuth'
import useSubmit from '../../../../hooks/useSubmit'
import { getData } from '../../../../lib/getData'

export async function getServerSideProps(context) {
    const { username, projectName } = context.params
    // Fetch data from external API
    const { data, errors } = await getData(
        `/api/projects/${username}/${projectName}`,
    )

    // Pass data to the page via props
    return { props: { data, errors } }
}
export default function create({ data }) {
    const { register, user } = useAuth({
        middleware: 'auth',
        // redirectIfAuthenticated: '/dashboard',
    })
    const { send, errors, response, loading } = useSubmit()
    const router = useRouter()

    const [formState, setFormState] = useState<any>({
        project_id: 21,
        title: '',
        body: '',
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
            url: '/api/issues',
            onSuccess: a => {
                router.push(
                    '/[username]/[projectName]/issues/[issue_id]',
                    `/${router.query.username}/${router.query.projectName}/issues/${a.id}`,
                )
            },
        })
    }

    return (
        <ProjectLayout description={data?.description}>
            <CreateLayout>
                <CreateLayout.Form>
                    <div className="text-4xl mb-10">اضافة قضية</div>
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
                            <InputError
                                messages={errors.title}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-7">
                            <Label>الوصف</Label>
                            <div className="relative">
                                <textarea
                                    id="body"
                                    value={formState.body}
                                    className="block mt-1 w-full
                                    px-4 py-5 text-accent placeholder-accent text-right rounded-lg border-2  border-slate-200 bg-neutral-100  focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50
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

                            <InputError
                                messages={errors.body}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-7">
                            <Button className={''} loading={loading}>
                                إضافة قضية
                            </Button>
                        </div>
                    </form>
                </CreateLayout.Form>
            </CreateLayout>
        </ProjectLayout>
    )
}
