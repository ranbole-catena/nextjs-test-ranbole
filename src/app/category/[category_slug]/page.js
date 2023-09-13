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

  return <CategoryPage data={data}></CategoryPage>;
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
