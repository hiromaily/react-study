import { useCallback, useState } from 'react'

// Define memo data, add memo function, delete memo function
export const useMemoList = () => {
  // state for memo list
  const [memos, setMemos] = useState<string[]>([])

  // add memo
  const addTodoBase = (text: string) => {
    const newMemos = [...memos]
    newMemos.push(text)
    setMemos(newMemos)
  }
  const addTodo = useCallback(addTodoBase, [memos])

  // delete memo
  const deleteTodoBase = (index: number) => {
    const newMemos = [...memos]
    newMemos.splice(index, 1)
    setMemos(newMemos)
  }
  const deleteTodo = useCallback(deleteTodoBase, [memos])

  return { memos, addTodo, deleteTodo }
}
