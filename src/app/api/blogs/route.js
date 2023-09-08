import { NextResponse } from "next/server";
import { connect } from "@planetscale/database";

export async function GET(request) {
  console.log("request", request);

  const config = {
    url: process.env["DATABASE_URL"],
  };

  const conn = await connect(config);

  const results = await conn.execute("SELECT * FROM users");

  // const res = await fetch('https://data.mongodb-api.com/...', {
  //   next: { revalidate: 60 }, // Revalidate every 60 seconds
  // })
  // const data = await res.json()

  console.log("results", results);
  // return NextResponse.json(data)
  //return new Response.json("here");
  return NextResponse.json(results.rows);
}
