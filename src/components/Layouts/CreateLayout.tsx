import React from 'react'
function CreateLayout({ children }) {
    return (
        <div className="rtl pb-5">
            <div className="lg:grid grid-cols-4">{children}</div>
        </div>
    )
}

const Form = ({ children }) => {
    return <div className="col-span-1">{children}</div>
}

const FormSide = ({ children }) => {
    return <div className="col-span-3">{children}</div>
}

CreateLayout.Form = Form
CreateLayout.FormSide = FormSide

export default CreateLayout
