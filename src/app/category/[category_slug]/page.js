import dynamic from "next/dynamic";
import { connect } from "@planetscale/database";
import { kv } from "@vercel/kv";

const CategoryPage = dynamic(
  () => {
    const theme = process.env.THEME;
    console.log("path");
    if (theme == "black") {
      return import(`../../themes/black/category_page`);
    } else if (theme == "white") {
      return import(`../../themes/white/category_page`);
    } else {
      return import(`../../themes/black/category_page`);
    }
  },
  {
    loading: () => <p>Loading...</p>,
  },
);

export default async function Page({ params }) {
  const data = await getData(params.category_slug);
  //const data = {};
  console.log("data", data);

  const news = [
    {
      img: "https://www.playusa.com/wp-content/uploads/2023/09/Exterior-View-of-New-York-New-York-hotel-casino-In-Las-Vegas-80x80.jpg",
      img_large:
        "https://www.playusa.com/wp-content/uploads/2023/09/Exterior-View-of-New-York-New-York-hotel-casino-In-Las-Vegas-300x180.jpg",
      title: "Las Vegas News, Rumors, And Shows In September 2023",
      date: "September 1, 2023",
    },
    {
      img: "https://www.playusa.com/wp-content/uploads/2023/09/Ohio-Casino-Sports-Gambling-Revenue-Increases-in-July-150x150.jpg",
      img_large:
        "https://www.playusa.com/wp-content/uploads/2023/09/Ohio-Casino-Sports-Gambling-Revenue-Increases-in-July-300x180.jpg",
      title: "Ohio Casino Revenue Led By Hollywood Columbus Casino In July",
      date: "September 1, 2023",
    },
    {
      img: "https://www.playusa.com/wp-content/uploads/2023/09/Broken-Record-With-Cash-Background-150x150.jpg",
      img_large:
        "https://www.playusa.com/wp-content/uploads/2023/09/Broken-Record-With-Cash-Background-300x180.jpg",
      title: "Virginia Lottery Sees Record Fiscal Year 2023 Sales And Profits",
      date: "September 1, 2023",
    },
  ];

  return <CategoryPage data={data} news={news}></CategoryPage>;
}

// SSR
async function getData(slug) {
  console.log("getdatalol");

  //const res = await fetch(`${process.env.API_EP}/api/blogs/${userId}`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  // Recommendation: handle errors
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error("Failed to fetch data");
  // }

  // return res.json();

  // const kv_key = `blog_${id}`;
  // let data = await kv.get(kv_key);

  let data = [];
  // if (true) {
  const config = {
    url: process.env["DATABASE_URL"],
  };

  const conn = await connect(config);

  const results = await conn.execute(
    "select p.*, u.name as author_name from posts p JOIN category_post cp on p.id = cp.post_id JOIN categories c on cp.category_id = c.id JOIN users u on u.id = p.author_id WHERE c.slug = 'nj'",
    [slug],
  );

  //console.log("cat results", results);

  // const results = await conn.execute(
  //   "SELECT p.*, GROUP_CONCAT ( c.name ) as 'categories', GROUP_CONCAT ( c.slug ) as 'category_slugs', u.name as 'author_name', u.email as 'author_email' FROM posts p LEFT JOIN category_post cp on p.id = cp.post_id LEFT JOIN categories c ON cp.category_id = c.id LEFT JOIN users u on p.author_id = u.id where p.id = 1 group by p.id",
  //   [id],
  // );

  data = results.rows;
  //await kv.set(kv_key, data, { ex: 3600, nx: true });

  // }

  console.log("category data", data);

  return data;
}
