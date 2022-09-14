import { getData } from './getData'

export const fetcher = url =>
    getData(url).then(res => {
        if (res.errors) {
            throw res.errors
        }
        return res.data
    })
