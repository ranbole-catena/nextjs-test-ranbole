import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const HomePage = dynamic(() => {
  const theme = process.env.THEME;
  const path = `../themes/${theme}/home_page`;
  console.log('path');
  if (theme == 'black') {
    return import(`./themes/black/home_page`)
  } else if (theme == 'white') {
    return import(`./themes/white/home_page`)
  } else {
    return import(`./themes/black/home_page`)
  }

}, {
  loading: () => <p>Loading...</p>,
})

export default async function Home() {
  const posts = await getData();
  console.log('posts', posts);
  return (
    <>
      <Head>
        <title>Title page</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <HomePage posts={posts} />
    </>
  )
}


async function getData() {

  const res = await fetch(`${process.env.API_EP}/api/blogs`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  //console.log('res', res)
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

