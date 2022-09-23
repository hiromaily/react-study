import matter from 'gray-matter'

interface Context {
  [x: string]: any
}

type Value = {
  default: any
}

export type DocumentData = {
  id: string
  title: string
  date: string
  image: string
  excerpt: string
}

type Document = {
  content: string
  data: DocumentData
  isEmpty: boolean
  excerpt: string
  orig: Buffer
}
//=> matter.GrayMatterFile

export type BlogData = {
  frontmatter: DocumentData
  slug: string
}

const getBlogs = (): BlogData[] => {
  //const getBlogs = async (): Promise<BlogData[]> => {
  const context: Context = {}
  //const ctx = require.context('../../data', true, /\.md$/);
  const ctx = require.context('../../data', true, /^(?!data).*$/)

  const keys = ctx.keys()
  const values = keys.map(ctx) as Value[]

  const blogs = keys.map((key, index) => {
    const slug = key.replace(/^.*[\\\/]/, '').slice(0, -3) // file name except extension e.g. blog01
    const value: Value = values[index]
    const document: any = matter(value.default)

    //TODO: 型変換できるかどうか (TypeGuard)

    return {
      frontmatter: document.data,
      slug: slug,
    }
  })
  const sorted = blogs.sort((a, b) => {
    return b.frontmatter.id - a.frontmatter.id
  })

  return sorted
}

const getBlogSlugs = (): string[] => {
  const context: Context = {}
  const ctx = require.context('../../data', true, /^(?!data).*$/)

  const keys = ctx.keys()

  const blogs = keys.map((key, index) => {
    const slug = key.replace(/^.*[\\\/]/, '').slice(0, -3) // file name except extension e.g. blog01
    return `/blog/${slug}`
  })

  return blogs
}

// const isDocument = (arg: unknown): arg is Document =>
//   typeof arg === "object" &&
//   arg !== null &&
//   // as Target で型の予測を効かせて typo を防ぐ
//   typeof (arg as Document).content === "string" &&
//   typeof (arg as Document).data === "object";

export { getBlogs, getBlogSlugs }
