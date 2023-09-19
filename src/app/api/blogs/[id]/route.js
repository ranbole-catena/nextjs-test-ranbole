import { NextResponse } from "next/server";
import { connect } from "@planetscale/database";
import { kv } from "@vercel/kv";

export async function GET(request, { params }) {
  //console.log("request", request);
  const id = params.id;

  const kv_key = `blog_${id}`;
  //let data = await kv.get(kv_key);
  let data = {};
  if (true) {
    const config = {
      url: process.env["DATABASE_URL"],
    };

    const conn = await connect(config);

    const results = await conn.execute(
      "SELECT p.*, GROUP_CONCAT ( c.name ) as 'categories', GROUP_CONCAT ( c.slug ) as 'category_slugs', u.name as 'author_name', u.email as 'author_email' FROM posts p LEFT JOIN category_post cp on p.id = cp.post_id LEFT JOIN categories c ON cp.category_id = c.id LEFT JOIN users u on p.author_id = u.id where p.id = ? group by p.id",
      [id],
    );

    console.log("results", results);
    data = results.rows[0] ?? {};
    await kv.set(kv_key, data, { ex: 3600, nx: false }); // nx = only set if it doesn't exists
  }

  let categories = [];
  let categories_arr = data.categories.split(",");
  let categoriy_slug_arr = data.category_slugs.split(",");

  categories_arr.forEach((c, i) => {
    categories.push({
      name: c,
      slug: categoriy_slug_arr[i],
    });
  });

  // const res = await fetch('https://data.mongodb-api.com/...', {
  //   next: { revalidate: 60 }, // Revalidate every 60 seconds
  // })
  // const data = await res.json()
  // return NextResponse.json(data)
  //return new Response.json("here");

  return NextResponse.json({
    title: data.title,
    categories: categories,
    author: {
      name: data.author_name,
      img: "https://www.playusa.com/wp-content/uploads/2020/03/4eeb614417c557bad75cbc00fcfff3f9.jpeg",
      bio: "Derek Helling is the assistant managing editor of PlayUSA. Helling focuses on breaking news, including finance, regulation, and technology in the gaming industry. Helling completed his journalism degree at the University of Iowa and resides in Chicago",
    },
    date: data.published_on,
    banner_img:
      "https://www.playusa.com/wp-content/uploads/2023/08/racing-louisville-soccer-match-nwsl-1024x445.jpeg",
    content: data.body,
  });
}
