import Link from "next/link";
import Image from "next/image";

import { Oswald } from "next/font/google";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function HomePage({ posts }) {
  return (
    <>
      <header className="flex h-60 items-center justify-center bg-black text-center">
        <Image
          className="absolute z-0 h-60 object-cover"
          src="https://www.playusa.com/wp-content/uploads/2019/01/vegas-hero-2048x787.jpg"
          width={1500}
          height={250}
          alt="Picture of the author"
        />
        <div className="z-50 text-white">
          <h1 className="font-oswald text-7xl shadow-gray-500 text-shadow">
            USA Online Gambling
          </h1>
          <div>
            We only list legal gambling sites that are in compliance with state
            gambling laws Legal Gambling in the United States
          </div>
        </div>
      </header>
      <main className="xl container mx-auto mt-10 text-center text-lg">
        <div>
          <p className="text-lg">
            Welcome to PlayUSA! Legal gambling is exploding across the country,
            and it can be difficult to manage all the opportunities happening
            near you. This site provides you with the latest news, reviews and
            information on states that permit casino games, and those that are
            next in line. PlayUSA also covers online casinos, sweepstakes and
            social casino sites. This allows you to compare the best sites in
            the US. You can try demos of popular slot games here, too.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-3 gap-4">
          <div className="text-left">
            <h2 className="mb-5 border-b-2 pb-5 text-lg font-bold">
              US sports betting updates
            </h2>
            <p className="mb-5">
              Updated: <strong>Aug. 31, 2023</strong>
            </p>
            <p>
              The Kentucky Sports Wagering Advisory Council held its first
              meeting, recommending an initial catalog of allowable events for
              wagering to regulators in the state. If approved, the list will
              entail what physical sportsbooks will accept bets on when they
              first open on Sept. 7. Bally Bet is now available online for
              people in Ohio, preceding Bally’s plans to re-launch its online
              sportsbook in five other states. Bally’s had shuttered the app in
              those states in June to migrate its operations onto Kambi’s
              technology platform.
            </p>
          </div>
          <div className="text-left">
            <h2 className="mb-5 border-b-2 pb-5 text-lg font-bold">
              US casino updates
            </h2>
            <p className="mb-5">
              Updated: <strong>Aug. 31, 2023</strong>
            </p>
            <p>
              Pragmatic Play is building on its relationship with Bally’s
              Interactive, adding new slots and live dealer games to Bally Bet
              online casino. Bally Bet’s online casino operates in Michigan, New
              Jersey, and Pennsylvania currently. Elite Casino Resorts has
              opened the Walker’s Bluff Casino in southern Illinois. The casino
              boasts 650 slots and 14 gaming tables in addition to live
              entertainment and four dining options plus a hotel with more than
              100 rooms.
            </p>
          </div>
          <div className="text-left">
            <h2 className="mb-5 border-b-2 pb-5 text-lg font-bold">
              Latest news
            </h2>
            {posts &&
              posts.map((post, i) => {
                return <div key={i}>{post.title}</div>;
              })}
          </div>
        </div>

        <div>
          <Link href={`/user`} className="text-4xl text-orange-300">
            View Users
          </Link>
        </div>
        <div>
          <Link href={`/blog`} className="text-4xl text-orange-300">
            View Blogs
          </Link>
        </div>
        <div>One</div>
      </main>
    </>
  );
}
