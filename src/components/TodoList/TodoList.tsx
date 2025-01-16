import TodoInput from '../TodoInput'
import styles from './todolist.module.scss'
import { Todo } from '../../@types/todo.type'
import { useEffect, useMemo, useState } from 'react'
import TaskList from '../TaskList'

type HandleNewTodo = (todos: Todo[]) => Todo[]

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)
  const syncReactToLocal = (handleNewTodo: HandleNewTodo) => {
    const todoString = localStorage.getItem('todos')
    const todoObject = todoString ? JSON.parse(todoString) : []
    const newTodos = handleNewTodo(todoObject)
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }
  const doneTodos = useMemo(() => todos.filter((todo) => todo.completed), [todos])
  const notDoneTodos = useMemo(() => todos.filter((todo) => !todo.completed), [todos])

  useEffect(() => {
    const todoString = localStorage.getItem('todos')
    const todoObject = todoString ? JSON.parse(todoString) : []
    setTodos(todoObject)
  }, [])

  const addTodo = (todo: string) => {
    if (!todo) return
    //create new todo
    const newtodo: Todo = {
      id: new Date().getTime().toString(),
      name: todo,
      completed: false
    }
    //add new todo to todos
    setTodos((prev) => [...prev, newtodo])
    //save to local storage
    syncReactToLocal((todos) => [...todos, newtodo])
  }

  const editTodo = (todo: string) => {
    setCurrentTodo((prev) => {
      if (prev) return { ...prev, name: todo }
      return null
    })
  }

  const finishEdit = () => {
    const handler = (todoObj: Todo[]) => {
      const newTodos = todoObj.map((todo) => {
        if (todo.id === currentTodo?.id) {
          return currentTodo
        }
        return todo
      })
      return newTodos
    }
    setTodos(handler)
    syncReactToLocal(handler)
    setCurrentTodo(null)
  }

  const deleteTodo = (id: string) => {
    const handler = (todoObj: Todo[]) => {
      const newTodos = todoObj.filter((todo) => todo.id !== id)
      return newTodos
    }
    setTodos(handler)
    syncReactToLocal(handler)
  }
  const handleDoneTodo = (id: string) => {
    const handler = (todoObj: Todo[]) => {
      const newTodos = todoObj.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed }
        }
        return todo
      })
      return newTodos
    }
    setTodos(handler)
    syncReactToLocal(handler)
  }

  const startEditTodo = (id: string) => {
    const todo = todos.find((todo) => todo.id === id)
    setCurrentTodo(prev => todo || prev)
  }

  return (
    <div className={`${styles.todoList} shadow-box2`}>
      <h1>Todo App</h1>
      <TodoInput addTodo={addTodo} currentTodo={currentTodo} editTodo={editTodo} finishEdit={finishEdit} />
      <TaskList
        doneTaskList={false}
        deleteTodo={deleteTodo}
        changeTodoStatus={handleDoneTodo}
        todos={notDoneTodos}
        startEditTodo={startEditTodo}
      />
      <TaskList
        doneTaskList={true}
        deleteTodo={deleteTodo}
        changeTodoStatus={handleDoneTodo}
        todos={doneTodos}
        startEditTodo={startEditTodo}
      />
    </div>
  )
}

export default TodoList
