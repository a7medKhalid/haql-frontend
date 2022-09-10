import React from 'react'

export default function TextArea({ onChange, value, name, className = '' }) {
    return (
        <div className="relative w-full">
            <textarea
                name={name}
                id={name}
                value={value}
                className={`block mt-1 w-full
                                    px-4 py-5 text-accent placeholder-accent text-right rounded-lg border-2  border-slate-200 bg-neutral-100  focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50
                                    ${className}`}
                onChange={onChange}
                rows={5}
                required
                maxLength={255}
                autoComplete="off"></textarea>
            <div className="absolute bottom-2 left-1 text-xs opacity-50">
                {value?.length}/255
            </div>
        </div>
    )
}
