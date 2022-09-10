import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Button from '../../../../../components/Button'
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
                            <ProjectDetailItem title="وصف المشروع">
                                <TextArea
                                    name={'description'}
                                    value={formState.description}
                                    className="block mt-1 w-full"
                                    onChange={onChange}
                                />
                            </ProjectDetailItem>
                        </Card.CardItem>
                        <Card.CardItem>
                            <ProjectDetailItem title="تعديل المشروع">
                                <Button>تعديل</Button>
                            </ProjectDetailItem>
                        </Card.CardItem>
                    </form>

                    <Card.CardItem>
                        <ProjectDetailItem title="حذف المشروع">
                            <Button className="bg-red-500 border-b-red-700 hover:bg-red-600">
                                حذف المشروع
                            </Button>
                        </ProjectDetailItem>
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
