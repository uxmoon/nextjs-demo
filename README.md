# Next Js Crash Course

Notes from [Next.js Crash Course](https://www.youtube.com/watch?v=mTz0GXj8NN0) from [Traversy Media](https://www.youtube.com/@TraversyMedia) YouTube channel.

:rocket: [View Demo](https://nextjs-demo-j7vn5ggfj-uxmoon.vercel.app/)

## Requirements

You should know React and be familiar with:

- Creating components
- Using Jsx
- Passing props
- Using state

You should have install:

- `Node.js` al least version 16.8 or later

---

# What is Next.js?

Next is a React frontend development web framework created by **Vercel** that enables functionality such as SSR and SSG.

## SSR

Unlike a client side framework, Next.js is optimized for SEO and performance. Also you get client side routing

## Benefits

- **Easy page routing**, create a file for a **page** and put it in the `pages` folder and that page will be automatically rendered.
- **API Routes**, create API routes within the next file structure. You can use other backends.
- **TypeScript** and **Sass**, out of the box.
- **SSG**, export static website
- **Easy deployment**, developed and hosted in **Vercel** or any node.js hosting

---

# Usage

Version 13

`npx create-next-app@latest`

Version 12

`npx create-next-app@12 app-name && cd app-name && npm i next@12`

## Scripts

- `dev` run development
- `build` generate build ready for production
- `start` generate build and run in local env

---

# Folder and files

- `public` static files, images, styles, icons
- `styles` global styles and specific css file for pages and components, e.g. `Page.module.css`
    - Can’t import global styles in pages or components
    - `import styles from '../styles/Home.module.css`
- `pages` routing system, put pages inside the pages folder. The filename is the same for the url. e.g. `pages/about.js` ⇒ [`http://localhost:3000/about`](http://localhost:3000/about)
- `pages/_app.js` Wraps around all of your page components. You can add a layout, show a header, footer, etc.
    - **Lowercase** for pages file name.

---

# Layout and CSS modules

To display a layout around, create a new layout file and import in `pages/_app.js`

- `components/Layout.js` **Pascal case** for components file name.
    - Create as `rafce` and add `children` as a prop

```tsx
// components/Layout.js
import styles from '../styles/Layout.module.css'

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>{children}</main>
    </div>
  )
}

export default Layout

// pages/_app.js
import Layout from '../components/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
```

---

# Components

As the same in React, all components should have a single parent element.

## Head

`import Head from 'next/head'`

The component to add title and meta tags, the same way as in an HTML file.

---

# Navigation and links

- `styles/Nav.module.css`
- `components/Nav.js`
- In the component `import Link from 'next/link'` for anchor tags, add links for Home and About

```tsx
import Link from 'next/link'
import styles from '../styles/Nav.module.css'
const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/about'>About</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
```

- Import `Nav` component into `Layout.js` just before the `.container`div tag.

---

# Custom document

Augment `body` and `html` tags.

Resource:

[Routing: Custom Document](https://nextjs.org/docs/pages/building-your-application/routing/custom-document)

---

# Fetch data

- `getStaticProps`, allow to fetch at build time
- `getServerSideProps`, allow to fetch on every request (slow)
- `getStaticPaths`, dynamic generate paths based on the data we’re fetching

## Usage

Can be used at the top or bottom of the file.

```tsx
export const getStaticProps = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6`)
  const articles = await res.json()
	// return props object
  return {
    props: {
      articles,
    },
  }
}
```

Return a props object and the data we want to pass.

---

# Nested routing

- Create files and folders structure
    - `pages/article/[id]/index.js`

```tsx
// index.js, base code to fix 404 page
const article = () => {
	return <p>This is an article</p>
}
export default article
```

Use data fecthing method that NextJs provide to pages

- `getServerSideProps` fetch the data at the time of request, rather than `getStaticProps` that fetch at build time
- Can get pass in a `context` to get the id of the url `context.params.id`
- Return an object with props

```tsx
export const getServerSideProps = async (context) => {
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
```

## getStaticProps and getStaticPaths

Dynamic generate the path with the data

```tsx
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

// Get all posts
export const getStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/')
  const articles = await res.json()

	// generate paths structure
  const ids = articles.map((article) => article.id)
  const paths = ids.map((id) => ({ params: { id: id.toString() } }))

  return {
    // paths: {params: {id: '1', id: '2'}}
    paths,
    fallback: false,
  }
}
```

---

# Generate static website

Edit `package.json` and edit `build` script to add `next export`

```json
"scripts": {
    "build": "next build && next export",
```

- Run `npm run build` to generate the static `out` folder
- Run `serve -s out -p 8000`
    - Requirement `npm i -g serve`

---

# API routes

Create API routes, a function that take a **request** and a **response.**

Respond with a specific status code and respond with a specific data.

Similar to Express, any backend REST API.

## Files and folders

Create a new `data.js` file in the root folder for the data.

Create as many files as you need based on the functions required: Get all posts, Get a single post.

- `pages/api/articles/index.js`
- `pages/api/articles/[id].js`

```tsx
// index.js get all posts
import { articles } from '../../../data'

export default function handler(req, res) {
  res.status(200).json(articles)
}
```

All posts are accessible from [`http://localhost:3000/api/articles/`](http://localhost:3000/api/articles/4)

```tsx
// [id].js
import { articles } from '../../../data'

export default function handler({ query: { id } }, res) {
  const filtered = articles.filter((article) => article.id === id)

  if (filtered.length > 0) {
    res.status(200).json(filtered[0])
  } else {
    res
      .status(404)
      .json({ message: `Article with the id of ${id} is not found.` })
  }
}
```

Access a single post from [`http://localhost:3000/api/articles/1`](http://localhost:3000/api/articles/4)

## Use routes

<aside>
💡 Only absolute URLs are supported, need to create a config file.

</aside>

- `root/config/index.js`

```tsx
const dev = process.env.NODE_ENV !== 'production'
export const server = dev ? 'http://localhost:3000' : 'https://yourwebsite.com'
```

And then import to `pages/index.js` as **server**.

```tsx
// pages/index.js
import { server } from '../config'
...

// fetch from local API
export const getStaticProps = async () => {
  const res = await fetch(`${server}/api/articles`)
  const articles = await res.json()
  return {
    props: {
      articles,
    },
  }
}
```

---
# Meta component

Create a new `Meta` component to use for all pages and update title, description where needed.

[Meta component](https://github.com/uxmoon/nextjs-demo/blob/main/components/Meta.js)