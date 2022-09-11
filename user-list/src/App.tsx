import { ListItem } from './components/ListItem'
import type { User } from './types/user'
import { useFetchUsers } from './hooks/useFetchUsers'

export const App = () => {
  // 取得したユーザー情報
  // const [users, setUsers] = useState<User[]>([]);

  // 画面表示時にユーザー情報取得
  // ※実際にはこのエンドポイントは存在しないので注意
  // useEffect(() => {
  //   axios.get<User[]>("https://example.com/users").then((res) => {
  //     setUsers(res.data);
  //   });
  // }, []);
  const { userList, isLoading, isError, onClickFetchUser } = useFetchUsers()
  console.log('userList:')
  console.log(userList[0])

  return (
    <div>
      <button onClick={onClickFetchUser}>ユーザー取得</button>
      {/* エラーの場合はエラーメッセージを表示 */}
      {isError && <p style={{ color: 'red' }}>エラーが発生しました</p>}
      {/* ローディング中は表示を切り替える */}{' '}
      {isLoading ? (
        <p>データ取得中です</p>
      ) : (
        userList.map((user: User, index: number) => (
          <ListItem
            key={index}
            id={user.id}
            name={user.name}
            age={user.age}
            personalColor={user.personalColor}
            hobbies={user.hobbies}
          />
        ))
      )}
    </div>
  )
}
