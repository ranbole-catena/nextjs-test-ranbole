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
  title: "Online Gambling USA 2023 - Best Legal Gambling Sites",
  description: "home page blog dess",
  openGraph: {
    images: ["/some-specific-page-image.jpg"],
    locale: "en_US",
  },
  viewport: "width=device-width, initial-scale=1",
  charset: "UTF-8",
  twitter: {
    site: "Play USA",
    creator: "admin",
    title: "Legal US Online Gambling",
    description:
      "USA Online Gambling We only list legal gambling sites that are in compliance with state gambling laws Welcome to PlayUSA! Legal gambling is exploding across the country, and it can be difficult to manage all the opportunities happening near you. This site provides you with the latest news, reviews and information on states that permit [&hellip;]",
  },
};

// <meta name="twitter:card" content="summary_large_image">
// 		<meta name="twitter:site" content="Play USA">
// 		<meta name="twitter:creator" content="admin">
// 		<meta name="twitter:title" content="Legal US Online Gambling">
// 		<meta name="twitter:description" content="USA Online Gambling We only list legal gambling sites that are in compliance with state gambling laws Welcome to PlayUSA! Legal gambling is exploding across the country, and it can be difficult to manage all the opportunities happening near you. This site provides you with the latest news, reviews and information on states that permit [&hellip;]">
// 		<meta name="twitter:image" content="https://www.playusa.com/wp-includes/images/media/default.png"></meta>

// export async function generateMetadata({ params, searchParams }, parent) {
//   // read route params
//   const id = params.id;

//   // fetch data
//   //const product = await fetch(`https://.../${id}`).then((res) => res.json())

//   // optionally access and extend (rather than replace) parent metadata
//   const previousImages = (await parent).openGraph?.images || [];

//   return {
//     title: "Online Gambling USA 2023 - Best Legal Gambling Sites",
//     description: "home page blog dess",
//     openGraph: {
//       images: ["/some-specific-page-image.jpg", ...previousImages],
//     },
//   };
// }

export default async function Home() {
  const posts = await getData();
  console.log("posts", posts);
  return (
    <>
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
