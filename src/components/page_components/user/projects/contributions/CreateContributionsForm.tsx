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
    const router:any = useRouter()

    const [formState, setFormState] = useState<any>({
        project_id: router.query.projectID,
        title: router.query?.title ? router.query?.title : '',
        description: '',
        file: null,
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

        const formData = new FormData()
        formData.append('project_id', router.query.projectID)
        formData.append('title', formState.title)
        formData.append('description', formState.description)
        if (formState.file) {
            for (let i = 0; i < formState.file.length; i++) {
                formData.append('files[]', formState.file[i], formState.file[i].name);
            }
        }
        console.log('formState.file', formState.file);

        console.log( router.query.projectID)


        send({
            payload: formData,
            url: '/api/contributions',
            onSuccess: a => {
                setFormState({
                  
                    title: '',
                    description: '',
                    file: null,
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
                    <Label>رفع الملف</Label>
                    <Input
                        id="file"
                         directory="" webkitdirectory="" type="file"

                        onChange={e => setFormState({...formState, file: e.target.files})}
                    />
                    <InputError messages={errors.file} className="mt-2" />
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
