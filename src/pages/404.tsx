import Link from 'next/link'

const NotFoundPage = () => (
    <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
        <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
            <div className="flex items-center pt-8 sm:justify-start sm:pt-0 mb-5">
                <div className="px-4 text-lg text-gray-500 border-r border-gray-400 tracking-wider">
                    404
                </div>

                <div className="ml-4 text-lg text-gray-500 uppercase tracking-wider">
                    الصفحة غير موجودة
                </div>
            </div>
            <Link href="/explore/projects">
                <a className="ml-4 text-lg  text-center text-primary hover:underline uppercase tracking-wider">
                    العودة إلى الصفحة الرئيسية
                </a>
            </Link>
        </div>
    </div>
)

export default NotFoundPage
