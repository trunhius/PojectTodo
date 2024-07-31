import autoAnimate from '@formkit/auto-animate'
import { useEffect } from 'react'

import { api } from '@/utils/client/api'

import { TodoItem } from './TodolistItem'
/**
 * QUESTION 3:
 * -----------
 * A todo has 2 statuses: "pending" and "completed"
 *  - "pending" state is represented by an unchecked checkbox
 *  - "completed" state is represented by a checked checkbox, darker background,
 *    and a line-through text
 *
 * We have 2 backend apis:
 *  - (1) api.todo.getAll       -> a query to get all todos
 *  - (2) api.todoStatus.update -> a mutation to update a todo's status
 *
 * Example usage for (1) is right below inside the TodoList component. For (2),
 * you can find similar usage (api.todo.create) in src/client/components/CreateTodoForm.tsx
 *
 * If you use VSCode as your editor , you should have intellisense for the apis'
 * input. If not, you can find their signatures in:
 *  - (1) src/server/api/routers/todo-router.ts
 *  - (2) src/server/api/routers/todo-status-router.ts
 *
 * Your tasks are:
 *  - Use TRPC to connect the todos' statuses to the backend apis
 *  - Style each todo item to reflect its status base on the design on Figma
 *
 * Documentation references:
 *  - https://trpc.io/docs/client/react/useQuery
 *  - https://trpc.io/docs/client/react/useMutation
 *
 *
 *
 *
 *
 * QUESTION 4:
 * -----------
 * Implement UI to delete a todo. The UI should look like the design on Figma
 *
 * The backend api to delete a todo is api.todo.delete. You can find the api
 * signature in src/server/api/routers/todo-router.ts
 *
 * NOTES:
 *  - Use the XMarkIcon component below for the delete icon button. Note that
 *  the icon button should be accessible
 *  - deleted todo should be removed from the UI without page refresh
 *
 * Documentation references:
 *  - https://www.sarasoueidan.com/blog/accessible-icon-buttons
 *
 *
 *
 *
 *
 * QUESTION 5:
 * -----------
 * Animate your todo list using @formkit/auto-animate package
 *
 * Documentation references:
 *  - https://auto-animate.formkit.com
 */
interface TodoListProps {
  filter?: 'completed' | 'pending' | 'all'
}

export function TodoList({ filter }: TodoListProps) {
  const { data: todos = [] } = api.todo.getAll.useQuery({
    statuses:
      filter === 'pending'
        ? ['pending']
        : filter === 'completed'
        ? ['completed']
        : ['pending', 'completed'],
  })

  useEffect(() => {
    const parentElement: Element | null = document.querySelector('.grid-cols-1')

    todos.forEach(() => {
      if (parentElement instanceof HTMLElement) {
        autoAnimate(parentElement, (el, action) => {
          let keyframes
          if (action === 'add') {
            keyframes = [
              { transform: 'scale(0)', opacity: 0 },
              { transform: 'scale(1.15)', opacity: 1, offset: 0.75 },
              { transform: 'scale(1)', opacity: 1 },
            ]
          }
          if (action === 'remove') {
            keyframes = [
              { transform: 'scale(1)', opacity: 1 },
              { transform: 'scale(0.75)', opacity: 0.1, offset: 0.5 },
              { transform: 'scale(0)', opacity: 0 },
            ]
          }
          return new KeyframeEffect(el, keyframes as Keyframe[], {
            duration: 600,
            easing: 'ease-out',
          })
        })
      }
    })
  }, [todos])
  return (
    <ul className="mt-10 grid grid-cols-1 gap-y-3">
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  )
}
