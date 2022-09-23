import type { NextPage } from 'next'
import Link from 'next/link'
import { getBlogs } from '../libs/blog'
import type { BlogData } from '../libs/blog'
import Style from '../styles/blog.module.css'

type BlogProps = {
  blogs: BlogData[]
}

const Blog: NextPage<BlogProps> = (props) => {
  const { blogs } = props
  console.log(blogs)

  return (
    <div>
      <h1 className={Style.h1Text}>Blog!</h1>
      {blogs.map((blog, index) => (
        <div key={index}>
          <h3>{blog.frontmatter.title}</h3>
          <p>{blog.frontmatter.date}</p>
          <Link href={`/blog/${blog.slug}`}>
            <a>Read More</a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Blog

// set data into props
// this logic is not run in browser
export async function getStaticProps() {
  console.log('getStaticProps')

  // get blogs
  const blogs = getBlogs()

  return {
    //props: JSON.parse(JSON.stringify(blogs)),
    props: { blogs: blogs },
  }
}
