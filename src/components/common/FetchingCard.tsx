interface props {
    data: any
    error: any
    empty?: any
    children: any
}
export const FetchingCard = ({ data, error, children, empty }: props) => {
    if (error) {
        return <Error />
    }
    if (!data) {
        return <Loading />
    }
    if (data?.length < 1 || data?.data?.length < 1) {
        return empty == null ? <Empty /> : empty
    }
    return children
}

const Empty = () => {
    return <div className="text-center py-4">لا يوجد نتائج</div>
}
const Loading = () => {
    return <div>...</div>
}

const Error = () => {
    return <div>حصل خطا</div>
}
