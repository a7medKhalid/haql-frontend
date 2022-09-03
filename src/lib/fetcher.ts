import { getData } from './getData'

export const fetcher = url => getData(url).then(res => res.data)
