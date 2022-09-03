import { useAuth } from '../../hooks/useAuth'
import Button from '../Button'
import Card from './Card'

export const AddComment = () => {
    const { user } = useAuth({})
    if (!user) return null
    return (
        <Card className="mt-5">
            <Card.CardHeader>أضف تعليق</Card.CardHeader>
            <div className="p-5">
                <div className="relative">
                    <textarea
                        id="description"
                        value={'formState.description'}
                        className="block mt-1 w-full
                                    px-4 py-5 text-accent placeholder-accent text-right rounded-lg border-2  border-slate-200 bg-neutral-100  focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50
                                    "
                        onChange={e => {}}
                        rows={5}
                        required
                        maxLength={255}
                        autoComplete="off"></textarea>
                    <div className="absolute bottom-2 left-1 text-xs opacity-50">
                        5/255
                    </div>
                </div>
                <Button className="mt-5 text-xs">أضف تعليق</Button>
            </div>
        </Card>
    )
}
