import Link from 'next/link'
import { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import InputError from '../components/InputError'
import Label from '../components/Label'
import AuthLayout from '../components/Layouts/AuthLayout'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/explore/projects',
    })

    const [formState, setFormState] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const [errors, setErrors] = useState<any>([])

    const onChange = event => {
        // update form state
        if (event.target.id === 'email') {
            setFormState({
                ...formState,
                ['email']: event.target.value.toLowerCase(),
                ['username']: event.target.value.split('@')[0],
            })
            return
        }

        setFormState({
            ...formState,
            [event.target.id]: event.target.value,
        })
    }
    const submitForm = event => {
        event.preventDefault()

        register({
            name: formState.name,
            username: formState.username,
            email: formState.email,
            password: formState.password,
            password_confirmation: formState.password_confirmation,
            setErrors,
        })
    }

    return (
        <AuthLayout>
            <form onSubmit={submitForm} className="lg:w-2/4 text-right">
                <div className="mb-8">
                    <div className="text-4xl bold">سجل حساب</div>
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
                        value={formState.email}
                        className="block mt-1 w-full"
                        onChange={onChange}
                        required
                        autoFocus
                    />
                    <InputError messages={errors.email} className="mt-2" />
                </div>
                <div className="mt-4">
                    <Label>اسم المستخدم</Label>

                    <Input
                        id="username"
                        type="text"
                        value={formState.username}
                        className="block mt-1 w-full"
                        onChange={onChange}
                        required
                        autoFocus
                    />
                    <InputError messages={errors.username} className="mt-2" />
                </div>
                <div className="mt-4">
                    <Label>اسمك</Label>

                    <Input
                        id="name"
                        type="text"
                        value={formState.name}
                        className="block mt-1 w-full"
                        onChange={onChange}
                        required
                        autoFocus
                    />
                    <InputError messages={errors.name} className="mt-2" />
                </div>

                {/* Password */}
                <div className="mt-4">
                    <Label>كلمة المرور</Label>

                    <Input
                        id="password"
                        type="password"
                        value={formState.password}
                        className="block mt-1 w-full"
                        onChange={onChange}
                        required
                        autoComplete="current-password"
                    />
                    <InputError messages={errors.password} className="mt-2" />
                </div>
                <div className="mt-4">
                    <Label>أعد كتابة كلمة المرور</Label>

                    <Input
                        id="password_confirmation"
                        type="password"
                        value={formState.password_confirmation}
                        className="block mt-1 w-full"
                        onChange={onChange}
                        required
                        autoComplete="current-password"
                    />
                    <InputError
                        messages={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link href="/login">
                        <a className="underline text-sm text-gray-600 hover:text-gray-900">
                            لديك حساب ؟
                        </a>
                    </Link>
                    <Button className="ml-3">تسجيل</Button>
                </div>
            </form>
        </AuthLayout>
    )
}

export default Register
