module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/explore/projects',
                permanent: true,
            },
        ]
    },
}
