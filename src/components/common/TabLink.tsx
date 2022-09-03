import Link from 'next/link'
import { useRouter } from 'next/router'

export const TabLink = ({ children, ...props }) => {
    const router = useRouter()
    const active = props.href == router.asPath
    return (
        <Link href={props.href} {...props}>
            <div className="flex flex-col items-center justify-center pl-12 cursor-pointer">
                <a
                    className={`inline-flex items-center text-lg  text-center  hover:opacity-100  leading-5 focus:outline-accent transition duration-150 ease-in-out ${
                        active
                            ? ' text-primary-text opacity-100 '
                            : 'border-transparent text-primary-text opacity-70 hover:text-gray-700 '
                    }`}>
                    {children}
                </a>
                {active ? (
                    <div className="bg-primary h-1 w-24 mt-6" />
                ) : (
                    <div className=" h-1 w-24 mt-6" />
                )}
            </div>
        </Link>
    )
}
