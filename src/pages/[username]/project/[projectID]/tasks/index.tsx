import React from 'react'
import Card, { CardItem } from '../../../../../components/common/Card'
import Input from '../../../../../components/Input'
import ProjectLayout from '../../../../../components/Layouts/ProjectLayout'
import { getData } from '../../../../../lib/getData'

export async function getServerSideProps(context) {
    const { username, projectID } = context.params
    // Fetch data from external API

    const { data, errors } = await getData(
        `/api/projects/${username}/${projectID}/chat`,
    )

    // Pass data to the page via props
    return { props: { data, errors, username } }
}
export default function Tasks({ data, errors, username, projectID }) {
    const [tasks, setTasks] = React.useState([
        {
            title: 'المهمة واحد',
            description: `هذا نص تجريبي لاختبار شكل و حجم النصوص و طريقة عرضها في هذا
            المكان و حجم و لون الخط حيث يتم التحكم في هذا النص وامكانية
            تغييرة في اي وقت عن طريق ادارة الموقع . يتم اضافة هذا النص
            كنص تجريبي للمعاينة فقط وهو لا يعبر عن`,
            status: 'todo',
        },
        {
            title: 'المهمة واحد',
            description: `هذا نص تجريبي لاختبار شكل و حجم النصوص و طريقة عرضها في هذا
            المكان و حجم و لون الخط حيث يتم التحكم في هذا النص وامكانية
            تغييرة في اي وقت عن طريق ادارة الموقع . يتم اضافة هذا النص
            كنص تجريبي للمعاينة فقط وهو لا يعبر عن`,
            status: 'todo',
        },
        {
            title: 'المهمة واحد',
            description: `هذا نص تجريبي لاختبار شكل و حجم النصوص و طريقة عرضها في هذا
            المكان و حجم و لون الخط حيث يتم التحكم في هذا النص وامكانية
            تغييرة في اي وقت عن طريق ادارة الموقع . يتم اضافة هذا النص
            كنص تجريبي للمعاينة فقط وهو لا يعبر عن`,
            status: 'todo',
        },
    ])
    return (
        <ProjectLayout>
            <div className="grid grid-cols-4 gap-5 pb-5 rtl">
                {tasks.map((task, index) => {
                    return (
                        <Task
                            key={index}
                            title={task.title}
                            description={task.description}
                        />
                    )
                })}

                {/* <Task
                    title={'اضغط هنا لتعديل اسم الهدف'}
                    description={'اضغط هنا لوضع وصف'}
                /> */}
            </div>
        </ProjectLayout>
    )
}

const Task = ({ title, description }) => {
    const [newGoal, setNewGoal] = React.useState('')

    const [goals, setGoals] = React.useState([
        'تحديد الهدف الرئيسي للمشروع',
        'تحديد الهدف الرئيسي للمشروع',
        'تحديد الهدف الرئيسي للمشروع',
        'تحديد الهدف الرئيسي للمشروع',
        'تحديد الهدف الرئيسي للمشروع',
        'تحديد الهدف الرئيسي للمشروع',
        'تحديد الهدف الرئيسي للمشروع',
        'تحديد الهدف الرئيسي للمشروع',
        'تحديد الهدف الرئيسي للمشروع',
        'تحديد الهدف الرئيسي للمشروع',
        'تحديد الهدف الرئيسي للمشروع',
    ])

    const [editing, setEditing] = React.useState({
        title: title,
        description: description,
        field: null,
    })
    const onChange = e => {
        setEditing({ ...editing, [e.target.name]: e.target.value })
    }

    return (
        <Card className="relative col-span-12 md:col-span-2 2xl:col-span-1">
            <Card.CardHeader>
                <div className="flex flex-col">
                    {editing.field == 'title' ? (
                        <input
                            type="text"
                            name="title"
                            value={editing.title}
                            onChange={onChange}
                            className="text-primary-text py-0.5 bg-white bg-opacity-70  outline-none border border-slate-200 text-sm"
                            onKeyUp={(e: any) => {
                                if (e.key == 'Enter') {
                                    if (e.target.value.split(' ') == '') {
                                        setEditing({
                                            ...editing,
                                            title: title,
                                            field: null,
                                        })
                                        return
                                    }
                                    setEditing({
                                        ...editing,
                                        field: null,
                                    })
                                }
                            }}
                        />
                    ) : (
                        <div
                            className="text-primary-text hover:underline cursor-pointer"
                            onClick={() =>
                                setEditing({
                                    ...editing,
                                    field: 'title',
                                })
                            }>
                            {title}
                        </div>
                    )}

                    {editing.field == 'description' ? (
                        <textarea
                            name="description"
                            value={editing.description}
                            onChange={onChange}
                            rows={4}
                            className="text-primary-text py-0.5 mt-1 bg-white bg-opacity-70 outline-none border border-slate-200 text-sm"
                            onKeyUp={(e: any) => {
                                if (e.key == 'Enter') {
                                    if (e.target.value.split('') == '') {
                                        setEditing({
                                            ...editing,
                                            description: description,
                                            field: null,
                                        })
                                        return
                                    }
                                    setEditing({
                                        ...editing,
                                        field: null,
                                    })
                                }
                            }}></textarea>
                    ) : (
                        <div
                            className="text-primary-text opacity-70 mt-2 hover:underline cursor-pointer"
                            onClick={() =>
                                setEditing({
                                    ...editing,
                                    field: 'description',
                                })
                            }>
                            {description}
                        </div>
                    )}
                </div>
            </Card.CardHeader>
            <GoalsContainer goals={goals} />
            <div className="  z-10 w-full">
                <Input
                    type="text"
                    name="title"
                    value={newGoal}
                    placeholder="اضف هدف جديد"
                    onChange={e => setNewGoal(e.target.value)}
                    className="text-primary-text  rounded-sm    outline-none border-0 border-t
                    border-slate-200
                    text-sm w-full "
                    onKeyUp={(e: any) => {
                        if (e.key == 'Enter') {
                            if (e.target.value.split(' ') == '') {
                                setNewGoal('')
                                return
                            }
                            setGoals([...goals, e.target.value])
                            setNewGoal('')
                        }
                    }}
                />
            </div>
        </Card>
    )
}

const GoalsContainer = ({ goals }) => {
    return (
        <div className="h-[35vh] overflow-y-auto relative">
            {goals.map((goal, index) => (
                <TaskItem goalTitle={goal} key={index} />
            ))}
        </div>
    )
}

const TaskItem = ({ goalTitle }) => {
    const [editing, setEditing] = React.useState({
        goalTitle: goalTitle,
        field: null,
    })
    const onChange = e => {
        setEditing({ ...editing, [e.target.name]: e.target.value })
    }
    return (
        <CardItem>
            <div className="flex items-center justify-between w-full">
                {editing.field == 'title' ? (
                    <input
                        type="text"
                        name="title"
                        value={editing.goalTitle}
                        onChange={onChange}
                        className="text-primary-text py-0.5 px-0 bg-white bg-opacity-70  outline-none border border-slate-200 text-sm"
                        onKeyUp={(e: any) => {
                            if (e.key == 'Enter') {
                                if (e.target.value.split(' ') == '') {
                                    setEditing({
                                        ...editing,
                                        goalTitle: goalTitle,
                                        field: null,
                                    })
                                    return
                                }
                                setEditing({
                                    ...editing,
                                    field: null,
                                })
                            }
                        }}
                    />
                ) : (
                    <div
                        className="text-primary-text hover:underline cursor-pointer"
                        onClick={() =>
                            setEditing({
                                ...editing,
                                field: 'title',
                            })
                        }>
                        {goalTitle}
                    </div>
                )}
                <div className="text-primary hover:underline cursor-pointer">
                    ساهم
                </div>
            </div>
        </CardItem>
    )
}
