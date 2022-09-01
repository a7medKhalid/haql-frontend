import Head from 'next/head'
import React, { useState } from 'react'
import AppLayout from '../components/Layouts/AppLayout'
import { useAuth } from '../hooks/auth'
import axios from '../lib/axios'
const User = () => {
    const { logout, resendEmailVerification, user } = useAuth({
        // middleware: 'auth',
        // redirectIfAuthenticated: '/dashboard',
    })
    const sendApi = async () => {
        const payload = {
            name: 'required|string|max:255',
            description: 'required|string|max:255',
            license: 'required|string|max:255',
            license_url: 'required|string|max:255',
        }
        const res = await axios.post('/api/projects', payload)
    }
    const [status, setStatus] = useState(null)
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }>
            <Head>
                <title>Laravel - Dashboard</title>
            </Head>

            <div className="py-12">ff</div>
            <button onClick={sendApi}>ss</button>
        </AppLayout>
    )
}

export default User
