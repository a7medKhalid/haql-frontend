import React from 'react'
import ProjectLayout from '../../../../../components/Layouts/ProjectLayout'
import { Contributers } from '../../../../../components/page_components/user/projects/contributions/Contributers'
import { Contributions } from '../../../../../components/page_components/user/projects/contributions/Contributions'
import { Issues } from '../../../../../components/page_components/user/projects/issues/Issues'
import { TrendingIssues } from '../../../../../components/page_components/user/projects/issues/TrendingIssues'
import { getData } from '../../../../../lib/getData'

export async function getServerSideProps(context) {
    const { projectID } = context.params
    const { page } = context.query
    const curPage = page || 1
    // Fetch data from external API
    const { data, errors } = await getData(
        `/api/projects/${projectID}/issues?page=${curPage}`,
    )
    if (!data || errors) {
        return {
            notFound: true,
        }
    }

    // Pass data to the page via props
    return { props: { data, errors, projectID } }
}

export default function issues({ data, errors, projectID }) {
    return (
        <ProjectLayout>
            <div>
                <div className="grid grid-cols-4 gap-5">
                    <div className="col-span-12 lg:col-span-3">
                        <Issues data={data} />
                    </div>
                    <div className="col-span-12 lg:col-span-1">
                        <TrendingIssues />
                    </div>
                </div>
            </div>
        </ProjectLayout>
    )
}
