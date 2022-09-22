import type { NextPage } from 'next'
import Link from 'next/link'
import matter from 'gray-matter'
import Style from '../styles/blog.module.css'

type BlogProps = {
  blogs: BlogData[],
}

type BlogData = {
  frontmatter: Data,
  slug: string
}

const Blog: NextPage = (props: BlogProps) => {
  const { blogs } = props
  console.log(blogs)

  return (
    <div>
      <h1 className={Style.h1Text}>Blog!</h1>
      {blogs.map((blog, index) =>
        <div key={index}>
          <h3>{blog.frontmatter.title}</h3>
          <p>{blog.frontmatter.date}</p>
          <Link href={`/blog/${blog.slug}`}><a>Read More</a></Link>
        </div>
      )}
    </div>
  )
}

export default Blog

// FIXME: 分離して記述する

interface Context {
  [x: string]: any;
};

type Value = {
  default: any;
};

type Data = {
  id: string;
  title: string;
  date: string;
  image: string;
  excerpt: string
}

type Document = {
  content: string;
  data: Data;
  isEmpty: boolean;
  excerpt: string;
  orig: Buffer;
}
//=> matter.GrayMatterFile

// set data into props
// this logic is not run in browser
export async function getStaticProps() {
  console.log('getStaticProps')
  // require.context is webpack functionality
  const context: Context = {};
  //const ctx = require.context('../../data', true, /\.md$/);
  const ctx = require.context('../../data', true, /^(?!data).*$/);

  const keys = ctx.keys()
  const values = keys.map(ctx) as Value[]

  const blogs = keys.map((key, index) => {
    let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3) // file name except extension e.g. blog01
    const value: Value = values[index]
    const document: any = matter(value.default)

    //TODO: 型変換できるかどうか (TypeGuard)

    return {
      frontmatter: document.data,
      slug: slug
    }
  })

  return {
    //props: JSON.parse(JSON.stringify(blogs)),
    props: { blogs: blogs },
  }
}

// const isDocument = (arg: unknown): arg is Document =>
//   typeof arg === "object" &&
//   arg !== null &&
//   // as Target で型の予測を効かせて typo を防ぐ
//   typeof (arg as Document).content === "string" &&
//   typeof (arg as Document).data === "object";