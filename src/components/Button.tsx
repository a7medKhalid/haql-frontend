type buttonType = 'submit' | 'button' | 'reset'
interface props {
    type?: buttonType
    className?: string
    loading?: boolean
    [key: string]: any
}
const Button = ({
    type = 'submit',
    className = '',
    loading = false,
    ...props
}: props) => (
    <button
        type={type}
        disabled={loading}
        className={`${className} inline-flex bg-primary border-b-[#066B99] border-b-4 items-center px-10 py-3 text-md font-bold  border border-transparent rounded-lg  text-white uppercase tracking-widest hover:bg-[#066B99] active:bg-[#066B99] focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 ${
            loading ? 'opacity-50' : ''
        }`}
        {...props}
    />
)

export default Button
