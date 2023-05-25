import Link from "next/link";

export default async function Page({ params }) {
    const data = await getData(params.slug);
    //console.log('data', data)
    return <>
        <p>Post, user name from API is: {data.user.name}</p>
        <Link href={'/blog'}>link to blog dir</Link>
    </>
}

async function getData(userId) {
    const res = await fetch(`${process.env.API_EP}/api/user/${userId}`);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    return res.json();
}