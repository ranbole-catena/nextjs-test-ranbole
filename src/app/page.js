import Image from 'next/image'
import Link from 'next/link'


export default function Home() {
  return (
    <main className='text-center text-4xl mt-5'>
      <div>
        Current Env: {`${process.env.ENV}`}
      </div>
      <div>
        <Link href={`/user`} className="text-orange-300 text-4xl">View Users</Link>
      </div>
      <div>
        One
      </div>
    </main>
  )
}
