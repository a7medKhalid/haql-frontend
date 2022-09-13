import Link from 'next/link'
import { Menu } from '@headlessui/react'

const DropdownLink = ({ children, ...props }) => (
    <Menu.Item>
        {({ active }) => (
            <Link href={props.href}>
                <div
                    {...props}
                    className={`w-full text-right block px-4 py-2 text-sm z-50 hover:bg-neutral-200 leading-5 text-primary-text${
                        active ? 'bg-neutral-200' : ''
                    } focus:outline-none transition duration-150 ease-in-out`}>
                    <a>{children}</a>
                </div>
            </Link>
        )}
    </Menu.Item>
)

export const DropdownButton = ({ children, className = '', ...props }) => (
    <Menu.Item>
        {({ active }) => (
            <button
                className={`w-full text-right block px-4 py-2 text-sm leading-5 text-primary-text z-50 ${
                    active ? 'bg-neutral-200' : ''
                } focus:outline-none transition duration-150 ease-in-out ${className}`}
                {...props}>
                {children}
            </button>
        )}
    </Menu.Item>
)

export default DropdownLink
