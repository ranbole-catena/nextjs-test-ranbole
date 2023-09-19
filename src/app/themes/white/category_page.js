import Link from "next/link";
import { LinkStyle, H2Style } from "./styles";
import Image from "next/image";
import parse, { domToReact } from "html-react-parser";
import { Twitter, Facebook, LinkedIn, Reddit } from "./icons";
import { parseContent } from "./helper";

export default function CategoryPage({ data, news }) {
  return (
    <main className="container mx-auto pt-6">
      <div className="mx-auto grid grid-cols-4 gap-8">
        <div className="col-span-3">
          <h1 className="mb-8 font-oswald text-3xl">Nevada</h1>

          <div className="flex items-center">
            {data.map((p, i) => {
              return (
                <div className="grid grid-cols-3 gap-5 py-3">
                  <div>
                    <Link href={`/blog/${p.id}`}>
                      <Image
                        src="https://www.playusa.com/wp-content/uploads/2023/09/Circa-Survivor-Contest-Update-380x200.jpg"
                        width={300}
                        height={158}
                        alt="post-img"
                      />
                    </Link>
                  </div>
                  <div className="col-span-2 ">
                    <Link href={`/blog/${p.id}`}>
                      <h3 className={`${H2Style} pb-3 text-red-700`}>
                        {p.title}
                      </h3>
                    </Link>
                    {parseContent(p.body)}
                  </div>

                  <div className="col-span-3 flex items-center text-sm">
                    <span>Posted on: {p.published_on}</span>
                    <span className="px-1">|</span>
                    <span className="font-sm rounded-sm bg-red-700 px-2 text-xs text-white">
                      NJ
                    </span>
                    <span className="px-1">|</span>
                    <span className="text-xs text-red-700">
                      {p.author_name}
                    </span>
                  </div>
                </div>
              );
            })}
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
                    <h3 className="font-oswald text-red-700">{n.title}</h3>
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
