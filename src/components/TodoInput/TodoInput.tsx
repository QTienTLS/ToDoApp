import { useState } from 'react'
import { Todo } from '../../@types/todo.type'
import styles from './todoInput.module.scss'
import { Icon } from '@iconify/react'

interface TodoInputProps {
  addTodo: (todo: string) => void
  editTodo: (todo: string) => void
  currentTodo: Todo | null
  finishEdit: () => void
}

const TodoInput = (props: TodoInputProps) => {
  const { addTodo, editTodo, currentTodo, finishEdit } = props
  const [name, setName] = useState<string>('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentTodo) {
      finishEdit()
      if (name) setName('')
    } else {
      addTodo(name)
      setName('')
    }
  }
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (currentTodo) {
      editTodo(value)
    } else {
      setName(value)
    }
  }

  return (
    <div className='my-4'>
      <form onSubmit={handleSubmit}
      className='flex items-center justify-between gap-4'
      >
        <input
          type='text'
          className={styles.input}
          value={currentTodo?.name || name}
          onChange={handleChangeName}
          placeholder='Caption goes here'
        />
        <button type='submit' className={styles.button}>
          {currentTodo ? (
            <Icon icon="ic:round-check" />
          ): (
            <Icon icon="ic:round-plus" />
          )}
        </button>
      </form>
    </div>
  )
}

export default TodoInput
