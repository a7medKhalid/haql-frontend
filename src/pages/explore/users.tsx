import React from 'react'
import Card from '../../components/common/Card'
import { Newspaper, SaveAs } from '../../components/common/HeroIcons'
import AppLayout from '../../components/Layouts/AppLayout'

export default function Users() {
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
            <UsersMostContributions />
            <UsersMostProjects />
        </div>
    )
}
const UsersMostContributions = () => {
    return (
        <Card>
            <Card.CardHeader>الحسابات الأكثر مساهمة </Card.CardHeader>
            <Card.CardItem>
                <UserCard
                    bio={
                        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo aliquam nihil consequuntur id est laboriosam sequi voluptatem perferendis velit maiores eos veniam numquam, delectus error tenetur rerum reprehenderit excepturi? Dignissimos!'
                    }
                    username={'محمد'}
                    contributions={5}
                    issues={1}
                />
            </Card.CardItem>
            <Card.CardItem>
                <UserCard
                    bio={
                        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo aliquam nihil consequuntur id est laboriosam sequi voluptatem perferendis velit maiores eos veniam numquam, delectus error tenetur rerum reprehenderit excepturi? Dignissimos!'
                    }
                    username={'محمد'}
                    contributions={5}
                    issues={1}
                />
            </Card.CardItem>
        </Card>
    )
}

const UsersMostProjects = () => {
    return (
        <Card>
            <Card.CardHeader>الحسابات الأكثر مشاريعًا </Card.CardHeader>
            <Card.CardItem>
                <UserCard
                    bio={
                        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo aliquam nihil consequuntur id est laboriosam sequi voluptatem perferendis velit maiores eos veniam numquam, delectus error tenetur rerum reprehenderit excepturi? Dignissimos!'
                    }
                    username={'محمد'}
                    contributions={5}
                    issues={1}
                />
            </Card.CardItem>
            <Card.CardItem>
                <UserCard
                    bio={
                        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo aliquam nihil consequuntur id est laboriosam sequi voluptatem perferendis velit maiores eos veniam numquam, delectus error tenetur rerum reprehenderit excepturi? Dignissimos!'
                    }
                    username={'محمد'}
                    contributions={5}
                    issues={1}
                />
            </Card.CardItem>
            <Card.CardItem>
                <UserCard
                    bio={
                        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo aliquam nihil consequuntur id est laboriosam sequi voluptatem perferendis velit maiores eos veniam numquam, delectus error tenetur rerum reprehenderit excepturi? Dignissimos!'
                    }
                    username={'محمد'}
                    contributions={5}
                    issues={1}
                />
            </Card.CardItem>
            <Card.CardItem>
                <UserCard
                    bio={
                        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo aliquam nihil consequuntur id est laboriosam sequi voluptatem perferendis velit maiores eos veniam numquam, delectus error tenetur rerum reprehenderit excepturi? Dignissimos!'
                    }
                    username={'محمد'}
                    contributions={5}
                    issues={1}
                />
            </Card.CardItem>
        </Card>
    )
}

const RelatedProjects = () => {
    return (
        <div className="">
            <Card>
                <Card.CardHeader>جميع المستخدمين</Card.CardHeader>
                <Card.CardItem>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="ml-2">
                                <UserCard
                                    bio={
                                        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo aliquam nihil consequuntur id est laboriosam sequi voluptatem perferendis velit maiores eos veniam numquam, delectus error tenetur rerum reprehenderit excepturi? Dignissimos!'
                                    }
                                    username={'محمد'}
                                    contributions={5}
                                    issues={1}
                                />
                            </div>
                        </div>
                    </div>
                </Card.CardItem>
            </Card>
        </div>
    )
}

const ProjectBriefStats = ({ contributions, issues }) => {
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
                    <Newspaper />
                    <span className="mr-1"> قضايا: {issues}</span>
                </div>
            </div>
        </div>
    )
}

const UserCard = ({ username, bio, contributions, issues }) => {
    return (
        <div className="flex  rtl">
            <div className="w-16 ml-5">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            </div>
            <div>
                <div className="text-sm  text-primary-text font-bold">
                    {username}
                </div>

                <div className="text-sm text-primary-text opacity-50 mt-2 line-clamp-3 hover:line-clamp-none ">
                    {bio}
                </div>

                <ProjectBriefStats
                    contributions={contributions}
                    issues={issues}
                />
            </div>
        </div>
    )
}
