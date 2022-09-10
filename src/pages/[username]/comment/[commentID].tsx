import { useRouter } from 'next/router'
import React from 'react'
import ProjectLayout from '../../../components/Layouts/ProjectLayout'
import { getData } from '../../../lib/getData'

export async function getServerSideProps(context) {
    const { username, commentID } = context.params
    // Fetch data from external API
    const { data, errors } = await getData(`/api/comments/${commentID}`)

    // Pass data to the page via props
    return { props: { data, errors, username } }
}
export default function commentID({ data, username }) {
    console.log({ data })

    // const replyedTo = {
    //     username: router.query.username,
    //     comment: router?.query?.comment,
    // }

    return <ProjectLayout>s</ProjectLayout>
}
