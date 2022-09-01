import React from 'react'
import { getData } from '../../../../lib/getData'
import AppLayout from '../../../../components/Layouts/AppLayout'
import ProjectLayout from '../../../../components/Layouts/ProjectLayout'
import { Contributions } from '../../../../components/page_components/user/projects/contributions/Contributions'
import { Contributers } from '../../../../components/page_components/user/projects/contributions/Contributers'
import { Card, CardItem } from '../../../../components/common/Card'

export async function getServerSideProps(context) {
    const { username, projectName, contribution_id } = context.params
    // Fetch data from external API
    const { data, errors } = await getData(
        `/api/projects/${username}/${projectName}/contributions/${contribution_id}`,
    )

    // Pass data to the page via props
    return { props: { data, errors, username, projectName } }
}
export default function Contribution({ data }) {
    console.log(data)

    return (
        <ProjectLayout description={data?.description}>
            <div>
                <div className="lg:grid grid-cols-4 gap-5">
                    <div className="col-span-3">
                        <Card>
                            <Card.CardHeader className="py-0 pt-3 pb-3">
                                <div className="flex items-center rtl">
                                    <div className="w-10 h-10 rounded-full bg-gray-300 ml-3"></div>
                                    <div className="text-primary  hover:underline cursor-pointer">
                                        اسم المساهم
                                    </div>
                                </div>
                            </Card.CardHeader>
                            <div className="p-5">
                                <div className="bold text-lg text-primary-text">
                                    عنوان المساهمة
                                </div>
                                <div className=" mt-3 text-primary-text">
                                    تفاصيل المساهمة
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="col-span-1">
                        <Card>
                            <Card.CardHeader>تفاصيل المساهمة</Card.CardHeader>
                            <CardItem>
                                <ProjectDetailItem
                                    title={'رقم المساهمة'}
                                    value="#142"
                                />
                            </CardItem>
                            <CardItem>
                                <ProjectDetailItem
                                    title={'التاريخ'}
                                    value="12/7/2020"
                                />
                            </CardItem>
                            <CardItem>
                                <ProjectDetailItem
                                    title={'القضية المربوطة'}
                                    value="طلب شعار #12"
                                />
                            </CardItem>
                            <CardItem>
                                <ProjectDetailItem
                                    title={'المهمة'}
                                    value="الشعار #2"
                                />
                            </CardItem>
                            <CardItem>
                                <ProjectDetailSpecialties
                                    specialties={['برمجة', 'تصميم', 'شعار']}
                                />
                            </CardItem>
                        </Card>
                    </div>
                </div>
            </div>
        </ProjectLayout>
    )
}

const ProjectDetailSpecialties = ({ specialties }) => {
    return (
        <div className="flex flex-col">
            <div className="text-primary-text font-bold hover:underline cursor-pointer">
                التخصصات
            </div>
            <div className="flex items-center justify-end mt-2">
                {specialties.map((specialty, index) => (
                    <ProjectDetailSpecialtiesItem title={specialty} />
                ))}
            </div>
        </div>
    )
}
const ProjectDetailSpecialtiesItem = ({ title }) => {
    return (
        <div className="border border-neutral-300 rounded text-center px-2 py-1 ml-2 ">
            {title}
        </div>
    )
}

const ProjectDetailItem = ({ title, value }) => {
    return (
        <div className="flex flex-col">
            <div className="text-primary-text font-bold hover:underline cursor-pointer">
                {title}
            </div>
            <div className="text-primary-text opacity-50 rtl mt-2">{value}</div>
        </div>
    )
}
