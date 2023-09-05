import Link from "next/link";
import { LinkStyle } from "../white/styles";

export default function BlogPage({ data }) {
  return (
    <main className="container mx-auto mt-8">
      <h1 className="mb-8 font-oswald text-3xl">{data.title}</h1>

      <div className="flex items-center">
        {data.tags.map((t, i) => {
          return (
            <div
              key={i}
              className="font-sm mr-2 rounded-sm bg-red-700 px-2 text-xs text-white"
            >
              {t}
            </div>
          );
        })}
      </div>
      <div>
        Written by <Link className={LinkStyle}>{data.auhtor}</Link> on{" "}
        {data.date}
      </div>
      <p>
        Body: {data.body} <br />
        <br />
        <Link className="text-orange-300" href={"/blog"}>
          Back to blog dir
        </Link>
      </p>
    </main>
  );
}
