import Head from 'next/head'
import { useRouter } from 'next/router'
import { useAuth } from '../../hooks/useAuth'
import { capitalizeFirstLetter } from '../../lib/generalHelpers'
import { DocumentTextIcon, UsersGroup } from '../common/HeroIcons'
import { TabLink } from '../common/TabLink'
import Footer from '../Footer'
import Navigation from './Navigation'

interface props {
    children: any
    header?: any
    subHeader?: any
    contentClassname?: string
    variant?: 'default' | 'showcase' | 'project'
}
export const getRouteName = route => {
    const path = route.split('/')
    const routeName = path[path.length - 1]
    return routeName
}
const AppLayout = ({
    header,
    subHeader,
    children,
    contentClassname = '',
    variant = 'default',
}: props) => {
    const router = useRouter()

    return (
        <div className="min-h-screen ">
            <Navigation variant={variant} isSubHeader={subHeader == null} />
            <Head>
                <title>{getRouteName(router.asPath)}</title>
            </Head>
            {subHeader == null && variant == 'default' && (
                <header className="bg-neutral-100 border-b border-neutral-300 rtl pt-9">
                    <div className="mx-auto px-4 sm:px-6 lg:px-16 ">
                        <div className="flex items-center">
                            <TabLink href={`/explore/projects`}>
                                <div className="flex items-center ml-2">
                                    <DocumentTextIcon />
                                </div>
                                المشاريع
                            </TabLink>
                            <TabLink href={`/explore/users`}>
                                <div className="flex items-center ml-2">
                                    <UsersGroup />
                                </div>
                                الحسابات
                            </TabLink>
                        </div>
                    </div>
                </header>
            )}
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
            <main className={`mt-5 px-4 sm:px-6 lg:px-16 ${contentClassname}`}>
                <div className="min-h-[80vh]">{children}</div>
                {variant == 'default' && children != null && <Footer />}
            </main>
        </div>
    )
}

export default AppLayout
