import React from 'react'
import Card from '../../../components/common/Card'
import AppLayout from '../../../components/Layouts/AppLayout'
import ProjectLayout from '../../../components/Layouts/ProjectLayout'
import axios from '../../../lib/axios'
import { getData } from '../../../lib/getData'

export async function getServerSideProps(context) {
    const { username, projectName } = context.params

    // Fetch data from external API
    const { data, errors } = await getData(
        `/api/projects/${username}/${projectName}`,
    )

    // Pass data to the page via props
    return { props: { data } }
}
export default function projectName({ data, username, projectName }) {
    return (
        <ProjectLayout description={data?.description}>
            <div>
                <Card>
                    <Card.CardHeader>
                        <div className="opacity-70">
                            دمج #12 إضافة الشعار، بواسطة فيصل حداد
                        </div>
                    </Card.CardHeader>
                    <Card.CardItem>
                        <ContributionItem
                            username={'فيصل حداد'}
                            contribution_id="12"
                            name="الشعار"
                        />
                    </Card.CardItem>
                </Card>
            </div>
        </ProjectLayout>
    )
}

const ContributionItem = ({ username, contribution_id, name }) => {
    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-between">
                <div className="text-primary-text text border-r border-neutral-300  px-5 ">
                    {`#${contribution_id}`}
                </div>
                <div className="flex items-center text-primary-text text border-r border-neutral-300  px-5">
                    <div className=" ">{username}</div>
                    <div className="w-7 h-7 rounded-full bg-gray-300 ml-3"></div>
                </div>
            </div>
            <div className="text-primary-text text-lg">{name}</div>
        </div>
    )
}
