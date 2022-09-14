import { useRouter } from 'next/router'
import React from 'react'
import { AddComment } from '../../../../../components/common/AddComment'
import Card, { CardHeader } from '../../../../../components/common/Card'
import { Comments } from '../../../../../components/common/Comments'
import ProjectLayout from '../../../../../components/Layouts/ProjectLayout'
import { getData } from '../../../../../lib/getData'

export async function getServerSideProps(context) {
    const { username, commentID } = context.params
    // Fetch data from external API
    const { data, errors } = await getData(`/api/comments/${commentID}`)
    if (!data || errors) {
        return {
            notFound: true,
        }
    }
    // Pass data to the page via props
    return { props: { data, errors, username } }
}
export default function commentID({ data, username }) {
    return (
        <ProjectLayout>
            <ReplyedComment data={data} />
            <Comments model={'comment'} preFetchedData={data} />
            <AddComment model={'comment'} commentedID={data?.id} />
        </ProjectLayout>
    )
}

const ReplyedComment = ({ data }) => {
    return (
        <Card>
            <Card.CardHeader>
                {data.commenterName} / {data.commenterUsername}
            </Card.CardHeader>
            <div className="p-5">{data.body}</div>
            <div className="border-t border-t-neutral-300 p-5 text-xs text-primary-text/70">
                {data.created_at}
            </div>
        </Card>
    )
}
