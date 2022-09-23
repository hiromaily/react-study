import type { NextPage } from 'next'
import Link from 'next/link'
import Style from '../styles/index.module.css'

const Index: NextPage = () => {
  return (
    <>
      <h1 className={Style.h1Text}>Hello!</h1>
      <ul>
        <li>
          <Link href='/blog'>
            <a>To Blog</a>
          </Link>
        </li>
        <li>
          <Link href='/contact'>
            <a>To Contact</a>
          </Link>
        </li>
      </ul>
    </>
  )
}

export default Index
