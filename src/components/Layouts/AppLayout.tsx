import Head from 'next/head'
import { useRouter } from 'next/router'
import { useAuth } from '../../hooks/useAuth'
import { capitalizeFirstLetter } from '../../lib/generalHelpers'
import Navigation from './Navigation'

interface props {
    children: any
    header?: any
    subHeader?: any
}
const AppLayout = ({ header, subHeader, children }: props) => {
    const { user } = useAuth({ middleware: 'auth' })
    const router = useRouter()
    const getRouteName = route => {
        const path = route.split('/')
        const routeName = path[path.length - 1]
        return routeName
    }
    return (
        <div className="min-h-screen ">
            <Navigation user={user} />
            <Head>
                <title>{getRouteName(router.asPath)}</title>
            </Head>

            {/* Page Heading */}
            {header != null && (
                <header className="bg-neutral-100 border-b border-neutral-300 rtl py-9">
                    <div className="mx-auto px-4 sm:px-6 lg:px-16 ">
                        {header}
                    </div>
                </header>
            )}
            {/* Page SubHeading */}
            {subHeader != null && (
                <header className="bg-neutral-100 border-b border-neutral-300 rtl pt-9">
                    <div className="mx-auto px-4 sm:px-6 lg:px-16 ">
                        {subHeader}
                    </div>
                </header>
            )}
            {/* Page Content */}
            <main className="mt-5 px-4 sm:px-6 lg:px-16">{children}</main>
        </div>
    )
}

export default AppLayout
