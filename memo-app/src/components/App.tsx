import { ChangeEvent, useState, useCallback, FC } from 'react'
import styled from 'styled-components'
import { MemoList } from './MemoList'
import { useMemoList } from '../hooks/useMemoList'
// import './App.css';

export const App: FC = () => {
  // custom hook
  const { memos, addTodo, deleteTodo } = useMemoList()

  // state for text box
  const [text, setText] = useState<string>('')
  // state for memo list
  // const [memos, setMemos] = useState<string[]>([]);

  // textbox change event
  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)

  // click add event
  const onClickAdd = () => {
    if (text === '') return

    // const newMemos = [...memos];
    // newMemos.push(text);
    // setMemos(newMemos);
    addTodo(text)

    setText('')
  }

  // click delete event
  const onClickDeleteBase = (index: number) => {
    // const newMemos = [...memos];
    // newMemos.splice(index, 1);
    // setMemos(newMemos);
    deleteTodo(index)
  }
  // const onClickDelete = useCallback(onClickDeleteBase, [memos])
  const onClickDelete = useCallback(onClickDeleteBase, [deleteTodo])

  return (
    <div>
      <h1>Simple Memo App</h1>
      <input type='text' value={text} onChange={onChangeText} />
      <SButton onClick={onClickAdd}>Add</SButton>
      {/* component化 as MemoList */}
      <MemoList memos={memos} onClickDelete={onClickDelete} />
      {/*
      <SContainer>
        <p>Memo List</p>
        <ul>
          {memos.map((memo, index) => (
            <li key={memo}>
              <SMemoWrapper>
                <p>{memo}</p>
                <SButton onClick={() => onClickDelete(index)}>Delete</SButton>
              </SMemoWrapper>
            </li>
          ))}
        </ul>
      </SContainer>
      */}
    </div>
  )
}

const SButton = styled.button`
  margin-left: 16px;
`
// const SContainer = styled.div`
//   border: solid 1px #ccc;
//   padding: 16px;
//   margin: 8px;
// `;
// const SMemoWrapper = styled.div`
//   display: flex;
//   align-items: center;
// `;
