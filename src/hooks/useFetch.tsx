import { useEffect, useState } from 'react'
import axios from '../lib/axios'
const useFetch = (url = '') => {
    const [data, setData] = useState(null)
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let isMounted = true
        setLoading(true)
        setErrors(null)
        axios
            .get(url)
            .then(res => {
                if (isMounted) {
                    setData(res.data)
                    setErrors(null)
                }
            })
            .catch(err => {
                if (isMounted) {
                    setErrors(err.response)
                    setData(null)
                }
            })
            .finally(() => {
                setLoading(false)
            })
        return () => {
            isMounted = false
        }
    }, [url])
    return {
        loading,
        errors,
        data,
    }
}

export default useFetch
