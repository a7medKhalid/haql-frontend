import React from 'react'
import ProjectLayout from '../../../../../components/Layouts/ProjectLayout'
import { Contributers } from '../../../../../components/page_components/user/projects/contributions/Contributers'
import { Contributions } from '../../../../../components/page_components/user/projects/contributions/Contributions'
import { getData } from '../../../../../lib/getData'

export async function getServerSideProps(context) {
    const { username, projectID } = context.params
    // Fetch data from external API
    const { data, errors } = await getData(
        `/api/projects/${projectID}/contributions`,
    )

    // Pass data to the page via props
    return { props: { data, errors, username, projectID } }
}
export default function contributions({ data, errors, username, projectID }) {
    return (
        <ProjectLayout>
            <div>
                <div className="grid grid-cols-4 gap-5">
                    <div className="col-span-12 lg:col-span-3">
                        <Contributions data={data} />
                    </div>
                    <div className="col-span-12 lg:col-span-1">
                        <Contributers data={data} />
                    </div>
                </div>
            </div>
        </ProjectLayout>
    )
}
