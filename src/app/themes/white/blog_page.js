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
              {data.auhtor}
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
        </div>

        {/* sidebar */}
        <div className="pl-2">
          <div>
            <h2 className={`${H2Style} mb-10`}>Latest News</h2>
            {news.map((n, i) => {
              return (
                <div className="mb-5 grid grid-cols-3 gap-3">
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
