import Link from "next/link";
import Image from "next/image";

import { Oswald } from "next/font/google";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { LinkStyle, H2Style } from "./styles";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const NewsItem = ({ post }) => {
  return (
    <div className="mb-5 grid grid-cols-4">
      <div>
        <Image src={post.img} width={80} height={80} alt="image" />
      </div>

      <div className="col-span-3">
        <Link href="blog/1" className="pointer">
          <h4 className="font-oswald">{post.title}</h4>
        </Link>
        <div className="flex items-center text-base text-gray-500 ">
          <CalendarDaysIcon className="mr-1 h-6 w-6 text-gray-500" />
          <div>{post.date}</div>
        </div>
      </div>
    </div>
  );
};
export default function HomePage({ posts }) {
  return (
    <>
      <header className="flex h-60 items-center justify-center bg-black text-center">
        <Image
          className="absolute z-0 h-60 w-screen object-cover"
          src="https://www.playusa.com/wp-content/uploads/2019/01/vegas-hero-1024x393.jpg"
          width={1500}
          height={250}
          alt="Picture of the author"
        />
        <div className="z-30 text-white">
          <h1 className="font-oswald text-7xl shadow-gray-500 text-shadow-lg">
            USA Online Gambling
          </h1>
          <div className="mt-8 text-xl text-shadow">
            We only list legal gambling sites that are in compliance with state
            gambling laws
          </div>
        </div>
      </header>
      <main className="container mx-auto mt-10">
        <div>
          <p className="mb-4 text-lg">
            Welcome to PlayUSA! Legal gambling is exploding across the country,
            and it can be difficult to manage all the opportunities happening
            near you. This site provides you with the latest news, reviews and
            information on states that permit casino games, and those that are
            next in line.
          </p>
          <p className="mb-4 text-lg">
            PlayUSA also covers online casinos, sweepstakes and social casino
            sites. This allows you to compare the best sites in the US. You can
            try demos of popular slot games here, too.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-3 gap-4">
          <div className="text-left text-lg">
            <h2 className={`mb-5 border-b-2 pb-5 ${H2Style}`}>
              US sports betting updates
            </h2>
            <p className="mb-5">
              Updated: <strong>Aug. 31, 2023</strong>
            </p>
            <p>
              The Kentucky Sports Wagering Advisory Council held its first
              meeting,{" "}
              <Link className={`${LinkStyle}`} href="/">
                recommending an initial catalog
              </Link>{" "}
              of allowable events for wagering to regulators in the state. If
              approved, the list will entail what physical sportsbooks will
              accept bets on when they first open on Sept. 7.
            </p>
            <p>
              Bally Bet is{" "}
              <Link className={`${LinkStyle}`} href="/">
                now available online
              </Link>{" "}
              for people in Ohio, preceding Bally’s plans to re-launch its
              online sportsbook in five other states. Bally’s had shuttered the
              app in those states in June to migrate its operations onto Kambi’s
              technology platform.
            </p>
          </div>
          <div className="text-left text-lg">
            <h2 className={`mb-5 border-b-2 pb-5 ${H2Style}`}>
              US casino updates
            </h2>
            <p className="mb-5">
              Updated: <strong>Aug. 31, 2023</strong>
            </p>
            <p>
              Pragmatic Play is{" "}
              <Link href="/" className={`${LinkStyle}`}>
                building on its relationship with Bally’s Interactive,
              </Link>{" "}
              adding <strong>new slots and live dealer games</strong> to Bally
              Bet online casino. Bally Bet’s online casino operates in Michigan,
              New Jersey, and Pennsylvania currently.{" "}
            </p>
            <p>
              Elite Casino Resorts has{" "}
              <Link href="/" className={`${LinkStyle}`}>
                opened the Walker’s Bluff Casino{" "}
              </Link>
              in southern Illinois. The casino boasts{" "}
              <strong>650 slots and 14 gaming tables</strong> in addition to
              live entertainment and four dining options plus a hotel with more
              than 100 rooms.
            </p>
          </div>
          <div className="text-left">
            <h2 className={`mb-5 border-b-2 pb-5 ${H2Style}`}>Latest news</h2>
            {posts &&
              posts.map((post, i) => {
                return <NewsItem key={i} post={post} />;
              })}
          </div>
        </div>

        {/* <div>
          <Link href={`/user`} className="text-4xl text-orange-300">
            View Users
          </Link>
        </div>
        <div>
          <Link href={`/blog`} className="text-4xl text-orange-300">
            View Blogs
          </Link>
        </div>
        <div>One</div> */}
      </main>
    </>
  );
}
