import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import Image from 'next/image'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import { ParsedUrlQuery } from 'node:querystring'
import { getBlogSlugs } from '../../libs/blog'
import type { DocumentData } from '../../libs/blog'
import Style from '../../styles/blog.module.css'

type BlogContentProps = {
  data: DocumentData
  body: string
}

const BlogContent: NextPage<BlogContentProps> = (props) => {
  const { data, body } = props

  return (
    <>
      <div>
        <Image src={data.image} alt="blog-image" height="500" width="1000"></Image>
      </div>
      <div>
        <h1 className={Style.h1Text}>{data.title}</h1>
        <p>{data.date}</p>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </>
  )
}

export default BlogContent

interface Params extends ParsedUrlQuery {
  slug: string
}

// getStaticProps run before getStaticProps
// getStaticPath need to be used with getStaticProps
export const getStaticPaths: GetStaticPaths<ParsedUrlQuery> = async () => {
  console.log('getStaticPaths')

  const slugs = getBlogSlugs()
  console.log(slugs)
  // [
  //   '/blog/blog01',
  //   '/blog/blog02',
  //   '/blog/blog03',
  //   '/blog/blog04',
  //   '/blog/blog05',
  //   '/blog/blog06'
  // ]

  // this info would be passed as below in getStaticProps

  // paths: [
  //   { params: { slug: '/blog/blog01' } },
  //   { params: { slug: '/blog/blog02' } }
  // ],
  return {
    paths: slugs, // pathsキーは、どのパスをPre-renderingするかを指定
    fallback: false, // to show 404 page when page is not found
  }
}

// set data into props
// this logic is not run in browser
export const getStaticProps: GetStaticProps<any, Params> = async ({ params }) => {
  console.log('getStaticProps')

  // params would be like { slug: 'blog06' }

  const data = await import(`../../../data/${params?.slug}.md`)
  const singleDocument = matter(data.default)
  console.log(singleDocument)
  // {
  //   content: '\nBlog Content 6',
  //   data: {
  //     id: '6',
  //     title: 'Title 06',
  //     date: '2022-09-22',
  //     image: '',
  //     excerpt: ''
  //   },
  //   isEmpty: false,
  //   excerpt: '',
  // }


  return {
    props: {
      data: singleDocument.data,
      body: singleDocument.content,
    },
  }
}
