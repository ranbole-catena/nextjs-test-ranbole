import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Head from "next/head";

const HomePage = dynamic(
  () => {
    const theme = process.env.THEME;
    const path = `../themes/${theme}/home_page`;
    console.log("path");
    if (theme == "black") {
      return import(`./themes/black/home_page`);
    } else if (theme == "white") {
      return import(`./themes/white/home_page`);
    } else {
      return import(`./themes/black/home_page`);
    }
  },
  {
    loading: () => <p>Loading...</p>,
  },
);

export const metadata = {
  title: "Home page blog",
  description: "home page blog dess",
};

export default async function Home() {
  const posts = await getData();
  console.log("posts", posts);
  return (
    <>
      <Head>
        <title>Title page</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <HomePage posts={posts} />
    </>
  );
}

async function getData() {
  // const res = await fetch(`${process.env.API_EP}/api/blogs`);
  // // The return value is *not* serialized
  // // You can return Date, Map, Set, etc.

  // //console.log('res', res)
  // // Recommendation: handle errors
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data');
  // }

  // return res.json();

  return [
    {
      img: "https://www.playusa.com/wp-content/uploads/2023/08/racing-louisville-soccer-match-nwsl-150x150.jpeg",
      title:
        "Tentative Kentucky Sports Wagering Catalog Has Some Glaring Omissions",
      date: "August 31, 2023",
    },
    {
      img: "https://www.playusa.com/wp-content/uploads/2023/08/Excited-Pin-Up-Woman-Looks-At-Mobile-Phone-150x150.jpg",
      title: "Bally’s To Offer Live Online Casino Games By Pragmatic Play",
      date: "August 31, 2023",
    },
    {
      img: "https://www.playusa.com/wp-content/uploads/2023/08/playing-card-symbols-walkers-bluff-casino-150x150.jpeg",
      title: "Walker’s Bluff Casino Begins Welcoming Southern Illinois Guests",
      date: "August 31, 2023",
    },
  ];
}
