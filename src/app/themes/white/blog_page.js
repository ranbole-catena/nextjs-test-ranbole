import Link from "next/link";
import { LinkStyle, H2Style } from "./styles";
import Image from "next/image";
import parse, { domToReact } from "html-react-parser";
import { Twitter, Facebook, LinkedIn, Reddit } from "./icons";

export default function BlogPage({ data, news }) {
  const contet = parse(data.content, {
    replace: (domNode) => {
      if (domNode.name === "h2") {
        return (
          <h2 className={`${H2Style} mb-3 border-b-2 pb-3`}>
            {domToReact(domNode.children)}
          </h2>
        );
      }
    },
  });

  return (
    <main className="container mx-auto mt-6">
      <div className="mx-auto grid grid-cols-4 gap-8">
        <div className="col-span-3">
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
          <div className="my-2">
            Written by{" "}
            <Link href="/" className={LinkStyle}>
              {data.author.name}
            </Link>{" "}
            on {data.date}
          </div>
          <div className="my-3">
            <Image
              src={data.banner_img}
              width={0}
              height={0}
              sizes="100vw"
              alt="image"
              className="h-auto w-full"
            />
          </div>
          <div className="my-5">
            <Facebook />
            <Twitter />
            <LinkedIn />
            <Reddit />
          </div>
          <div>{contet}</div>
          <div className="my-5">
            <Facebook />
            <Twitter />
            <LinkedIn />
            <Reddit />
          </div>

          {/* Related articles */}
          <div className="my-10">
            <h2 className={`${H2Style} my-8`}>Related Articles</h2>
            <div className="mb-5 grid grid-cols-3 gap-3">
              {news.map((n, i) => {
                return (
                  <div>
                    <div className="h-44">
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt="image"
                        className="h-44 w-full"
                        src={n.img_large}
                      />
                    </div>
                    <div className="mb-6 font-oswald text-lg text-red-700">
                      {n.title}
                    </div>
                    <div>{n.date}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* author */}
          <div className="my-10">
            <div className="mb-5 grid grid-cols-6 gap-3 rounded-lg border border-gray-300 px-10 py-5">
              <div>
                <Image
                  width={110}
                  height={110}
                  alt="image"
                  className="rounded-full"
                  src={data.author.img}
                />
              </div>
              <div className="col-span-5">
                <span className="block tracking-widest text-gray-400">
                  WRITTEN BY
                </span>
                <h6 className="font-oswald text-2xl">{data.author.name}</h6>
                <p className="my-5 text-lg text-gray-500">{data.author.bio}</p>
                <span className="block text-xs text-gray-400">
                  View all posts by Derek Helling
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* sidebar */}
        <div className="pl-2">
          <div>
            <h2 className={`${H2Style} mb-10`}>Latest News</h2>
            {news.map((n, i) => {
              return (
                <div key={i} className="mb-5 grid grid-cols-3 gap-3">
                  <div>
                    <Image src={n.img} width={90} height={90} alt={n.title} />
                  </div>
                  <div className="col-span-2">
                    <h4 className="font-oswald text-red-700">{n.title}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
