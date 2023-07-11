import Head from 'next/head'

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
      <meta charSet='utf-8' />
      <link rel='icon' href='favicon.ico' />
      <title>{title}</title>
    </Head>
  )
}

Meta.defaultProps = {
  title: 'Next.js Crash Course',
  keywords: 'Web development, React, programming',
  description:
    'A look at the fundamentals of Next.js such as SSR and SSG, routing, data fetching, apis and more',
}

export default Meta
