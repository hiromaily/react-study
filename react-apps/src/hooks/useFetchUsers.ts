import axios from 'axios'
import { useState } from 'react'
import type { User } from '../types/user'

// ユーザー一覧を取得するカスタムフック
export const useFetchUsers = () => {
  const [userList, setUserList] = useState([] as User[])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  type FetchUsersResponse = {
    data: User[]
  }

  // ユーザー取得ボタン押下アクション
  const onClickFetchUser = () => {
    // ボタン押下時にローディングフラグon、エラーフラグoff
    setIsLoading(true)
    setIsError(false)

    // APIの実行
    // TODO: cache
    axios
      .get('http://127.0.0.1:8887/userList.json')
      .then((result: FetchUsersResponse) => {
        // 苗字と名前を結合するように変換
        const users = result.data.map((user: User) => ({
          id: user.id,
          name: user.name,
          age: user.age,
          personalColor: user.personalColor,
        }))
        // ユーザー一覧Stateを更新
        setUserList(users)
      })
      // エラーの場合はエラーフラグをon
      .catch(() => setIsError(true))
      // 処理完了後はローディングフラグをoff
      .finally(() => setIsLoading(false))
  }

  // まとめて返却したいのでオブジェクトに設定する
  return { userList, isLoading, isError, onClickFetchUser }
}
