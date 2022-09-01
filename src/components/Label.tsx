import React from 'react'

interface props {
    className?: string
    children?: any
}
const Label = ({ className, children, ...props }: props) => (
    <label
        className={`${className} block   text-right text-accent mb-2`}
        {...props}>
        {children}
    </label>
)

export default Label
