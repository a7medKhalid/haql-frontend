import { useState } from 'react'
import axios from '../lib/axios'
import Nprogress from 'nprogress'

const useSubmit = () => {
    const [errors, setErrors] = useState<any>([])
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(false)

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const send = async ({
        payload,
        url,
        method = 'post',
        onSuccess,
    }: sendProps) => {
        //   NProgress.start()

        await csrf()
        setErrors([])
        setLoading(true)
        axios[method](url, payload)
            .then(res => {
                setResponse(res.data)
                if (onSuccess != null) {
                    onSuccess(res.data)
                }
            })
            .catch(error => {
                console.log(error)
                // if (error.response.status !== 422) throw error
                setErrors(error.response.data?.errors)
            })
            .finally(() => setLoading(false))
    }

    return {
        send,
        errors,
        response,
        loading,
    }
}

export default useSubmit

interface sendProps {
    payload: any
    url: string
    method?: string
    onSuccess?: (a?: any) => void
}
