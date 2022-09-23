import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import matter from 'gray-matter'
import { ParsedUrlQuery } from 'node:querystring'
import { getBlogSlugs } from '../../libs/blog'
import Style from '../styles/blog.module.css'

const BlogContent: NextPage = () => {
  return (
    <>
      <h1 className={Style.h1Text}>Blog Conent</h1>
    </>
  )
}

export default BlogContent

export const getStaticPaths: GetStaticPaths<ParsedUrlQuery> = async () => {
  console.log('getStaticPaths')

  const slugs = getBlogSlugs()

  return {
    paths: slugs,
    fallback: false, // to show 404 page
  }
}

// set data into props
// this logic is not run in browser
export const getStaticProps: GetStaticProps<any, ParsedUrlQuery> = async ({ params }) => {
  console.log('getStaticProps')

  // get single blog
  console.log(params)
  //const { slug } = 'hoge'
  const data = await import(`../../../data/${params}.md`)
  const singleDocument = matter(data.default)
  console.log(singleDocument)

  return {
    props: {},
  }
}
