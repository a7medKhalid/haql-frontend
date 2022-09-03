import Link from 'next/link'
import { Menu } from '@headlessui/react'

const DropdownLink = ({ children, ...props }) => (
    <Menu.Item>
        {({ active }) => (
            <Link {...props}>
                <a
                    className={`w-full text-right block px-4 py-2 text-sm hover:bg-neutral-200 leading-5 text-primary-text${
                        active ? 'bg-neutral-200' : ''
                    } focus:outline-none transition duration-150 ease-in-out`}>
                    {children}
                </a>
            </Link>
        )}
    </Menu.Item>
)

export const DropdownButton = ({ children, ...props }) => (
    <Menu.Item>
        {({ active }) => (
            <button
                className={`w-full text-right block px-4 py-2 text-sm leading-5 text-primary-text  ${
                    active ? 'bg-neutral-200' : ''
                } focus:outline-none transition duration-150 ease-in-out`}
                {...props}>
                {children}
            </button>
        )}
    </Menu.Item>
)

export default DropdownLink
