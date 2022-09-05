import React from 'react'
import Card from '../../components/common/Card'
import { Newspaper, SaveAs } from '../../components/common/HeroIcons'
import AppLayout from '../../components/Layouts/AppLayout'

export default function Projects() {
    return (
        <AppLayout>
            <div className="grid grid-cols-4 gap-5">
                <div className="col-span-12 lg:col-span-3">
                    <RelatedProjects />
                </div>
                <div className="col-span-12 lg:col-span-1">
                    <SideBar />
                </div>
            </div>
        </AppLayout>
    )
}

const SideBar = () => {
    return (
        <div className="grid grid-cols-1 gap-5">
            <LatestProjects />
            <TrendingProjects />
            <UserIntrests />
        </div>
    )
}

const LatestProjects = () => {
    return (
        <Card>
            <Card.CardHeader>آخر المشاريع </Card.CardHeader>
            <Card.CardItem>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="ml-2">
                            <div className="text-sm font-bold">مشروع 1</div>
                            <ProjectBriefStats
                                comments={'10'}
                                contributions="5"
                                issues={'1'}
                            />
                        </div>
                    </div>
                </div>
            </Card.CardItem>
        </Card>
    )
}

const TrendingProjects = () => {
    return (
        <Card>
            <Card.CardHeader>
                المشاريع الرائجة{' '}
                <span className="text-xs opacity-50 mr-2">
                    الأكثر مساهمة، تعليقات، قضايا خلال الأسبوع
                </span>
            </Card.CardHeader>
            <Card.CardItem>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="ml-2">
                            <div className="text-sm font-bold">مشروع 1</div>
                            <ProjectBriefStats
                                comments={'10'}
                                contributions="5"
                                issues={'1'}
                            />
                        </div>
                    </div>
                </div>
            </Card.CardItem>
        </Card>
    )
}

const RelatedProjects = () => {
    return (
        <div className="">
            <Card>
                <Card.CardHeader>
                    مشاريع ذات صلة{' '}
                    <span className="text-xs opacity-50 mr-2">
                        بناء على الأهتمامات
                    </span>
                </Card.CardHeader>
                <Card.CardItem>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="ml-2">
                                <div className="text-sm  text-primary-text font-bold">
                                    مشروع 1
                                </div>
                                <div className="text-sm text-primary-text opacity-50 mt-2">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Illo eligendi alias
                                    doloribus nostrum exercitationem tempora
                                    voluptas distinctio nihil eum, eaque qui
                                    excepturi totam labore inventore?
                                    Praesentium consequatur maiores cum
                                    consectetur.
                                </div>

                                <ProjectBriefStats
                                    comments={'10'}
                                    contributions="5"
                                    issues={'1'}
                                />
                            </div>
                        </div>
                    </div>
                </Card.CardItem>
            </Card>
        </div>
    )
}
const UserIntrests = () => {
    return (
        <div className="">
            <Card>
                <Card.CardHeader>اهتماماتك، مهاراتك</Card.CardHeader>
                <Card.CardItem>البرمجة</Card.CardItem>
                <Card.CardItem>التصميم</Card.CardItem>
                <Card.CardItem>رياكت نيتف</Card.CardItem>
            </Card>
        </div>
    )
}

const ProjectBriefStats = ({ contributions, comments, issues }) => {
    return (
        <div className="flex item-center mt-2   rtl">
            <div className="text-xs text-primary-text opacity-50 ml-4">
                <div className="flex item-center">
                    <SaveAs />
                    <span className="mr-1">مساهمات: {contributions}</span>
                </div>
            </div>
            <div className="text-xs text-primary-text opacity-50 ml-4">
                <div className="flex item-center">
                    <SaveAs />
                    <span className="mr-1">تعليقات: {comments}</span>
                </div>
            </div>
            <div className="text-xs text-primary-text opacity-50 ml-4">
                <div className="flex item-center">
                    <Newspaper />
                    <span className="mr-1"> قضايا: {issues}</span>
                </div>
            </div>
        </div>
    )
}
