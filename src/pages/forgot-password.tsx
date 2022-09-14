import Link from 'next/link'
import { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import InputError from '../components/InputError'
import Label from '../components/Label'
import AuthLayout from '../components/Layouts/AuthLayout'
import { useAuth } from '../hooks/useAuth'

const ForgotPassword = () => {
    const { forgotPassword } = useAuth({})

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState<any>([])
    const [status, setStatus] = useState(null)

    const submitForm = event => {
        event.preventDefault()

        forgotPassword({ email, setErrors, setStatus })
    }

    return (
        <AuthLayout>
            {/* Session Status */}

            <form onSubmit={submitForm} className="lg:w-2/4 text-right">
                <div className="mb-4 text-sm text-gray-600">
                    نسيت كلمة المرور؟ أدخل بريدك الإلكتروني وسنرسل لك رابط
                    لإعادة تعيين كلمة المرور
                </div>
                {/* Email Address */}
                <div>
                    <Label>البريد الإلكتروني</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        className="block mt-1 w-full"
                        onChange={event => setEmail(event.target.value)}
                        required
                        autoFocus
                    />

                    <InputError messages={errors.email} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button>أرسل الرمز إلى البريد</Button>
                </div>
            </form>
        </AuthLayout>
    )
}

export default ForgotPassword
