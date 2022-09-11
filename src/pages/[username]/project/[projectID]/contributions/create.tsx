import { useRouter } from 'next/router'
import { useState } from 'react'
import Button from '../../../../../components/Button'
import Input from '../../../../../components/Input'
import InputError from '../../../../../components/InputError'
import Label from '../../../../../components/Label'
import CreateLayout from '../../../../../components/Layouts/CreateLayout'
import ProjectLayout from '../../../../../components/Layouts/ProjectLayout'
import CreateContributionsForm from '../../../../../components/page_components/user/projects/contributions/CreateContributionsForm'
import { useAuth } from '../../../../../hooks/useAuth'
import useSubmit from '../../../../../hooks/useSubmit'
import { getData } from '../../../../../lib/getData'

export default function create() {
    return (
        <ProjectLayout>
            <CreateLayout>
                <CreateLayout.Form>
                    <div className="text-4xl mb-10">اضافة مساهمة</div>
                    <CreateContributionsForm />
                </CreateLayout.Form>
            </CreateLayout>
        </ProjectLayout>
    )
}
