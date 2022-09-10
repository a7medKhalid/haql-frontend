import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'
import Button from '../../../../../components/Button'
import Card, { CardItem } from '../../../../../components/common/Card'
import {
    DotsVertical,
    PlusIcon,
} from '../../../../../components/common/HeroIcons'
import TextArea from '../../../../../components/common/TextArea'
import Dropdown from '../../../../../components/Dropdown'
import { DropdownButton } from '../../../../../components/DropdownLink'
import Input from '../../../../../components/Input'
import Label from '../../../../../components/Label'
import ProjectLayout from '../../../../../components/Layouts/ProjectLayout'
import useSubmit from '../../../../../hooks/useSubmit'
import { fetcher } from '../../../../../lib/fetcher'
import { getData } from '../../../../../lib/getData'

export async function getServerSideProps(context) {
    const { username, projectID } = context.params
    // Fetch data from external API

    const { data, errors } = await getData(`/api/projects/${projectID}/goals`)

    // Pass data to the page via props
    return { props: { data, errors, username, projectID } }
}
export default function Tasks({ data, errors, username, projectID }) {
    const { data: permission, error: permisionErrors } = useSWR(
        `/api/permissions?model=project&model_id=${projectID}&permission=update`,
        fetcher,
    )
    const canUpdate = permission?.message === true
    return (
        <ProjectLayout>
            <div className="grid grid-cols-4 gap-5 pb-5 rtl">
                {data?.data?.length > 0 &&
                    data?.data.map((goal, index) => {
                        return (
                            <Goal
                                key={index}
                                goalID={goal.id}
                                canUpdate={canUpdate}
                                title={goal.title}
                                tasks={goal.tasks}
                                description={goal.description}
                                isCompleted={goal.isCompleted}
                            />
                        )
                    })}
                {canUpdate === true && <CreateGoal />}
            </div>
        </ProjectLayout>
    )
}

const Goal = ({
    title,
    description,
    goalID,
    tasks,
    canUpdate,
    isCompleted,
}) => {
    const [newGoal, setNewGoal] = React.useState('')
    const { send, errors } = useSubmit()
    const router = useRouter()
    const [editing, setEditing] = React.useState({
        title: title,
        description: description,
        field: null,
    })
    const onChange = e => {
        setEditing({ ...editing, [e.target.name]: e.target.value })
    }
    const createTask = e => {
        if (e.target.value == '') return
        send({
            url: '/api/tasks',
            payload: {
                goal_id: goalID,
                title: e.target.value,
                specialtiesIds: [1],
            },
            onSuccess: a => {
                router.replace(router.asPath)
            },
        })
    }
    const deleteGoal = () => {
        send({
            url: `/api/goals?goal_id=${goalID}`,
            payload: {},
            method: 'delete',
            onSuccess: a => {
                router.replace(router.asPath)
            },
        })
    }
    const updateGoalStatus = status => {
        send({
            url: `/api/goals?goal_id=${goalID}&isCompleted=${status}`,
            payload: {
                goal_id: goalID,
                isCompleted: status,
            },
            method: 'put',
            onSuccess: a => {
                router.replace(router.asPath)
            },
        })
    }

    return (
        <Card className="relative col-span-12 md:col-span-2 2xl:col-span-1">
            <Card.CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex flex-col text-xs">
                        {editing.field == 'title' && 3 > 4 ? (
                            <input
                                type="text"
                                name="title"
                                value={editing.title}
                                onChange={onChange}
                                className={`text-primary-text py-0.5 bg-white bg-opacity-70  outline-none border border-slate-200 text-xs 
                                ${
                                    3 > 4
                                        ? ' hover:underline cursor-pointer'
                                        : ''
                                }
                                `}
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
                                className={`text-primary-text ${
                                    3 > 4
                                        ? ' hover:underline cursor-pointer'
                                        : ''
                                }`}
                                onClick={() =>
                                    setEditing({
                                        ...editing,
                                        field: 'title',
                                    })
                                }>
                                {title}
                            </div>
                        )}

                        {editing.field == 'description' && 3 > 4 ? (
                            <textarea
                                name="description"
                                value={editing.description}
                                onChange={onChange}
                                rows={4}
                                className={`text-primary-text py-0.5 mt-1 bg-white bg-opacity-70 outline-none border border-slate-200 text-xs
                                
                             
                                `}
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
                                className={`text-primary-text text-xs opacity-70 mt-2 ${
                                    3 > 4
                                        ? ' hover:underline cursor-pointer'
                                        : ''
                                }`}
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
                    <div className="flex flex-col items-end">
                        {canUpdate === true && (
                            <Dropdown
                                align="left"
                                width="48"
                                trigger={
                                    <div>
                                        <DotsVertical classname="text-primary-text/70 mb-2 hover:text-primary cursor-pointer" />
                                    </div>
                                }>
                                {isCompleted == 0 ? (
                                    <DropdownButton
                                        onClick={() => updateGoalStatus(1)}
                                        className="text-green-500 text-xs">
                                        اكتمل الهدف
                                    </DropdownButton>
                                ) : (
                                    <DropdownButton
                                        onClick={() => updateGoalStatus(0)}
                                        className="text-primary-text text-xs">
                                        لم يكتمل الهدف
                                    </DropdownButton>
                                )}
                                <DropdownButton
                                    onClick={deleteGoal}
                                    className="text-red-500 text-xs">
                                    حذف الهدف
                                </DropdownButton>
                            </Dropdown>
                        )}
                        {isCompleted == 1 && (
                            <div
                                className={`border  bg-white text-xs py-1 px-2  rounded 
                   
                            border-green-500 text-green-500
                              
                        `}>
                                {isCompleted == 1 && 'مكتمل'}
                            </div>
                        )}
                    </div>
                </div>
            </Card.CardHeader>
            <TasksContainer tasks={tasks} canUpdate={canUpdate} />
            {/* create task input */}
            {canUpdate === true && (
                <div className="  z-10 bg-red-100 w-full">
                    <Input
                        type="text"
                        name="title"
                        value={newGoal}
                        placeholder="اضف مهمة جديدة"
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
                                createTask(e)
                                setNewGoal('')
                            }
                        }}
                    />
                </div>
            )}
        </Card>
    )
}

const TasksContainer = ({ tasks, canUpdate }) => {
    return (
        <div className="h-[40vh] overflow-y-auto relative ">
            {tasks.length > 0 &&
                tasks.map((task, index) => (
                    <TaskItem
                        id={task.id}
                        taskTitle={task.title}
                        isCompleted={task.isCompleted}
                        key={index}
                        canUpdate={canUpdate}
                    />
                ))}
        </div>
    )
}

const TaskItem = ({ id, taskTitle, canUpdate, isCompleted }) => {
    const [editing, setEditing] = React.useState({
        taskTitle: taskTitle,
        field: null,
    })
    const { send } = useSubmit()
    const router = useRouter()
    const onChange = e => {
        setEditing({ ...editing, [e.target.name]: e.target.value })
    }
    const deleteTask = () => {
        send({
            url: `/api/tasks?task_id=${id}`,
            payload: {},
            method: 'delete',
            onSuccess: a => {
                router.replace(router.asPath)
            },
        })
    }

    const updateTaskStatus = status => {
        send({
            url: `/api/tasks?task_id=${id}&isCompleted=${status}`,
            payload: {
                goal_id: id,
                isCompleted: status,
            },
            method: 'put',
            onSuccess: a => {
                router.replace(router.asPath)
            },
        })
    }
    return (
        <CardItem>
            <div className=" w-full">
                {canUpdate === true && (
                    <Dropdown
                        alignClass="right-5"
                        align="right"
                        width="48"
                        trigger={
                            <div>
                                <DotsVertical classname="text-primary-text/70 mb-2 hover:text-primary cursor-pointer" />
                            </div>
                        }>
                        {isCompleted == 1 ? (
                            <DropdownButton
                                onClick={() => updateTaskStatus(0)}
                                className="text-primary-text text-xs">
                                لم تكتمل المهمة
                            </DropdownButton>
                        ) : (
                            <DropdownButton
                                onClick={() => updateTaskStatus(1)}
                                className="text-green-500 text-xs">
                                اكتملت المهمة
                            </DropdownButton>
                        )}
                        <DropdownButton
                            onClick={deleteTask}
                            className="text-red-500 text-xs">
                            حذف المهمة
                        </DropdownButton>
                    </Dropdown>
                )}
                <div className="flex text-xs items-center justify-between">
                    {editing.field == 'title' && 3 > 4 ? (
                        <input
                            type="text"
                            name="title"
                            value={editing.taskTitle}
                            onChange={onChange}
                            autoFocus
                            className="text-primary-text py-0.5 px-2 bg-white bg-opacity-70  outline-none border border-slate-200 text-xs"
                            onKeyUp={(e: any) => {
                                if (e.key == 'Enter') {
                                    if (e.target.value.split(' ') == '') {
                                        setEditing({
                                            ...editing,
                                            taskTitle: taskTitle,
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
                            className={`text-primary-text ${
                                3 > 4 ? ' hover:underline cursor-pointer' : ''
                            }`}
                            onClick={() => {
                                if (3 > 4) {
                                    setEditing({
                                        ...editing,
                                        field: 'title',
                                    })
                                }
                            }}>
                            {taskTitle}
                        </div>
                    )}

                    {isCompleted == 1 ? (
                        <div
                            className={`border  bg-white text-xs px-2  rounded 
                   
                            border-green-500 text-green-500
                              
                        `}>
                            {isCompleted == 1 && 'مكتمل'}
                        </div>
                    ) : (
                        <Link
                            href={`/${router.query.username}/project/${router.query.projectID}/contributions/create?title=${taskTitle}`}>
                            <div className="text-primary hover:underline cursor-pointer">
                                ساهم
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </CardItem>
    )
}

const CreateGoal = () => {
    const [newGoal, setNewGoal] = React.useState({ title: '', description: '' })
    const onChange = e => {
        setNewGoal({ ...newGoal, [e.target.name]: e.target.value })
    }
    const { send, errors } = useSubmit()
    const router = useRouter()
    const createGoal = () => {
        send({
            url: '/api/goals',
            payload: {
                ...newGoal,
                project_id: router.query.projectID,
            },
            onSuccess: () => {
                router.replace(router.asPath)
                setNewGoal({ title: '', description: '' })
            },
        })
    }
    return (
        <div>
            {newGoal.title == '' ? (
                <div
                    className="bg-neutral-100 border border-neutral-300 p-4 rounded-md w-fit mb-1 text-primary-text/80 hover:bg-primary hover:text-white transition duration-150 cursor-pointer"
                    onClick={() => setNewGoal({ ...newGoal, title: ' ' })}>
                    <PlusIcon />
                </div>
            ) : (
                <div
                    className="bg-neutral-100 border border-neutral-300 px-2 py-1 mb-4 rounded-md w-fit text-primary-text/80 hover:bg-primary hover:text-white transition duration-150 cursor-pointer text-xs "
                    onClick={() => setNewGoal({ title: '', description: '' })}>
                    الغاء
                </div>
            )}
            <Card
                className={`${
                    newGoal.title == ''
                        ? 'scale-0 translate-y-0 '
                        : 'scale-1 translate-y-1  '
                } transition-all duration-75`}>
                <Card.CardHeader>
                    <div className="flex flex-col">
                        <Label>اسم الهدف</Label>
                        <Input
                            type="text"
                            name="title"
                            value={newGoal.title}
                            onChange={onChange}
                            className="text-primary-text bg-[#ffffff]  mb-2  bg-opacity-70  outline-none border border-slate-200 text-xs "
                        />
                        <Label>وصف الهدف</Label>
                        <TextArea
                            name="description"
                            value={newGoal.description}
                            onChange={onChange}
                        />
                    </div>

                    <Button className="mt-4 text-xs" onClick={createGoal}>
                        إضافة
                    </Button>
                </Card.CardHeader>
            </Card>
        </div>
    )
}
