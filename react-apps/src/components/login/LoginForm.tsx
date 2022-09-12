import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Button, TextField } from '@mui/material'

export const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Box>
      {/* フォームサブミット前に、handleSubmit が input
      コントロールの検証を行います。 */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '250px',
          margin: '3rem',
        }}
      >
        {/* register 関数を利用し、input コントロールを hook に登録します。 */}
        <TextField
          {...register('nameRequired', { required: true })}
          error={!!errors.nameRequired}
          id='name'
          label='Name'
          variant='outlined'
          helperText={!!errors.nameRequired && 'Input your name'}
          style={{
            marginBottom: '1rem',
          }}
        />
        <TextField
          {...register('passwordRequired', { required: true })}
          error={!!errors.passwordRequired}
          id='password'
          label='Password'
          variant='outlined'
          type='password'
          helperText={!!errors.passwordRequired && 'Input your password'}
          style={{
            marginBottom: '1rem',
          }}
        />
        <Button variant='contained' color='primary' type='submit'>
          Submit
        </Button>
      </form>
    </Box>
  )
}
