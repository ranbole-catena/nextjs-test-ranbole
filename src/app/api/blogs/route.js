import { NextResponse } from "next/server";
import { connect } from "@planetscale/database";
import { kv } from "@vercel/kv";

export async function GET(request) {
  console.log("request", request);

  // check redis first
  const kv_key = "blog_list";
  let data = await kv.get(kv_key);

  if (!data) {
    const config = {
      url: process.env["DATABASE_URL"],
    };

    const conn = await connect(config);

    const results = await conn.execute("SELECT * FROM users");
    data = results.rows;
    await kv.set(kv_key, data);
  }

  // const res = await fetch('https://data.mongodb-api.com/...', {
  //   next: { revalidate: 60 }, // Revalidate every 60 seconds
  // })
  // const data = await res.json()

  //console.log("results", results);
  // return NextResponse.json(data)
  //return new Response.json("here");
  return NextResponse.json(data);
}
