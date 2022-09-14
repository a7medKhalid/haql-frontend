import Link from 'next/link'
import { useState } from 'react'
import Button from '../components/Button'
import AuthLayout from '../components/Layouts/AuthLayout'
import { useAuth } from '../hooks/useAuth'

const VerifyEmail = () => {
    const { logout, resendEmailVerification } = useAuth({
        // middleware: 'auth',
        // redirectIfAuthenticated: '/dashboard',
    })

    const [status, setStatus] = useState(null)

    return (
        <AuthLayout>
            <div className="lg:w-2/4 text-right">
                <div className="mb-4 text-sm text-gray-600">
                    شكرا لتسجيلك! قبل أن تبدأ ، هل يمكنك التحقق من عنوان بريدك
                    الإلكتروني من خلال النقر على الرابط الذي أرسلناه إلى البريد
                    الإلكتروني الخاص بك؟ إذا لم تتلق البريد الإلكتروني ، فسنقوم
                    بكل سرور إرسال رابط آخر لك آخر.
                </div>

                {status === 'verification-link-sent' && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        A new verification link has been sent to the email
                        address you provided during registration.
                    </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                    <Button
                        onClick={() => resendEmailVerification({ setStatus })}>
                        إرسال مرة أخرى
                    </Button>

                    <button
                        type="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900"
                        onClick={logout}>
                        تسجيل الخروج
                    </button>
                </div>
            </div>
        </AuthLayout>
    )
}

export default VerifyEmail
