import React from 'react'
import Card from '../../components/common/Card'
import AppLayout from '../../components/Layouts/AppLayout'
import { UserContributions } from '../../components/page_components/user/profile/UserContributions'
import { UserInfo } from '../../components/page_components/user/profile/UserInfo'
import { UserProjects } from '../../components/page_components/user/profile/UserProjects'

export default function UserProfile() {
    return (
        <AppLayout>
            <div className="grid grid-cols-4 gap-5 rtl">
                <div className="col-span-1 ">
                    <UserInfo />
                </div>
                <div className="col-span-3 ">
                    <div className="grid grid-cols-2 gap-5">
                        <div className="col-span-1 ">
                            <UserProjects />
                        </div>
                        <div className="col-span-1 ">
                            <UserContributions />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
