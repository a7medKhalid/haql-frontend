import Image from 'next/image'
import React from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import AppLayout from '../../../../../components/Layouts/AppLayout'
import { getData } from '../../../../../lib/getData'
import Button from '../../../../../components/Button'
import authBanner from '../../../../../assets/images/authBanner.png'
export async function getServerSideProps(context) {
    const { username, projectID } = context.params

    // Fetch data from external API
    const { data, errors } = await getData(`/api/projects/${projectID}`)

    // Pass data to the page via props
    return { props: { data } }
}
export default function Info({ data }) {
    const router = useRouter()
    return (
        <AppLayout
            variant="showcase"
            contentClassname="mt-0  px-0 sm:px-0 lg:px-0 ">
            <div className="h-screen ">
                <div className="relative h-full">
                    <Image
                        src={authBanner}
                        layout="fill"
                        className="brightness-[0.2] "
                        objectFit="cover"
                        quality={100}
                    />
                    <div className="flex items-center justify-end h-screen">
                        <div className="z-1 text-white absolute px-4 sm:px-6 lg:px-16  rtl">
                            <div className="text-8xl">{data?.name}</div>
                            <div className="text-2xl mt-10 pl-[50rem] opacity-80">
                                {data?.description}
                            </div>
                            <div className="flex items-center mt-20">
                                <Button
                                    onClick={() =>
                                        router.push(
                                            `/${router?.query.username}/${router?.query.projectID}`,
                                        )
                                    }
                                    className="ml-10 text-sm">
                                    تصفح المشروع
                                </Button>
                                <Link
                                    href={`/${router.query.username}/${router.query.projectID}/contributions/create`}>
                                    <a className="text-white hover:underline opacity-80 cursor-pointer transtion duration-150 hover:opacity-100 text-sm">
                                        ساهم
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
