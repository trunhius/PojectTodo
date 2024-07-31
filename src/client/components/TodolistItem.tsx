import type { SVGProps } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'

import { api } from '@/utils/client/api'

// một đối tượng Todo
interface Todo {
  id: number
  body: string
  status: 'pending' | 'completed'
}

export const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const utils = api.useContext()

  const updateStatusMutation = api.todoStatus.update.useMutation({
    onSuccess: () => {
      utils.todo.getAll.invalidate()
    },
  })

  const handleChange = () => {
    updateStatusMutation.mutate({
      todoId: todo.id,
      status: todo.status === 'completed' ? 'pending' : 'completed',
    })
  }

  const deleteTodoMutation = api.todo.delete.useMutation({
    onSuccess: () => {
      utils.todo.getAll.invalidate()
    },
  })

  const handleDelete = () => {
    // if (window.confirm(`Are you sure you want to delete "${todo.body}"?`)) {
    //   deleteTodoMutation.mutate({ id: todo.id })
    // }
    deleteTodoMutation.mutate({ id: todo.id })
  }

  return (
    <div
      className={`relative flex items-center rounded-12 border border-gray-200 px-4 py-3 shadow-sm ${
        todo.status === 'completed' ? 'bg-gray-100 line-through' : ''
      }`}
    >
      <Checkbox.Root
        checked={todo.status === 'completed'}
        onCheckedChange={handleChange}
        className="flex h-6 w-6 items-center justify-center rounded-6 border border-gray-300 hover:border-gray-700 focus:outline-none"
      >
        <Checkbox.Indicator className="">
          {todo.status === 'completed' && (
            <CheckIcon className="h-full w-full bg-gray-700 text-white" />
          )}
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label className="block pl-3 font-medium" htmlFor={String(todo.id)}>
        {todo.body}
      </label>
      <button
        className="absolute end-1 flex h-8 w-8 items-center justify-center hover:text-gray-900"
        onClick={handleDelete}
      >
        <XMarkIcon className="h-6 w-6" />
      </button>
    </div>
  )
}

const XMarkIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
}

const CheckIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  )
}
