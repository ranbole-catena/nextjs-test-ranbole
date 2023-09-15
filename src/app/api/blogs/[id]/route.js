import { NextResponse } from "next/server";
import { connect } from "@planetscale/database";
import { kv } from "@vercel/kv";

export async function GET(request, { params }) {
  console.log("request", request);
  const id = params.id;

  const kv_key = `blog_${id}`;
  let data = await kv.get(kv_key);

  if (!data) {
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
    await kv.set(kv_key, data, { ex: 3600, nx: true });
  }

  // const res = await fetch('https://data.mongodb-api.com/...', {
  //   next: { revalidate: 60 }, // Revalidate every 60 seconds
  // })
  // const data = await res.json()
  // return NextResponse.json(data)
  //return new Response.json("here");
  return NextResponse.json(data);
}
