import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Button from '../../../../../components/Button'
import AnimatedSideBar from '../../../../../components/common/AnimatedSideBar'
import Card from '../../../../../components/common/Card'
import TextArea from '../../../../../components/common/TextArea'
import Input from '../../../../../components/Input'
import ProjectLayout from '../../../../../components/Layouts/ProjectLayout'
import { useAuth } from '../../../../../hooks/useAuth'
import useSubmit from '../../../../../hooks/useSubmit'
import { getData } from '../../../../../lib/getData'
export async function getServerSideProps(context) {
    const { username, projectID } = context.params

    // Fetch data from external API

    const { data } = await getData(`/api/projects/${projectID}`)

    // Pass data to the page via props
    return { props: { data } }
}
export default function settings({ data }) {
    const { register, user } = useAuth({
        middleware: 'auth',
        // redirectIfAuthenticated: '/dashboard',
    })
    const { send, errors, response, loading } = useSubmit()
    const router = useRouter()

    const [formState, setFormState] = useState<any>({
        name: data.name,
        description: data.description,
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
                project_id: data.id,
            },
            url: '/api/projects',
            method: 'put',
            onSuccess: a => {
                router.push(
                    '/[username]/project/[projectID]',
                    `/${user.username}/project/${a.id}`,
                )
            },
        })
    }
    const deleteProject = () => {
        send({
            payload: {
                project_id: data.id,
            },
            url: `/api/projects?project_id=${data.id}`,
            method: 'delete',
            onSuccess: a => {
                router.push('/[username]', `/${user.username}`)
            },
        })
    }
    // useEffect(() => {
    //     if (user?.username !== router.query.username) {
    //         router.push('/')
    //     }
    // }, [user])
    console.log({ errors })

    return (
        <ProjectLayout>
            <div className="flex items-center justify-center">
                <Card className="w-[70vh] ">
                    <Card.CardHeader>تعديل المشروع</Card.CardHeader>

                    <form onSubmit={submitForm}>
                        <Card.CardItem className="w-full">
                            <ProjectDetailItem title="اسم المشروع">
                                <Input
                                    id="name"
                                    type="text"
                                    value={formState.name}
                                    className="block mt-1 w-full"
                                    onChange={onChange}
                                    required
                                    autoComplete="off"
                                />
                            </ProjectDetailItem>
                        </Card.CardItem>
                        <Card.CardItem>
                            <ProjectDetailItem title="">
                                <TextArea
                                    name={'description'}
                                    value={formState.description}
                                    className="block mt-1 w-full"
                                    onChange={onChange}
                                />
                            </ProjectDetailItem>
                        </Card.CardItem>
                        <Card.CardItem>
                            <ProjectDetailItem title="">
                                <Button>تعديل</Button>
                            </ProjectDetailItem>
                        </Card.CardItem>
                    </form>

                    <Card.CardItem>
                        <AnimatedSideBar
                            trigger={
                                <ProjectDetailItem title="حذف المشروع">
                                    <Button className="bg-red-500 border-b-red-700 hover:bg-red-600">
                                        حذف المشروع
                                    </Button>
                                </ProjectDetailItem>
                            }>
                            <div>
                                <Card.CardHeader>
                                    {errors?.length > 0 && (
                                        <div className="bg-red-200 border border-red-300 text-red-700 text-center py-4 px-5 w-full rounded mb-7">
                                            {errors}
                                        </div>
                                    )}
                                    <div className="text-2xl bold">
                                        هل أنت متأكد من حذف المشروع
                                    </div>

                                    <Button
                                        className="mt-4 text-xs py-3 bg-red-500 border-b-red-700 hover:bg-red-600"
                                        onClick={deleteProject}>
                                        نعم، متأكد
                                    </Button>
                                </Card.CardHeader>
                            </div>
                        </AnimatedSideBar>
                    </Card.CardItem>
                </Card>
            </div>
        </ProjectLayout>
    )
}

const ProjectDetailItem = ({ title, children }) => {
    return (
        <div className="flex flex-col">
            <div className="text-primary-text font-bold ">{title}</div>
            <div className="text-primary-text  rtl mt-2">{children}</div>
        </div>
    )
}
