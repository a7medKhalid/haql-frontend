import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../hooks/useAuth'
import Layout from '../components/Layouts/Layout'
import Input from '../components/Input'
import InputError from '../components/InputError'
import Button from '../components/Button'
import authBanner from '../assets/images/authBanner.png'
import seefLogo from '../assets/svg/seef-logo.svg'
import Image from 'next/image'
import AuthLayout from '../components/Layouts/AuthLayout'
import Label from '../components/Label'
const Login = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState<any>([])
    const [status, setStatus] = useState(null)

    // useEffect(() => {
    //     if (router.query.reset?.length > 0 && errors.length === 0) {
    //         setStatus(atob(router.query.reset))
    //     } else {
    //         setStatus(null)
    //     }
    // })

    const submitForm = async event => {
        event.preventDefault()

        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        })
    }

    return (
        <AuthLayout>
            <form onSubmit={submitForm} className="lg:w-2/4 text-right">
                <div className="mb-8">
                    <div className="text-4xl bold">سجل الدخول</div>
                    <div className="text-2xl mt-7 opacity-60">
                        الرجاء إدخال بياناتك للإستمرار
                    </div>
                </div>

                {/* Email Address */}
                <div>
                    <Label>البريد الإلكتروني</Label>

                    <Input
                        id="email"
                        type="email"
                        value={email}
                        className="block mt-1 w-full"
                        onChange={event => setEmail(event.target.value)}
                        required
                        autoFocus
                    />
                    <InputError messages={errors.email} className="mt-2" />
                </div>

                {/* Password */}
                <div className="mt-4">
                    <Label>كلمة المرور</Label>

                    <Input
                        id="password"
                        type="password"
                        value={password}
                        className="block mt-1 w-full"
                        onChange={event => setPassword(event.target.value)}
                        required
                        autoComplete="current-password"
                    />
                    <Link href="/forgot-password">
                        <a className="underline text-sm text-gray-600 hover:text-gray-900">
                            نسيت كلمة المرور ؟
                        </a>
                    </Link>
                    <InputError messages={errors.password} className="mt-2" />
                </div>

                {/* Remember Me */}
                <div className="block mt-4 rtl">
                    <label
                        htmlFor="remember_me"
                        className="inline-flex items-center">
                        <input
                            id="remember_me"
                            type="checkbox"
                            name="remember"
                            className=" bg-neutral-100 text-right rounded-md  border-neutral-300 focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50"
                            onChange={event =>
                                setShouldRemember(event.target.checked)
                            }
                        />

                        <span className="mr-2 text-sm text-gray-600">
                            تذكرني
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link href="/register">
                        <a className="underline text-sm text-gray-600 hover:text-gray-900">
                            ليس لديك حساب ؟
                        </a>
                    </Link>
                    <Button className="ml-3">تسجيل الدخول</Button>
                </div>
            </form>
        </AuthLayout>
    )
}

export default Login
