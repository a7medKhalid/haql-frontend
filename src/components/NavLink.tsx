import Link from 'next/link'

const NavLink = ({ active = false, children, ...props }) => (
    <Link href={props.href} {...props}>
        <a
            className={`inline-flex items-center pl-4 text-sm hover:underline hover:opacity-100 font-medium leading-5 focus:outline-accent transition duration-150 ease-in-out ${
                active
                    ? ' text-primary-text opacity-100 '
                    : 'border-transparent opacity-70 hover:text-gray-700 '
            }`}>
            {children}
        </a>
    </Link>
)

export default NavLink
