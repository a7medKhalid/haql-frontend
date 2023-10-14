const Input = ({ disabled = false, className ="", ...props }) => (
    <input
        disabled={disabled}
        className={`${className} px-4 py-5 text-accent placeholder-accent text-right rounded-lg border-2  border-slate-200 bg-neutral-100  focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 ${
            disabled
                ? 'bg-accent bg-opacity-20   border-2 border-[#e1a96573] '
                : ''
        }`}
        {...props}
    />
)

export default Input
