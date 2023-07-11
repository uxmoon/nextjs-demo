import Link from 'next/link'
const article = ({ article }) => {
  return (
    <>
      <h1>{article.title}</h1>
      <p>{article.body}</p>
      <br />
      <Link href='/'>Go back</Link>
    </>
  )
}

// export const getServerSideProps = async (context) => {
export const getStaticProps = async (context) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
  )
  const article = await res.json()
  return {
    props: {
      article,
    },
  }
}

export const getStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/')
  const articles = await res.json()
  const ids = articles.map((article) => article.id)
  const paths = ids.map((id) => ({ params: { id: id.toString() } }))
  return {
    // paths: {params: {id: '1', id: '2'}}
    paths,
    fallback: false,
  }
}

export default article
