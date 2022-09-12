import { FC } from 'react'
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Top from '../pages/Top'
import Page1 from '../pages/Page1'
import Page2 from '../pages/Page2'
import Page3 from '../pages/Page3'

const drawerWidth = 240

export const Router: FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            React Apps Demo
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant='permanent'
          anchor='left'
        >
          <Toolbar />
          <Divider />
          <List>
            <ListItem button key='top' component={Link} to={'/'}>
              <ListItemText primary='Top' />
            </ListItem>
            <ListItem button key='page1' component={Link} to={'/page1'}>
              <ListItemText primary='Page1: LoginForm' />
            </ListItem>
            <ListItem button key='page2' component={Link} to={'/page2'}>
              <ListItemText primary='Page2: UserList API' />
            </ListItem>
            <ListItem button key='page3' component={Link} to={'/page3'}>
              <ListItemText primary='Page3: MemoList' />
            </ListItem>
          </List>
        </Drawer>
        <Box component='main' sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
          <Toolbar />
          <>
            <Routes>
              <Route index element={<Top />} />
              <Route path='/' element={<Top />} />
              <Route path='page1' element={<Page1 />} />
              <Route path='page2' element={<Page2 />} />
              <Route path='page3' element={<Page3 />} />
            </Routes>
          </>
        </Box>
      </BrowserRouter>
    </Box>
  )
}
