import React from 'react'
export const Card = ({ children, className = '' }) => {
    return (
        <div
            className={`bg-white rounded-lg border border-neutral-300 text-right ${className}`}>
            {children}
        </div>
    )
}

export const CardHeader = ({ children, className = '' }) => {
    return (
        <div
            className={`bg-neutral-200 border-b border-neutral-300 py-5 text-primary-text  px-5 text-sm ${className}`}>
            {children}
        </div>
    )
}

export const CardItem = ({ children, className = '' }) => {
    return (
        <div className="flex items-center justify-end border-b border-neutral-300 p-5  text-sm">
            {children}
        </div>
    )
}

Card.CardHeader = CardHeader
Card.CardItem = CardItem

export default Card
