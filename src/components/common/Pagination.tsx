import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Card from './Card'

export default function Pagination({ data }) {
    const router = useRouter()
    const onePager =
        data?.next_page_url === null && data?.prev_page_url === null

    if (onePager) return null
    return (
        <Card.CardItem>
            <div
                className="inline-flex border border-neutral-300 rounded-md text-primary-text/80"
                role="group">
                {data.next_page_url != null && (
                    <Link
                        href={{
                            pathname: router.asPath.split('?page')[0],
                            query: { page: data.current_page + 1 },
                        }}>
                        <a className="py-2 bg-neutral-200 border-neutral-300 px-5 border-r  hover:bg-neutral-300 transition duration-150 ease-in-ou">
                            التالي
                        </a>
                    </Link>
                )}
                {data.prev_page_url != null && (
                    <Link
                        href={{
                            pathname: router.asPath.split('?page')[0],
                            query: { page: data.current_page - 1 },
                        }}>
                        <a className="py-2 bg-neutral-200 border-neutral-300 px-5  hover:bg-neutral-300 transition duration-150 ease-in-ou">
                            السابق
                        </a>
                    </Link>
                )}
            </div>
        </Card.CardItem>
    )
}
