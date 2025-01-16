import { Todo } from "../../@types/todo.type"
import styles from './taskList.module.scss'
import { Icon } from '@iconify/react'

interface TaskListProps {
  doneTaskList: boolean
  todos: Todo[]
  deleteTodo: (id: string) => void
  changeTodoStatus: (id: string) => void
  startEditTodo: (id: string) => void
}

const TaskList = (props: TaskListProps) => {
  const { doneTaskList, todos, deleteTodo, changeTodoStatus, startEditTodo } = props
  const handleCheckbox = (id: string) => {
    changeTodoStatus(id)
  }


  return (
    <div className="w-full px-4">
      <h2>{doneTaskList?'Đã hoàn thành':'Chưa hoàn thành'}</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center px-4 gap-2 mb-2">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={todo.completed}
              id={todo.id}
              onChange={() => handleCheckbox(todo.id)}
              />
            <label
              htmlFor={todo.id}
            className={`h-8 leading-8 flex-1 cursor-pointer ${todo.completed?'line-through text-gray-400':''}`}
            >{todo.name}</label>
            <button className={styles.button} onClick={() => startEditTodo(todo.id)}>
            <Icon icon="line-md:edit" className="text-blue-500" />
            </button>
            <button
            onClick={() => deleteTodo(todo.id)}
            className={styles.button}>
            <Icon icon="ic:twotone-delete" className="text-red-500" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;