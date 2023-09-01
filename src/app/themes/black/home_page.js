import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
    return (
        <>
            <header className="h-60 text-center bg-black flex items-center justify-center">
                <Image
                    className="h-60 object-cover z-0 absolute"
                    src="https://www.playusa.com/wp-content/uploads/2019/01/vegas-hero-2048x787.jpg"
                    width={1500}
                    height={250}
                    alt="Picture of the author"
                />
                <h1 className="z-1 text-white drop-shadow-lg text-7xl font-headerone">USA Online Gambling</h1>
            </header>
            <main className='xl bg-black text-white'>
                <div className="container text-center mx-auto">
                    <div>
                        <p className="text-lg">
                            Welcome to PlayUSA! Legal gambling is exploding across the country, and it can be difficult to manage all the opportunities happening near you. This site provides you with the latest news, reviews and information on states that permit casino games, and those that are next in line.

                            PlayUSA also covers online casinos, sweepstakes and social casino sites. This allows you to compare the best sites in the US. You can try demos of popular slot games here, too.
                        </p>
                    </div>
                    <div>
                        <Link href={`/user`} className="text-orange-300 text-4xl">View Users</Link>
                    </div>
                    <div>
                        <Link href={`/blog`} className="text-orange-300 text-4xl">View Blogs</Link>
                    </div>
                    <div>
                        One
                    </div>
                </div>
            </main>
        </>
    )
}