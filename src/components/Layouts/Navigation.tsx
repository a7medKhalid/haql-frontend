import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import Dropdown from '../Dropdown'
import DropdownLink, { DropdownButton } from '../DropdownLink'
import NavLink from '../NavLink'
import ResponsiveNavLink, { ResponsiveNavButton } from '../ResponsiveNavLink'

const Navigation = ({ isSubHeader, variant }) => {
    const router = useRouter()
    const { user } = useAuth({})

    const { logout } = useAuth({})

    const [open, setOpen] = useState(false)

    return (
        <nav
            className={`bg-neutral-200 border-b border-neutral-300 rtl transition duration-300 ${
                variant == 'showcase'
                    ? 'bg-transparent text-white absolute top-0 w-screen h-20 z-10 border-b-0'
                    : ''
            }`}>
            {/* Primary Navigation Menu */}
            <div className="mx-auto px-4 sm:px-6 lg:px-16">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/explore/projects">
                                <a className="bold">
                                    حقل
                                    {/* <ApplicationLogo className="block h-10 w-auto fill-current text-gray-600" /> */}
                                </a>
                            </Link>

                            {(isSubHeader == false ||
                                variant == 'showcase') && (
                                <div className="mx-3">
                                    <Dropdown
                                        alignClass="right-0"
                                        width="48"
                                        trigger={
                                            <button
                                                className={`flex items-center text-sm font-medium  opacity-70 hover:opacity-100 z-50 focus:outline-none transition duration-150 ease-in-out
                                                ${
                                                    variant == 'showcase'
                                                        ? ' text-white'
                                                        : 'text-primary-text'
                                                }
                                                `}>
                                                <div>تصفح</div>

                                                <div className="ml-1">
                                                    <svg
                                                        className="fill-current h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                            </button>
                                        }>
                                        {/* Authentication */}
                                        <DropdownLink href="/explore/projects">
                                            المشاريع
                                        </DropdownLink>
                                        <DropdownLink href="/explore/users">
                                            الحسابات
                                        </DropdownLink>
                                    </Dropdown>
                                </div>
                            )}
                        </div>

                        {/* Navigation Links */}
                        {/* <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                            <NavLink
                                href="/dashboard"
                                active={router.pathname === '/dashboard'}>
                                Dashboard
                            </NavLink>
                        </div> */}
                    </div>

                    {/* Settings Dropdown */}
                    <div
                        className={`hidden sm:flex sm:items-center sm:ml-6
                    
                      ${
                          variant == 'showcase'
                              ? ' text-white'
                              : 'text-primary-text'
                      }
                    `}>
                        <NavLink
                            href="/projects/create"
                            active={router.pathname === '/projects/create'}>
                            اضافة مشروع
                        </NavLink>
                        {user ? (
                            <Dropdown
                                align="left"
                                width="48"
                                trigger={
                                    <button className="flex items-center text-sm font-medium  opacity-70 hover:opacity-100  focus:outline-none transition duration-150 ease-in-out">
                                        <div>{user?.name}</div>

                                        <div className="ml-1">
                                            <svg
                                                className="fill-current h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    </button>
                                }>
                                <DropdownLink href={`/${user?.username}`}>
                                    حسابي
                                </DropdownLink>
                                {/* Authentication */}
                                <DropdownButton onClick={logout}>
                                    تسجيل الخروج
                                </DropdownButton>
                            </Dropdown>
                        ) : (
                            <div className="flex item-center ">
                                <Link href="/login">
                                    <a className="text-primary text-sm hover:underline cursor-pointer">
                                        تسجيل الدخول
                                    </a>
                                </Link>
                            </div>
                        )}
                    </div>
                    {/* Hamburger */}
                    <div className=" flex items-center sm:hidden">
                        <button
                            onClick={() => setOpen(open => !open)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24">
                                {open ? (
                                    <path
                                        className="inline-flex"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        className="inline-flex"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Responsive Navigation Menu */}
            {open && (
                <div className="block sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href="/projects/create"
                            active={router.pathname === '/projects/create'}>
                            إضافة مشروع
                        </ResponsiveNavLink>
                    </div>

                    {/* Responsive Settings Options */}
                    {user?.username != null && (
                        <div className="pt-4 pb-1 border-t border-gray-200 ">
                            <div className="flex items-center px-4">
                                <div className="flex-shrink-0">
                                    <svg
                                        className="h-10 w-10 fill-current text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>

                                <div className="ml-3">
                                    <div className="font-medium text-base text-gray-800">
                                        {user?.name}
                                    </div>
                                    <div className="font-medium text-sm text-gray-500">
                                        {user?.email}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 space-y-1 ">
                                {/* Authentication */}
                                <ResponsiveNavButton
                                    onClick={logout}
                                    className="text-right mt-2 px-5 mb-5">
                                    تسجيل الخروج
                                </ResponsiveNavButton>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navigation
