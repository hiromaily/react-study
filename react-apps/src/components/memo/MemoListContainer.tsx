import { ChangeEvent, useState, useCallback, FC } from 'react'
import styled from 'styled-components'
import { MemoList } from './MemoList'
import { useMemoList } from '../../hooks/useMemoList'

export const MemoListContainer: FC = () => {
  // custom hook
  const { memos, addTodo, deleteTodo } = useMemoList()

  // state for text box
  const [text, setText] = useState<string>('')

  // textbox change event
  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)

  // click add event
  const onClickAdd = () => {
    if (text === '') return

    addTodo(text)

    setText('')
  }

  // click delete event
  const onClickDeleteBase = (index: number) => {
    deleteTodo(index)
  }
  const onClickDelete = useCallback(onClickDeleteBase, [deleteTodo])

  return (
    <div>
      <h1>Simple Memo App</h1>
      <input type='text' value={text} onChange={onChangeText} />
      <SButton onClick={onClickAdd}>Add</SButton>
      <MemoList memos={memos} onClickDelete={onClickDelete} />
    </div>
  )
}

const SButton = styled.button`
  margin-left: 16px;
`
